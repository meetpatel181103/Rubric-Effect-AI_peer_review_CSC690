# RUBRIC-EFFECT: AI Peer Review  
**Capstone Project Proposal — SFSU CSC 698, Fall 2025**

**Team**  
- Meet Patel 
- Pritham Sandhu  
- Nidhey Patel

---

## Problem Statement
Our project addresses the growing crisis in scalable, high-quality feedback within academic institutions and professional development programs. Manual, human-driven peer review creates major logistical and quality challenges:

- Faculty and TAs routinely spend **25–30%** of grading time coordinating the process—matching reviewers, tracking submissions, chasing deadlines, and moderating disputes—rather than giving high-value coaching.  
- A large share of student-to-student feedback is too vague or contradictory to act on (often cited as up to **40%**), and unconscious bias can creep into evaluations.  
- In large intro courses, the cycle from submission → review → feedback can stretch to **weeks**, breaking the fast feedback loop students need.

We aim to cut wasted educational time by enforcing consistency through standardized, rubric-aligned comments and providing near-instantaneous critique. Departments can scale effortlessly while ensuring every student receives actionable feedback with speed and objective quality.

---

## Objectives
- Ingest and reliably parse essays from **PDF**, **TXT**, and **pasted text**.  
- Produce consistent, rubric-aligned **scores** with **schema-valid JSON** outputs.  
- Deliver clear, actionable feedback and generate **improved rewrites** for weak paragraphs.  
- Accurately **flag sentences** that likely need citations.  
- Provide **fast, low-cost turnaround** that scales to large classes and reduces instructor coordination.

---

## Project Description
**AI Peer Reviewer** is a web app that turns essay uploads into structured, rubric-aligned feedback. Students upload a PDF/TXT or paste text, pick a course rubric, and receive criterion scores, concise bullet comments, suggested rewrites for weak paragraphs, and flags for claims that may need citations—speeding up the loop while improving consistency.

**Deliverable:** a working demo web application with a **React + Tailwind** interface and a **FastAPI** backend. It parses files, calls an LLM for scoring and feedback, and persists text, rubrics, and results in **PostgreSQL**. The UI shows scores, inline highlights, and copyable rewrites, with an export option. We avoid storing personal data and test with public/anonymized samples and rubric JSONs.

The project primarily uses text generation via a pre-trained transformer model (hosted API). No fine-tuning is required initially; prompt engineering and a few-shot rubric guide ensure structured JSON outputs, with optional light tuning later.

---

## Technical Approach
- **Frontend:** React + Tailwind CSS for uploading essays, selecting rubrics, and viewing AI-generated feedback.  
- **Backend:** FastAPI for text extraction, LLM communication, and rubric-based scoring logic.  
- **Text Parsing:** `pdfplumber` and `PyPDF2` for PDFs, `python-docx` for DOCX, passthrough for TXT.  
- **LLM Access:** OpenAI GPT-4o-mini API for structured feedback, scoring, and rewrites.  
- **Storage:** PostgreSQL for text, rubric data, and feedback results.

We won’t collect/store personal data. Testing uses publicly available essays, anonymized writing data, and rubric JSON files. No additional datasets are required beyond user uploads and predefined templates.

---

## Team Roles and Responsibilities

**Meet — Backend Lead**  
- Stand up FastAPI services with Pydantic models and schema-validated JSON (with retry/fix-up on drift).  
- Own text ingestion pipeline: PDF/TXT parsing, validation, and robust error handling.  
- DB design and migrations in PostgreSQL; connection pooling, simple caching, and logging.  
- Security & privacy pass: ephemeral uploads, metadata redaction; document retention choices.

**Pritham — Frontend & UX Lead**  
- Build React + Tailwind UI: upload flow, rubric selector, progress states, and results view (criterion scores, inline highlights, “copyable rewrites”).  
- Integrate with backend; handle failure states (timeouts, malformed input).  
- Accessibility & usability: keyboard navigation, clear rubric labeling, empty states, export.  
- Product polish: microcopy, tooltips for “why was this flagged?”.

**Nidhey — Product, Prompts & Evaluation**  
- Define rubric JSON schema + prompt mapping; craft few-shot examples for consistency.  
- Evaluation harness: agreement vs. human scores, response format correctness, latency dashboards.  
- QA plan with anonymized/public essays; curate “weak paragraph” samples.  
- Ethics & scope: document limitations; “use responsibly” notes for instructors.

---

## Expected Outcomes
**By the end of the project, we will deliver:**
- A functional demo web app that lets users upload essays, select a rubric, and receive structured AI feedback.  
- A backend connected to an LLM that performs scoring, generates bullet-point feedback, suggests rewrites, and flags unsupported claims.  
- Presentation slides summarizing objectives, workflow, technical approach, and findings.

**Success metrics:**
- **Rubric Scoring Consistency:** LLM vs. human agreement/correlation.  
- **Response Accuracy:** % of correctly formatted, relevant AI feedback.  
- **System Performance:** average processing time and API reliability across test essays.

A successful outcome shows that Generative AI can provide structured, constructive, rubric-aligned feedback comparable to a human peer reviewer—while maintaining speed, usability, and transparency.

---

## Timeline

**Week 1 — Foundations & Spec**  
- Finalize API contracts, DB schema v1, rubric JSON format.  
- Repo scaffolding (frontend + backend), CI for lint/tests, environment configs.  
- Spike: parsing reliability on 3–5 messy PDFs/DOCX.

**Week 2 — Parsing & Backend Skeleton**  
- Implement `/parse` with pdfplumber/PyPDF2/python-docx and robust errors.  
- FastAPI with basic auth, logging, request size limits.  
- Seed Postgres tables; wire simple persistence for runs + results.

**Week 3 — Frontend MVP**  
- React screens: upload → rubric pick → results shell; loading/error states.  
- Hook to `/parse`; render extracted text preview; basic rubric editor loader.  
- Basic Tailwind styling; start accessibility checklist.

**Week 4 — LLM Integration & Schema Control**  
- Prompt v1 + few-shot examples; `/score` returns schema-valid JSON.  
- Auto-retry/fix-up when validation fails; log drift cases.  
- Show scores + bullet feedback; highlight “citation-needed” flags inline.

**Week 5 — Evaluation, Metrics & Hardening**  
- Human vs. model scoring study (small set); compute agreement/correlation.  
- Latency & reliability measurements; caching/batching where safe.  
- Security/privacy review; finalize export (JSON/CSV) and demo data.

**Week 6 — Polish & Delivery**  
- UX polish, microcopy, empty/edge states; tidy visual hierarchy.  
- Write runbook & README; record demo; assemble slides.  
- Final bug sweep and rehearsal; contingency plan for live demo.

---

## Potential Challenges and Risks
- **Reliability & Input Quality:** API usage/rate limits; we’ll lean on smaller/local models for testing and use batching/caching to reduce tokens. Generative outputs may drift from schema; we’ll enforce strict prompts, validation, and auto-retries/fix-ups.  
- **Domain-Specific Accuracy:** Without fine-tuning, accuracy may lag; few-shot exemplars and iterative prompt refinement will improve consistency.  
- **Quality & Ethics:** Writing assessment is subjective; combine quantitative checks (LLM vs. human agreement) with qualitative reviews (surveys). Protect sensitive content by enabling processing without long-term storage.

---

## References
1. https://fastapi.tiangolo.com/  
2. https://react.dev/  
3. https://tailwindcss.com/  
4. https://www.postgresql.org/docs/current/index.html  
5. https://github.com/jsvine/pdfplumber  
6. https://pypi.org/project/PyPDF2/  
7. https://github.com/python-openxml/python-docx  
8. https://platform.openai.com/docs/models/gpt-4o-mini  
9. https://www.cmu.edu/teaching/designteach/teach/rubrics.html
