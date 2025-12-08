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

class CitationIssue(BaseModel):
    type: Literal["missing_intext", "missing_reference", "formatting", "other", "incomplete_intext", "incomplete_citation"]
    message: str
    excerpt: str | None = None
    suggestion: str | None = None


class CitationCheckRequest(BaseModel):
    essay_text: str
    citation_style: str | None = None  # e.g. "APA", "MLA", or None/unknown


class CitationCheckResponse(BaseModel):
    citation_score: int        # e.g. 0–4
    max_score: int             # e.g. 4
    summary: str               # short overall comment
    issues: List[CitationIssue]
