import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { initializeThemeOnLoad } from './lib/theme';
import './App.css';

// Import pages
import Dashboard from './pages/Dashboard';

// This will be placeholder content until we implement the actual pages
const Welcome = () => <div>Welcome Page</div>;
const MoodLogging = () => <div>Mood Logging Page</div>;
const Breathing = () => <div>Breathing Exercise Page</div>;

function App() {
  const { i18n } = useTranslation();

  // Initialize theme and language on app load
  useEffect(() => {
    // Initialize theme (dark/light mode)
    initializeThemeOnLoad();
    
    // i18n is already initialized in i18n.ts with localStorage support
    console.log(`App initialized with language: ${i18n.language}`);
  }, [i18n]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mood" element={<MoodLogging />} />
          <Route path="/breathe" element={<Breathing />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
