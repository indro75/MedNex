"""
Machine Learning Symptom Classifier & Triage Router
"""
import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Doctor, HealthActivity
from ..schemas import SymptomAnalysisRequest, SymptomAnalysisResponse
from ..ml.symptom_classifier import classifier

router = APIRouter(prefix="/api/symptoms", tags=["Symptom Checker"])

@router.post("/analyze", response_model=SymptomAnalysisResponse)
def analyze_symptoms(req: SymptomAnalysisRequest, db: Session = Depends(get_db)):
    result = classifier.predict(
        text=req.description,
        selected_symptoms=req.selected_symptoms,
        severity=req.severity or "Mild"
    )
    return result

