# ✅ PROJECT TASK LIST — InnSight v1 (Updated End-of-Day Review)

*A methodical, end-to-end breakdown including new tasks completed beyond the original scope.*

---

## 🔹 SECTION 1: STRUCTURE & SETUP

| Task                                                                                | Status     |
|-------------------------------------------------------------------------------------|------------|
| 🗂️ Create workspace folder structure as per v1 design                              | ✅ Done     |
| 🔧 Create and link `innsight.code-workspace` to auto-open folders                   | ✅ Done     |
| 💻 Setup `.vscode/settings.json` if needed for Python interpreter or launch configs | ⚪ Optional |
| 📂 Create `.gitignore` for both frontend/backend + root-level                       | ✅ Done     |
| 📄 Create `README.md` + `PROJECT DOCUMENTATION — InnSight v1.md`                    | ✅ Done     |

---

## 🔹 SECTION 2: FRONTEND – REACT + VITE

### ✅ Configuration

| Task                                                                   | Status     |
|------------------------------------------------------------------------|------------|
| ⚙️ Create frontend project using Vite (TypeScript)                     | ✅ Done     |
| ⚙️ Setup Tailwind CSS (`tailwind.config.js`, `postcss.config.js`)      | ✅ Done     |
| ⚙️ Setup `vite.config.ts` for dev mode                                 | ✅ Done     |
| 🔡 Setup i18n language support with `react-i18next` loader             | ✅ Done     |
| 🌗 Add dark/light mode toggle support via Tailwind `darkMode: 'class'` | ✅ Done     |
| 🔐 Configure Firebase Auth SDK with Google login support               | ✅ Done     |
| 🔌 Build API client abstraction in `lib/api.ts`                        | ✅ Done     |

### ⛏️ Components / Pages

| Component / Page                                                                      | Status         |
|----------------------------------------------------------------------------------------|----------------|
| 🏠 Welcome page: logo, short description, language switcher, login options            | ✅ Done         |
| 📆 Dashboard page: today's date, intention (edit/input), mood log & breathing buttons | ✅ Done         |
| ✍️ Mood logging page with emoji selector, journal input, save + snooze                | 🟡 In progress  |
| 🌬️ Breathing exercise page (already implemented, needs wiring)                       | 🟡 In progress  |
| 📜 Previous entries (list recent mood logs by day)                                    | ✅ Done         |
| 🌐 Language toggle component                                                          | ✅ Done         |
| 🌗 Dark/light mode toggle component                                                   | ✅ Done         |
| 🔁 Route setup via React Router                                                       | ✅ Done         |

---

## 🔹 SECTION 3: BACKEND – FLASK API (PYTHONANYWHERE)

### ✅ Configuration

| Task                                                                     | Status     |
|--------------------------------------------------------------------------|------------|
| 🐍 Create Python virtualenv in `/innsight-backend/venv`                  | ✅ Done     |
| 📦 Install dependencies in `requirements.txt`                            | ✅ Done     |
| 🔧 Setup Flask app + blueprints for modular routes                       | ✅ Done     |
| 🔐 Setup Firebase token verification middleware (`auth.py`)              | ✅ Done     |
| 🌐 Enable CORS with `CORS(app, resources={r"/api/*": {"origins": "*"}})` | ✅ Done     |
| 🧱 Create SQLite models: `User`, `MoodEntry`, `DailyIntention`           | ✅ Done     |
| 🧪 Create `init_db.py` to generate schema                                | ✅ Done     |

### 📡 API Endpoints

| Endpoint                                                      | Status             |
|---------------------------------------------------------------|--------------------|
| `GET /api/ping` – health check                                | ✅ Done             |
| `POST /api/save-intention` – saves/updates today’s intention  | ✅ Done             |
| `GET /api/intention/today` – fetches today's intention        | ✅ Done             |
| `POST /api/log-mood` – saves emojis + journal                 | ✅ Done             |
| `GET /api/entries` – returns all mood logs (sorted)           | ✅ Done             |
| `POST /api/log-breathe` – optional logging of breath sessions | ⚪ Not needed in v1 |

---

## 🔹 SECTION 4: DATA & STATE

| Task                                                          | Status     |
|---------------------------------------------------------------|------------|
| 🧠 Store Firebase user in frontend localStorage/context       | ✅ Done     |
| 📤 Send Firebase ID token with all API calls                  | ✅ Done     |
| 🧾 Format mood/journal entries for storage + display          | ✅ Done     |
| 🗓️ Format dates for dashboard and API entries (`YYYY-MM-DD`) | ✅ Done     |
| 🕓 Create local timezone-aware `today` function               | ✅ Done     |

---

## 🔹 SECTION 5: LANGUAGE SUPPORT (EN/PT)

| Task                                                   | Status         |
|--------------------------------------------------------|----------------|
| 📁 Create `src/locales/en.json`                        | ✅ Done         |
| 📁 Create `src/locales/pt.json`                        | ✅ Done         |
| 🌐 Initialize i18n via `lib/i18n.ts`                   | ✅ Done         |
| 🎚️ Create language toggle in header or welcome        | ✅ Done         |
| 🌍 Translate dashboard, mood log, breathing, intention | 🟡 In progress  |

---

## 🔹 SECTION 6: DEPLOYMENT PREP

| Task                                                                         | Status     |
|------------------------------------------------------------------------------|------------|
| 🚀 Build frontend locally and verify `vite build` output                     | 🟡 Pending |
| 🌍 Push frontend to GitHub, connect to Cloudflare Pages                      | 🟡 Pending |
| 🌐 Add `innsight.lucaverse.dev` subdomain in Cloudflare Pages custom domains | 🟡 Pending |
| 🛠 Host backend Flask API on PythonAnywhere                                  | 🟡 Pending |
| 🔐 Upload `firebase-service-account.json` to PythonAnywhere                  | ✅ Done     |
| 🔁 Set `BASE_URL` in frontend `api.ts` to correct backend URL                | ✅ Done     |

---

## 🔹 SECTION 7: POLISH / QA

| Task                                                              | Status     |
|-------------------------------------------------------------------|------------|
| 🧪 Test login → dashboard → mood log → view history               | 🟡 Pending |
| 🧪 Test language toggle persistence                               | 🟡 Pending |
| 🧪 Test dark mode and theme toggle                                | 🟡 Pending |
| 🧪 Check responsive layout (mobile, tablet, desktop)              | 🟡 Pending |
| 🧪 Test error states (backend down, invalid input, empty entries) | 🟡 Pending |
| 📦 Create optional export/log of mood data (optional future)      | ⚪ Future   |
| 📄 Update `README.md` with instructions for dev + prod setup      | 🟡 Pending |

---

## 🆕 NEW TASKS COMPLETED (Not in Original List)

| Task                                                                                     | Status     |
|------------------------------------------------------------------------------------------|------------|
| ✅ Implement AuthContext and `useAuth` hook in `firebase.ts`                             | ✅ Done     |
| ✅ Add automatic token injection in `api.ts` with Firebase ID token                      | ✅ Done     |
| ✅ Implement `ThemeToggle.tsx` with localStorage + system fallback                       | ✅ Done     |
| ✅ Create `LanguageSelector.tsx` integrated with i18n + localStorage                     | ✅ Done     |
| ✅ Set up Vitest, RTL, and created test suite for core modules                           | ✅ Done     |
| ✅ Add tests: `firebase.test.ts`, `api.test.ts`, `i18n.test.ts`, `theme.test.ts`, etc.   | ✅ Done     |
| ✅ Created full set of Dashboard components: `DailyIntention`, `ActionButtons`, etc.     | ✅ Done     |
| ✅ Created `LoginPage.tsx` and `NotFoundPage.tsx`                                        | ✅ Done     |

