
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.services.metrics import get_monthly_cost, get_monthly_profit, get_labor_hours, get_total_revenue
from app.models.batch import Batch
from app.models.product import Product

router = APIRouter(prefix="/dashboard")

@router.get("/summary")
def summary(db: Session = Depends(get_db)):
    now = datetime.utcnow()
    year, month = now.year, now.month

    revenue = get_total_revenue(db, year, month)
    cost = get_monthly_cost(db, year, month)
    profit = get_monthly_profit(db, year, month)
    labor = get_labor_hours(db, year, month)

    return {
        "period": {"year": year, "month": month},
        "total_revenue": revenue,
        "total_sales": 0,
        "total_cost": cost,
        "total_profit": profit,
        "labor_hours_supported": labor,
        "top_products": [],
        "revenue_trend": []
    }


@router.get("/recent-transactions")
def recent_transactions(limit: int = 5, db: Session = Depends(get_db)):
    safe_limit = min(max(limit, 1), 50)

    rows = (
        db.query(Batch, Product.name)
        .join(Product, Batch.product_id == Product.id)
        .order_by(Batch.created_at.desc())
        .limit(safe_limit)
        .all()
    )

    return [
        {
            "id": batch.id,
            "transaction_type": "BATCH_ADDED",
            "batch_code": f"#MSS-{batch.id}",
            "material": product_name,
            "impact": "STOCK IN",
            "value": batch.quantity,
            "created_at": batch.created_at,
        }
        for batch, product_name in rows
    ]
