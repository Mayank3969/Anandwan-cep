from fastapi import APIRouter
from services.msp_engine import calculate_msp

router = APIRouter()

cost_history = []

@router.post("/costing/calculate")
def calculate(data: dict):
    result = calculate_msp(
        data["raw_material_cost"],
        data["labor_hours"],
        data["labor_rate_per_hour"],
        data["overhead_cost"],
        data["wastage_percent"],
        data["margin_percent"]
    )

    planned_price = data.get("planned_price")

    if planned_price is not None:
        result["planned_price"] = planned_price
        result["is_loss"] = planned_price < result["msp"]

    return result


@router.post("/costing/save")
def save_costing(data: dict):
    cost_history.append(data)
    return {
        "message": "Costing saved successfully",
        "data": data
    }


@router.get("/costing/history/{product_id}")
def get_history(product_id: str):
    history = [
        item for item in cost_history
        if item.get("product_id") == product_id
    ]
    return {
        "product_id": product_id,
        "history": history
    }