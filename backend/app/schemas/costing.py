from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


# ── Person A owns all logic in costing.py route ──
# These schemas are defined here so models stay in one place.

class CostingInput(BaseModel):
    product_id: int
    raw_material_cost: float = Field(..., ge=0)
    labor_hours: float = Field(..., ge=0)
    labor_rate_per_hour: float = Field(..., ge=0)
    overhead_cost: float = Field(..., ge=0)
    wastage_percent: float = Field(default=0.0, ge=0, le=100)
    margin_percent: float = Field(default=20.0, ge=0, lt=100)


class CostBreakdown(BaseModel):
    material: float
    labor: float
    overhead: float


class CostingResult(BaseModel):
    total_cost: float
    msp: float
    profit_amount: float
    cost_breakdown: CostBreakdown


class CostEntryResponse(BaseModel):
    id: int
    product_id: int
    calculated_msp: float
    margin_percent: float
    created_at: datetime

    model_config = {"from_attributes": True}
