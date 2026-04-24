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
| **Frontend Framework** | Vite + Vanilla JS (Scalable for React) |
| **Styling** | Tailwind CSS (Utility-first Accessibility) |
| **Design System** | Custom "Stitch" Accessible UI |
| **Icons** | Lucide / Heroicons (High-stroke weight for visibility) |

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v18.0.0 or higher)
* **npm** (Node Package Manager)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mss-inventory-engine.git
   cd mss-inventory-engine
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

## 📂 Project Structure

```
mss-inventory-engine/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI elements (Sidebar, Cards, etc.)
│   ├── pages/               # Top-level views
│   │   ├── Login.jsx        # MSS-branded entry point
│   │   ├── Dashboard.jsx    # Summary cards & monthly trends
│   │   ├── Calculator.jsx   # MSP price engine (Cost Architect)
│   │   ├── Inventory.jsx    # Searchable product catalog
│   │   └── Activity.jsx     # Historical calculation tracker
│   ├── api/                 # Axios clients (backend integration)
│   └── App.jsx              # Routing & layout
├── tailwind.config.js       # Stitch design tokens & Anandwan palette
├── vite.config.js
└── package.json
```

---

## ⚙️ The MSP Engine

The core of this project is the **Minimum Selling Price (MSP) formula** — a deterministic, bias-free pricing model that protects both the organization's sustainability and the artisan's fair wage.

```
Labor Cost      = Labor Hours × Labor Rate per Hour
Material Cost   = Raw Material Cost × (1 + Wastage % / 100)
Total Cost      = Material Cost + Labor Cost + Overhead Cost

MSP             = Total Cost / (1 - Margin % / 100)
```

> The margin is applied **on the selling price** (not added to cost), which is the industry-standard approach and prevents systematic under-pricing over time.

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

- [x] Frontend UI mockups (Login, Dashboard, Calculator, Inventory, Activity)
- [x] MSP calculation logic
- [x] Backend core (FastAPI) & database schema
- [ ] Connect Calculator UI to `/costing/calculate` endpoint
- [ ] Populate Inventory via `GET /products`
- [ ] Wire Dashboard to live analytics service
- [ ] Export quotation as PDF / Excel
- [ ] JWT-based authentication

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
