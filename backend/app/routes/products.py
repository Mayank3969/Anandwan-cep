"""
products.py  ─  Person B owns this file.
CRUD operations for the products table.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.product import Product
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
    ProductListResponse,
)

router = APIRouter(prefix="/products", tags=["Products"])


# ─────────────────────────────────────────
# GET /products  — list all, with optional search + category filter
# ─────────────────────────────────────────
@router.get("", response_model=ProductListResponse)
def list_products(
    search: Optional[str] = Query(None, description="Search by product name"),
    category: Optional[str] = Query(None, description="Filter by category"),
    db: Session = Depends(get_db),
):
    query = db.query(Product)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    if category:
        query = query.filter(Product.category.ilike(f"%{category}%"))

    products = query.order_by(Product.created_at.desc()).all()
    return ProductListResponse(total=len(products), products=products)


# ─────────────────────────────────────────
# POST /products  — create a new product
# ─────────────────────────────────────────
@router.post("", response_model=ProductResponse, status_code=201)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    # prevent exact-name duplicates in same category
    existing = (
        db.query(Product)
        .filter(Product.name == payload.name, Product.category == payload.category)
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=409,
            detail=f"Product '{payload.name}' in category '{payload.category}' already exists.",
        )

    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


# ─────────────────────────────────────────
# GET /products/{id}  — fetch single product
# ─────────────────────────────────────────
@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found.")
    return product


# ─────────────────────────────────────────
# PUT /products/{id}  — partial update
# ─────────────────────────────────────────
@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found.")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product


# ─────────────────────────────────────────
# DELETE /products/{id}  — remove product (cascades to cost_entries & sales)
# ─────────────────────────────────────────
@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found.")

    db.delete(product)
    db.commit()
    return None
