def calculate_msp(
    raw_material_cost,
    labor_hours,
    labor_rate_per_hour,
    overhead_cost,
    wastage_percent,
    margin_percent
):
    labor_cost = labor_hours * labor_rate_per_hour
    material = raw_material_cost * (1 + wastage_percent / 100)

    total_cost = material + labor_cost + overhead_cost
    msp = total_cost / (1 - margin_percent / 100)

    profit = msp - total_cost

    return {
        "total_cost": round(total_cost, 2),
        "msp": round(msp, 2),
        "profit": round(profit, 2),
        "breakdown": {
            "material": round(material, 2),
            "labor": round(labor_cost, 2),
            "overhead": round(overhead_cost, 2)
        }
    }