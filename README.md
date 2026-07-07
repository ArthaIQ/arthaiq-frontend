# ArthaIQ Frontend

React 18 + Tailwind CSS dashboard for ArthaIQ — the AI-powered Credit Decision
Support Platform built for IDBI Innovate 2026.

## Stack
- React 18 + Vite
- Tailwind CSS 3
- Zustand (state, with token persisted to localStorage)
- Axios (API client)
- Chart.js + react-chartjs-2 (radar + SHAP waterfall)
- lucide-react (icons)
- React Router v6

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_URL if your backend isn't on localhost:8080
npm run dev
```

The app runs at http://localhost:5173.

## Offline-safe by design

Every API call (login, MSME list, scoring, Copilot chat) has a local fallback in
`src/data/mockData.js`. If the Spring Boot / FastAPI backend isn't running, the
UI still works end-to-end using the same 6 demo personas described in the
project spec, so the demo never breaks on stage.

## Pages

| Page | Route | Purpose |
|---|---|---|
| Login | `/login` | JWT auth, falls back to a demo session if the API is down |
| Dashboard | `/dashboard` | MSME list, search, quick stats |
| Health Card | `/msme/:id/health` | Full credit intelligence view (the demo centerpiece) |
| Credit Copilot | `/msme/:id/copilot` | Conversational AI chat grounded in the business's data |

## Health Card components

`ScoreGauge`, `DimensionRadar`, `CreditReadinessBadge`, `ShapWaterfall`,
`RiskFlagList`, `RecommendationCards`, `LoanRecommendation` — each lives in
`src/components/health/` and can be built/tested independently with
hardcoded props before being wired to the API.

## Build

```bash
npm run build   # outputs to dist/
npm run preview
```

## Docker

A minimal Nginx-based Dockerfile is included at the project root — see
`Dockerfile`. Build with:

```bash
docker build -t arthaiq-frontend .
docker run -p 80:80 arthaiq-frontend
```
