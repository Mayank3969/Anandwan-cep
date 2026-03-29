"""
analytics.py  ─  Person B owns this service.
Computes revenue, sales count, and product-level stats.
Called by dashboard.py to provide Person B's half of the summary.
"""
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import datetime, date
from typing import Optional

from app.models.sale import Sale
from app.models.product import Product


def get_monthly_revenue(db: Session, year: int, month: int) -> float:
    """Total revenue (sale_price × quantity) for a given month."""
    result = (
        db.query(func.sum(Sale.sale_price * Sale.quantity))
        .filter(
            extract("year", Sale.sold_at) == year,
            extract("month", Sale.sold_at) == month,
        )
        .scalar()
    )
    return round(result or 0.0, 2)


def get_monthly_sales_count(db: Session, year: int, month: int) -> int:
    """Number of sale transactions for a given month."""
    return (
        db.query(func.count(Sale.id))
        .filter(
            extract("year", Sale.sold_at) == year,
            extract("month", Sale.sold_at) == month,
        )
        .scalar()
        or 0
    )


def get_total_revenue_all_time(db: Session) -> float:
    result = db.query(func.sum(Sale.sale_price * Sale.quantity)).scalar()
    return round(result or 0.0, 2)


def get_total_sales_count(db: Session) -> int:
    return db.query(func.count(Sale.id)).scalar() or 0


def get_top_products_by_revenue(db: Session, limit: int = 5) -> list[dict]:
    """Returns the top N products ranked by total revenue generated."""
    rows = (
        db.query(
            Product.id,
            Product.name,
            Product.category,
            func.sum(Sale.sale_price * Sale.quantity).label("total_revenue"),
            func.count(Sale.id).label("sale_count"),
        )
        .join(Sale, Sale.product_id == Product.id)
        .group_by(Product.id)
        .order_by(func.sum(Sale.sale_price * Sale.quantity).desc())
        .limit(limit)
        .all()
    )
    return [
        {
            "product_id": r.id,
            "name": r.name,
            "category": r.category,
            "total_revenue": round(r.total_revenue, 2),
            "sale_count": r.sale_count,
        }
        for r in rows
    ]


def get_monthly_revenue_trend(db: Session, months: int = 6) -> list[dict]:
    """
    Revenue per month for the last N months.
    Returns a list ordered oldest → newest, ready for Recharts.
    """
    rows = (
        db.query(
            extract("year", Sale.sold_at).label("year"),
            extract("month", Sale.sold_at).label("month"),
            func.sum(Sale.sale_price * Sale.quantity).label("revenue"),
        )
        .group_by("year", "month")
        .order_by("year", "month")
        .all()
    )

    # Take last N months
    trend = [
        {
            "year": int(r.year),
            "month": int(r.month),
            "label": date(int(r.year), int(r.month), 1).strftime("%b %Y"),
            "revenue": round(r.revenue, 2),
        }
        for r in rows
    ]
    return trend[-months:]
