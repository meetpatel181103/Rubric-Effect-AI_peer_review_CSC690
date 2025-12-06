# backend/app/llm_client.py
import os
import json
from openai import OpenAI
from .rubrics import ARGUMENTATIVE_RUBRIC


def _get_client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY is not set. Make sure it is defined in your .env file."
        )
    return OpenAI(api_key=api_key)



def score_essay_with_rubric(essay_text: str, rubric=ARGUMENTATIVE_RUBRIC) -> dict:
    """
    Calls the LLM to score the essay using the 3-criterion rubric.
    Returns a dict of form:
    {
      "criteria": [ {id, score, comment}, ... ],
      "overall_impression": "...",
      "improvement_summary": "...",
      "next_steps_example": "..."
    }
    """
    client = _get_client()  # <-- client created here, not at import time

    rubric_description = "\n".join(
        f"- {c['label']}: {c['description']}"
        for c in rubric["criteria"]
    )

    target_schema = """
{
  "criteria": [
    { "id": "thesis_clarity", "score": 0, "comment": "" },
    { "id": "evidence_support", "score": 0, "comment": "" },
    { "id": "organization_flow", "score": 0, "comment": "" }
  ],
  "overall_impression": "",
  "improvement_summary": "",
  "next_steps_example": ""
}
"""

    prompt_user = f"""
Score the following student essay using the provided rubric.

Essay:
\"\"\"{essay_text}\"\"\"

Rubric (3 criteria):
{rubric_description}

Instructions:
- Score each criterion from 0 to 4.
- Write 1–2 sentences explaining the score in "comment".
- Write a brief "overall_impression" describing the essay quality.
- Write "improvement_summary" listing what needs to improve.
- Write "next_steps_example" giving actionable revision advice.
- Return ONLY valid JSON matching this schema:

{target_schema}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an assistant that scores essays using a rubric. "
                    "Respond ONLY with valid JSON."
                ),
            },
            {"role": "user", "content": prompt_user},
        ],
        max_tokens=600,
        temperature=0.2,
    )

    raw = response.choices[0].message.content.strip()

    try:
        return json.loads(raw)
    except Exception:
        # Fallback to try extracting JSON substring
        try:
            start = raw.find("{")
            end = raw.rfind("}") + 1
            return json.loads(raw[start:end])
        except Exception:
            raise ValueError("LLM returned invalid JSON:\n" + raw)
