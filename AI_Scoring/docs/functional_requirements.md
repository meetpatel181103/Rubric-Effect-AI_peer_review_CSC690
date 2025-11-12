# AI Peer Reviewer — Functional Requirements

*Scope:* Define what the system **must do** to satisfy the Capstone Project Proposal and the team roles:

* **Frontend (Pritham):** React + Vite + Tailwind UI
* **Backend (Meet):** FastAPI services, parsing pipeline, env/config
* **AI/Scoring (Nidhey):** Rubric JSON format, prompts/few-shots, test harness, usage guidelines


## 1) Actors & Assumptions

* **Student**: uploads an essay, selects a rubric, requests AI review, reads feedback, downloads/export.
* **Instructor/TA** (optional for capstone): reviews results; may compare AI vs human scores.
* **System**: parses files, builds prompt, calls LLM, validates schema, retries on JSON drift, stores/retrieves results.
* **Privacy**: no PII stored; essays may be processed transiently; anonymized samples for testing.


## 2) Core Functional Requirements

### FR-01 File Upload & Parsing

* The system SHALL accept `.pdf`, `.docx`, and `.txt` files via `/api/upload`.
* The system SHALL detect file type and extract plain text:

  * PDF → `pdfplumber`/`PyPDF2`
  * DOCX → `python-docx`
  * TXT → passthrough
* On success, the system SHALL return: `submission_id`, bytes, char_count, detected_type, status=`parsed`.
* On error (unsupported type, parse failure), the system SHALL return a 4xx with a reason.

### FR-02 Rubric Listing & Retrieval

* The system SHALL provide `/api/rubrics` to list available rubrics (id, name, version).
* The system SHALL provide `/api/rubrics/{rubric_id}` to return the full rubric JSON.
* Rubrics SHALL conform to the **Rubric JSON format** (owned by Nidhey).

### FR-03 AI Scoring Request

* The system SHALL accept `/api/score` with `{ submission_id, rubric_id }`.
* The system SHALL build a prompt from:

  * Essay text (from parsing step),
  * Selected rubric JSON,
  * Feedback output schema (for structure),
  * Few-shot examples/instructions (for consistency).
* The system SHALL support a **mock mode** for development (no external API call).

### FR-04 Structured Output (Feedback Schema)

* The system SHALL return a single JSON object matching the **Feedback schema** including:

  * Per-criterion scores (`id`, `score`, `feedback`);
  * `overall_score`;
  * `comments` (actionable, concise);
  * `weak_paragraph_rewrites` (array of `{ original, rewrite, rationale }`);
  * `citation_flags` (array of `{ sentence, reason }`).

### FR-05 Schema Validation & Auto-Repair

* The system SHALL validate LLM output against the Feedback schema.
* On validation failure, the system SHALL perform up to **2 retries** with a fix-up prompt.
* If still invalid, the system SHALL return `409` with `error="Schema validation failed"` and `attempts`.

### FR-06 Results Retrieval & Display

* The system SHALL persist the AI review result for the `submission_id`.
* The system SHALL expose `/api/results/{submission_id}` to retrieve stored results.
* The frontend SHALL render:

  * Criterion scores with labels (when provided by rubric),
  * Short feedback per criterion,
  * Weak paragraph rewrites (inline view),
  * Citation flags (sentence + reason).

### FR-07 Export

* The system SHALL provide `/api/exports/{submission_id}.json` to download the raw structured feedback.
* (Optional) The frontend MAY offer PDF or copy-to-clipboard export.

### FR-08 Usage Guidelines (Surface in UI)

* The system SHALL include a link from the results page to a **Usage & Fairness Guidelines** document covering:

  * Proper scope and limitations,
  * Bias awareness and rubric alignment,
  * Do/Don’t examples for students and instructors.

### FR-09 Human vs AI Comparison (Optional – Harness)

* A separate evaluation harness (CLI/script) SHALL:

  * Read `human_scores.json` and AI outputs,
  * Compute basic metrics (e.g., Pearson correlation per criterion and overall),
  * Emit `merged_scores.csv`, `metrics.json`, and an `issues.log` for schema drift or parsing failures.

### FR-10 Configuration & Environments

* The backend SHALL load environment variables from `.env` (API keys, DB URL, environment mode).
* The system SHALL allow toggling **mock/live** scoring modes via request options or env flag.


## 3) User Stories with Acceptance Criteria

**US-1 Upload Essay**

* *Given* a student selects a supported file
* *When* they submit via UploadForm
* *Then* the API returns `{ submission_id, status: "parsed", detected_type, char_count }`.
* *And* errors on unsupported file types or parse failures are shown with clear messages.

**US-2 Select Rubric**

* *Given* a student opens RubricSelector
* *When* they fetch `/api/rubrics`
* *Then* a list with `rubric_id`, `name`, `version` is displayed
* *And* choosing a rubric sets it for the current submission.

**US-3 Score with AI**

* *Given* a parsed submission and selected rubric
* *When* the student clicks “Score”
* *Then* the system validates LLM output against the Feedback schema
* *And* returns structured JSON; on drift, auto-retries up to 2 times; on persistent failure, returns `409`.

**US-4 View Results**

* *Given* a successful scoring
* *When* the student opens the Results view
* *Then* they see per-criterion scores, comments, rewrites, and citation flags in a readable layout.

**US-5 Export Results**

* *Given* a successful scoring
* *When* the student clicks “Download JSON”
* *Then* the browser downloads the feedback JSON for the submission.

**US-6 Read Guidelines**

* *Given* a Results page
* *When* the student clicks “Usage & Fairness Guidelines”
* *Then* the guidelines open and explain scope, bias awareness, and proper use.

**US-7 Compare AI vs Human (Optional)**

* *Given* `human_scores.json` and AI results are present
* *When* the harness is run
* *Then* it produces `merged_scores.csv`, `metrics.json` with correlations, and `issues.log`.


## 4) Data & Validation Requirements

* **Rubric JSON** (owned by Nidhey): must include `rubric_id`, `name`, `version`, and an array of `criteria` with `id`, `name`, `description`, `weight`, and `scale{min,max}` (labels optional).
* **Feedback JSON** (AI output): must include `rubric_id`, `criteria[]` (with `id`, `score`, `feedback`), `overall_score`, `comments[]`, `weak_paragraph_rewrites[]`, `citation_flags[]`.
* **Submission limits**: reasonable file size cap (e.g., configurable via env); reject unsupported types.
* **Validation**: strict schema checks server-side before persisting results; log validation errors.


## 5) System Flows (High-Level)

1. **Upload → Parse**

   * Frontend posts file → Backend detects type → Extracts text → Returns `submission_id` + metadata.

2. **Score**

   * Frontend posts `{ submission_id, rubric_id }` → Backend builds prompt (rubric + essay + schema + few-shots) → LLM/Mock → Validate → Retry on drift → Persist → Return feedback JSON.

3. **Results & Export**

   * Frontend fetches results by `submission_id` → Renders sections (scores, rewrites, flags) → Allows JSON export.


## 6) Non-Functional (for completeness, kept minimal)

* **Privacy**: no PII, anonymized data for testing; allow deletion of raw essay text if stored.
* **Reliability**: retries on transient LLM failures and structured JSON drift.
* **Performance**: responsive UI; typical end-to-end score target < ~10s for modest essays (best-effort).
* **Security**: CORS to frontend origin; file type/size checks; environment keys not exposed to client.
* **Cost control**: mock mode available; prompts optimized for token efficiency.


## 7) Alignment with Team Deliverables

* **Frontend (Pritham):** UploadForm, RubricSelector, ResultView, dark mode, responsive layout implementing FR-01/02/06/07.
* **Backend (Meet):** `/api/health`, `/api/upload`, `/api/rubrics*`, `/api/score`, `/api/results/{id}`, `/api/exports/{id}.json`, parsing and schema validation (FR-01/02/03/04/05/06/07).
* **AI/Scoring (Nidhey):** Rubric JSON spec + example, prompt templates + few-shots, feedback schema, JSON-drift auto-repair guidance, harness spec & metrics, usage guidelines (FR-02/03/04/05/07/09).


