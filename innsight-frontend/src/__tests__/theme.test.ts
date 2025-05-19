import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { initializeTheme, toggleTheme, getCurrentTheme } from '../lib/theme'

describe('Theme Functionality', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.clear()
    
    // Reset the document.documentElement.classList
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should initialize theme from localStorage if available', () => {
    // Mock that dark theme is stored in localStorage
    localStorage.setItem('theme', 'dark')
    
    // Initialize theme
    initializeTheme()
    
    // Check that the theme was applied to HTML element
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should use system preference if no theme in localStorage', () => {
    // Mock media query for dark mode preference
    window.matchMedia = vi.fn().mockImplementation(query => {
      return {
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }
    })

    // Initialize theme without localStorage setting
    initializeTheme()
    
    // Since our mock returns true for dark mode, theme should be dark
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should toggle theme from light to dark', () => {
    // Start with light theme
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    
    // Toggle theme
    toggleTheme()
    
    // Should now be dark
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('should toggle theme from dark to light', () => {
    // Start with dark theme
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    
    // Toggle theme
    toggleTheme()
    
    // Should now be light
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  it('should correctly return the current theme', () => {
    // Set to dark theme
    document.documentElement.classList.add('dark')
    
    expect(getCurrentTheme()).toBe('dark')
    
    // Change to light theme
    document.documentElement.classList.remove('dark')
    
    expect(getCurrentTheme()).toBe('light')
  })
})
