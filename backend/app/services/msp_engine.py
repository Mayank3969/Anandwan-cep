"""
msp_engine.py  ─  Person A owns this file.
This is a placeholder so the app boots without errors.
Person A: replace the body of calculate_msp with your real formula.
"""


def calculate_msp(
    raw_material_cost: float,
    labor_hours: float,
    labor_rate_per_hour: float,
    overhead_cost: float,
    wastage_percent: float,
    margin_percent: float,
) -> dict:
    # ── PERSON A: implement formula here ──
    labor_cost = labor_hours * labor_rate_per_hour
    material_with_wastage = raw_material_cost * (1 + wastage_percent / 100)
    total_cost = material_with_wastage + labor_cost + overhead_cost
    msp = total_cost / (1 - margin_percent / 100)
    return {
        "total_cost": round(total_cost, 2),
        "msp": round(msp, 2),
        "profit_amount": round(msp - total_cost, 2),
        "cost_breakdown": {
            "material": round(material_with_wastage, 2),
            "labor": round(labor_cost, 2),
            "overhead": round(overhead_cost, 2),
        },
    }
