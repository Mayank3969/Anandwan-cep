
from fastapi import FastAPI
from app.database import Base, engine
from app.routes import products, sales, costing, dashboard

app = FastAPI(title="Anandwan Production Backend")

Base.metadata.create_all(bind=engine)

app.include_router(products.router)
app.include_router(sales.router)
app.include_router(costing.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {"status": "ok"}
