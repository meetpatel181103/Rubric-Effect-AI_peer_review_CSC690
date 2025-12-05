# backend/app/schemas.py
from typing import List
from pydantic import BaseModel


class CriterionResult(BaseModel):
  id: str
  label: str
  score: int       # 0–4
  max_score: int   # always 4 for now
  comment: str


class ReviewRequest(BaseModel):
  rubric_id: str   # e.g. "argumentative_essay_v1"
  essay_text: str  # full essay text (or placeholder from file)


class ReviewResponse(BaseModel):
  rubric_id: str
  overall_score: int   # 0–12
  max_score: int       # always 12 for this rubric
  criteria: List[CriterionResult]
