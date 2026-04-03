
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.costing import CostEntry
from app.services.msp_engine import calculate_msp

router = APIRouter(prefix="/costing")

@router.post("/calculate")
def calculate(data: dict):
    return calculate_msp(
        raw_material_cost=data["raw_material_cost"],
        labor_hours=data["labor_hours"],
        labor_rate_per_hour=data["labor_rate_per_hour"],
        overhead_cost=data["overhead_cost"],
        wastage_percent=data.get("wastage_percent", 0),
        margin_percent=data.get("margin_percent", 20),
    )

@router.post("/save")
def save(data: dict, db: Session = Depends(get_db)):

    result = calculate_msp(
        raw_material_cost=data["raw_material_cost"],
        labor_hours=data["labor_hours"],
        labor_rate_per_hour=data["labor_rate_per_hour"],
        overhead_cost=data["overhead_cost"],
        wastage_percent=data.get("wastage_percent", 0),
        margin_percent=data.get("margin_percent", 20),
    )

    entry = CostEntry(
        product_id=data["product_id"],
        total_cost=result["total_cost"],
        msp=result["msp"],
        profit=result["profit"],
        labor_hours=data["labor_hours"]
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    return {
        "message": "Cost saved successfully",
        "data": result
    }

@router.get("/history/{product_id}")
def history(product_id: int, db: Session = Depends(get_db)):
    return db.query(CostEntry).filter(CostEntry.product_id == product_id).all()
