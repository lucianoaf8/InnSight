// src/pages/NotFoundPage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

// Components
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import { useAuth } from '../lib/firebase';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  
  // Determine where to navigate back to based on auth state
  const homePath = currentUser ? '/dashboard' : '/';
  
  return (
    <div className="min-h-screen flex flex-col bg-[#F5FAFD] dark:bg-[#0B2540] text-[#1F262E] dark:text-[#E7ECEF] font-sans transition-colors duration-300">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <Link 
          to={homePath}
          className="text-[1.25rem] font-bold text-[#2AB3B1] dark:text-[#2EC8C4]"
        >
          InnSight
        </Link>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <LanguageSelector className="ml-2" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8 bg-white dark:bg-[#0A1D30] p-5 rounded-full shadow-sm">
          <FileQuestion size={64} className="text-[#F58F6C] dark:text-[#C4B8FF]" />
        </div>

        {/* 404 Text */}
        <h1 className="text-[2rem] font-bold mb-2 text-[#F58F6C] dark:text-[#C4B8FF]">
          404
        </h1>
        
        <h2 className="text-[1.5rem] font-bold mb-4 text-[#1F262E] dark:text-[#E7ECEF]">
          {t('notFound.title')}
        </h2>
        
        <p className="text-base mb-10 text-center max-w-sm text-[#1F262E]/70 dark:text-[#E7ECEF]/70">
          {t('notFound.message')}
        </p>

        {/* Return Home Button */}
        <Link
          to={homePath}
          className="flex items-center justify-center px-6 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] text-white bg-gradient-to-br from-[#2AB3B1] to-[#239997] dark:from-[#2EC8C4] dark:to-[#26AEA9]"
        >
          <ArrowLeft size={16} className="mr-2" />
          {t('notFound.returnHome')}
        </Link>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-[#1F262E]/60 dark:text-[#E7ECEF]/60">
        &copy; {new Date().getFullYear()} InnSight
      </footer>
    </div>
  );
};

export default NotFoundPage;