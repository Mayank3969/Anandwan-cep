"""
dashboard.py  ─  SHARED file (Person A + Person B).

Person B builds:  total_revenue, total_sales, top_products, revenue_trend
Person A adds:    total_cost, total_profit, labor_hours_supported

HOW TO MERGE (for Person A):
1. Import your metrics service at the top.
2. Call it inside get_summary() and add results to the response dict.
3. Do NOT rename or remove the existing keys — frontend depends on them.

See comments marked ── PERSON A: ADD HERE ──
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.services.analytics import (
    get_monthly_revenue,
    get_monthly_sales_count,
    get_total_revenue_all_time,
    get_top_products_by_revenue,
    get_monthly_revenue_trend,
)

# ── PERSON A: import your metrics service here ──
# from app.services.metrics import get_monthly_cost, get_monthly_profit, get_labor_hours

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary")
def get_summary(
    year: int = Query(default=None, description="Year for monthly stats (defaults to current)"),
    month: int = Query(default=None, description="Month for monthly stats (defaults to current)"),
    db: Session = Depends(get_db),
):
    """
    Combined dashboard summary.
    Person B supplies: revenue + sales stats.
    Person A supplies: cost + profit + labor metrics.
    """
    now = datetime.utcnow()
    year = year or now.year
    month = month or now.month

    # ── PERSON B: Revenue & Sales (do not edit) ──
    monthly_revenue = get_monthly_revenue(db, year, month)
    monthly_sales_count = get_monthly_sales_count(db, year, month)
    top_products = get_top_products_by_revenue(db, limit=5)
    revenue_trend = get_monthly_revenue_trend(db, months=6)

    # ── PERSON A: ADD HERE ──
    # Replace these placeholder zeros with real calls once Person A's services are ready.
    # Example:
    #   monthly_cost = get_monthly_cost(db, year, month)
    #   monthly_profit = get_monthly_profit(db, year, month)
    #   labor_hours = get_labor_hours(db, year, month)
    monthly_cost = 0.0        # ← Person A fills this
    monthly_profit = 0.0      # ← Person A fills this
    labor_hours_supported = 0.0  # ← Person A fills this

    return {
        "period": {"year": year, "month": month},

        # ── Revenue (Person B) ──
        "total_revenue": monthly_revenue,
        "total_sales": monthly_sales_count,

        # ── Cost & Profit (Person A) ──
        "total_cost": monthly_cost,
        "total_profit": monthly_profit,
        "labor_hours_supported": labor_hours_supported,

        # ── Charts ──
        "top_products": top_products,
        "revenue_trend": revenue_trend,
    }


@router.get("/impact")
def get_impact(db: Session = Depends(get_db)):
    """
    Impact metrics — total labor hours supported (Person A fills labor data).
    Person B supplies total revenue and product counts.
    """
    return {
        "total_revenue_all_time": get_total_revenue_all_time(db),
        "total_products_sold_for": db.query(__import__('app.models.product', fromlist=['Product']).Product).count(),
        # ── PERSON A: ADD HERE ──
        "total_labor_hours": 0.0,     # ← Person A fills
        "total_products_costed": 0,   # ← Person A fills
    }
