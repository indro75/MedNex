"""
Medical Report Analyzer & Biomarker Extraction Router
"""
from fastapi import APIRouter
from ..schemas import ReportAnalysisRequest, ReportAnalysisResponse
from ..ml.report_parser import ReportParserML

router = APIRouter(prefix="/api/reports", tags=["Report Analyzer"])

@router.post("/analyze", response_model=ReportAnalysisResponse)
def analyze_report(req: ReportAnalysisRequest):
    result = ReportParserML.analyze(
        report_text=req.report_text,
        patient_age=req.patient_age or 35,
        patient_gender=req.patient_gender or "Male"
    )
    return result

