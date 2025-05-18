# ✅ PROJECT TASK LIST — InnSight v1

*A cross-checked, end-to-end roadmap from architecture to deployment.*

---

## 🔹 SECTION 1: STRUCTURE & SETUP

| Task                                                                                | Status     |
| ----------------------------------------------------------------------------------- | ---------- |
| 🗂️ Create workspace folder structure as per v1 design                              | ✅ Done     |
| 🔧 Create and link `innsight.code-workspace` to auto-open folders                   | ✅ Done     |
| 💻 Setup `.vscode/settings.json` if needed for Python interpreter or launch configs | ⚪ Optional |
| 📂 Create `.gitignore` for both frontend/backend + root-level                       | ✅ Done     |
| 📄 Create `README.md` + `PROJECT DOCUMENTATION — InnSight v1.md`                    | ✅ Done     |

---

## 🔹 SECTION 2: FRONTEND – REACT + VITE

### ✅ Configuration

| Task                                                                   | Status |
| ---------------------------------------------------------------------- | ------ |
| ⚙️ Create frontend project using Vite (TypeScript)                     | ✅ Done |
| ⚙️ Setup Tailwind CSS (`tailwind.config.js`, `postcss.config.js`)      | ✅ Done |
| ⚙️ Setup `vite.config.ts` for dev mode                                 | ✅ Done |
| 🔡 Setup i18n language support with `react-i18next` loader             | ✅ Done |
| 🌗 Add dark/light mode toggle support via Tailwind `darkMode: 'class'` | ✅ Done |
| 🔐 Configure Firebase Auth SDK with Google login support               | ✅ Done |
| 🔌 Build API client abstraction in `lib/api.ts`                        | ✅ Done |

### ⛏️ Components / Pages

| Component / Page                                                                      | Status         |
| ------------------------------------------------------------------------------------- | -------------- |
| 🏠 Welcome page: logo, short description, language switcher, login options            | 🟡 In progress |
| 📆 Dashboard page: today's date, intention (edit/input), mood log & breathing buttons | 🟡 In progress |
| ✍️ Mood logging page with emoji selector, journal input, save + snooze                | 🟡 In progress |
| 🌬️ Breathing exercise page (already implemented, needs wiring)                       | 🟡 In progress |
| 📜 Previous entries (list recent mood logs by day)                                    | 🟡 In progress |
| 🌐 Language toggle component                                                          | ✅ Done         |
| 🌗 Dark/light mode toggle component                                                   | ✅ Done         |
| 🔁 Route setup via React Router                                                       | ✅ Done         |

---

## 🔹 SECTION 3: BACKEND – FLASK API (PYTHONANYWHERE)

### ✅ Configuration

| Task                                                                     | Status |
| ------------------------------------------------------------------------ | ------ |
| 🐍 Create Python virtualenv in `/innsight-backend/venv`                  | ✅ Done |
| 📦 Install dependencies in `requirements.txt`                            | ✅ Done |
| 🔧 Setup Flask app + blueprints for modular routes                       | ✅ Done |
| 🔐 Setup Firebase token verification middleware (`auth.py`)              | ✅ Done |
| 🌐 Enable CORS with `CORS(app, resources={r"/api/*": {"origins": "*"}})` | ✅ Done |
| 🧱 Create SQLite models: `User`, `MoodEntry`, `DailyIntention`           | ✅ Done |
| 🧪 Create `init_db.py` to generate schema                                | ✅ Done |

### 📡 API Endpoints

| Endpoint                                                      | Status             |
| ------------------------------------------------------------- | ------------------ |
| `GET /api/ping` – health check                                | ✅ Done             |
| `POST /api/save-intention` – saves/updates today’s intention  | ✅ Done             |
| `GET /api/intention/today` – fetches today's intention        | ✅ Done             |
| `POST /api/log-mood` – saves emojis + journal                 | ✅ Done             |
| `GET /api/entries` – returns all mood logs (sorted)           | ✅ Done             |
| `POST /api/log-breathe` – optional logging of breath sessions | ⚪ Not needed in v1 |

---

## 🔹 SECTION 4: DATA & STATE

| Task                                                          | Status            |
| ------------------------------------------------------------- | ----------------- |
| 🧠 Store Firebase user in frontend localStorage/context       | 🔴 Not Done       |
| 📤 Send Firebase ID token with all API calls                  | 🟡 Partially Done |
| 🧾 Format mood/journal entries for storage + display          | 🟡 Backend Done   |
| 🗓️ Format dates for dashboard and API entries (`YYYY-MM-DD`) | 🟡 Backend Done   |
| 🕓 Create local timezone-aware `today` function               | 🔴 Not Done       |



---

## 🔹 SECTION 5: LANGUAGE SUPPORT (EN/PT)

| Task                                                   | Status         |
| ------------------------------------------------------ | -------------- |
| 📁 Create `src/locales/en.json`                        | ✅ Done         |
| 📁 Create `src/locales/pt.json`                        | ✅ Done         |
| 🌐 Initialize i18n via `lib/i18n.ts`                   | ✅ Done         |
| 🎚️ Create language toggle in header or welcome        | ✅ Done         |
| 🌍 Translate dashboard, mood log, breathing, intention | 🟡 In progress |

---

## 🔹 SECTION 6: DEPLOYMENT PREP

| Task                                                                         | Status     |
| ---------------------------------------------------------------------------- | ---------- |
| 🚀 Build frontend locally and verify `vite build` output                     | 🟡 Pending |
| 🌍 Push frontend to GitHub, connect to Cloudflare Pages                      | 🟡 Pending |
| 🌐 Add `innsight.lucaverse.dev` subdomain in Cloudflare Pages custom domains | 🟡 Pending |
| 🛠 Host backend Flask API on PythonAnywhere                                  | 🟡 Pending |
| 🔐 Upload `firebase-service-account.json` to PythonAnywhere                  | 🟡 Pending |
| 🔁 Set `BASE_URL` in frontend `api.ts` to correct backend URL                | 🟡 Pending |

---

## 🔹 SECTION 7: POLISH / QA

| Task                                                              | Status     |
| ----------------------------------------------------------------- | ---------- |
| 🧪 Test login → dashboard → mood log → view history               | 🟡 Pending |
| 🧪 Test language toggle persistence                               | 🟡 Pending |
| 🧪 Test dark mode and theme toggle                                | 🟡 Pending |
| 🧪 Check responsive layout (mobile, tablet, desktop)              | 🟡 Pending |
| 🧪 Test error states (backend down, invalid input, empty entries) | 🟡 Pending |
| 📦 Create optional export/log of mood data (optional future)      | ⚪ Future   |
| 📄 Update `README.md` with instructions for dev + prod setup      | 🟡 Pending |

---

## 🏁 Final Completion Tracker

| Section                  | ✅ Complete | 🟡 In Progress | ⚪ Not Started / Optional |
| ------------------------ | ---------- | -------------- | ------------------------ |
| Folder & Git Setup       | ✅          |                |                          |
| Frontend Config          | ✅          |                |                          |
| Frontend Pages & Routing |            | ✅              |                          |
| Backend API              | ✅          |                |                          |
| Auth & Firebase          | ✅          |                |                          |
| i18n + Themes            | ✅          |                |                          |
| Deployments              |            | 🟡             |                          |
| QA / Polish              |            | 🟡             |                          |

---

## 📌 Next Logical Actions

1. [ ] Finish frontend UI connections (mood log page, dashboard, welcome screen)
2. [ ] Finalize translations in all pages
3. [ ] Test API calls fully from frontend (token + payload)
4. [ ] Build and deploy frontend to Cloudflare
5. [ ] Host backend on PythonAnywhere + test public URL
6. [ ] Run final QA pass (auth, flow, persistence)
