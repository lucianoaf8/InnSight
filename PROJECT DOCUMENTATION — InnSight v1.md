# 📘 PROJECT DOCUMENTATION — *InnSight v1*

## 🔥 Project Summary

**InnSight** is a web-based personal mental health companion that helps users track their mood, log daily intentions, perform breathing exercises, and reflect over time — all with a clean, bilingual UI. It is accessible via `https://innsight.lucaverse.dev`.

The application is composed of:

* A **React frontend** (hosted via Cloudflare Pages)
* A **Flask backend API** (hosted on PythonAnywhere)
* Firebase authentication
* Support for **English/Portuguese**
* Light/Dark mode toggle
* Local + remote data handling
* Designed for **modular scalability**, but keeps v1 lean

---

## 🌐 Stack Overview

| Layer              | Tech                              | Notes                                                  |
| ------------------ | --------------------------------- | ------------------------------------------------------ |
| Frontend           | React + Vite + Tailwind           | For speed, theming, and flexibility                    |
| Routing            | React Router DOM                  | Navigation between mood log, dashboard, breathing, etc |
| Auth               | Firebase Auth (JS SDK)            | OAuth only (Google, Microsoft, Apple)                  |
| i18n               | `react-i18next`                   | Language toggle for English and Portuguese             |
| State Management   | Local state + planned AuthContext | Minimal global state for auth and entries              |
| Backend API        | Flask                             | Hosted on PythonAnywhere                               |
| Database           | SQLite (v1), upgradeable          | Used by Flask to store entries                         |
| Hosting (frontend) | Cloudflare Pages                  | DNS + static delivery                                  |
| Hosting (backend)  | PythonAnywhere                    | Flask server and SQLite storage                        |
| Dev Environment    | Local dev via Windsurf            | React root: `D:\Projects\InnSight`                     |

---

## 🎯 Feature Scope — Version 1

| Feature                          | Details                                           |
| -------------------------------- | ------------------------------------------------- |
| Auth                             | Login via Google/Microsoft/Apple using Firebase   |
| Welcome screen                   | Minimal page with language + theme toggle + login |
| Daily intention                  | Input + update + view per day                     |
| Mood logging                     | Emoji selector (3 max) + optional journal entry   |
| Mood history                     | List entries by day, most recent first            |
| Breathing exercise               | Prebuilt UI, standalone page                      |
| Language switching               | EN/PT with `localStorage` persistence             |
| Theme switching                  | Light/dark toggle via class mode                  |
| Analytics                        | Not in v1 — only historical list view             |
| Hosting @ innsight.lucaverse.dev | Via Cloudflare Pages, full HTTPS                  |

---

## 📁 Folder Structure

```
InnSight/
├── innsight-frontend/
│   ├── src/
│   │   ├── lib/             # firebase.ts, api.ts, i18n.ts, date.ts
│   │   ├── locales/         # en.json, pt.json
│   │   ├── components/      # Header, MoodSelector, EntryCard, etc
│   │   ├── pages/           # Welcome, Dashboard, Mood, Breathe
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── index.html

├── innsight-backend/
│   ├── app.py
│   ├── auth.py              # Firebase token validation
│   ├── db/
│   │   └── models.py
│   ├── instance/
│   │   └── innsight.db
│   ├── routes/
│   │   ├── mood.py
│   │   ├── intention.py
│   ├── init_db.py
│   └── requirements.txt

├── InnSight.code-workspace
├── README.md
└── .gitignore
```

---

## 🧭 Project Plan — Step-by-Step

---

### 🔹 STEP 1: FRONTEND SETUP

1. Initialize frontend with Vite:

   ```bash
   npm create vite@latest innsight-frontend --template react-ts
   cd innsight-frontend && npm install
   ```

2. Install dependencies:

   ```bash
   npm install react-router-dom firebase i18next react-i18next tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. Configure:

   * Tailwind (`tailwind.config.js`): `darkMode: 'class'`
   * Add `vite.config.ts`
   * Create `lib/i18n.ts`, `lib/api.ts`, `lib/firebase.ts`, `lib/date.ts`

4. Set up routes:

   * `/` (Welcome)
   * `/dashboard`
   * `/mood`
   * `/breathe`

5. Build components:

   * Header (theme toggle, lang toggle)
   * IntentionInput
   * MoodSelector
   * EntryCard
   * BreathingModule (imported)

6. Implement Firebase Auth:

   * Set up login with Google/Microsoft
   * Store token
   * Redirect to dashboard

7. Setup language and theme toggles:

   * i18n via `react-i18next`
   * Save selected language + theme in `localStorage`

---

### 🔹 STEP 2: BACKEND SETUP (Flask + PythonAnywhere)

1. Create and activate virtualenv:

   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. Flask app setup:

   * `app.py` with `CORS`, `SQLAlchemy`, blueprint registration
   * SQLite DB in `instance/`

3. API routes:

   * `POST /api/save-intention`
   * `GET /api/intention/today`
   * `POST /api/log-mood`
   * `GET /api/entries`

4. Auth middleware (`auth.py`):

   * Verifies Firebase ID token

5. DB models (`models.py`):

   * `MoodEntry`, `DailyIntention` (optional: `User`)

6. Create DB:

   ```bash
   python init_db.py
   ```

---

### 🔹 STEP 3: CONNECT FRONTEND + BACKEND

1. Use base URL env:

   ```ts
   const BASE_URL = import.meta.env.DEV
     ? "http://localhost:5000/api"
     : "https://your-pythonanywhere-url/api";
   ```

2. Send token with requests:

   ```ts
   const token = await auth.currentUser?.getIdToken();
   ```

3. Use `lib/api.ts` to send:

   * `POST /log-mood`
   * `POST /save-intention`
   * `GET /intention/today`
   * `GET /entries`

4. Add date helpers in `lib/date.ts`

---

### 🔹 STEP 4: DEPLOYMENT

#### ✅ Frontend (Cloudflare Pages)

* Push `innsight-frontend` to GitHub
* Connect to Cloudflare Pages
* Set build command: `npm run build`, output: `dist`
* Add custom domain: `innsight.lucaverse.dev`

#### ✅ Backend (PythonAnywhere)

* Upload `innsight-backend/`
* Set WSGI to point to `app.py`
* Enable CORS to your frontend domain
* Keep `firebase-service-account.json` secure

---

### 🔹 STEP 5: FINAL POLISH

* Add favicon and visuals
* Validate on mobile/tablet
* Add error messages for network/auth failures
* Ensure Firebase `AuthContext` is implemented for global state
* Confirm:

  * [ ] Login works
  * [ ] Mood entry is saved and shown
  * [ ] Daily intention flows work
  * [ ] i18n persists
  * [ ] Theme toggle persists

---

## 📄 Additional Files

* ✅ [`README.md`](./README.md) contains setup, usage, and deployment guide
* ✅ `.gitignore` correctly ignores build files, venv, node\_modules, local DB
* 🟡 Add `.env.example` for API base URL and Firebase keys

---

## 🔚 Summary

Your current setup is **stable, modular, and clean**. Only the final frontend connections, auth state management, and deployment remain. This doc now matches your actual codebase and folder structure 100%.
