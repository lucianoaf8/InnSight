// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Flame } from 'lucide-react';

// Components
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import DailyIntention from '../components/DailyIntention';
import ActionButtons from '../components/ActionButtons';
import DateDisplay from '../components/DateDisplay';
import EntriesPreview from '../components/EntriesPreview';

// Hooks and utilities
import { useAuth } from '../lib/firebase';

// Self-compassion quotes for daily reflection
const selfCompassionQuotes = [
  "Be kind to yourself, for you are doing the best you can with what you know right now.",
  "You are enough, just as you are. You don't have to be perfect to be worthy of love and belonging.",
  "Treat yourself with the same kindness and compassion you would offer to a good friend.",
  "Your struggles don't define you; they're just part of your journey.",
  "Remember that everyone makes mistakes. It's how we learn and grow.",
  "You can be both a masterpiece and a work in progress at the same time.",
  "Self-compassion turns our inner voice from a critic to a supportive friend.",
  "Healing doesn't mean the damage never existed. It means the damage no longer controls your life.",
  "Honor your feelings and needs without judgment. They're valid and important.",
  "When you accept yourself exactly as you are, life gets a lot easier."
];

const Dashboard = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // States
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dailyQuote, setDailyQuote] = useState('');
  const [streak, setStreak] = useState(0);

  // Update streak from entries data
  const handleStreakUpdate = (newStreak: number) => {
    setStreak(newStreak);
  };

  // Authentication check
  useEffect(() => {
    // If not loading and no user is logged in, redirect to welcome page
    if (!loading && !currentUser) {
      navigate('/');
    }
  }, [currentUser, loading, navigate]);

  // Load dashboard data
  useEffect(() => {
    if (currentUser) {
      const loadDashboardData = async () => {
        setIsLoadingData(true);
        try {
          // Set a random quote
          const randomIndex = Math.floor(Math.random() * selfCompassionQuotes.length);
          setDailyQuote(selfCompassionQuotes[randomIndex]);
          
          // Entries and streak calculation will be handled by EntriesPreview component
          setIsLoadingData(false);
        } catch (error) {
          console.error('Error loading dashboard data:', error);
          setIsLoadingData(false);
        }
      };
      
      loadDashboardData();
    }
  }, [currentUser]);

  // Show loading state while authentication is being determined
  if (loading) {
    return <div className="flex justify-center items-center h-screen">{t('common.loading')}</div>;
  }

  // If user isn't authenticated, don't render dashboard content (will redirect via useEffect)
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5FAFD] dark:bg-[#0B2540] font-sans">
      {/* Header */}
      <header className="px-4 py-3 shadow-sm flex justify-between items-center bg-white dark:bg-[#0A1D30] border-b border-gray-200 dark:border-[#15324D]">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-[#2AB3B1] dark:text-[#2EC8C4]">
            {t('app.name')}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <LanguageSelector className="mr-2" />
          <ThemeToggle />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4 max-w-3xl mx-auto w-full">
        {isLoadingData ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full mb-4 bg-[#2AB3B1] dark:bg-[#2EC8C4]"></div>
              <p className="text-[#1F262E] dark:text-[#E7ECEF]">
                {t('common.loading')}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Greeting & Date Section with Streak */}
            <div className="mb-6 flex flex-wrap items-center justify-between">
              <div className="mr-4">
                <h2 className="text-2xl font-bold mb-1 text-[#1F262E] dark:text-[#E7ECEF]">
                  {t('dashboard.greeting', { name: currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : t('common.user')) })}
                </h2>
                <DateDisplay className="text-base text-[#1F262E]/70 dark:text-[#E7ECEF]/70" />
              </div>
              
              {/* Streak Counter */}
              <div className="flex items-center rounded-full px-4 py-2 shadow-sm mt-2 sm:mt-0 bg-white dark:bg-[#0A1D30] border border-[#F58F6C] dark:border-[#3ED8A0]">
                <Flame size={18} className="mr-2 text-[#F58F6C] dark:text-[#3ED8A0]" />
                <div>
                  <p className="text-xs font-medium text-[#1F262E]/70 dark:text-[#E7ECEF]/70">
                    {t('dashboard.streak_days')}
                  </p>
                  <p className="text-xl font-bold text-[#1F262E] dark:text-[#E7ECEF]">
                    {streak}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quote Card */}
            <div className="mb-6 rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 hover:scale-[1.01] bg-white dark:bg-[#0A1D30] border-l-[3px] border-[#F58F6C] dark:border-[#C4B8FF]">
              <div className="p-5">
                <div className="flex items-center mb-2">
                  <Calendar size={18} className="mr-2 text-[#F58F6C] dark:text-[#C4B8FF]" />
                  <p className="font-medium text-sm text-[#1F262E]/70 dark:text-[#E7ECEF]/70">
                    {t('dashboard.quote_heading')}
                  </p>
                </div>
                <p className="text-base italic text-[#1F262E] dark:text-[#E7ECEF]">
                  "{dailyQuote}"
                </p>
              </div>
            </div>
            
            {/* Daily Intention */}
            <DailyIntention className="mb-6" />
            
            {/* Action Buttons */}
            <ActionButtons className="mb-8" />
            
            {/* Previous Entries */}
            <EntriesPreview onStreakUpdate={handleStreakUpdate} />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;