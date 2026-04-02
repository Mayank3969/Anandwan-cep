
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from app.models.costing import CostEntry
from app.models.sale import Sale

def get_monthly_cost(db: Session, year: int, month: int):
    return db.query(func.sum(CostEntry.total_cost)).filter(
        extract("year", CostEntry.created_at)==year,
        extract("month", CostEntry.created_at)==month
    ).scalar() or 0

def get_monthly_profit(db: Session, year: int, month: int):
    return db.query(func.sum(CostEntry.profit)).filter(
        extract("year", CostEntry.created_at)==year,
        extract("month", CostEntry.created_at)==month
    ).scalar() or 0

def get_labor_hours(db: Session, year: int, month: int):
    return db.query(func.sum(CostEntry.labor_hours)).filter(
        extract("year", CostEntry.created_at)==year,
        extract("month", CostEntry.created_at)==month
    ).scalar() or 0

def get_total_revenue(db: Session, year: int, month: int):
    return db.query(func.sum(Sale.sale_price * Sale.quantity)).filter(
        extract("year", Sale.sold_at)==year,
        extract("month", Sale.sold_at)==month
    ).scalar() or 0
