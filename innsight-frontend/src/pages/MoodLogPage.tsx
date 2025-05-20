// src/pages/MoodLogPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowLeft, Info } from 'lucide-react';

// Hooks and utilities
import { useAuth } from '../lib/firebase';
import { apiRequest } from '../lib/api';
import { getTodayDate } from '../lib/date';

interface Emotion {
  emoji: string;
  name: string;
  description: string;
}

interface EmotionGroups {
  positive: Emotion[];
  neutral: Emotion[];
  negative: Emotion[];
}

const MoodLogPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // States
  const [selectedEmojis, setSelectedEmojis] = useState<Emotion[]>([]);
  const [journalEntry, setJournalEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [emotionCategory, setEmotionCategory] = useState<string | null>(null);
  const [animatingEmojis, setAnimatingEmojis] = useState(false);
  const [emojiAnimationComplete, setEmojiAnimationComplete] = useState({
    positive: false,
    neutral: false,
    negative: false
  });
  const [showDescriptionFor, setShowDescriptionFor] = useState<string | null>(null);

  // Emotion data
  const emotionGroups: EmotionGroups = {
    positive: [
      { emoji: '😊', name: t('emotions.happy.name'), description: t('emotions.happy.description') },
      { emoji: '😁', name: t('emotions.joyful.name'), description: t('emotions.joyful.description') },
      { emoji: '😍', name: t('emotions.loving.name'), description: t('emotions.loving.description') },
      { emoji: '🥰', name: t('emotions.adored.name'), description: t('emotions.adored.description') },
      { emoji: '😌', name: t('emotions.content.name'), description: t('emotions.content.description') },
      { emoji: '😎', name: t('emotions.confident.name'), description: t('emotions.confident.description') },
      { emoji: '🤩', name: t('emotions.excited.name'), description: t('emotions.excited.description') },
      { emoji: '😇', name: t('emotions.blessed.name'), description: t('emotions.blessed.description') },
      { emoji: '🙂', name: t('emotions.pleasant.name'), description: t('emotions.pleasant.description') },
      { emoji: '😀', name: t('emotions.cheerful.name'), description: t('emotions.cheerful.description') },
      { emoji: '😃', name: t('emotions.delighted.name'), description: t('emotions.delighted.description') },
      { emoji: '🌟', name: t('emotions.inspired.name'), description: t('emotions.inspired.description') },
      { emoji: '🥳', name: t('emotions.celebrating.name'), description: t('emotions.celebrating.description') },
      { emoji: '😌', name: t('emotions.peaceful.name'), description: t('emotions.peaceful.description') },
      { emoji: '🤗', name: t('emotions.grateful.name'), description: t('emotions.grateful.description') },
    ],
    neutral: [
      { emoji: '😐', name: t('emotions.neutral.name'), description: t('emotions.neutral.description') },
      { emoji: '😶', name: t('emotions.speechless.name'), description: t('emotions.speechless.description') },
      { emoji: '😑', name: t('emotions.expressionless.name'), description: t('emotions.expressionless.description') },
      { emoji: '🤔', name: t('emotions.thinking.name'), description: t('emotions.thinking.description') },
      { emoji: '😏', name: t('emotions.smirking.name'), description: t('emotions.smirking.description') },
      { emoji: '😯', name: t('emotions.surprised.name'), description: t('emotions.surprised.description') },
      { emoji: '😕', name: t('emotions.confused.name'), description: t('emotions.confused.description') },
      { emoji: '😒', name: t('emotions.unamused.name'), description: t('emotions.unamused.description') },
      { emoji: '🙄', name: t('emotions.eyeroll.name'), description: t('emotions.eyeroll.description') },
      { emoji: '😬', name: t('emotions.awkward.name'), description: t('emotions.awkward.description') },
      { emoji: '😴', name: t('emotions.tired.name'), description: t('emotions.tired.description') },
      { emoji: '😪', name: t('emotions.sleepy.name'), description: t('emotions.sleepy.description') },
      { emoji: '🤐', name: t('emotions.quiet.name'), description: t('emotions.quiet.description') },
      { emoji: '😮', name: t('emotions.astonished.name'), description: t('emotions.astonished.description') },
      { emoji: '🧐', name: t('emotions.curious.name'), description: t('emotions.curious.description') },
    ],
    negative: [
      { emoji: '😔', name: t('emotions.sad.name'), description: t('emotions.sad.description') },
      { emoji: '😢', name: t('emotions.crying.name'), description: t('emotions.crying.description') },
      { emoji: '😭', name: t('emotions.sobbing.name'), description: t('emotions.sobbing.description') },
      { emoji: '😡', name: t('emotions.angry.name'), description: t('emotions.angry.description') },
      { emoji: '😤', name: t('emotions.frustrated.name'), description: t('emotions.frustrated.description') },
      { emoji: '😰', name: t('emotions.anxious.name'), description: t('emotions.anxious.description') },
      { emoji: '😓', name: t('emotions.exhausted.name'), description: t('emotions.exhausted.description') },
      { emoji: '😩', name: t('emotions.weary.name'), description: t('emotions.weary.description') },
      { emoji: '😖', name: t('emotions.overwhelmed.name'), description: t('emotions.overwhelmed.description') },
      { emoji: '😨', name: t('emotions.fearful.name'), description: t('emotions.fearful.description') },
      { emoji: '😟', name: t('emotions.worried.name'), description: t('emotions.worried.description') },
      { emoji: '😣', name: t('emotions.distressed.name'), description: t('emotions.distressed.description') },
      { emoji: '😞', name: t('emotions.disappointed.name'), description: t('emotions.disappointed.description') },
      { emoji: '😫', name: t('emotions.anguished.name'), description: t('emotions.anguished.description') },
      { emoji: '🥺', name: t('emotions.vulnerable.name'), description: t('emotions.vulnerable.description') },
    ]
  };

  // Motivational messages
  const motivationalMessages = [
    t('mood.motivational.1'),
    t('mood.motivational.2'),
    t('mood.motivational.3'),
    t('mood.motivational.4'),
    t('mood.motivational.5')
  ];

  // Start animation sequence on mount
  useEffect(() => {
    if (!animatingEmojis) {
      setAnimatingEmojis(true);
      
      setTimeout(() => setEmotionCategory('positive'), 100);
      setTimeout(() => {
        setEmojiAnimationComplete(prev => ({...prev, positive: true}));
        setEmotionCategory('neutral');
      }, 800);
      setTimeout(() => {
        setEmojiAnimationComplete(prev => ({...prev, neutral: true}));
        setEmotionCategory('negative');
      }, 1500);
      setTimeout(() => {
        setEmojiAnimationComplete(prev => ({...prev, negative: true}));
      }, 2200);
    }
  }, [animatingEmojis]);

  // Handle emoji selection
  const handleEmojiSelect = (emotion: Emotion) => {
    setSelectedEmojis(prev => {
      const alreadySelected = prev.some(item => item.name === emotion.name);
      
      if (alreadySelected) {
        return prev.filter(item => item.name !== emotion.name);
      } else if (prev.length < 3) {
        return [...prev, emotion];
      }
      
      return prev;
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedEmojis.length === 0) return;
    
    setIsLoading(true);
    
    try {
      // Get token for authentication
      const token = await currentUser?.getIdToken();
      
      // Data to submit
      const data = {
        emojis: selectedEmojis.map(emotion => emotion.emoji).join(','),
        journal: journalEntry,
        date: getTodayDate(),
        time: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false}),
        period: getPeriodOfDay()
      };
      
      // API call
      await apiRequest('/log-mood', 'POST', data, token);
      
      // Select random motivational message
      const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
      setMotivationalMessage(motivationalMessages[randomIndex]);
      
      // Show success message
      setShowSuccess(true);
    } catch (error) {
      console.error('Error logging mood:', error);
      // You could add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get time of day
  const getPeriodOfDay = (): 'morning' | 'afternoon' | 'evening' => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return 'morning';
    } else if (hour >= 12 && hour < 17) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-light dark:bg-base-dark text-text-primary-light dark:text-text-primary-dark">
      {/* Header */}
      <header className="px-4 py-3 shadow-sm flex justify-between items-center bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t('common.back')}
          >
            <ArrowLeft size={20} className="text-text-primary-light dark:text-text-primary-dark" />
          </button>
          <h1 className="text-xl font-bold text-primary-light dark:text-primary-dark">
            {t('app.name')}
          </h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4 max-w-3xl mx-auto w-full">
        {showSuccess ? (
          // Success message with fireworks
          <div className="mt-6 p-6 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm animate-fadeIn text-center relative overflow-hidden">
            {/* Fireworks */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="firework" style={{ top: '10%', left: '20%' }}></div>
              <div className="firework" style={{ top: '15%', left: '80%', animationDelay: '0.3s' }}></div>
              <div className="firework" style={{ top: '25%', left: '50%', animationDelay: '0.7s' }}></div>
              <div className="firework" style={{ top: '5%', left: '35%', animationDelay: '1.1s' }}></div>
              <div className="firework" style={{ top: '20%', left: '65%', animationDelay: '1.5s' }}></div>
            </div>
            
            {/* Checkmark icon */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-support-light dark:bg-support-dark flex items-center justify-center">
              <Check size={32} className="text-white" />
            </div>
            
            {/* Celebratory message */}
            <div className="flex justify-center items-center mb-2">
              <span className="bounce-animation text-2xl mr-2">🎉</span>
              <h2 className="text-xl font-bold">
                {t('mood.log_success')}
              </h2>
              <span className="bounce-animation text-2xl ml-2" style={{ animationDelay: '0.2s' }}>🎊</span>
            </div>
            
            {/* Motivational message */}
            <p className="mb-4 text-text-secondary-light dark:text-text-secondary-dark">
              {motivationalMessage}
            </p>
            
            {/* Back button with sparkles */}
            <div className="relative inline-block">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-primary from-primary-light to-primary-hover-light dark:from-primary-dark dark:to-primary-hover-dark"
              >
                {t('common.back_to_dashboard')}
              </button>
              <span className="pulse-animation absolute -top-1 -right-2 text-xl">✨</span>
              <span className="pulse-animation absolute -top-1 -left-2 text-xl" style={{ animationDelay: '0.3s' }}>✨</span>
            </div>
          </div>
        ) : (
          // Mood logging UI
          <>
            <h2 className="text-2xl font-bold mt-4 mb-2 text-center">
              {t('mood.how_feeling')}
            </h2>
            
            <p className="text-center text-text-secondary-light dark:text-text-secondary-dark mb-6">
              {t('mood.select_emotions')}
            </p>
            
            {/* Selected Emotions Display */}
            {selectedEmojis.length > 0 && (
              <div className="mb-6 py-1 px-4 rounded-xl pulse-glow bg-support-light/10 dark:bg-support-dark/10 border border-support-light dark:border-support-dark">
                <div className="flex justify-center space-x-8 py-3">
                  {selectedEmojis.map((emotion, index) => (
                    <div 
                      key={`selected-${emotion.name}`} 
                      className="text-center bounce-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-4xl mb-1">{emotion.emoji}</div>
                      <div className="text-sm font-medium">{emotion.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Emotions */}
            <div className="mb-8">
              {/* Positive Emotions */}
              <div 
                className="mb-4"
                style={{ 
                  opacity: emotionCategory === 'positive' || emojiAnimationComplete.positive ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              >
                <h3 className="text-xs uppercase tracking-wider mb-2 text-text-secondary-light dark:text-text-secondary-dark">
                  {t('mood.emoji_positive')}
                </h3>
                
                <div className="grid grid-cols-5 gap-2">
                  {emotionGroups.positive.map((emotion, index) => (
                    <div
                      key={emotion.name}
                      className="relative"
                    >
                      <button 
                        onClick={() => handleEmojiSelect(emotion)}
                        onMouseEnter={() => setShowDescriptionFor(emotion.name)}
                        onMouseLeave={() => setShowDescriptionFor(null)}
                        className={`w-full p-3 text-center rounded-xl transition-all duration-200 fade-in-scale ${
                          selectedEmojis.some(e => e.name === emotion.name) 
                            ? 'bg-support-light/20 dark:bg-support-dark/20 border-2 border-primary-light dark:border-primary-dark scale-105' 
                            : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark'
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="text-2xl mb-1">{emotion.emoji}</div>
                        <div className="text-xs font-medium truncate">{emotion.name}</div>
                      </button>
                      
                      {/* Description tooltip */}
                      {showDescriptionFor === emotion.name && (
                        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-base-light dark:bg-base-dark shadow-lg rounded-lg border border-border-light dark:border-border-dark text-xs fade-in">
                          <div className="flex items-start">
                            <Info size={12} className="mt-0.5 mr-1 flex-shrink-0 text-primary-light dark:text-primary-dark" />
                            <p>{emotion.description}</p>
                          </div>
                          {/* Arrow pointing down */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-base-light dark:bg-base-dark border-r border-b border-border-light dark:border-border-dark"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Neutral Emotions */}
              <div 
                className="mb-4"
                style={{ 
                  opacity: emotionCategory === 'neutral' || emojiAnimationComplete.neutral ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              >
                <h3 className="text-xs uppercase tracking-wider mb-2 text-text-secondary-light dark:text-text-secondary-dark">
                  {t('mood.emoji_neutral')}
                </h3>
                
                <div className="grid grid-cols-5 gap-2">
                  {emotionGroups.neutral.map((emotion, index) => (
                    <div
                      key={emotion.name}
                      className="relative"
                    >
                      <button 
                        onClick={() => handleEmojiSelect(emotion)}
                        onMouseEnter={() => setShowDescriptionFor(emotion.name)}
                        onMouseLeave={() => setShowDescriptionFor(null)}
                        className={`w-full p-3 text-center rounded-xl transition-all duration-200 fade-in-scale ${
                          selectedEmojis.some(e => e.name === emotion.name) 
                            ? 'bg-support-light/20 dark:bg-support-dark/20 border-2 border-primary-light dark:border-primary-dark scale-105' 
                            : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark'
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="text-2xl mb-1">{emotion.emoji}</div>
                        <div className="text-xs font-medium truncate">{emotion.name}</div>
                      </button>
                      
                      {/* Description tooltip */}
                      {showDescriptionFor === emotion.name && (
                        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-base-light dark:bg-base-dark shadow-lg rounded-lg border border-border-light dark:border-border-dark text-xs fade-in">
                          <div className="flex items-start">
                            <Info size={12} className="mt-0.5 mr-1 flex-shrink-0 text-primary-light dark:text-primary-dark" />
                            <p>{emotion.description}</p>
                          </div>
                          {/* Arrow pointing down */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-base-light dark:bg-base-dark border-r border-b border-border-light dark:border-border-dark"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Negative Emotions */}
              <div 
                className="mb-4"
                style={{ 
                  opacity: emotionCategory === 'negative' || emojiAnimationComplete.negative ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              >
                <h3 className="text-xs uppercase tracking-wider mb-2 text-text-secondary-light dark:text-text-secondary-dark">
                  {t('mood.emoji_negative')}
                </h3>
                
                <div className="grid grid-cols-5 gap-2">
                  {emotionGroups.negative.map((emotion, index) => (
                    <div
                      key={emotion.name}
                      className="relative"
                    >
                      <button 
                        onClick={() => handleEmojiSelect(emotion)}
                        onMouseEnter={() => setShowDescriptionFor(emotion.name)}
                        onMouseLeave={() => setShowDescriptionFor(null)}
                        className={`w-full p-3 text-center rounded-xl transition-all duration-200 fade-in-scale ${
                          selectedEmojis.some(e => e.name === emotion.name) 
                            ? 'bg-support-light/20 dark:bg-support-dark/20 border-2 border-primary-light dark:border-primary-dark scale-105' 
                            : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark'
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="text-2xl mb-1">{emotion.emoji}</div>
                        <div className="text-xs font-medium truncate">{emotion.name}</div>
                      </button>
                      
                      {/* Description tooltip */}
                      {showDescriptionFor === emotion.name && (
                        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-base-light dark:bg-base-dark shadow-lg rounded-lg border border-border-light dark:border-border-dark text-xs fade-in">
                          <div className="flex items-start">
                            <Info size={12} className="mt-0.5 mr-1 flex-shrink-0 text-primary-light dark:text-primary-dark" />
                            <p>{emotion.description}</p>
                          </div>
                          {/* Arrow pointing down */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-base-light dark:bg-base-dark border-r border-b border-border-light dark:border-border-dark"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Journal Entry */}
            {selectedEmojis.length > 0 && (
              <div className="mb-6 fade-in">
                <label className="block text-sm font-medium mb-2">
                  {t('mood.why_feeling')}
                </label>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder={t('mood.journal_placeholder')}
                  className="w-full p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary-light/40 dark:focus:ring-primary-dark/40 resize-none"
                  rows={4}
                ></textarea>
              </div>
            )}
            
            {/* Save Button */}
            <button 
              onClick={handleSubmit}
              disabled={selectedEmojis.length === 0 || isLoading}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                selectedEmojis.length > 0 && !isLoading
                  ? 'text-white bg-gradient-primary from-primary-light to-primary-hover-light dark:from-primary-dark dark:to-primary-hover-dark hover:scale-[1.02]' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? t('common.saving') : t('mood.save')}
            </button>
          </>
        )}
      </main>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(184, 230, 193, 0.4);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(184, 230, 193, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(184, 230, 193, 0);
          }
        }
        
        @keyframes firework {
          0% {
            transform: translate(-50%, -50%);
            width: 0px;
            height: 0px;
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
        
        @keyframes fireworkInner {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        .fade-in-scale {
          animation: fadeInScale 0.3s both;
        }
        
        .fade-in {
          animation: fadeIn 0.3s forwards;
        }
        
        .bounce-in {
          animation: bounceIn 0.5s forwards;
        }
        
        .pulse-glow {
          animation: pulseGlow 2s infinite;
        }
        
        .bounce-animation {
          animation: bounce 1s infinite;
        }
        
        .pulse-animation {
          animation: pulse 1.5s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s forwards;
        }
        
        .firework {
          position: absolute;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: firework 1s ease-out infinite;
        }
        
        .firework::before, .firework::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle, var(--color-primary), var(--color-support), var(--color-accent), transparent 70%);
          border-radius: 50%;
          transform: scale(0);
          animation: fireworkInner 1s ease-out infinite;
        }
        
        .firework::after {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default MoodLogPage;