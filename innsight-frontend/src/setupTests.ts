import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    key: vi.fn((index: number): string | null => {
      return Object.keys(store)[index] || null
    }),
    length: vi.fn(() => Object.keys(store).length),
  }
})()

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Apply localStorage mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock firebase auth
vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth')
  return {
    ...actual as any,
    getAuth: vi.fn(),
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
    GoogleAuthProvider: vi.fn(),
  }
})

// Mock fetch
global.fetch = vi.fn()

// Add custom matchers if needed
expect.extend({
  // Add any custom matchers here
})
