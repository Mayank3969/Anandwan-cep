from fastapi import FastAPI
from routes import costing, dashboard

app = FastAPI(title="Anandwan Backend")

app.include_router(costing.router)
app.include_router(dashboard.router)