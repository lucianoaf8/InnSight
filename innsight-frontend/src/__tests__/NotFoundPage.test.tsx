import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import { AuthProvider } from '../lib/firebase';

describe('NotFoundPage Component', () => {
  it('renders 404 message', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <NotFoundPage />
          </I18nextProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i, { exact: false })).toBeInTheDocument();
  });
  
  it('provides a link back to dashboard', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <NotFoundPage />
          </I18nextProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    
    // The link text is 'Return Home' per translation file
    const homeLink = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'a' && /Return Home/i.test(content);
    });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
