'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface PullToRefreshOptions {
  threshold?: number;
  onRefresh: () => Promise<void>;
  resistance?: number;
  enabled?: boolean;
}

interface PullToRefreshReturn {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  pullProgress: number;
  bindTouchEvents: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

export function usePullToRefresh({
  threshold = 80,
  onRefresh,
  resistance = 2.5,
  enabled = true
}: PullToRefreshOptions): PullToRefreshReturn {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  const containerRef = useRef<HTMLElement | null>(null);

  const pullProgress = Math.min(pullDistance / threshold, 1);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enabled || isRefreshing) return;
    
    const touch = e.touches[0];
    setStartY(touch.clientY);
    setCurrentY(touch.clientY);
    setScrollY(window.scrollY);
    
    // Only start pulling if we're at the top of the page
    if (window.scrollY === 0) {
      setIsPulling(true);
    }
  }, [enabled, isRefreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enabled || isRefreshing || !isPulling) return;
    
    const touch = e.touches[0];
    setCurrentY(touch.clientY);
    
    const deltaY = touch.clientY - startY;
    
    // Only allow pulling down when at the top
    if (deltaY > 0 && window.scrollY === 0) {
      e.preventDefault();
      const distance = Math.max(0, deltaY / resistance);
      setPullDistance(distance);
    } else {
      setIsPulling(false);
      setPullDistance(0);
    }
  }, [enabled, isRefreshing, isPulling, startY, resistance]);

  const handleTouchEnd = useCallback(async (e: React.TouchEvent) => {
    if (!enabled || isRefreshing || !isPulling) return;
    
    setIsPulling(false);
    
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
  }, [enabled, isRefreshing, isPulling, pullDistance, threshold, onRefresh]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      setIsPulling(false);
      setIsRefreshing(false);
      setPullDistance(0);
    };
  }, []);

  return {
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress,
    bindTouchEvents: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
}

// Hook for managing pull-to-refresh with scroll detection
export function usePullToRefreshWithScroll(options: PullToRefreshOptions) {
  const [isAtTop, setIsAtTop] = useState(true);
  const pullToRefresh = usePullToRefresh({
    ...options,
    enabled: options.enabled && isAtTop
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    ...pullToRefresh,
    isAtTop
  };
} 