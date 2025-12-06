# backend/app/rubrics.py

ARGUMENTATIVE_RUBRIC = {
    "rubric_id": "argumentative_essay_v1",
    "max_score_per_criterion": 4,
    "criteria": [
        {
            "id": "thesis_clarity",
            "label": "Thesis Clarity",
            "description": "How clear, focused, and specific the thesis is."
        },
        {
            "id": "evidence_support",
            "label": "Evidence & Support",
            "description": "How strong, relevant, and well-explained the evidence is."
        },
        {
            "id": "organization_flow",
            "label": "Organization & Flow",
            "description": "How logically ideas are ordered and how smooth transitions are."
        }
    ]
}

RUBRIC_INDEX = {
    ARGUMENTATIVE_RUBRIC["rubric_id"]: ARGUMENTATIVE_RUBRIC,
}


def get_rubric_by_id(rubric_id: str):
    """For now, only the argumentative rubric exists."""
    return RUBRIC_INDEX.get(rubric_id)