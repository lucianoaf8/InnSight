
# 📘 PROJECT DOCUMENTATION — *InnSight v1*

## 🔥 Project Summary

**InnSight** is a web-based personal mental health companion that helps users track their mood, log their daily intentions, perform breathing exercises, and reflect over time — all with a clean, bilingual UI and optional AI integration. It is accessible via `https://innsight.lucaverse.dev`.

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

| Layer              | Tech                            | Notes                                                      |
| ------------------ | ------------------------------- | ---------------------------------------------------------- |
| Frontend           | React + Vite + Tailwind         | For speed, theming, and flexibility                        |
| Routing            | React Router DOM                | For navigation between mood log, dashboard, breathing, etc |
| Auth               | Firebase Auth (JS SDK)          | OAuth only (Google, Microsoft, Apple)                      |
| i18n               | `react-i18next`                 | Language toggle for English and Portuguese                 |
| State Management   | Local component state / Context | Minimal global state for auth and entries                  |
| Backend API        | Flask                           | Hosted on PythonAnywhere                                   |
| Database           | SQLite (v1), switchable         | Used by Flask to store entries                             |
| Hosting (frontend) | Cloudflare Pages                | DNS + static delivery                                      |
| Hosting (backend)  | PythonAnywhere                  | Flask server and SQLite storage                            |
| Dev Environment    | Local dev via Windsurf          | React root at `D:\Projects\InnSight`                       |

---

## 🎯 Feature Scope — Version 1

| Feature                          | Details                                                  |
| -------------------------------- | -------------------------------------------------------- |
| Auth                             | Login via Google/Microsoft/Apple using Firebase          |
| Welcome screen                   | Minimal one-pager with language toggle + login options   |
| Daily intention                  | Input + update + view per day                            |
| Mood logging                     | Emoji selector (3 max) + optional journal entry          |
| Mood history                     | List by day, most recent first                           |
| Breathing exercise               | Prebuilt UI (already coded), standalone page             |
| Language switching               | EN/PT with persistent choice (localStorage or URL param) |
| Theme switching                  | Light/dark toggle in UI                                  |
| Analytics                        | Not in v1 — only historical list view                    |
| Hosting @ innsight.lucaverse.dev | Via Cloudflare Pages, with full HTTPS                    |

---

## 📁 Initial Folder Structure

```
D:\Projects\InnSight
│
├── frontend/                  # React app
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Static icons, illustrations
│   │   ├── components/        # Reusable UI blocks (Header, Button, EntryCard, etc)
│   │   ├── pages/             # MoodLogPage, DashboardPage, BreathePage, WelcomePage
│   │   ├── locales/           # i18n files (en.json, pt.json)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── index.html
│
├── backend/                  # Flask API
│   ├── app.py
│   ├── auth.py               # Firebase token validation
│   ├── routes/
│   │   ├── mood.py
│   │   ├── intention.py
│   │   └── breathe.py        # Optional if you log sessions
│   ├── db/
│   │   └── models.py         # SQLAlchemy models
│   ├── requirements.txt
│   └── instance/
│       └── innsight.db       # SQLite database (ignored by git)
│
└── README.md
```

---

# 🧭 PROJECT PLAN — Step-by-Step Execution

---

## 🔹 STEP 1: SET UP FRONTEND REACT APP

1. Initialize with Vite:

   ```bash
   cd D:\Projects\InnSight
   npm create vite@latest frontend --template react-ts
   cd frontend && npm install
   ```

2. Install dependencies:

   ```bash
   npm install react-router-dom firebase i18next react-i18next tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. Configure:

   * Tailwind (`tailwind.config.js`): enable `darkMode: 'class'`
   * i18next (`src/locales/en.json`, `pt.json`)
   * Firebase Auth: add config and initialize Firebase in a utility file
   * React Router: set up routes for:

     * `/` (Welcome)
     * `/dashboard`
     * `/mood`
     * `/breathe`

4. Build reusable components:

   * `Header` (with language and theme toggles)
   * `EntryCard` (for previous entries)
   * `IntentionInput`
   * `MoodSelector`
   * `BreathingModule` (import your existing code here)

5. Implement Theme + Language toggles:

   * Save preference in `localStorage`
   * Dynamically load translations using `useTranslation`

6. Implement Firebase Auth:

   * Use Firebase UI or custom Google/Microsoft login buttons
   * Store user info and token in localStorage
   * Redirect to `/dashboard` after login

---

## 🔹 STEP 2: BACKEND SETUP (FLASK @ PYTHONANYWHERE)

1. Create Flask project:

   ```bash
   cd D:\Projects\InnSight
   mkdir backend && cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install flask flask-cors firebase-admin flask_sqlalchemy
   ```

2. Create `app.py` with CORS, SQLite config, and route loading

3. Build basic routes:

   * `POST /api/save-intention`
   * `GET /api/intention/today`
   * `POST /api/log-mood`
   * `GET /api/entries`
   * (Optional) `POST /api/log-breathe`

4. Add `auth.py` to verify Firebase token from frontend header

5. Initialize SQLite DB and create models:

   * User (optional)
   * MoodEntry
   * Intention

6. Enable CORS for dev + production:

   ```python
   CORS(app, resources={r"/api/*": {"origins": "*"}})
   ```

7. Test locally using:

   ```bash
   flask run --reload
   ```

---

## 🔹 STEP 3: INTEGRATE FRONTEND + BACKEND

1. In frontend, set:

   ```ts
   const API_BASE_URL = import.meta.env.DEV
     ? "http://localhost:5000/api"
     : "https://your-pythonanywhere-url/api";
   ```

2. On login, get Firebase token and send it with each API call:

   ```ts
   const token = await firebase.auth().currentUser.getIdToken();
   fetch(`${API_BASE_URL}/save-intention`, {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({...})
   });
   ```

3. Handle CRUD for:

   * Intention (set/view)
   * Mood entries (log/view)

4. Test all endpoints locally

---

## 🔹 STEP 4: DEPLOYMENT

### 📤 Frontend (Cloudflare Pages)

1. Push frontend to GitHub
2. In Cloudflare Pages:

   * Link GitHub repo
   * Set build command: `npm run build`
   * Output: `dist`
3. Add custom domain: `innsight.lucaverse.dev`
4. Configure DNS CNAME via Cloudflare dashboard

### 🌐 Backend (PythonAnywhere)

1. Upload backend folder
2. Configure WSGI file to point to `app.py`
3. Add environment variables if needed
4. Make sure Flask is served on `/api/*` routes
5. Add HTTPS URL to CORS allowed list

---

## 🔹 STEP 5: FINAL POLISH

* Add favicon and brand visuals
* Validate layout on mobile
* Use `localStorage` or context to persist theme and language
* Optimize fonts and loading
* Run manual QA:

  * Login
  * Log mood
  * View history
  * Toggle language
  * Toggle theme
  * Try breathing UI

