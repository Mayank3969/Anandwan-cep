from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.batch import Batch
from app.models.product import Product

router = APIRouter(prefix="/batches")


@router.get("")
def list_batches(db: Session = Depends(get_db)):
    return db.query(Batch).all()


@router.post("")
def create_batch(data: dict, db: Session = Depends(get_db)):
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if product_id is None:
        raise HTTPException(status_code=400, detail="product_id is required")
    if quantity is None:
        raise HTTPException(status_code=400, detail="quantity is required")

    quantity = int(quantity)
    if quantity <= 0:
        raise HTTPException(status_code=400, detail="quantity must be greater than 0")

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    batch = Batch(product_id=product_id, quantity=quantity)
    db.add(batch)
    db.commit()
    db.refresh(batch)
    return batch
