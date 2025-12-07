# backend/app/llm_client.py  (adjust path as needed)

import os
import json
from pathlib import Path

from google import genai
from dotenv import load_dotenv

from .rubrics import ARGUMENTATIVE_RUBRIC


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


def score_essay_with_rubric(essay_text: str, rubric=ARGUMENTATIVE_RUBRIC) -> dict:
    """
    Calls the Gemini model using the new google-genai client and returns a parsed JSON dict
    following the expected rubric structure.
    """

    rubric_description = "\n".join(
        f"- {c['id']} ({c['label']}): {c['description']}"
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
