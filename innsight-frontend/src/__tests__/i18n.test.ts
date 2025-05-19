import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { initializeI18n, changeLanguage } from '../lib/i18n'
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

  it('should initialize with English as default if no language in localStorage', () => {
    // Clear any language setting in localStorage
    localStorage.removeItem('language')
    
    // Initialize i18n
    initializeI18n()
    
    // Verify i18n was initialized with English
    expect(i18n.init).toHaveBeenCalledWith(
      expect.objectContaining({
        lng: 'en'
      })
    )
  })

  it('should initialize with the language from localStorage if available', () => {
    // Set Portuguese as stored language
    localStorage.setItem('language', 'pt')
    
    // Initialize i18n
    initializeI18n()
    
    // Verify i18n was initialized with Portuguese
    expect(i18n.init).toHaveBeenCalledWith(
      expect.objectContaining({
        lng: 'pt'
      })
    )
  })

  it('should change language and save to localStorage', async () => {
    // Start with English
    i18n.language = 'en'
    
    // Change to Portuguese
    await changeLanguage('pt')
    
    // Verify language was changed in i18n
    expect(i18n.changeLanguage).toHaveBeenCalledWith('pt')
    
    // Verify language was saved to localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith('language', 'pt')
  })

  it('should not change language if same language is selected', async () => {
    // Start with English
    i18n.language = 'en'
    
    // Try to change to English again
    await changeLanguage('en')
    
    // Verify changeLanguage was not called
    expect(i18n.changeLanguage).not.toHaveBeenCalled()
    
    // Verify localStorage was not updated
    expect(localStorage.setItem).not.toHaveBeenCalled()
  })
})
