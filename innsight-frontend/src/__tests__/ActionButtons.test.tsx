import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActionButtons from '../components/ActionButtons';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';

describe('ActionButtons Component', () => {
  it('renders both action buttons', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <ActionButtons />
        </I18nextProvider>
      </BrowserRouter>
    );
    
    // Check for mood logging button
    const moodButton = screen.getByRole('link', { name: /log mood/i });
    expect(moodButton).toBeInTheDocument();
    expect(moodButton.getAttribute('href')).toBe('/mood');
    
    // Check for breathing exercise button
    const breatheButton = screen.getByRole('link', { name: /breathing exercise/i });
    expect(breatheButton).toBeInTheDocument();
    expect(breatheButton.getAttribute('href')).toBe('/breathe');
  });
  
  it('applies custom className when provided', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <ActionButtons className="custom-class" />
        </I18nextProvider>
      </BrowserRouter>
    );
    
    const container = screen.getByRole('link', { name: /log mood/i }).parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
