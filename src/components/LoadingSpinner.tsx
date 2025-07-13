'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, TrendingUp } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'dots' | 'pulse' | 'branded';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  text,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`bg-primary dark:bg-blue-400 rounded-full ${
                size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
              }`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        {text && (
          <span className={`ml-3 text-gray-600 dark:text-gray-400 ${textSizeClasses[size]}`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.div
          className={`bg-primary dark:bg-blue-400 rounded-full ${sizeClasses[size]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {text && (
          <span className={`ml-3 text-gray-600 dark:text-gray-400 ${textSizeClasses[size]}`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'branded') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <motion.div
          className={`text-primary dark:text-blue-400 ${sizeClasses[size]}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <TrendingUp className="w-full h-full" />
        </motion.div>
        {text && (
          <span className={`mt-2 text-gray-600 dark:text-gray-400 ${textSizeClasses[size]}`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`text-primary dark:text-blue-400 ${sizeClasses[size]}`} />
      </motion.div>
      {text && (
        <span className={`ml-3 text-gray-600 dark:text-gray-400 ${textSizeClasses[size]}`}>
          {text}
        </span>
      )}
    </div>
  );
}

// Full screen loading component
export function FullScreenLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner variant="branded" size="lg" />
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">{text}</p>
        <div className="mt-2 flex justify-center">
          <LoadingSpinner variant="dots" size="sm" />
        </div>
      </div>
    </div>
  );
}

// Inline loading component
export function InlineLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner variant="default" size="md" text={text} />
    </div>
  );
} 