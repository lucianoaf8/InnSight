import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { THEME_STORAGE_KEY, DEFAULT_THEME } from '../lib/theme';
import type { Theme } from '../lib/theme';

export const ThemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  // Load theme from localStorage on component mount
  useEffect(() => {
    initializeTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initializes the theme based on localStorage or system preference
  const initializeTheme = () => {
    try {
      // Check localStorage first
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

      // If theme exists in localStorage, use it
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        setTheme(storedTheme);
        applyTheme(storedTheme);
        return;
      }

      // If no stored preference, check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        applyTheme('dark');
        return;
      }

      // Default to light mode
      setTheme('light');
      applyTheme('light');
    } catch (error) {
      console.error('Error initializing theme:', error);
      // Fallback to light mode
      setTheme('light');
      applyTheme('light');
    }
  };

  // Apply theme to document and store in localStorage
  const applyTheme = (newTheme: Theme) => {
    try {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="flex items-center text-sm font-medium rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === 'light' ? t('common.dark_mode') : t('common.light_mode')}
    >
      {theme === 'light' ? (
        <>
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <span>{t('common.dark_mode')}</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
          </svg>
          <span>{t('common.light_mode')}</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
