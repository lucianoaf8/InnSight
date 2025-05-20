/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Polyfill localStorage for jsdom
if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  });
}
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { AuthProvider, useAuth } from '../lib/firebase'
import { renderHook, act } from '@testing-library/react'
import React from 'react'

// Mock the Firebase auth functions
vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({})),
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(() => Promise.resolve()),
    GoogleAuthProvider: vi.fn()
  }
})

describe('Firebase Auth Context', () => {
  let authStateCallback: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Setup the onAuthStateChanged mock to capture the callback
    // @ts-ignore
    onAuthStateChanged.mockImplementation((auth, callback) => {
      authStateCallback = callback
      return vi.fn() // Return unsubscribe function
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should initialize with loading=true and currentUser=null', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.currentUser).toBeNull()
    expect(onAuthStateChanged).toHaveBeenCalled()
  })

  it('should update context when auth state changes', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' }
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>
    })

    // Initially loading
    expect(result.current.loading).toBe(true)
    
    // Simulate auth state change
    act(() => {
      authStateCallback(mockUser)
    })
    
    // Now should have user and not be loading
    expect(result.current.loading).toBe(false)
    expect(result.current.currentUser).toEqual(mockUser)
  })

  it('should clear user and set loading to false when logged out', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' }
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>
    })
    
    // Simulate initial login
    act(() => {
      authStateCallback(mockUser)
    })
    
    expect(result.current.currentUser).toEqual(mockUser)
    
    // Simulate logout
    act(() => {
      authStateCallback(null)
    })
    
    expect(result.current.currentUser).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('should call firebase signOut when logout function is called', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>
    })

    await act(async () => {
      await result.current.logout()
    })

    expect(signOut).toHaveBeenCalled()
  })
})
