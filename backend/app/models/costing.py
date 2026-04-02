
from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class CostEntry(Base):
    __tablename__ = "cost_entries"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    total_cost = Column(Float)
    msp = Column(Float)
    profit = Column(Float)
    labor_hours = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    product = relationship("Product", back_populates="cost_entries")
