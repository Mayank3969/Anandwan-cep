# 🌿 Maharogi Seva Samiti: Smart Inventory & Costing Engine
[![University Project](https://img.shields.io/badge/University-Ramdeobaba-blue?style=for-the-badge)](https://www.rknec.edu/)
[![Project Type](https://img.shields.io/badge/CEP-Community%20Engagement-green?style=for-the-badge)](#)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AAA-orange?style=for-the-badge)](#)
[![Tech Stack](https://img.shields.io/badge/Built%20With-Vite%20%2B%20Tailwind-8B5CF6?style=for-the-badge)](#)

> **Empowering artisans through deterministic sustainability.** A specialized management portal designed for **Maharogi Seva Samiti (MSS)** to streamline production, inventory, and fair-pricing for handcrafted textiles.

---

## 📖 Overview

This platform was developed as a **Community Engagement Program (CEP)** project. The goal is to provide a digital infrastructure for a non-profit organization that employs specially-abled artisans (partially blind, deaf, and mute). 

By removing the complexity of manual bookkeeping and price estimation, this engine allows the organization to maintain a "No Profit, No Loss" sustainability model while ensuring fair labor compensation.

### 🌟 Key Features

* **🎯 Smart Price Calculator:** A simplified tool to calculate the Minimum Selling Price (MSP) by factoring in raw materials (cotton, wool), labor hours, and a dynamic sustainability margin (0-50%).
* **📦 Digital Inventory:** A high-visibility, searchable catalog for tracking raw materials and finished handcrafted goods like carpets, bags, and collages.
* **📈 Activity Tracker:** Data visualization showing "Items Created" vs. "Items Sold" across **7D, 30D, Quarterly, and Yearly** intervals.
* **👁️ Accessible-First UI (Stitch Design):**
    * **High-Contrast Palette:** Soothing Cream background (#F5F5DC) to reduce eye strain with Deep Forest Green (#1B4D3E) accents.
    * **Low-Vision Optimized:** Oversized typography (min 18px), thick borders, and distinct focus states for easier navigation.
    * **Deterministic Workflow:** A linear, simple user journey from Login to Dashboard.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend Framework** | Python 3.10+, FastAPI |
| **ORM / Migrations** | SQLAlchemy + Alembic |
| **Database** | SQLite (dev) / PostgreSQL (prod) |
| **Frontend Framework** | React.js + Vite |
| **Styling** | Tailwind CSS + Lucide React |
| **HTTP Client** | Axios |
| **Design System** | Custom "Stitch" Accessible UI |

---

## 📂 Project Structure

```
Anandwan-cep/
├── backend/
│   ├── anandwan.db               # SQLite development database
│   └── app/
│       ├── main.py               # Application entry point & CORS config
│       ├── database.py           # DB session setup
│       ├── security.py           # Auth & JWT utilities
│       ├── models/
│       │   ├── __init__.py
│       │   ├── product.py        # Product table definition
│       │   ├── costing.py        # CostEntry table definition
│       │   ├── sale.py           # Sales table definition
│       │   └── batch.py          # Batch table definition
│       ├── routes/
│       │   ├── auth.py           # Login / token endpoints
│       │   ├── products.py       # GET /products, POST /products
│       │   ├── sales.py          # GET /sales, POST /sales
│       │   ├── costing.py        # POST /costing/calculate, /costing/save
│       │   ├── batches.py        # Batch management endpoints
│       │   └── dashboard.py      # GET /dashboard/summary, /dashboard/impact
│       └── services/
│           ├── msp_engine.py     # Core MSP calculation formula
│           └── metrics.py        # Analytics & sustainability aggregations
│
├── frontend/
│   ├── index.html
│   ├── .env.local                # Backend API base URL
│   ├── vite.config.js
│   ├── tailwind.config.js        # Stitch design tokens & Anandwan palette
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Routing & layout
│       ├── index.css             # Global styles
│       ├── assets/
│       │   └── bg_textile.png    # Background texture
│       ├── components/
│       │   └── Sidebar.jsx       # Navigation sidebar
│       ├── pages/
│       │   ├── Login.jsx         # MSS-branded entry point
│       │   ├── Dashboard.jsx     # Summary cards & monthly trends
│       │   ├── PriceCalculator.jsx  # MSP engine UI (Cost Architect)
│       │   ├── Inventory.jsx     # Searchable product catalog
│       │   └── ActivityTracker.jsx  # Historical calculation tracker
│       └── services/
│           └── api.js            # Axios client & API wrappers
│
└── README.md
```

---

## ⚙️ The MSP Engine

The core of this project is the **Minimum Selling Price (MSP) formula** — a deterministic, bias-free pricing model implemented in `backend/app/services/msp_engine.py` that protects both the organization's sustainability and the artisan's fair wage.

```
Labor Cost      = Labor Hours × Labor Rate per Hour
Material Cost   = Raw Material Cost × (1 + Wastage % / 100)
Total Cost      = Material Cost + Labor Cost + Overhead Cost

MSP             = Total Cost / (1 - Margin % / 100)
```

> The margin is applied **on the selling price** (not added to cost), which is the industry-standard approach and prevents systematic under-pricing over time.

---

## 🚀 Getting Started

### Prerequisites

* **Python** 3.10 or higher
* **Node.js** v18.0.0 or higher
* **npm** (Node Package Manager)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the API server:**
   ```bash
   uvicorn app.main:app --reload
   ```

4. **Access the interactive API docs:**
   ```
   http://localhost:8000/docs
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

---

## 🌐 API Endpoints

| Resource | Method | Endpoint | Purpose | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/login` | JWT token login | ✅ Done |
| **Products** | `GET` | `/products` | List all products | ✅ Done |
| | `POST` | `/products` | Add new product | ✅ Done |
| **Sales** | `GET` | `/sales` | View sales history | ✅ Done |
| | `POST` | `/sales` | Record a new sale | ✅ Done |
| **Batches** | `GET` | `/batches` | View production batches | ✅ Done |
| **Costing** | `POST` | `/costing/calculate` | Compute MSP | 🔲 Planned |
| | `POST` | `/costing/save` | Store calculation result | 🔲 Planned |
| **Dashboard** | `GET` | `/dashboard/summary` | Revenue, cost & labor | ⏳ In Progress |
| | `GET` | `/dashboard/impact` | Sustainability metrics | ⏳ In Progress |

---

## 🎨 Design System: "Stitch"

The UI follows a custom accessible design system built for low-vision and low-tech users.

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--cream` | `#F5F5DC` | Page background |
| `--forest` | `#1B4D3E` | Primary actions, sidebar |
| `--amber` | `#D97706` | Warnings, sustainability alerts |
| `--charcoal` | `#1F2937` | Body text |
| **Min Font Size** | `18px` | All body text |
| **Border Weight** | `2px solid` | All interactive elements |

---

## 🗺️ Roadmap

- [x] Frontend UI — Login, Dashboard, Price Calculator, Inventory, Activity Tracker
- [x] MSP calculation engine (`msp_engine.py`)
- [x] Backend core — FastAPI, models, routes, database schema
- [x] Authentication system (`security.py`, `/auth` routes)
- [x] Batch management model & routes
- [x] Analytics service (`metrics.py`)
- [ ] Connect `PriceCalculator.jsx` to `/costing/calculate` endpoint
- [ ] Populate Inventory page via `GET /products`
- [ ] Wire Dashboard to live analytics service
- [ ] Export quotation as PDF / Excel
- [ ] Deploy backend to production with PostgreSQL

---

## 🤝 Contributing

This is an active CEP project. If you'd like to contribute or report an issue, please open a GitHub Issue or reach out to the project team directly.

---

## 📄 License

This project is developed for **non-commercial, community welfare purposes** under the Ramdeobaba University CEP initiative. All rights reserved by Maharogi Seva Samiti.

---

<div align="center">
  <sub>Built with ❤️ for the artisans of Anandwan.</sub>
</div>
