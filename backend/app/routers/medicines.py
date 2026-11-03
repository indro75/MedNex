"""
Medicine Information & Drug Interaction Checker Router
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Medicine, DrugInteraction
from ..schemas import MedicineOut, InteractionCheckRequest, DrugInteractionResult, MedicineOCRRequest, MedicineOCRResponse
from ..ml.medicine_matcher import MedicineMatcherML

router = APIRouter(prefix="/api/medicines", tags=["Medicines"])

@router.get("", response_model=List[MedicineOut])
def list_medicines(
    search: Optional[str] = Query(None),
    therapeutic_class: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Medicine)
    if search:
        s = f"%{search}%"
        query = query.filter((Medicine.brand_name.ilike(s)) | (Medicine.generic_name.ilike(s)))
    if therapeutic_class:
        query = query.filter(Medicine.therapeutic_class.ilike(f"%{therapeutic_class}%"))
    return query.all()

@router.get("/{med_id}", response_model=MedicineOut)
def get_medicine(med_id: str, db: Session = Depends(get_db)):
    med = db.query(Medicine).filter(Medicine.id == med_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medicine not found.")
    return med

@router.post("/interactions", response_model=List[DrugInteractionResult])
def check_interactions(req: InteractionCheckRequest, db: Session = Depends(get_db)):
    drugs = req.drugs
    results = []
    if len(drugs) < 2:
        return results

    all_interactions = db.query(DrugInteraction).all()
    for i in range(len(drugs)):
        for j in range(i + 1, len(drugs)):
            d1 = drugs[i].strip().lower()
            d2 = drugs[j].strip().lower()
            for inter in all_interactions:
                i1 = inter.drug1.lower()
                i2 = inter.drug2.lower()
                if (i1 in d1 or d1 in i1) and (i2 in d2 or d2 in i2) or ((i1 in d2 or d2 in i1) and (i2 in d1 or d1 in i2)):
                    results.append(DrugInteractionResult(
                        drug1=drugs[i],
                        drug2=drugs[j],
                        severity=inter.severity,
                        effect=inter.effect,
                        recommendation=inter.recommendation
                    ))
    return results

@router.post("/ocr-identify", response_model=MedicineOCRResponse)
def identify_medicine_ocr(req: MedicineOCRRequest, db: Session = Depends(get_db)):
    extracted_text = req.text or ""
    all_meds = db.query(Medicine).all()
    matched_med, score, status_msg = MedicineMatcherML.match_medicine(extracted_text, all_meds)

    matched_out = MedicineOut.model_validate(matched_med) if matched_med else None

    return MedicineOCRResponse(
        extracted_text=extracted_text,
        matched_medicine=matched_out,
        confidence_score=score,
        match_status=status_msg
    )

