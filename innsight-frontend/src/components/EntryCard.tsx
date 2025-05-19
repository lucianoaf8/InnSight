// src/components/EntryCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface EntryCardProps {
  /**
   * Date string in YYYY-MM-DD format
   * Used for identification and grouping but not directly displayed
   */
  date: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  emojis: string;
  journal: string;
  className?: string;
}

const EntryCard: React.FC<EntryCardProps> = ({ 
  date, // Used for key identification but not directly displayed
  time, 
  period, 
  emojis, 
  journal,
  className = ''
}) => {
  const { t } = useTranslation();
  
  // Render emoji from the comma-separated string
  const renderEmojis = (emojiString: string) => {
    if (!emojiString) return '';
    return emojiString.split(',').join(' ');
  };

  // Get a mood summary based on emojis
  const getMoodSummary = (emojiString: string) => {
    if (!emojiString) return '';
    
    const emojis = emojiString.split(',');
    
    // Simple categorization
    if (emojis.some(e => ['😊', '😁', '😀', '🥰', '😌', '😎', '🔆'].includes(e))) {
      return '◆ ' + t('mood.summary.positive');
    } else if (emojis.some(e => ['😔', '😢', '😭', '😡', '😤', '😰'].includes(e))) {
      return '◆ ' + t('mood.summary.challenging');
    } else {
      return '◆ ' + t('mood.summary.neutral');
    }
  };
  
  // Get border color class based on emoji mood
  const getMoodBorderColorClass = (emojiString: string) => {
    if (!emojiString) return 'border-[#2AB3B1] dark:border-[#2EC8C4]';

    const emojis = emojiString.split(',');
    
    // Different colors for different moods
    if (emojis.some(e => ['😊', '😁', '😀', '🥰', '😌', '😎', '🔆'].includes(e))) {
      return 'border-[#B8E6C1] dark:border-[#3ED8A0]'; // Positive mood
    } else if (emojis.some(e => ['😔', '😢', '😭', '😡', '😤', '😰'].includes(e))) {
      return 'border-[#F58F6C] dark:border-[#C4B8FF]'; // Challenging mood
    } else {
      return 'border-[#2AB3B1] dark:border-[#2EC8C4]'; // Neutral mood
    }
  };
  
  // Get period icon
  const getPeriodIcon = (periodValue: string) => {
    switch(periodValue) {
      case 'morning':
        return '🌅';
      case 'afternoon':
        return '☀️';
      case 'evening':
        return '🌙';
      default:
        return '⏰';
    }
  };
  
  // Get period label
  const getPeriodLabel = (periodValue: string) => {
    return t(`dashboard.${periodValue}`);
  };
  
  return (
    <div 
      className={`p-5 rounded-2xl shadow-sm transition-transform duration-200 hover:scale-[1.01] mb-3 bg-white dark:bg-[#0A1D30] border-l-[3px] ${getMoodBorderColorClass(emojis)} ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="sm:w-1/4 mb-2 sm:mb-0">
          <div className="flex items-center">
            <p className="text-sm font-medium mr-2 text-[#1F262E]/70 dark:text-[#E7ECEF]/70">
              {time}
            </p>
            <span className="text-sm" title={getPeriodLabel(period)}>
              {getPeriodIcon(period)}
            </span>
          </div>
          <p className="text-xs text-[#1F262E]/70 dark:text-[#E7ECEF]/70">
            {getMoodSummary(emojis)}
          </p>
        </div>
        <div className="sm:w-1/4 mb-2 sm:mb-0">
          <p className="text-2xl">{renderEmojis(emojis)}</p>
        </div>
        <div className="sm:w-2/4">
          <p className="text-sm text-[#1F262E] dark:text-[#E7ECEF]">
            {journal ? `"${journal}"` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
