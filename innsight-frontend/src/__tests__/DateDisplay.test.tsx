/** @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import DateDisplay from '../components/DateDisplay';
import * as dateLib from '../lib/date';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';

// Polyfill localStorage (used by i18n)
if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  });
}

describe('DateDisplay Component', () => {
  const fakeDate = '2025-12-25';
  const formatted = 'Friday, December 25, 2025';

  beforeEach(() => {
    // Stub getTodayDate and formatDisplayDate
    vi.spyOn(dateLib, 'getTodayDate').mockReturnValue(fakeDate);
    vi.spyOn(dateLib, 'formatDisplayDate').mockReturnValue(formatted);
  });

  it('renders today date text using translation and formatted date', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <DateDisplay />
      </I18nextProvider>
    );
    const expectedText = i18n.t('dashboard.today', { date: formatted });
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('applies additional className passed via props', () => {
    const extra = 'my-extra-class';
    render(
      <I18nextProvider i18n={i18n}>
        <DateDisplay className={extra} />
      </I18nextProvider>
    );
    const el = screen.getByText(i18n.t('dashboard.today', { date: formatted }));
    expect(el).toHaveClass(extra);
  });

  it('calls date utility functions once', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <DateDisplay />
      </I18nextProvider>
    );
    expect(dateLib.getTodayDate).toHaveBeenCalled();
    expect(dateLib.formatDisplayDate).toHaveBeenCalledWith(fakeDate, i18n.language);
  });
});
