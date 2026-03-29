from datetime import datetime

def get_monthly_cost(cost_history: list, year: int, month: int) -> float:
    """Sum of total_costs for entries saved in the given month."""
    total = 0.0
    for item in cost_history:
        saved_at = item.get("saved_at")
        if saved_at:
            try:
                dt = datetime.fromisoformat(saved_at)
                if dt.year == year and dt.month == month:
                    total += item.get("total_cost", 0)
            except Exception:
                pass
    return round(total, 2)

def get_monthly_profit(cost_history: list, year: int, month: int) -> float:
    """Sum of profit for entries saved in the given month."""
    total = 0.0
    for item in cost_history:
        saved_at = item.get("saved_at")
        if saved_at:
            try:
                dt = datetime.fromisoformat(saved_at)
                if dt.year == year and dt.month == month:
                    total += item.get("profit", 0)
            except Exception:
                pass
    return round(total, 2)

def get_labor_hours(cost_history: list, year: int, month: int) -> float:
    """Sum of labor_hours for entries saved in the given month."""
    total = 0.0
    for item in cost_history:
        saved_at = item.get("saved_at")
        if saved_at:
            try:
                dt = datetime.fromisoformat(saved_at)
                if dt.year == year and dt.month == month:
                    total += item.get("labor_hours", 0)
            except Exception:
                pass
    return round(total, 2)