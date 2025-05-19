// src/lib/date.ts
/**
 * Date utility functions for InnSight
 */

/**
 * Returns today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  const now = new Date();
  return now.toISOString().split("T")[0]; // returns YYYY-MM-DD
};

/**
 * Formats a date string into a localized, human-readable format
 * @param dateString - A date string in YYYY-MM-DD format
 * @param locale - Optional locale string (e.g., 'en', 'pt-BR')
 * @returns A formatted date string
 */
export const formatDisplayDate = (dateString: string, locale: string = 'en'): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(
    locale === 'pt' ? 'pt-BR' : 'en-US', 
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );
};

/**
 * Formats a date string into a shorter format for the entries list
 * @param dateString - A date string in YYYY-MM-DD format
 * @param locale - Optional locale string (e.g., 'en', 'pt-BR')
 * @returns A formatted short date string
 */
export const formatShortDate = (dateString: string, locale: string = 'en'): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(
    locale === 'pt' ? 'pt-BR' : 'en-US', 
    {
      weekday: "short",
      month: "short",
      day: "numeric"
    }
  );
};

/**
 * Formats a time string for display
 * @param timeString - A time string in HH:MM format
 * @param locale - Optional locale string
 * @returns A formatted time string
 */
export const formatTime = (timeString: string, locale: string = 'en'): string => {
  // If needed, can enhance this to handle different localized time formats
  return timeString;
};

/**
 * Determines the period of day (morning, afternoon, evening) based on time
 * @param timeString - A time string in HH:MM format
 * @returns The period of day
 */
export const getPeriodOfDay = (timeString: string): 'morning' | 'afternoon' | 'evening' => {
  const hour = parseInt(timeString.split(':')[0], 10);
  
  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};

/**
 * Checks if a date is today
 * @param dateString - A date string in YYYY-MM-DD format
 * @returns Boolean indicating if the date is today
 */
export const isToday = (dateString: string): boolean => {
  const today = getTodayDate();
  return dateString === today;
};

/**
 * Calculates the difference in days between two dates
 * @param date1 - First date string in YYYY-MM-DD format
 * @param date2 - Second date string in YYYY-MM-DD format
 * @returns Number of days between the dates
 */
export const daysBetweenDates = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
