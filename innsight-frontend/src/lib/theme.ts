// Theme utility functions

// Define theme type
export type Theme = 'light' | 'dark';

// Theme configuration
export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME: Theme = 'light';

// Utility function for theme initialization that can be used outside components
export const initializeThemeOnLoad = (): void => {
  try {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    // Apply stored theme if it exists
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      document.documentElement.classList.add(storedTheme);
      return;
    }
    
    // Apply system preference if no stored preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      return;
    }
    
    // Default to light mode
    document.documentElement.classList.add('light');
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
  } catch (error) {
    console.error('Error initializing theme on load:', error);
    // Fallback to light mode
    document.documentElement.classList.add('light');
  }
};
