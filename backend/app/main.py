from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from starlette import status

from .file_parsers import extract_text_from_file, UnsupportedFileTypeError
from .schemas import ReviewRequest, ReviewResponse, CriterionResult
from .rubrics import get_rubric_by_id
from .llm_client import score_essay_with_rubric  # UPDATED
from dotenv import load_dotenv

load_dotenv()

# from .dummy_data import make_dummy_review


app = FastAPI(
  title="Rubric-EFFECT API",
  version="0.1.0",
)

# CORS so your React app can call the API
origins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Suggested essay length range
MIN_WORDS = 100
MAX_WORDS = 1500


# @app.post("/review", response_model=ReviewResponse)
# async def review_essay(payload: ReviewRequest) -> ReviewResponse:
#   """
#   Dummy rubric-based review endpoint.
#   For now this just returns static data.
#   """
#   return make_dummy_review(payload)


@app.post("/review", response_model=ReviewResponse)
async def review_essay(payload: ReviewRequest):
    
    """
    Use the LLM to score an essay against a rubric and return structured feedback.
    """

    # --- 1) Validate rubric id ---
    rubric = get_rubric_by_id(payload.rubric_id)
    print("DEBUG rubric_id received:", payload.rubric_id)
    if rubric is None:
        # For now, we only support one rubric.
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unknown rubric_id: {payload.rubric_id}",
        )

    # --- 2) Validate essay length ---
    num_words = len(payload.essay_text.split())
    if num_words < MIN_WORDS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Your essay is too short ({num_words} words). "
                   f"Please provide at least {MIN_WORDS} words for meaningful feedback.",
        )
    if num_words > MAX_WORDS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Your essay is too long ({num_words} words). "
                   f"For this version, please limit it to at most {MAX_WORDS} words.",
        )

    # --- 3) Call LLM with error handling ---
    try:
        llm_result = score_essay_with_rubric(payload.essay_text, rubric)
    except ValueError as e:
        # JSON parsing or schema mismatch
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="The AI returned an unexpected response. Please try again.",
        ) from e
    except Exception as e:
        # Network/API/etc. error
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="The AI service is currently unavailable. Please try again in a moment.",
        ) from e

    # --- 4) Validate LLM output structure ---
    required_top_keys = {"criteria", "overall_impression",
                         "improvement_summary", "next_steps_example"}
    if not isinstance(llm_result, dict) or not required_top_keys.issubset(llm_result.keys()):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="The AI returned an unexpected response. Please try again.",
        )

    if not isinstance(llm_result["criteria"], list) or len(llm_result["criteria"]) == 0:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="The AI returned an unexpected response. Please try again.",
        )

    # --- 5) Map LLM output → CriterionResult list (Checkpoint 5.4) ---
    criteria_output: list[CriterionResult] = []
    rubric_criteria = {c["id"]: c for c in rubric["criteria"]}

    for item in llm_result["criteria"]:
        crit_id = item.get("id")
        score = item.get("score")
        comment = item.get("comment")

        if crit_id not in rubric_criteria or score is None or comment is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="The AI returned an unexpected response. Please try again.",
            )

        rubric_entry = rubric_criteria[crit_id]

        criteria_output.append(
            CriterionResult(
                id=crit_id,
                label=rubric_entry["label"],
                score=int(score),
                max_score=rubric["max_score_per_criterion"],
                comment=str(comment),
            )
        )

    overall_score = sum(c.score for c in criteria_output)
    max_score = rubric["max_score_per_criterion"] * len(criteria_output)

    # --- 6) Build final ReviewResponse ---
    return ReviewResponse(
        rubric_id=rubric["rubric_id"],
        overall_score=overall_score,
        max_score=max_score,
        criteria=criteria_output,
        overall_impression=llm_result["overall_impression"],
        improvement_summary=llm_result["improvement_summary"],
        next_steps_example=llm_result["next_steps_example"],
    )


@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    """
    Accept a PDF / DOCX / TXT file and return extracted plain text.
    """
    filename = file.filename or "uploaded_file"

    try:
        data = await file.read()
        if not data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty.",
            )

        text = extract_text_from_file(filename, data)

        if not text.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="We could not extract any text from that file. "
                       "It may be scanned or image-only.",
            )

        return {"text": text}

    except UnsupportedFileTypeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    except HTTPException:
        # re-raise any HTTPException we explicitly created
        raise

    except Exception as e:
        # Unexpected parsing error
        print("Error while extracting text:", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong while reading the file. "
                   "Please try another file or paste your text instead.",
        ) from e
