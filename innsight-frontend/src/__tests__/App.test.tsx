import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { useAuth } from '../lib/firebase';

// Mock react-router-dom with all necessary exports including Link
vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Route: ({ element }: { element: React.ReactNode }) => <>{element}</>,
    Navigate: () => <div data-testid="navigate" />,
    Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

// Mock components used inside App
vi.mock('../components/ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle">Theme Toggle</div>
}));

vi.mock('../pages/Dashboard', () => ({
  default: () => <div data-testid="dashboard">Dashboard</div>
}));

vi.mock('../pages/LoginPage', () => ({
  default: () => <div data-testid="login-page">Login Page</div>
}));

// Mock useAuth hook
vi.mock('../lib/firebase', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    // Mock useAuth to return a default value to avoid destructuring error
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      loading: false,
      logout: vi.fn()
    });

    render(<App />);
    expect(document.body).toBeDefined();
  });

  it('renders dashboard when user is authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'test-uid', email: 'test@example.com' },
      loading: false,
      logout: vi.fn()
    });

    render(<App />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders login page when user is not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      loading: false,
      logout: vi.fn()
    });

    render(<App />);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});
