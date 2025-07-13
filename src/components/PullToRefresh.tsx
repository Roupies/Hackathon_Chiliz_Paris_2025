'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, RefreshCw, CheckCircle } from 'lucide-react';
import { usePullToRefreshWithScroll } from '@/hooks/usePullToRefresh';
import { useSwipeHaptics, useButtonHaptics } from '@/hooks/useHapticFeedback';
import LoadingSpinner from './LoadingSpinner';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
  resistance?: number;
  enabled?: boolean;
}

export default function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  resistance = 2.5,
  enabled = true
}: PullToRefreshProps) {
  const { onSwipeStart, onSwipeEnd } = useSwipeHaptics();
  const { onSuccess } = useButtonHaptics();
  
  const {
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress,
    bindTouchEvents
  } = usePullToRefreshWithScroll({
    threshold,
    onRefresh: async () => {
      await onRefresh();
      onSuccess(); // Haptic feedback on successful refresh
    },
    resistance,
    enabled
  });

  // Enhanced touch events with haptic feedback
  const enhancedTouchEvents = {
    onTouchStart: (e: React.TouchEvent) => {
      bindTouchEvents.onTouchStart(e);
      if (enabled && window.scrollY === 0) {
        onSwipeStart();
      }
    },
    onTouchMove: bindTouchEvents.onTouchMove,
    onTouchEnd: (e: React.TouchEvent) => {
      const wasTriggered = pullProgress >= 1;
      bindTouchEvents.onTouchEnd(e);
      if (wasTriggered) {
        onSwipeEnd();
      }
    }
  };

  const getIcon = () => {
    if (isRefreshing) {
      return <LoadingSpinner variant="default" size="sm" />;
    }
    
    if (pullProgress >= 1) {
      return <RefreshCw className="w-5 h-5" />;
    }
    
    return <ArrowDown className="w-5 h-5" />;
  };

  const getMessage = () => {
    if (isRefreshing) {
      return 'Refreshing...';
    }
    
    if (pullProgress >= 1) {
      return 'Release to refresh';
    }
    
    return 'Pull to refresh';
  };

  return (
    <div 
      className="relative overflow-hidden"
      {...enhancedTouchEvents}
    >
      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {(isPulling || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ 
              opacity: 1, 
              y: Math.min(pullDistance - 60, 0),
              scale: Math.min(pullProgress * 1.2 + 0.8, 1.2)
            }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-4"
          >
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
              <motion.div
                animate={{ 
                  rotate: pullProgress >= 1 ? 180 : 0,
                  scale: isRefreshing ? 1 : pullProgress * 0.3 + 0.7
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-primary dark:text-blue-400"
              >
                {getIcon()}
              </motion.div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {getMessage()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <AnimatePresence>
        {isPulling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-10"
          >
            <div className="h-1 bg-gray-200 dark:bg-gray-700">
              <motion.div
                className="h-full bg-primary dark:bg-blue-400"
                animate={{ width: `${pullProgress * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        animate={{ 
          y: isPulling ? pullDistance : 0,
          transition: { type: 'spring', stiffness: 300, damping: 30 }
        }}
        className="relative z-0"
      >
        {children}
      </motion.div>

      {/* Refresh success indicator */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex items-center space-x-2 bg-green-500 text-white rounded-full px-4 py-2 shadow-lg">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Refreshed!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simplified version for basic use cases
export function SimplePullToRefresh({
  onRefresh,
  children,
  enabled = true
}: {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  enabled?: boolean;
}) {
  const { onSwipeStart, onSwipeEnd } = useSwipeHaptics();
  const { onSuccess } = useButtonHaptics();
  
  const {
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress,
    bindTouchEvents
  } = usePullToRefreshWithScroll({
    threshold: 60,
    onRefresh: async () => {
      await onRefresh();
      onSuccess();
    },
    resistance: 2,
    enabled
  });

  const enhancedTouchEvents = {
    onTouchStart: (e: React.TouchEvent) => {
      bindTouchEvents.onTouchStart(e);
      if (enabled && window.scrollY === 0) {
        onSwipeStart();
      }
    },
    onTouchMove: bindTouchEvents.onTouchMove,
    onTouchEnd: (e: React.TouchEvent) => {
      const wasTriggered = pullProgress >= 1;
      bindTouchEvents.onTouchEnd(e);
      if (wasTriggered) {
        onSwipeEnd();
      }
    }
  };

  return (
    <div className="relative" {...enhancedTouchEvents}>
      {/* Simple indicator */}
      {(isPulling || isRefreshing) && (
        <div 
          className="absolute top-0 left-0 right-0 z-10 flex justify-center py-2"
          style={{ transform: `translateY(${Math.min(pullDistance - 40, 0)}px)` }}
        >
          <div className="bg-primary dark:bg-blue-600 text-white rounded-full px-3 py-1 text-xs">
            {isRefreshing ? 'Refreshing...' : pullProgress >= 1 ? 'Release' : 'Pull'}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ transform: `translateY(${isPulling ? pullDistance : 0}px)` }}>
        {children}
      </div>
    </div>
  );
} 