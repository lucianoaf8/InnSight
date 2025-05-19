// Theme utility functions

// Define theme type
export type Theme = 'light' | 'dark';

// Theme configuration
export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME: Theme = 'light';

// Initialize theme based on localStorage or system preference
export const initializeTheme = (): void => {
  try {
    // Clear any existing theme classes
    document.documentElement.classList.remove('light', 'dark');

    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    
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
    console.error('Error initializing theme:', error);
    // Fallback to light mode
    document.documentElement.classList.add('light');
  }
};

// Utility function for theme initialization that can be used outside components
// This is an alias for initializeTheme for backward compatibility
export const initializeThemeOnLoad = initializeTheme;

// Get the current theme from document.documentElement.classList
export const getCurrentTheme = (): Theme => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

// Toggle between light and dark themes
export const toggleTheme = (): void => {
  try {
    const currentTheme = getCurrentTheme();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Remove current theme class
    document.documentElement.classList.remove(currentTheme);
    // Add new theme class
    document.documentElement.classList.add(newTheme);
    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  } catch (error) {
    console.error('Error toggling theme:', error);
  }
};
