// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Moon, Sun } from 'lucide-react';

// Components
import DateDisplay from '../components/DateDisplay';
import DailyIntention from '../components/DailyIntention';
import ActionButtons from '../components/ActionButtons';
import EntriesPreview from '../components/EntriesPreview';

// Utils
import { apiRequest } from '../lib/api';
import { getCurrentUserToken } from '../lib/auth';
import { auth } from '../lib/firebase';

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

const DashboardPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // State
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [userName, setUserName] = useState('Friend');
  const [streak, setStreak] = useState(0);
  const [dailyQuote, setDailyQuote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [previousEntries, setPreviousEntries] = useState([]);

  // Light mode colors
  const lightColors = {
    baseBg: '#F5FAFD',   // Near-white sky tint
    primary: '#2AB3B1',  // Teal
    accent: '#F58F6C',   // Soft coral
    support: '#B8E6C1',  // Mint
    text: '#1F262E',     // Neutral charcoal
  };
  
  // Dark mode colors
  const darkColors = {
    baseBg: '#0B2540',   // Navy
    text: '#E7ECEF',     // Very light gray
    primary: '#2EC8C4',  // Bright aqua
    accent: '#C4B8FF',   // Soft lavender
    positive: '#3ED8A0', // Vivid mint
  };
  
  // Get current color scheme based on theme
  const colors = darkMode ? darkColors : lightColors;

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    
    // Update document class for Tailwind dark mode
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Toggle language
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  // Auth check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/');
      } else {
        setUserName(user.displayName || 'Friend');
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Set a random quote
        const randomIndex = Math.floor(Math.random() * selfCompassionQuotes.length);
        setDailyQuote(selfCompassionQuotes[randomIndex]);
        
        const token = await getCurrentUserToken();
        
        // Get entries
        const entriesData = await apiRequest('/entries', 'GET', null, token);
        setPreviousEntries(entriesData || []);
        
        // Calculate streak (in a real app, get this from the API)
        // For now, we'll just check consecutive days in entries
        if (entriesData && entriesData.length > 0) {
          // Simple streak calculation logic
          const sortedDates = [...new Set(entriesData.map(entry => entry.date))].sort().reverse();
          let streakCount = 1;
          
          // Count consecutive days
          for (let i = 1; i < sortedDates.length; i++) {
            const prevDate = new Date(sortedDates[i-1]);
            const currDate = new Date(sortedDates[i]);
            
            // Check if dates are consecutive
            const diffTime = Math.abs(prevDate.getTime() - currDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              streakCount++;
            } else {
              break;
            }
          }
          
          setStreak(streakCount);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  return (
    <div 
      className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`} 
      style={{ 
        backgroundColor: colors.baseBg,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Header */}
      <header 
        className="px-4 py-3 shadow-sm flex justify-between items-center"
        style={{ 
          backgroundColor: darkMode ? '#0A1D30' : 'white',
          borderBottom: darkMode ? '1px solid #15324D' : '1px solid #E5E7EB'
        }}
      >
        <div className="flex items-center">
          <h1 className="text-xl font-bold" style={{ color: colors.primary }}>
            {t('app.name')}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-opacity-10 transition-colors duration-200"
            style={{ 
              color: colors.text,
              backgroundColor: darkMode ? 'rgba(231,236,239,0.05)' : 'rgba(31,38,46,0.05)'
            }}
          >
            <Globe size={20} />
          </button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-opacity-10 transition-colors duration-200"
            style={{ 
              color: colors.text,
              backgroundColor: darkMode ? 'rgba(231,236,239,0.05)' : 'rgba(31,38,46,0.05)'
            }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4 max-w-3xl mx-auto w-full">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full mb-4" style={{ backgroundColor: colors.primary }}></div>
              <p style={{ color: colors.text }}>
                {t('common.loading')}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Greeting & Date Section with Streak */}
            <div className="mb-6 flex flex-wrap items-center justify-between">
              <div className="mr-4">
                <h2 className="text-2xl font-bold mb-1" 
                    style={{ color: colors.text }}>
                  {t('dashboard.greeting', { name: userName })}
                </h2>
                <DateDisplay darkMode={darkMode} />
              </div>
              
              {/* Streak Counter */}
              <div className="flex items-center rounded-full px-4 py-2 shadow-sm mt-2 sm:mt-0"
                   style={{ 
                     backgroundColor: darkMode ? '#0A1D30' : 'white',
                     border: `1px solid ${darkMode ? darkColors.positive : lightColors.accent}`
                   }}>
                <div className="mr-2" style={{ color: darkMode ? darkColors.positive : lightColors.accent }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium" 
                     style={{ color: darkMode ? 'rgba(231,236,239,0.7)' : 'rgba(31,38,46,0.7)' }}>
                    {t('dashboard.streak_days')}
                  </p>
                  <p className="text-xl font-bold" 
                     style={{ color: colors.text }}>
                    {streak}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quote Card */}
            <div className="mb-6 rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.01]"
                 style={{ 
                   backgroundColor: darkMode ? '#0A1D30' : 'white',
                   borderLeft: `3px solid ${colors.accent}`
                 }}>
              <div className="p-5">
                <div className="flex items-center mb-2">
                  <div className="mr-2" style={{ color: colors.accent }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <p className="font-medium text-sm" 
                     style={{ color: darkMode ? 'rgba(231,236,239,0.7)' : 'rgba(31,38,46,0.7)' }}>
                    {t('dashboard.quote_heading')}
                  </p>
                </div>
                <p className="text-base italic" 
                   style={{ color: colors.text }}>
                  "{dailyQuote}"
                </p>
              </div>
            </div>
            
            {/* Daily Intention */}
            <DailyIntention darkMode={darkMode} colors={colors} />
            
            {/* Action Buttons */}
            <ActionButtons darkMode={darkMode} colors={colors} />
            
            {/* Previous Entries */}
            <EntriesPreview 
              darkMode={darkMode} 
              colors={colors} 
              entries={previousEntries} 
            />
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
