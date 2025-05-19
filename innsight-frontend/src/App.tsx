import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { initializeThemeOnLoad } from './lib/theme';
import { AuthProvider, useAuth } from './lib/firebase';
import './App.css';

// Import pages
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Define placeholder pages for routes we haven't fully implemented yet
const MoodLogging = () => {
  const { t } = useTranslation();
  return <div className="p-4 bg-base-light dark:bg-base-dark text-text-primary-light dark:text-text-primary-dark min-h-screen">{t('dashboard.log_mood')}</div>;
};

const Breathing = () => {
  const { t } = useTranslation();
  return <div className="p-4 bg-base-light dark:bg-base-dark text-text-primary-light dark:text-text-primary-dark min-h-screen">{t('dashboard.breathing_exercise')}</div>;
};

// Route guard for authenticated routes
type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();
  const { t } = useTranslation();
  
  if (loading) return <div className="p-4 flex justify-center items-center h-screen bg-base-light dark:bg-base-dark text-text-primary-light dark:text-text-primary-dark">{t('common.loading')}</div>;
  
  if (!currentUser) return <Navigate to="/" />;
  
  return <>{children}</>;
};

function AppContent() {
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
      <div className="min-h-screen bg-base-light dark:bg-base-dark text-text-primary-light dark:text-text-primary-dark transition-colors">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/mood" element={
            <ProtectedRoute>
              <MoodLogging />
            </ProtectedRoute>
          } />
          <Route path="/breathe" element={
            <ProtectedRoute>
              <Breathing />
            </ProtectedRoute>
          } />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
