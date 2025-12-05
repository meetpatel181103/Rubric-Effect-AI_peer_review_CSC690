# backend/app/dummy_data.py
from .schemas import ReviewRequest, ReviewResponse, CriterionResult


def make_dummy_review(request: ReviewRequest) -> ReviewResponse:
  """
  Return a static dummy review for now.
  Later you can inspect request.essay_text and tweak scores.
  """

  criteria = [
    CriterionResult(
      id="thesis_clarity",
      label="Thesis Clarity",
      score=3,
      max_score=4,
      comment="The thesis is clear but could be more specific."
    ),
    CriterionResult(
      id="evidence_support",
      label="Evidence & Support",
      score=3,
      max_score=4,
      comment="Evidence is generally strong with room for deeper explanation."
    ),
    CriterionResult(
      id="organization_flow",
      label="Organization & Flow",
      score=3,
      max_score=4,
      comment="Logical structure but transitions could be smoother."
    ),
  ]

  overall_score = sum(c.score for c in criteria)

  return ReviewResponse(
    rubric_id=request.rubric_id,
    overall_score=overall_score,
    max_score=12,
    criteria=criteria,
  )
