/** @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import EntryCard from '../components/EntryCard';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';

describe('EntryCard Component', () => {
  const baseProps = {
    date: '2025-01-01',
    time: '08:30',
    journal: 'Test journal entry',
  };

  beforeEach(() => {
    // Polyfill localStorage for i18n
    if (typeof globalThis.localStorage === 'undefined') {
      Object.defineProperty(globalThis, 'localStorage', {
        value: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      });
    }
    vi.clearAllMocks();
  });

  it('renders time, emojis, and journal correctly for positive mood', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <EntryCard {...baseProps} period="morning" emojis="😊,😎" />
      </I18nextProvider>
    );
    // Time displayed
    expect(screen.getByText(baseProps.time)).toBeInTheDocument();
    // Emoji string rendered with spaces
    expect(screen.getByText('😊 😎')).toBeInTheDocument();
    // Journal wrapped
    expect(screen.getByText(`"${baseProps.journal}"`)).toBeInTheDocument();
    // Mood summary positive
    expect(screen.getByText(/◆ mood\.summary\.positive/)).toBeInTheDocument();
    // Border color class for positive
    const card = screen.getByText(`"${baseProps.journal}"`).closest('div');
    expect(card).toHaveClass('border-support-light');
  });

  it('renders correct icon and label for periods', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <EntryCard {...baseProps} period="afternoon" emojis="😀" />
      </I18nextProvider>
    );
    // Icon for afternoon ☀️
    expect(screen.getByText('☀️')).toBeInTheDocument();
    // Summary uses positive key
    expect(screen.getByText(/◆ mood\.summary\.positive/)).toBeInTheDocument();
  });

  it('renders challenging mood correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <EntryCard {...baseProps} period="evening" emojis="😢,😡" />
      </I18nextProvider>
    );
    expect(screen.getByText(/◆ mood\.summary\.challenging/)).toBeInTheDocument();
    const card = screen.getByText(/◆ mood\.summary\.challenging/).closest('div');
    expect(card).toHaveClass('border-accent-light');
  });

  it('renders neutral mood correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <EntryCard {...baseProps} period="evening" emojis="🤔" />
      </I18nextProvider>
    );
    expect(screen.getByText(/◆ mood\.summary\.neutral/)).toBeInTheDocument();
    const card = screen.getByText(/◆ mood\.summary\.neutral/).closest('div');
    expect(card).toHaveClass('border-primary-light');
  });

  it('handles empty emojis string gracefully', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <EntryCard {...baseProps} period="morning" emojis="" />
      </I18nextProvider>
    );
    // No emojis rendered
    expect(screen.queryByText(' ')).not.toBeInTheDocument();
    // Summary empty
    expect(screen.queryByText(/◆/)).not.toBeInTheDocument();
  });

  it('accepts additional className prop', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <EntryCard {...baseProps} period="morning" emojis="😊" className="extra" />
      </I18nextProvider>
    );
    const card = screen.getByText(/◆/).closest('div');
    expect(card).toHaveClass('extra');
  });
});
