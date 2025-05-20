/** @vitest-environment jsdom */
// Polyfill localStorage for jsdom environment
if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    },
  });
}

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { useAuth } from '../lib/firebase';

// Mock react-router-dom
vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Route: ({ element }: { element: React.ReactNode }) => <>{element}</>,
    Navigate: () => <div data-testid="navigate" />,
    Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock pages and components
vi.mock('../components/ThemeToggle', () => ({ default: () => <div data-testid="theme-toggle" /> }));
vi.mock('../pages/Dashboard', () => ({ default: () => <div data-testid="dashboard" /> }));
vi.mock('../pages/LoginPage', () => ({ default: () => <div data-testid="login-page" /> }));
vi.mock('../pages/NotFoundPage', () => ({ default: () => <div data-testid="not-found" /> }));

// Mock AuthProvider and useAuth
vi.mock('../lib/firebase', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    (useAuth as any).mockReturnValue({ currentUser: null, loading: false, logout: vi.fn() });
    render(<App />);
    expect(document.body).toBeDefined();
  });

  it('renders dashboard when user is authenticated', () => {
    (useAuth as any).mockReturnValue({ currentUser: {} as any, loading: false, logout: vi.fn() });
    render(<App />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('renders login page when user is not authenticated', () => {
    (useAuth as any).mockReturnValue({ currentUser: null, loading: false, logout: vi.fn() });
    render(<App />);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('shows loading state when auth is loading', () => {
    (useAuth as any).mockReturnValue({ currentUser: null, loading: true, logout: vi.fn() });
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('navigates to NotFoundPage on unknown route', () => {
    // For simplicity, render AppContent directly 
    (useAuth as any).mockReturnValue({ currentUser: {} as any, loading: false, logout: vi.fn() });
    window.history.pushState({}, '', '/some/unknown/path');
    render(<App />);
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
