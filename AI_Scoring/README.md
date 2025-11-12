# AI Scoring Module

## 🎯 Overview
The **AI Scoring** module powers the automated feedback and grading system for essays.  
It defines how the AI interprets rubrics, structures scoring, and ensures that generated feedback is consistent, fair, and schema-valid.

This component connects directly with the **FastAPI backend** (`/api/score` endpoint) to:
- Ingest parsed essay text and rubric data.
- Generate AI feedback and rewritten suggestions.
- Validate structured JSON output before returning results.



## 📂 Folder Structure

AI_Scoring/
├── rubrics/ → JSON schemas and example rubrics
├── prompts/ → Prompt templates and few-shot examples for the LLM
├── harness/ → Test harness for AI vs. human score comparison
├── guidelines/ → Usage and fairness documentation
└── README.md → Overview of Nidhey's AI module and contributions

