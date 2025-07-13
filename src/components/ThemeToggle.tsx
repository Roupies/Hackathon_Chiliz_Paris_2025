'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useButtonHaptics } from '@/hooks/useHapticFeedback';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { onPress } = useButtonHaptics();

  const toggleTheme = () => {
    onPress();
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-5 h-5" />;
    }
    return resolvedTheme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />;
  };

  const getLabel = () => {
    if (theme === 'system') return 'System';
    return theme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
    >
      <div className="transition-transform duration-200 hover:scale-110">
        {getIcon()}
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {getLabel()}
      </span>
    </button>
  );
} 