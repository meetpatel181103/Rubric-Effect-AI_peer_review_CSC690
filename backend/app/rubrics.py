# ----------------------------
# Argumentative Essay Rubric
# ----------------------------
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

# ----------------------------
# Analytical Essay Rubric
# ----------------------------
ANALYTICAL_RUBRIC = {
    "rubric_id": "analytical_essay_v1",
    "max_score_per_criterion": 4,
    "criteria": [
        {
            "id": "depth_of_analysis",
            "label": "Depth of Analysis",
            "description": "Assesses quality of interpretation, insight, and moving beyond summary."
        },
        {
            "id": "reasoning_connections",
            "label": "Reasoning & Connections",
            "description": "Assesses logical reasoning and clear connections among ideas."
        },
        {
            "id": "use_of_evidence",
            "label": "Use of Evidence",
            "description": "Evaluates relevance, explanation, and integration of evidence."
        }
    ]
}

# ----------------------------
# Research Essay Rubric
# ----------------------------
RESEARCH_RUBRIC = {
    "rubric_id": "research_essay_v1",
    "max_score_per_criterion": 4,
    "criteria": [
        {
            "id": "source_quality",
            "label": "Source Quality",
            "description": "Evaluates credibility, variety, and appropriateness of sources."
        },
        {
            "id": "citation_formatting",
            "label": "Citation & Formatting",
            "description": "Assesses accuracy of citation style and formatting consistency."
        },
        {
            "id": "academic_integrity",
            "label": "Academic Integrity",
            "description": "Checks clarity of attribution, ethical use of sources, and avoidance of plagiarism."
        }
    ]
}

# ----------------------------
# Rubric Index (Lookup Table)
# ----------------------------
RUBRIC_INDEX = {
    ARGUMENTATIVE_RUBRIC["rubric_id"]: ARGUMENTATIVE_RUBRIC,
    ANALYTICAL_RUBRIC["rubric_id"]: ANALYTICAL_RUBRIC,
    RESEARCH_RUBRIC["rubric_id"]: RESEARCH_RUBRIC,
}


def get_rubric_by_id(rubric_id: str):
    """
    Look up rubric metadata by ID.
    Returns None if no matching rubric is found.
    """
    return RUBRIC_INDEX.get(rubric_id)
