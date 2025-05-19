// src/components/DailyIntention.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, X, Check } from 'lucide-react';

// API and auth imports
import { apiRequest } from '../lib/api';
import { useAuth } from '../lib/firebase';

interface DailyIntentionProps {
  className?: string;
}

const DailyIntention: React.FC<DailyIntentionProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [dailyIntention, setDailyIntention] = useState('');
  const [isEditingIntention, setIsEditingIntention] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Fetch the daily intention on component mount
  useEffect(() => {
    const fetchIntention = async () => {
      if (!currentUser) return;
      
      setIsLoading(true);
      try {
        const token = await currentUser.getIdToken();
        const response = await apiRequest('/intention/today', 'GET', null, token);
        setDailyIntention(response?.intention || '');
        setHasError(false);
      } catch (error) {
        console.error('Error fetching daily intention:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIntention();
  }, [currentUser]);

  // Handle intention submission
  const handleIntentionSubmit = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      const token = await currentUser.getIdToken();
      await apiRequest('/save-intention', 'POST', { intention: dailyIntention }, token);
      setIsEditingIntention(false);
      setHasError(false);
    } catch (error) {
      console.error('Error saving intention:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`mb-6 rounded-2xl shadow-sm overflow-hidden bg-white dark:bg-[#0A1D30] border ${isEditingIntention ? 'border-[#2AB3B1] dark:border-[#2EC8C4]' : 'border-gray-200 dark:border-[#15324D]'} ${className}`}>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-lg text-[#1F262E] dark:text-[#E7ECEF]">
            {t('dashboard.daily_intention')}
          </h3>
          {!isEditingIntention && dailyIntention && (
            <button 
              onClick={() => setIsEditingIntention(true)}
              className="text-sm flex items-center gap-1 px-3 py-1 rounded-full transition-colors duration-200 text-[#1F262E] dark:text-[#E7ECEF] bg-[rgba(31,38,46,0.05)] dark:bg-[rgba(231,236,239,0.05)]"
              disabled={isLoading}
            >
              <Edit size={14} />
              {t('dashboard.edit_intention')}
            </button>
          )}
        </div>
        
        {isEditingIntention || !dailyIntention ? (
          <div className="mt-2">
            <input 
              type="text"
              value={dailyIntention}
              onChange={(e) => setDailyIntention(e.target.value)}
              placeholder={t('dashboard.set_intention')}
              className="w-full p-4 border rounded-xl focus:outline-none transition-all duration-200 border-gray-200 dark:border-[#15324D] bg-[#F5FAFD] dark:bg-[#0B2540] text-[#1F262E] dark:text-[#E7ECEF] focus:ring-2 focus:ring-[#2AB3B1]/40 dark:focus:ring-[#2EC8C4]/40"
              disabled={isLoading}
            />
            <div className="mt-4 flex justify-end">
              {isEditingIntention && (
                <button 
                  onClick={() => setIsEditingIntention(false)}
                  className="mr-2 px-4 py-2 rounded-xl flex items-center gap-1 transition-colors duration-200 bg-[#F3F4F6] dark:bg-[#0B2540] text-[#1F262E] dark:text-[#E7ECEF]"
                  disabled={isLoading}
                >
                  <X size={16} />
                  {t('common.cancel')}
                </button>
              )}
              <button 
                onClick={handleIntentionSubmit}
                className="px-4 py-2 text-white rounded-xl flex items-center gap-1 transition-transform duration-200 hover:scale-[1.02] bg-gradient-to-br from-[#2AB3B1] to-[#239997] dark:from-[#2EC8C4] dark:to-[#26AEA9]"
                disabled={isLoading}
              >
                <Check size={16} />
                {isLoading ? t('common.saving') : t('common.save')}
              </button>
            </div>
            {hasError && (
              <p className="mt-2 text-sm text-red-500">
                {t('errors.save_failed')}
              </p>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#F5FAFD] dark:bg-[#0B2540]">
            <p className="text-[#1F262E] dark:text-[#E7ECEF]">
              {dailyIntention}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyIntention;
