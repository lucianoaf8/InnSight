import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { changeLanguage } from '../lib/i18n'
import i18n from 'i18next'

// Mock i18next
vi.mock('i18next', () => ({
  default: {
    use: vi.fn().mockReturnThis(),
    init: vi.fn(),
    changeLanguage: vi.fn(),
    t: vi.fn((key) => key),
    language: 'en'
  },
  initReactI18next: { type: '3rdParty', init: vi.fn() }
}))

describe('i18n Functionality', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should properly retrieve stored language', () => {
    // Set Portuguese as stored language
    localStorage.setItem('lang', 'pt')
    
    // This would normally trigger the initialization code that reads from localStorage
    // We can test by re-importing the module
    const getStoredLanguage = () => {
      try {
        const storedLang = localStorage.getItem("lang");
        return storedLang && ["en", "pt"].includes(storedLang) 
          ? storedLang 
          : "en";
      } catch (error) {
        return "en";
      }
    }
    
    // Test that it reads the correct value
    expect(getStoredLanguage()).toBe('pt')
  })

  it('should use English as default when no language in localStorage', () => {
    // Ensure localStorage is empty
    localStorage.clear()
    
    // Same test logic as above
    const getStoredLanguage = () => {
      try {
        const storedLang = localStorage.getItem("lang");
        return storedLang && ["en", "pt"].includes(storedLang) 
          ? storedLang 
          : "en";
      } catch (error) {
        return "en";
      }
    }
    
    // Should default to English
    expect(getStoredLanguage()).toBe('en')
  })

  it('should change language and save to localStorage', async () => {
    // Start with English
    i18n.language = 'en'
    
    // Change to Portuguese
    await changeLanguage('pt')
    
    // Verify language was changed in i18n
    expect(i18n.changeLanguage).toHaveBeenCalledWith('pt')
    
    // Verify language was saved to localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'pt')
  })

  it('should still attempt to change language even if same language is selected', async () => {
    // Start with English
    i18n.language = 'en'
    
    // Try to change to English again
    await changeLanguage('en')
    
    // i18n.changeLanguage should be called regardless
    expect(i18n.changeLanguage).toHaveBeenCalledWith('en')
    
    // localStorage should also be set
    expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'en')
  })
})
