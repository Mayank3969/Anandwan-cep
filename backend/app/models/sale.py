
from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    sale_price = Column(Float)
    quantity = Column(Integer)
    sold_at = Column(DateTime, default=datetime.utcnow)

    product = relationship("Product", back_populates="sales")
