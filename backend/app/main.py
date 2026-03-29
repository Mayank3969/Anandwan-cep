"""
main.py  ─  FastAPI application entry point.
Registers all routers, configures CORS, and creates DB tables on startup.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.models import Product, CostEntry, Sale  # ensure all models are imported before create_all
from app.routes import products, sales, costing, dashboard

app = FastAPI(
    title="Anandwan Costing & Sustainability Engine",
    description="Backend API for pricing, inventory, and sustainability tracking at Anandwan.",
    version="1.0.0",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # fallback CRA dev server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── DB: create tables if they don't exist (dev convenience) ──────────────────
Base.metadata.create_all(bind=engine)

# ── Register routers ─────────────────────────────────────────────────────────
app.include_router(products.router)
app.include_router(sales.router)
app.include_router(costing.router)
app.include_router(dashboard.router)


@app.get("/", tags=["Health"])
def root():
    return {
        "status": "ok",
        "message": "Anandwan API is running. Visit /docs for the interactive API explorer.",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}
