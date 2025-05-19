// src/components/ActionButtons.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  
  return (
    <div className={`mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`}>
      <Link 
        to="/mood"
        className="px-6 py-5 text-white font-bold rounded-2xl shadow-sm transition-all duration-300 flex items-center justify-center hover:shadow-md hover:scale-[1.02] bg-gradient-primary from-primary-light to-primary-hover-light dark:from-primary-dark dark:to-primary-hover-dark"
        aria-label={t('dashboard.log_mood')}
      >
        {t('dashboard.log_mood')}
        <ArrowRight size={18} className="ml-2" />
      </Link>
      
      <Link 
        to="/breathe"
        className="px-6 py-5 text-white font-bold rounded-2xl shadow-sm transition-all duration-300 flex items-center justify-center hover:shadow-md hover:scale-[1.02] bg-gradient-primary from-primary-light to-primary-hover-light dark:from-primary-dark dark:to-primary-hover-dark"
        aria-label={t('dashboard.breathing_exercise')}
      >
        {t('dashboard.breathing_exercise')}
        <ArrowRight size={18} className="ml-2" />
      </Link>
    </div>
  );
};

export default ActionButtons;
