/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initializeTheme, toggleTheme, getCurrentTheme } from '../lib/theme';

// Polyfill localStorage for jsdom environment
if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  });
}
// Preserve original classList.add
const originalClassListAdd = DOMTokenList.prototype.add;

describe('Theme Functionality', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    // Restore original classList.add
    DOMTokenList.prototype.add = originalClassListAdd;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('handles errors when accessing localStorage in initializeTheme', () => {
    const originalGetItem = localStorage.getItem;
    (localStorage as any).getItem = () => { throw new Error('ls error'); };
    const consoleSpy = vi.spyOn(console, 'error');

    initializeTheme();
    expect(consoleSpy).toHaveBeenCalled();

    (localStorage as any).getItem = originalGetItem;
    consoleSpy.mockRestore();
  });

  it('handles errors when toggling theme when classList.add throws', () => {
    DOMTokenList.prototype.add = () => { throw new Error('classList error'); };
    const consoleSpy = vi.spyOn(console, 'error');

    toggleTheme();
    expect(consoleSpy).toHaveBeenCalled();

    DOMTokenList.prototype.add = originalClassListAdd;
    consoleSpy.mockRestore();
  });

  it('should initialize theme from localStorage if available', () => {
    localStorage.setItem('theme', 'dark');
    initializeTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should use system preference if no theme in localStorage', () => {
    window.matchMedia = vi.fn().mockImplementation(_query => ({
      matches: true,
      media: '',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    initializeTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle theme from light to dark', () => {
    document.documentElement.classList.remove('dark');
    toggleTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    document.documentElement.classList.add('dark');
    toggleTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should correctly return the current theme', () => {
    document.documentElement.classList.add('dark');
    expect(getCurrentTheme()).toBe('dark');
    document.documentElement.classList.remove('dark');
    expect(getCurrentTheme()).toBe('light');
  });
});
