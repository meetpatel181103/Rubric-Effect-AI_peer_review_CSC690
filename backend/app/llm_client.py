import os
import json
from pathlib import Path

from google import genai
from dotenv import load_dotenv


# --- Load environment variables explicitly (in case main.py wasn't enough) ---
# Try to locate a .env file relative to this file if not already loaded.
if not os.getenv("GEMINI_API_KEY"):
    # Look for ../.env relative to this file (i.e., backend/.env)
    env_path = Path(__file__).resolve().parents[1] / ".env"
    load_dotenv(dotenv_path=env_path)


# --- Create a single global client and model id ---
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    # Fail fast at import time so we see a clear error in logs
    raise RuntimeError("GEMINI_API_KEY is missing from environment/.env")

MODEL_ID = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

client = genai.Client(api_key=API_KEY)


def score_essay_with_rubric(essay_text: str, rubric) -> dict:
    """
    Calls the Gemini model using the new google-genai client and returns a parsed JSON dict
    following the expected rubric structure.
    """

    if rubric is None:
        raise ValueError("rubric must not be None")

    rubric_description = "\n".join(
        f"- {c['id']} ({c['label']}): {c['description']}"
        for c in rubric["criteria"]
    )

    criteria_schema_lines = [
        f'    {{ "id": "{c["id"]}", "score": 0, "comment": "" }}'
        for c in rubric["criteria"]
    ]
    criteria_schema = ",\n".join(criteria_schema_lines)

    target_schema = f"""
    {{
    "criteria": [
    {criteria_schema}
    ],
    "overall_impression": "",
    "improvement_summary": "",
    "next_steps_example": ""
    }}
    """


    prompt = f"""
You are an essay evaluator.

Score the essay using this rubric:

{rubric_description}

Essay text:
\"\"\"{essay_text}\"\"\"

INSTRUCTIONS:
- Output ONLY valid JSON.
- Score each criterion from 0–4.
- Provide short, helpful comments.
- Provide 3 additional feedback fields:
    - overall_impression
    - improvement_summary
    - next_steps_example

JSON schema to follow exactly:

{target_schema}
"""

    # --- Call Gemini using the new client ---
    response = client.models.generate_content(
        model=MODEL_ID,
        contents=prompt,
    )

    raw = (response.text or "").strip()

    # --- Parse JSON, with a small fallback if model wraps in extra text ---
    try:
        return json.loads(raw)
    except Exception:
        try:
            start = raw.find("{")
            end = raw.rfind("}") + 1
            return json.loads(raw[start:end])
        except Exception:
            raise ValueError(f"Gemini returned invalid JSON:\n{raw}")



def check_citations_with_llm(essay_text: str, style: str | None = None) -> dict:
    """
    Use Gemini to review citation practices and return structured JSON.
    This does NOT do deep plagiarism detection – it focuses on citation quality.
    """
    style_hint = style or "any consistent academic style"

    target_schema = """
{
  "citation_score": 0,
  "max_score": 4,
  "summary": "",
  "issues": [
    {
      "type": "missing_intext",
      "message": "",
      "excerpt": "",
      "suggestion": ""
    }
  ]
}
"""

    prompt = f"""
You are a citation and academic integrity helper.

Essay:
\"\"\"{essay_text}\"\"\"

Expected citation style (if provided): {style_hint}

TASK:
- Check whether quotations, paraphrases of specific sources, and specific factual claims
  appear to be properly cited.
- Look for:
  - Missing in-text citations next to quotes or very specific information
  - In-text citations that don't seem to have enough information (e.g., missing year/page in APA)
  - Clearly inconsistent or messy citation formatting
- Do NOT try to verify against a large database — just reason about what you see in this essay.

SCORING GUIDELINE:
- citation_score from 0 to 4:
  - 4 = Citations are consistently present and well-formatted.
  - 3 = Mostly good, with some minor issues or inconsistencies.
  - 2 = Noticeable gaps or inconsistent practice.
  - 1 = Frequent problems or missing citations.
  - 0 = Almost no citation practice, or very poor.

INSTRUCTIONS:
- Return ONLY valid JSON.
- Follow this schema exactly:

{target_schema}
"""

    response = client.models.generate_content(
        model=MODEL_ID,
        contents=prompt,
    )

    raw = (response.text or "").strip()

    # Reuse the same robust JSON parsing pattern as your scoring function
    try:
        return json.loads(raw)
    except Exception:
        try:
            start = raw.find("{")
            end = raw.rfind("}") + 1
            return json.loads(raw[start:end])
        except Exception:
            raise ValueError(f"Gemini returned invalid JSON in citation check:\n{raw}")
