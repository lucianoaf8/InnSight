/** @vitest-environment jsdom */
// Polyfill matchMedia and localStorage for jsdom environment
if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    value: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }),
  });
}
if (typeof window.localStorage !== 'object') {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    },
  });
}

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    // Reset DOM and localStorage before each test
    document.documentElement.classList.remove('light', 'dark');
    localStorage.clear();
  });
  
  it('initializes with light theme by default', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeToggle />
      </I18nextProvider>
    );
    
    // Should show option to switch to dark mode
    expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
  });
  
  it('initializes with dark theme when stored in localStorage', () => {
    localStorage.setItem('theme', 'dark');
    
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeToggle />
      </I18nextProvider>
    );
    
    // Should show option to switch to light mode
    expect(screen.getByText(/light mode/i)).toBeInTheDocument();
  });
  
  it('toggles theme when clicked', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeToggle />
      </I18nextProvider>
    );
    
    // Initially light theme
    expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
    
    // Click to toggle
    fireEvent.click(screen.getByRole('button'));
    
    // Should now show light mode option
    expect(screen.getByText(/light mode/i)).toBeInTheDocument();
    
    // Check that theme was applied to document
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Check localStorage was updated
    expect(localStorage.getItem('theme')).toBe('dark');
  });
