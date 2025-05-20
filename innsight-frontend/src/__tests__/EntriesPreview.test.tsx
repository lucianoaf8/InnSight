/** @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import EntriesPreview from '../components/EntriesPreview';
import * as api from '../lib/api';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';

/** @vitest-environment jsdom */
// Declare apiSpy for stubbing apiRequest
let apiSpy: ReturnType<typeof vi.spyOn>;

// Mock useAuth hook
vi.mock('../lib/firebase', () => ({
  useAuth: vi.fn(),
}));

describe('EntriesPreview Component', () => {
  const sampleEntries = [
    { date: '2025-01-02', time: '10:00', period: 'morning', emojis: '😊', journal: 'Entry 1' },
    { date: '2025-01-01', time: '09:00', period: 'morning', emojis: '😢', journal: 'Entry 2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Stub apiRequest
    apiSpy = vi.spyOn(api, 'apiRequest');
    // Provide authenticated user
    const { useAuth } = require('../lib/firebase');
    useAuth.mockReturnValue({ currentUser: { getIdToken: () => Promise.resolve('token') } });
  });

  function renderComponent(onStreakUpdate?: any) {
    return render(
      <I18nextProvider i18n={i18n}>
        <EntriesPreview onStreakUpdate={onStreakUpdate} />
      </I18nextProvider>
    );
  }

  it('shows loading indicator initially', () => {
    apiSpy.mockReturnValue(new Promise(() => {}));
    renderComponent();
    expect(screen.getByText(i18n.t('common.loading'))).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    apiSpy.mockRejectedValueOnce(new Error('fail'));
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(i18n.t('errors.fetch_entries'))).toBeInTheDocument();
    });
  });

  it('shows empty state when no entries', async () => {
    apiSpy.mockResolvedValueOnce([]);
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(i18n.t('dashboard.no_entries'))).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /log mood/i })).toBeInTheDocument();
  });

  it('renders entries and toggles view all', async () => {
    apiSpy.mockResolvedValueOnce(sampleEntries);
    const onStreakUpdate = vi.fn();
    renderComponent(onStreakUpdate);
    // Wait entries to render
    await waitFor(() => {
      expect(screen.getByText('Entry 1')).toBeInTheDocument();
      expect(screen.getByText('Entry 2')).toBeInTheDocument();
    });
    // onStreakUpdate called with streak = 2
    expect(onStreakUpdate).toHaveBeenCalledWith(2);

    // If more than limitDays, view all toggle appears
    const toggleBtn = screen.getByRole('button', { name: /view all/i });
    expect(toggleBtn).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByRole('button', { name: /view less/i })).toBeInTheDocument();
  });
});
