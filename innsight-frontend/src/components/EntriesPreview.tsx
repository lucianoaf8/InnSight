// src/components/EntriesPreview.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/firebase';
import { apiRequest } from '../lib/api';

import EntryCard from './EntryCard';
import { formatShortDate } from '../lib/date';

interface EntryData {
  date: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  emojis: string;
  journal: string;
}

interface EntriesPreviewProps {
  className?: string;
  limitDays?: number;
  onStreakUpdate?: (newStreak: number) => void;
}

const EntriesPreview: React.FC<EntriesPreviewProps> = ({ 
  className = '',
  limitDays = 2,
  onStreakUpdate
}) => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState<EntryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllEntries, setShowAllEntries] = useState(false);
  
  // Fetch entries from API
  useEffect(() => {
    const fetchEntries = async () => {
      if (currentUser) {
        setIsLoading(true);
        try {
          const token = await currentUser.getIdToken();
          const entriesData = await apiRequest('/entries', 'GET', null, token);
          setEntries(entriesData || []);
          
          // Calculate streak based on consecutive days with entries
          if (entriesData && entriesData.length > 0 && onStreakUpdate) {
            // Get unique dates and sort them
            const sortedDates = [...new Set(entriesData.map((entry: EntryData) => entry.date))].sort().reverse();
            let streakCount = 1;
            
            // Count consecutive days
            for (let i = 1; i < sortedDates.length; i++) {
              const prevDate = new Date(sortedDates[i-1] as string);
              const currDate = new Date(sortedDates[i] as string);
              
              // Check if dates are consecutive
              const diffTime = Math.abs(prevDate.getTime() - currDate.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              if (diffDays === 1) {
                streakCount++;
              } else {
                break;
              }
            }
            
            // Update streak via callback
            onStreakUpdate(streakCount);
          }
        } catch (error) {
          console.error('Error fetching entries:', error);
          setError(t('errors.fetch_entries'));
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchEntries();
  }, [currentUser, t, onStreakUpdate]);
  
  // Toggle showing all entries
  const toggleShowAllEntries = () => {
    setShowAllEntries(!showAllEntries);
  };
  
  // Group entries by date
  const groupEntriesByDate = () => {
    const grouped: { [key: string]: EntryData[] } = {};
    
    entries.forEach(entry => {
      if (!grouped[entry.date]) {
        grouped[entry.date] = [];
      }
      grouped[entry.date].push(entry);
    });
    
    return Object.entries(grouped)
      .map(([date, entries]) => ({
        date,
        entries: entries.sort((a, b) => b.time.localeCompare(a.time)) // Sort by time descending
      }))
      .sort((a, b) => b.date.localeCompare(a.date)); // Sort by date descending
  };
  
  // Get entries to display based on show all state
  const getEntriesToDisplay = () => {
    const grouped = groupEntriesByDate();
    if (showAllEntries) {
      return grouped;
    } else {
      return grouped.slice(0, limitDays); // Show limited days
    }
  };
  
  if (isLoading) {
    return (
      <div className={`mb-4 ${className}`}>
        <div className="p-5 rounded-2xl flex items-center justify-center text-center bg-white dark:bg-[#0A1D30]">
          <p className="text-[#1F262E]/70 dark:text-[#E7ECEF]/70">
            {t('common.loading')}
          </p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`mb-4 ${className}`}>
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A1D30] border-l-[3px] border-red-400 dark:border-red-500">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#1F262E] dark:text-[#E7ECEF]">
          {t('dashboard.previous_entries')}
        </h3>
        
        {groupEntriesByDate().length > limitDays && (
          <button 
            onClick={toggleShowAllEntries}
            className="text-sm flex items-center px-3 py-1 rounded-full transition-colors duration-200 text-[#2AB3B1] dark:text-[#2EC8C4] bg-[rgba(42,179,177,0.1)] dark:bg-[rgba(46,200,196,0.1)]"
          >
            {showAllEntries ? t('common.view_less') : t('common.view_all')}
            <ChevronRight size={16} className="ml-1" />
          </button>
        )}
      </div>
      
      {entries.length > 0 ? (
        <div className="space-y-6">
          {getEntriesToDisplay().map(({ date, entries }) => (
            <div key={date} className="mb-2">
              <div className="mb-2">
                <h4 className="text-md font-bold text-[#1F262E] dark:text-[#E7ECEF]">
                  {formatShortDate(date, i18n.language)}
                </h4>
              </div>
              
              <div className="space-y-3">
                {entries.map((entry, entryIndex) => (
                  <EntryCard
                    key={`${date}-${entryIndex}`}
                    date={entry.date}
                    time={entry.time}
                    period={entry.period}
                    emojis={entry.emojis}
                    journal={entry.journal}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5 rounded-2xl flex flex-col items-center justify-center text-center bg-white dark:bg-[#0A1D30] border-l-[3px] border-[#2AB3B1] dark:border-[#2EC8C4]">
          <p className="mb-2 text-[#1F262E]/70 dark:text-[#E7ECEF]/70">
            {t('dashboard.no_entries')}
          </p>
          <Link 
            to="/mood"
            className="mt-2 px-4 py-2 text-white rounded-xl flex items-center gap-1 transition-transform duration-200 hover:scale-[1.02] bg-gradient-to-br from-[#2AB3B1] to-[#239997] dark:from-[#2EC8C4] dark:to-[#26AEA9]"
          >
            {t('dashboard.log_mood')}
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default EntriesPreview;
