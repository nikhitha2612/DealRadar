# DealRadar

A premium, neobrutalist AI-powered price tracking application.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Python (3.9+)

### 2. Environment Setup

#### Backend
1. Go to `/backend`
2. Copy `.env.example` to `.env`
3. Fill in your `GEMINI_API_KEY`.

#### Frontend
1. Go to `/frontend`
2. Copy `.env.example` to `.env.local`
3. Fill in your Firebase configuration keys.

### 3. Installation & Running

#### Option A: Unified Run (Windows)
Run the PowerShell script in the root:
```powershell
./run_app.ps1
```

#### Option B: Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
./venv/Scripts/activate
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: FastAPI, SQLAlchemy, SQLite
- **AI**: Google Gemini (Google Search Grounding)
- **Auth**: Firebase Authentication

## 🔒 Security
- API keys are managed via `.env` files.
- sensitive files (DBs, envs, node_modules) are listed in `.gitignore`.
