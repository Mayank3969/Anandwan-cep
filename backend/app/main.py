
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import auth, products, sales, costing, dashboard, batches
from app.security import get_current_user

app = FastAPI(title="Anandwan Production Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(products.router, dependencies=[Depends(get_current_user)])
app.include_router(sales.router, dependencies=[Depends(get_current_user)])
app.include_router(costing.router, dependencies=[Depends(get_current_user)])
app.include_router(dashboard.router, dependencies=[Depends(get_current_user)])
app.include_router(batches.router, dependencies=[Depends(get_current_user)])

@app.get("/")
def root():
    return {"status": "ok"}
