import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from '../pages/Dashboard'
import { useAuth } from '../lib/firebase'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

// Mock the modules that Dashboard depends on
vi.mock('../lib/firebase', () => ({
  useAuth: vi.fn(),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => vi.fn(),
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

vi.mock('../components/DailyIntention', () => ({
  default: () => <div data-testid="daily-intention">Daily Intention</div>,
}))

vi.mock('../components/ActionButtons', () => ({
  default: () => <div data-testid="action-buttons">Action Buttons</div>,
}))

vi.mock('../components/DateDisplay', () => ({
  default: () => <div data-testid="date-display">Today's Date</div>,
}))

vi.mock('../components/EntriesPreview', () => ({
  default: ({ onStreakUpdate }: { onStreakUpdate?: (streak: number) => void }) => {
    // Call the streak update function to ensure it works
    if (onStreakUpdate) {
      setTimeout(() => onStreakUpdate(5), 0)
    }
    return <div data-testid="entries-preview">Entries Preview</div>
  },
}))

describe('Dashboard Component', () => {
  const mockNavigate = vi.fn()
  
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock useNavigate
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      loading: true,
      login: vi.fn(),
      logout: vi.fn(),
    })
  })

  it('should show loading state when auth is loading', () => {
    // Set loading to true
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      loading: true,
      login: vi.fn(),
      logout: vi.fn(),
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText('common.loading')).toBeInTheDocument()
  })

  it('should redirect unauthenticated user', () => {
    // Set loading to false but no current user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    
    // The Dashboard returns null when not authenticated and not loading
    expect(screen.queryByTestId('daily-intention')).not.toBeInTheDocument()
  })

  it('should render dashboard components when authenticated', async () => {
    // Mock authenticated state
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { 
        email: 'test@example.com',
        displayName: 'Test User',
        getIdToken: vi.fn().mockResolvedValue('mock-token')
      } as any,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    // Check that main components are rendered
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('language-selector')).toBeInTheDocument()
    expect(screen.getByTestId('daily-intention')).toBeInTheDocument()
    expect(screen.getByTestId('action-buttons')).toBeInTheDocument()
    expect(screen.getByTestId('entries-preview')).toBeInTheDocument()
    expect(screen.getByTestId('date-display')).toBeInTheDocument()
    
    // Should contain the quote section
    expect(screen.getByText('dashboard.quote_heading')).toBeInTheDocument()
    
    // Should greet the user with their name
    expect(screen.getByText('dashboard.greeting')).toBeInTheDocument()
  })

  it('should update streak when EntriesPreview calls the callback', async () => {
    // Mock authenticated state
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { 
        email: 'test@example.com',
        displayName: 'Test User',
        getIdToken: vi.fn().mockResolvedValue('mock-token')
      } as any,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    // Wait for the streak to be updated (the mock EntriesPreview calls onStreakUpdate with 5)
    await waitFor(() => {
      expect(screen.getByText('dashboard.streak_days')).toBeInTheDocument()
    })
  })
})
