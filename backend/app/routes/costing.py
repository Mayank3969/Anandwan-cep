"""
costing.py  ─  Person A owns this file entirely.
Placeholder router so main.py registers the prefix without errors.
Person A: implement POST /costing/calculate, POST /costing/save, GET /costing/history/{product_id}
"""
from fastapi import APIRouter

router = APIRouter(prefix="/costing", tags=["Costing"])

# ── PERSON A: add your route handlers below ──
