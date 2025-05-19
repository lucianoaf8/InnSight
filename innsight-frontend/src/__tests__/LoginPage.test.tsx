import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '../pages/LoginPage'
import { useAuth } from '../lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { BrowserRouter } from 'react-router-dom'

// Mock the modules that LoginPage depends on with custom implementation
vi.mock('../lib/firebase', () => ({
  useAuth: vi.fn(),
  auth: { currentUser: null },
  googleProvider: { providerId: 'google.com' },
}))

vi.mock('firebase/auth', () => ({
  signInWithPopup: vi.fn(),
}))

// Don't mock react-router-dom for BrowserRouter to work properly
// Just mock the useNavigate hook, which we use in our test assertions
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => {
  const actual = require('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    },
  }),
}))

vi.mock('../components/ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}))

vi.mock('../components/LanguageSelector', () => ({
  default: () => <div data-testid="language-selector">Language Selector</div>,
}))

vi.mock('lucide-react', () => ({
  Brain: () => <div data-testid="brain-icon">Brain Icon</div>,
}))

describe('LoginPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock useAuth
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      loading: false,
      logout: vi.fn(),
    })
  })

  it('should show loading state when auth is loading', () => {
    // Set loading to true
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      loading: true,
      logout: vi.fn(),
    })

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    expect(screen.getByText('common.loading')).toBeInTheDocument()
  })

  it('should render language and theme toggles', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('language-selector')).toBeInTheDocument()
  })

  it('should display welcome title and subtitle', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    expect(screen.getByText('welcome.title')).toBeInTheDocument()
    expect(screen.getByText('welcome.subtitle')).toBeInTheDocument()
  })

  it('should call signInWithPopup when login button is clicked', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    const loginButton = screen.getByText(/welcome.login_with/, { exact: false })
    fireEvent.click(loginButton)

    expect(signInWithPopup).toHaveBeenCalled()
  })

  it('should redirect to dashboard if user is already logged in', async () => {
    // Mock react-router-dom's useNavigate
    mockNavigate.mockImplementation(vi.fn())
    
    // Mock user is already logged in
    vi.mocked(useAuth).mockReturnValue({
      currentUser: {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: vi.fn(),
        getIdToken: vi.fn().mockResolvedValue('mock-token'),
        getIdTokenResult: vi.fn(),
        reload: vi.fn(),
        toJSON: vi.fn(),
        displayName: null,
        phoneNumber: null,
        photoURL: null,
        providerId: 'firebase'
      } as User,
      loading: false,
      logout: vi.fn(),
    })

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    // Verify the redirect happens
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('should handle login errors gracefully', async () => {
    // Mock console.error to capture error logs
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    // Mock signInWithPopup to throw an error
    vi.mocked(signInWithPopup).mockRejectedValueOnce(new Error('Login failed'))
    
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    const loginButton = screen.getByText(/welcome.login_with/, { exact: false })
    fireEvent.click(loginButton)

    // Wait for error to be logged
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Google sign-in error:',
        expect.any(Error)
      )
    })

    consoleErrorSpy.mockRestore()
  })
})
