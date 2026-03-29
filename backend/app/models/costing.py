from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class CostEntry(Base):
    __tablename__ = "cost_entries"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    raw_material_cost = Column(Float, nullable=False)
    labor_hours = Column(Float, nullable=False)
    labor_rate_per_hour = Column(Float, nullable=False)
    overhead_cost = Column(Float, nullable=False)
    wastage_percent = Column(Float, nullable=False, default=0.0)
    margin_percent = Column(Float, nullable=False, default=20.0)
    calculated_msp = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    product = relationship("Product", back_populates="cost_entries")
