"""
Hospitals and 24/7 Emergency Facility Router
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Hospital
from ..schemas import HospitalOut

router = APIRouter(prefix="/api/hospitals", tags=["Hospitals"])

@router.get("", response_model=List[HospitalOut])
def list_hospitals(
    area: Optional[str] = Query(None),
    icu_only: Optional[bool] = Query(False),
    db: Session = Depends(get_db)
):
    query = db.query(Hospital)
    if area and area != "All Areas":
        query = query.filter(Hospital.area.ilike(f"%{area}%"))
    if icu_only:
        query = query.filter(Hospital.has_icu == True)
    return query.all()

