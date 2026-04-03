
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.sale import Sale

router = APIRouter(prefix="/sales")

@router.post("")
def create_sale(data: dict, db: Session = Depends(get_db)):
    s = Sale(**data)
    db.add(s)
    db.commit()
    return s

@router.get("")
def list_sales(db: Session = Depends(get_db)):
    return db.query(Sale).all()
