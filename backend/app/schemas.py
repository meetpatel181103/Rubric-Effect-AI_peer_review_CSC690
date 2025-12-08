# backend/app/schemas.py
from typing import List
from pydantic import BaseModel
from typing import Literal

class CriterionResult(BaseModel):
    id: str
    label: str
    score: int       # 0–4
    max_score: int   # always 4 for now
    comment: str


class ReviewRequest(BaseModel):
    rubric_id: Literal[
        "argumentative_essay_v1",
        "analytical_essay_v1",
        "research_essay_v1",
    ]
    essay_text: str



class ReviewResponse(BaseModel):
    rubric_id: str
    overall_score: int       # 0–12
    max_score: int           # always 12
    criteria: List[CriterionResult]

    # NEW fields, controlled by backend
    overall_impression: str
    improvement_summary: str
    next_steps_example: str
