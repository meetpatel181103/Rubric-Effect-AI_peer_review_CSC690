from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/score", tags=["score"])

class ScoreRequest(BaseModel):
    text: str
    rubric_id: str | None = None

@router.post("")
def score(req: ScoreRequest):
    # TODO: call your LLM here and return schema-valid JSON
    # For now, return a stubbed response
    return {
        "rubric_id": req.rubric_id or "default",
        "scores": {"thesis": 3, "evidence": 4, "organization": 3},
        "feedback": [
            "Clarify your thesis earlier.",
            "Add citations for statistics in paragraph 2."
        ],
        "suggested_rewrite": "In this essay, I argue that ..."
    }
