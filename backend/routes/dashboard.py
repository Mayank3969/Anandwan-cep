from fastapi import APIRouter
from datetime import datetime
import routes.costing as costing_module
import routes.sales as sales_module
from services import metrics

router = APIRouter()

@router.get("/dashboard/summary")
def get_summary(year: int = None, month: int = None):
    now = datetime.now()
    year = year or now.year
    month = month or now.month

    # Person B's part (placeholder)
    total_revenue = 0.0
    total_sales = 0
    for s in sales_module.sales_db:
        total_revenue += s.get("amount", 0)
        total_sales += 1

    # Your part (Person A)
    monthly_cost = metrics.get_monthly_cost(costing_module.cost_history, year, month)
    labor_hours = metrics.get_labor_hours(costing_module.cost_history, year, month)
    total_profit = total_revenue - monthly_cost

    return {
        "period": {"year": year, "month": month},
        "total_revenue": total_revenue,
        "total_sales": total_sales,
        "total_cost": monthly_cost,
        "total_profit": total_profit,
        "labor_hours_supported": labor_hours,
        "top_products": [],
        "revenue_trend": []
    }

@router.get("/dashboard/impact")
def get_impact():
    total_labor = sum(item.get("labor_hours", 0) for item in costing_module.cost_history)
    return {
        "total_labor_hours": total_labor,
        "total_revenue_all_time": 0
    }