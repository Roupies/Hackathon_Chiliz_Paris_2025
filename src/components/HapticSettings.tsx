'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Vibrate, VolumeX, Settings } from 'lucide-react';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

export default function HapticSettings() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const { isSupported, triggerImpact } = useHapticFeedback({ enabled: isEnabled });

  useEffect(() => {
    // Load haptic preference from localStorage
    const savedPreference = localStorage.getItem('hapticEnabled');
    if (savedPreference !== null) {
      setIsEnabled(JSON.parse(savedPreference));
    }
  }, []);

  const toggleHaptic = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('hapticEnabled', JSON.stringify(newValue));
    
    // Test haptic feedback when enabling
    if (newValue && isSupported) {
      triggerImpact('medium');
    }
  };

  const testHaptic = () => {
    if (isEnabled && isSupported) {
      triggerImpact('medium');
    }
  };

  if (!isSupported) {
    return null; // Don't show settings if haptic feedback is not supported
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-sm text-gray-600 dark:text-gray-400">Haptic</span>
      </button>

      {showSettings && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[200px] z-50"
        >
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Haptic Feedback
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isEnabled ? (
                  <Vibrate className="w-4 h-4 text-primary dark:text-blue-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {isEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              
              <button
                onClick={toggleHaptic}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isEnabled
                    ? 'bg-primary dark:bg-blue-600'
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {isEnabled && (
              <button
                onClick={testHaptic}
                className="w-full px-3 py-2 text-sm bg-primary/10 dark:bg-blue-600/10 text-primary dark:text-blue-400 rounded-lg hover:bg-primary/20 dark:hover:bg-blue-600/20 transition-colors"
              >
                Test Haptic
              </button>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Haptic feedback enhances touch interactions with subtle vibrations.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Simple toggle component for inline use
export function HapticToggle() {
  const [isEnabled, setIsEnabled] = useState(true);
  const { isSupported, triggerImpact } = useHapticFeedback({ enabled: isEnabled });

  useEffect(() => {
    const savedPreference = localStorage.getItem('hapticEnabled');
    if (savedPreference !== null) {
      setIsEnabled(JSON.parse(savedPreference));
    }
  }, []);

  const toggleHaptic = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('hapticEnabled', JSON.stringify(newValue));
    
    if (newValue && isSupported) {
      triggerImpact('light');
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Vibrate className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <span className="text-sm text-gray-700 dark:text-gray-300">Haptic Feedback</span>
      </div>
      
      <button
        onClick={toggleHaptic}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isEnabled
            ? 'bg-primary dark:bg-blue-600'
            : 'bg-gray-200 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
} 