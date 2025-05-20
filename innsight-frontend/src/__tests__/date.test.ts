/** @vitest-environment node */
import { describe, it, expect } from 'vitest';
import {
  getTodayDate,
  formatDisplayDate,
  formatShortDate,
  formatTime,
  getPeriodOfDay,
  isToday,
  daysBetweenDates
} from '../lib/date';

describe('Date Utils', () => {
  it('getTodayDate returns YYYY-MM-DD format', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(getTodayDate()).toBe(today);
  });

  it('formatDisplayDate formats date according to locale', () => {
    const date = '2025-01-10';
    const en = formatDisplayDate(date, 'en');
    expect(typeof en).toBe('string');
    const pt = formatDisplayDate(date, 'pt');
    expect(typeof pt).toBe('string');
    // For pt locale, ensure month name appears in Portuguese
    expect(pt.toLowerCase()).toContain('janeiro');
  });

  it('formatShortDate returns short date string', () => {
    const date = '2025-02-14';
    const en = formatShortDate(date, 'en');
    expect(typeof en).toBe('string');
    const pt = formatShortDate(date, 'pt');
    expect(typeof pt).toBe('string');
  });

  it('formatTime returns same string', () => {
    const time = '12:34';
    expect(formatTime(time)).toBe(time);
    expect(formatTime(time, 'pt')).toBe(time);
  });

  it('getPeriodOfDay returns correct period', () => {
    expect(getPeriodOfDay('05:00')).toBe('morning');
    expect(getPeriodOfDay('11:59')).toBe('morning');
    expect(getPeriodOfDay('12:00')).toBe('afternoon');
    expect(getPeriodOfDay('16:59')).toBe('afternoon');
    expect(getPeriodOfDay('17:00')).toBe('evening');
    expect(getPeriodOfDay('23:59')).toBe('evening');
    expect(getPeriodOfDay('00:00')).toBe('evening');
  });

  it('isToday returns true for today and false otherwise', () => {
    const today = getTodayDate();
    expect(isToday(today)).toBe(true);
    expect(isToday('1900-01-01')).toBe(false);
  });

  it('daysBetweenDates calculates correct differences', () => {
    expect(daysBetweenDates('2025-01-01', '2025-01-02')).toBe(1);
    expect(daysBetweenDates('2025-01-02', '2025-01-01')).toBe(1);
    expect(daysBetweenDates('2025-01-01', '2025-01-10')).toBe(9);
    expect(daysBetweenDates('2025-02-28', '2025-03-01')).toBe(1);
  });
});
