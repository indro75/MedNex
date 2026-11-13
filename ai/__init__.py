"""MedNex AI services package (Member 4: AI Engineer).

Contains the offline ML/NLP engine used by the backend:

- symptom_classifier: TF-IDF + Multinomial Naive Bayes symptom triage,
  including red-flag emergency detection.
- report_parser: lab report biomarker extraction and plain-language analysis.
- medicine_matcher: fuzzy medicine-name matching for the interaction checker.

These modules are exposed over HTTP only through the backend REST API
(see backend/app/routers/). They are imported by the backend at runtime;
add the repository root to sys.path (backend/run.py and backend/app/main.py
do this) before importing this package.
"""
