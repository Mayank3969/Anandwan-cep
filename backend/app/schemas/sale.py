from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class SaleCreate(BaseModel):
    product_id: int = Field(..., gt=0)
    sale_price: float = Field(..., gt=0, example=450.0)
    quantity: int = Field(default=1, ge=1, example=2)
    sold_at: Optional[datetime] = None   # defaults to now() if not provided


class SaleResponse(BaseModel):
    id: int
    product_id: int
    sale_price: float
    quantity: float          # kept as float for frontend convenience
    sold_at: datetime
    revenue: float           # sale_price × quantity — computed field

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_with_revenue(cls, sale):
        return cls(
            id=sale.id,
            product_id=sale.product_id,
            sale_price=sale.sale_price,
            quantity=sale.quantity,
            sold_at=sale.sold_at,
            revenue=round(sale.sale_price * sale.quantity, 2),
        )


class SaleListResponse(BaseModel):
    total: int
    total_revenue: float
    sales: list[SaleResponse]
