# 🌟 InnSight — Personal Mental Health Companion

**InnSight** is a mood tracking and self-care app that helps users improve emotional awareness, log daily intentions, reflect on past moods, and practice breathing exercises. It supports multiple languages (English & Portuguese), dark/light mode, and is fully accessible via browser or mobile.

> Access the live version: [https://innsight.lucaverse.dev](https://innsight.lucaverse.dev)

---

## 🔧 Features

- 🧠 Mood logging with emoji-based UI and journal notes
- 📓 Daily intention setting
- 📈 View past mood entries by date
- 🌬️ Breathing exercise module
- 🌗 Dark / light theme toggle
- 🌍 Language support: English & Portuguese
- 🔐 Login via Google, Microsoft, or Apple (Firebase Auth)
- ☁️ Cloudflare Pages (frontend) + PythonAnywhere (backend)

---

## 🗂️ Project Structure

```

InnSight/
├── innsight-frontend/       # React + Vite frontend
│   ├── src/
│   │   ├── lib/             # API, Firebase, i18n, utils
│   │   ├── locales/         # en.json and pt.json
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Welcome, Dashboard, Mood, Breathe
│   ├── tailwind.config.js
│   ├── vite.config.ts
├── innsight-backend/        # Flask API
│   ├── db/                  # SQLAlchemy models
│   ├── routes/              # API endpoints
│   ├── instance/            # SQLite DB file (ignored)
│   ├── app.py               # App entry point
│   ├── auth.py              # Firebase token verification
│   ├── init\_db.py           # One-time DB initializer
│   ├── requirements.txt
├── .gitignore
├── InnSight.code-workspace
└── README.md

````

---

## 🚀 Getting Started (Local Development)

### 📦 Prerequisites

- Node.js v18+
- Python 3.10+
- Firebase project (for Auth)
- PythonAnywhere account (or local Flask dev server)

---

### 🔨 1. Clone the Repo

```bash
git clone https://github.com/your-username/innsight.git
cd innsight
````

---

### 🧪 2. Setup Frontend

```bash
cd innsight-frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

### 🐍 3. Setup Backend (Flask)

```bash
cd innsight-backend
python -m venv venv
venv\Scripts\activate   # or source venv/bin/activate
pip install -r requirements.txt
python init_db.py
python app.py
```

Runs at `http://localhost:5000`

---

### 🔐 Firebase Setup

Create `firebase.ts` in `src/lib/`:

```ts
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};
```

Also download `firebase-service-account.json` from Firebase console and place it in `innsight-backend/`.

---

## 🌐 Deployment

### 🔹 Frontend (Cloudflare Pages)

* Push `innsight-frontend/` to GitHub
* Connect to Cloudflare Pages
* Set build command: `npm run build`
* Output directory: `dist`
* Add `innsight.lucaverse.dev` as custom domain

### 🔹 Backend (PythonAnywhere)

* Upload `innsight-backend/`
* Set WSGI file to use `app.py`
* Configure static files and CORS
* Make sure SQLite or MySQL DB is writable

---

## 🔄 Environment Variables

Add the following to `.env` files if needed:

**Frontend**

```
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend**

> Currently uses SQLite in `instance/innsight.db`. No `.env` yet, but can be added for DB config or Firebase keys.

---

## 🧠 Todo / Improvements

* [ ] Add unit tests for backend routes
* [ ] Add analytics visualizations (charts)
* [ ] Support account deletion/export
* [ ] Mobile PWA integration
* [ ] Full admin dashboard (future v2)

---

## 📄 License

MIT — free to use and adapt.

---

## 🤝 Contributing

Open to feedback, pull requests, and UI suggestions. Submit issues or feature ideas!

---

## 👤 Author

**Luca Verse**
[https://lucaverse.dev](https://lucaverse.dev)
Built with focus, clarity, and compassion ✨
