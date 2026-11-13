# MedNex AI Services — Member 4 (AI Engineer)

The AI/ML engine behind MedNex's symptom triage, report analysis, and medicine matching. Part of the team work distribution in [../TEAM_WORK_DISTRIBUTION.md](../TEAM_WORK_DISTRIBUTION.md) — feature branch: `feature/ai`.

## Member 4 responsibilities (from the team distribution)

- Research and integrate the selected AI API, such as Google Gemini, through the backend.
  *Note: this implementation currently uses an offline scikit-learn ML/NLP engine instead of a hosted LLM. If a hosted AI provider is adopted, integrate it only through the backend — AI credentials must never reach the frontend.*
- Develop structured symptom analysis that suggests a suitable medical specialty and explains why.
- Design safe follow-up questions and cautious urgency guidance, including escalation for red-flag symptoms.
- Build report text extraction/OCR workflow with AI-generated plain-language summaries.
- Design prompts and structured JSON outputs for reliable backend validation.
- Ground first-aid responses in approved, medically reviewed content rather than allowing unsupported AI-generated instructions.
- Create safety rules, test cases, and evaluation examples for symptom and report workflows.
- Document AI limitations, failure handling, and expected response formats.

## Contents

| Module | Purpose |
|---|---|
| `symptom_classifier.py` | TF-IDF + Multinomial Naive Bayes pipeline. Red-flag emergency detection (`check_red_flags`), specialty prediction (`predict`), pre-trained at import (`classifier` singleton). Used by `POST /api/symptoms/analyze`. |
| `report_parser.py` | Lab-report biomarker extraction (`ReportParserML.extract_biomarkers`) and plain-language analysis with reference ranges (`ReportParserML.analyze`). Used by `POST /api/reports/analyze`. |
| `medicine_matcher.py` | difflib-based fuzzy matching of brand/generic medicine names (`MedicineMatcherML.match_medicine`). Used by the `/api/medicines` endpoints. |

## Contracts

- Functions return plain dicts and lists — the FastAPI routers in `../backend/app/routers/` validate them against the Pydantic schemas in `../backend/app/schemas.py` before sending them to clients. Do not add HTTP or auth logic here.
- `predict()` returns specialty, confidence, and red-flag information; clients must show red-flag cases with emergency (999) guidance, never as routine advice.
- The engine is **not a diagnostic device**. Output must always be presented as triage/navigation assistance with a medical disclaimer (the frontend enforces this via `MedicalDisclaimer`).

## Safety rules (non-negotiable)

1. Never present AI output as a confirmed diagnosis or prescribe medication or dosages.
2. Red-flag symptoms (e.g., chest pain with breathlessness, stroke signs, severe bleeding) must produce explicit emergency guidance (999), regardless of model confidence.
3. If parsing fails or confidence is low, return a safe fallback message recommending professional consultation — never guess.
4. First-aid content must stay grounded in approved, medically reviewed data (see [../frontend/src/data/firstAidData.ts](../frontend/src/data/firstAidData.ts)); do not let the model invent procedures.
5. Do not log symptom descriptions or report contents; they are sensitive medical data.

## Evaluation & testing

- Add evaluation examples (input → expected specialty / red-flag outcome) and test cases for the symptom and report workflows.
- Sanity checks: `from ai.symptom_classifier import classifier; classifier.predict("severe chest pain with shortness of breath")` should surface a red flag with emergency guidance; a mild case (e.g., "mild headache for two days") should not.
- Document AI limitations, failure modes, and expected response formats alongside any prompt/provider changes, and keep `../DOCUMENTATION.md` in sync (see "AI Accuracy & Limitations" sections).

## Integration

Imported by the backend at runtime (repository root is added to `sys.path` in `backend/run.py` and `backend/app/main.py`). No separate service or port is required. Coordinate contract changes with Member 2 (Backend) and model/table changes with Member 3 (Database).
