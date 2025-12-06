# backend/app/dummy_data.py
from .schemas import ReviewRequest, ReviewResponse, CriterionResult


def _build_overall_impression(overall_score: int, max_score: int) -> str:
    ratio = overall_score / max_score if max_score else 0.0
    if ratio >= 0.75:
        return (
            "Overall, this is a well-developed essay with a clear sense of purpose. "
            "Your ideas come across confidently, and there is already a strong foundation "
            "for a persuasive argument."
        )
    elif ratio >= 0.5:
        return (
            "Overall, your essay shows genuine effort and a developing argument. "
            "There are clear ideas and moments of insight, even if the structure and "
            "support are not fully consistent yet."
        )
    else:
        return (
            "Overall, your essay captures some important ideas, but they are not yet fully "
            "organized or supported. Treat this draft as a starting point that you can now "
            "shape into a clearer and more persuasive argument."
        )


def _build_next_steps_example() -> str:
    return (
        "For your next revision, you might start by rewriting the thesis as one clear, "
        "specific sentence that states your position and hints at your main reasons. "
        "Then, choose two or three key body paragraphs and add a concrete example, quote, "
        "or piece of data to each, followed by a short explanation of how that evidence "
        "supports your point. Finally, refine topic sentences and closing sentences so "
        "each paragraph clearly connects back to the thesis and helps the reader follow "
        "your argument from beginning to end."
    )


def make_dummy_review(request: ReviewRequest) -> ReviewResponse:
    """
    Return a static dummy review for now.
    Later you can inspect request.essay_text and tweak scores/comments dynamically.
    """

    criteria = [
        CriterionResult(
            id="thesis_clarity",
            label="Thesis Clarity",
            score=2,
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
            score=1,
            max_score=4,
            comment="Logical structure is mostly clear, but transitions could be smoother."
        ),
    ]

    overall_score = sum(c.score for c in criteria)
    max_score = 12

    overall_impression = _build_overall_impression(overall_score, max_score)
    improvement_summary = (
        "Here are the main areas to strengthen: "
        + " ".join(c.comment for c in criteria)
    )
    next_steps_example = _build_next_steps_example()

    return ReviewResponse(
        rubric_id=request.rubric_id,
        overall_score=overall_score,
        max_score=max_score,
        criteria=criteria,
        overall_impression=overall_impression,
        improvement_summary=improvement_summary,
        next_steps_example=next_steps_example,
    )
