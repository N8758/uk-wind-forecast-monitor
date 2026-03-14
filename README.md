# 🌬️ UK Wind Power Forecast Monitor

A full-stack web application that visualizes UK national wind power generation forecasts vs actual generation data, built as part of a Full Stack SWE challenge.

## 🔗 Live Links
- **App**: https://your-app.vercel.app
- **Backend**: https://your-backend.railway.app
- **Demo Video**: https://youtube.com/your-video

---

## 📁 Project Structure
```
uk-wind-forecast-monitor/
├── frontend/                 # React web application
│   ├── src/
│   │   ├── App.js            # Main app component
│   │   └── components/
│   │       ├── Chart.jsx     # Line chart component
│   │       └── Controls.jsx  # Date picker + slider
│   └── package.json
│
├── backend/                  # Node.js Express API
│   ├── index.js              # API server
│   └── package.json
│
├── notebooks/                # Jupyter analysis notebooks
│   ├── forecast_error.ipynb  # Forecast error analysis
│   └── wind_reliability.ipynb # Wind reliability analysis
│
└── README.md
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v16+
- npm

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/uk-wind-forecast-monitor.git
cd uk-wind-forecast-monitor
```

### 2. Start Backend
```bash
cd backend
npm install
node index.js
```
Backend runs on http://localhost:5000

### 3. Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on http://localhost:3000

---

## 📊 Features

- 📅 **Date range picker** — Select any date range in January 2024
- ⏱️ **Forecast horizon slider** — Adjust from 0 to 48 hours
- 📈 **Interactive chart** — Blue = Actual, Green = Forecast
- 🔍 **Hover tooltip** — Shows exact MW values
- 📱 **Mobile responsive** — Works on all screen sizes

---

## 📡 Data Sources

| Dataset | API Endpoint |
|---|---|
| Actual Generation | `FUELHH` - Elexon BMRS API |
| Forecast Generation | `WINDFOR` - Elexon BMRS API |

- Data period: **January 2024**
- Fuel type: **WIND**
- Forecast horizon: **0-48 hours**

---

## 📓 Analysis Notebooks

### 1. `forecast_error.ipynb`
Analyzes forecast accuracy:
- Mean, Median, P99 error
- Error vs forecast horizon
- Error by time of day

**Key findings:**
- Mean error: ~2000 MW
- Highest error at 20-25 hour horizon
- Midday hours show highest error

### 2. `wind_reliability.ipynb`
Analyzes wind generation reliability:
- Historical generation distribution
- Daily average patterns
- Reliability recommendation

**Key finding:**
- P10 = ~5088 MW → can reliably expect this 90% of the time
- Recommendation: Plan for **5000 MW** as firm wind capacity

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Recharts, Axios |
| Backend | Node.js, Express, Axios |
| Analysis | Python, Pandas, Matplotlib |
| Deployment | Vercel (frontend), Railway (backend) |

---

## 🤖 AI Tools Used
- Claude (Anthropic) — used to assist with code generation and debugging
- GitHub Copilot — used for code suggestions

---

## 👤 Author
- **Name**: Your Name
- **Email**: your@email.com
- **LinkedIn**: linkedin.com/in/yourprofile
- **Wellfound**: wellfound.com/u/yourprofile