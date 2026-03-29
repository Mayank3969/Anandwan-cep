# AGENTS.md — Anandwan Backend Collaboration Guide

## Who Built What

| File | Owner | Status |
|---|---|---|
| `app/models/product.py` | Person B | ✅ Done |
| `app/models/sale.py` | Person B | ✅ Done |
| `app/models/costing.py` | Person B (scaffold) | ✅ Done — Person A owns logic |
| `app/schemas/product.py` | Person B | ✅ Done |
| `app/schemas/sale.py` | Person B | ✅ Done |
| `app/schemas/costing.py` | Person B (scaffold) | ✅ Done — Person A owns logic |
| `app/routes/products.py` | Person B | ✅ Done |
| `app/routes/sales.py` | Person B | ✅ Done |
| `app/routes/costing.py` | Person A | 🟡 Placeholder — needs implementation |
| `app/routes/dashboard.py` | **SHARED** | 🟡 Person B half done — Person A to add cost/profit |
| `app/services/analytics.py` | Person B | ✅ Done |
| `app/services/msp_engine.py` | Person A | 🟡 Placeholder with formula from spec |
| `app/services/metrics.py` | Person A | ❌ Needs creation |
| `app/main.py` | Person B | ✅ Done |
| `app/database.py` | Person B | ✅ Done |

---

## For Person A — What You Need to Do

### 1. Implement `app/routes/costing.py`
Add these three endpoints:

```python
POST /costing/calculate   # pure formula, no DB — use msp_engine.calculate_msp()
POST /costing/save        # calculate + save CostEntry to DB
GET  /costing/history/{product_id}  # return list of CostEntryResponse
```

The `CostEntry` model and `CostingInput` / `CostingResult` schemas are already defined.
Import them from `app.models.costing` and `app.schemas.costing`.

### 2. Create `app/services/metrics.py`
Dashboard needs these two functions:

```python
def get_monthly_cost(db: Session, year: int, month: int) -> float:
    """Sum of all calculated_msp * (some quantity) for the month — or sum of total_costs."""

def get_labor_hours(db: Session, year: int, month: int) -> float:
    """Sum of labor_hours from cost_entries for the month."""
```

### 3. Update `app/routes/dashboard.py`
Find the two comments `── PERSON A: ADD HERE ──` and replace the placeholder zeros:

```python
# At the top of the file, uncomment:
from app.services.metrics import get_monthly_cost, get_monthly_profit, get_labor_hours

# Inside get_summary(), replace:
monthly_cost = get_monthly_cost(db, year, month)
monthly_profit = get_monthly_profit(db, year, month)
labor_hours_supported = get_labor_hours(db, year, month)
```

---

## Running the Backend

```bash
cd backend

# Install dependencies (first time)
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload --port 8000
```

Then open: **http://localhost:8000/docs** — interactive API explorer (Swagger UI).

---

## API Quick Reference

### Products (Person B)
```
GET    /products               # list all — supports ?search= and ?category=
POST   /products               # create product
GET    /products/{id}          # get single product
PUT    /products/{id}          # partial update
DELETE /products/{id}          # delete (cascades to sales + cost_entries)
```

### Sales (Person B)
```
POST   /sales                  # record a sale
GET    /sales                  # list all — supports ?product_id= ?from_date= ?to_date=
```

### Costing (Person A)
```
POST   /costing/calculate      # returns MSP (no DB write)
POST   /costing/save           # calculate + persist to DB
GET    /costing/history/{id}   # price trend for a product
```

### Dashboard (Shared)
```
GET    /dashboard/summary      # monthly money-in vs money-out
GET    /dashboard/impact       # total labor hours + revenue all time
```

---

## Frontend Expectations (from Mayank's repo)

The frontend expects these exact JSON keys on `/dashboard/summary`:

```json
{
  "period": { "year": 2025, "month": 6 },
  "total_revenue": 12400.0,
  "total_sales": 38,
  "total_cost": 8200.0,
  "total_profit": 4200.0,
  "labor_hours_supported": 320.5,
  "top_products": [...],
  "revenue_trend": [...]
}
```

**Do not rename these keys** — the frontend's Axios calls depend on them.

---

## Database

- **Dev**: SQLite (`anandwan.db` auto-created on first run — no setup needed)
- **Prod**: Set `DATABASE_URL=postgresql://user:pass@host/dbname` in `.env`
- Tables are auto-created by `Base.metadata.create_all()` in `main.py`
- For migrations later: `alembic init alembic` → `alembic revision --autogenerate` → `alembic upgrade head`
