"""
sales.py  ─  Person B owns this file.
Record sales and list sales with revenue calculations.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime

from app.database import get_db
from app.models.sale import Sale
from app.models.product import Product
from app.schemas.sale import SaleCreate, SaleResponse, SaleListResponse

router = APIRouter(prefix="/sales", tags=["Sales"])


# ─────────────────────────────────────────
# POST /sales  — record a new sale
# ─────────────────────────────────────────
@router.post("", response_model=SaleResponse, status_code=201)
def record_sale(payload: SaleCreate, db: Session = Depends(get_db)):
    # Verify product exists
    product = db.query(Product).filter(Product.id == payload.product_id).first()
    if not product:
        raise HTTPException(
            status_code=404,
            detail=f"Product {payload.product_id} not found. Create the product first.",
        )

    sale_data = payload.model_dump()
    if sale_data.get("sold_at") is None:
        sale_data["sold_at"] = datetime.utcnow()

    sale = Sale(**sale_data)
    db.add(sale)
    db.commit()
    db.refresh(sale)
    return SaleResponse.from_orm_with_revenue(sale)


# ─────────────────────────────────────────
# GET /sales  — list all sales (filterable by product_id, date range)
# ─────────────────────────────────────────
@router.get("", response_model=SaleListResponse)
def list_sales(
    product_id: Optional[int] = Query(None, description="Filter by product"),
    from_date: Optional[datetime] = Query(None, description="Start date (ISO 8601)"),
    to_date: Optional[datetime] = Query(None, description="End date (ISO 8601)"),
    db: Session = Depends(get_db),
):
    query = db.query(Sale)

    if product_id is not None:
        query = query.filter(Sale.product_id == product_id)
    if from_date:
        query = query.filter(Sale.sold_at >= from_date)
    if to_date:
        query = query.filter(Sale.sold_at <= to_date)

    sales = query.order_by(Sale.sold_at.desc()).all()

    sale_responses = [SaleResponse.from_orm_with_revenue(s) for s in sales]
    total_revenue = round(sum(s.revenue for s in sale_responses), 2)

    return SaleListResponse(
        total=len(sales),
        total_revenue=total_revenue,
        sales=sale_responses,
    )
