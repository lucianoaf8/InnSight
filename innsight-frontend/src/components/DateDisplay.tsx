// src/components/DateDisplay.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDisplayDate, getTodayDate } from '../lib/date';

interface DateDisplayProps {
  className?: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ className = '' }) => {
  const { t, i18n } = useTranslation();
  
  // Get today's date using utility function
  const today = getTodayDate();
  
  // Format date based on current language
  const formattedDate = formatDisplayDate(today, i18n.language);
  
  return (
    <p className={`text-base text-[#1F262E]/70 dark:text-[#E7ECEF]/70 ${className}`}>
      {t('dashboard.today', { date: formattedDate })}
    </p>
  );
};

export default DateDisplay;
