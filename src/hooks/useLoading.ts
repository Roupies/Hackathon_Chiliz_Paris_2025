'use client';

import { useState, useEffect, useCallback } from 'react';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface UseLoadingOptions {
  initialDelay?: number;
  minLoadingTime?: number;
  autoReset?: boolean;
  resetDelay?: number;
}

interface UseLoadingReturn {
  isLoading: boolean;
  state: LoadingState;
  startLoading: () => void;
  stopLoading: () => void;
  setSuccess: () => void;
  setError: () => void;
  reset: () => void;
}

export function useLoading(options: UseLoadingOptions = {}): UseLoadingReturn {
  const {
    initialDelay = 0,
    minLoadingTime = 500,
    autoReset = false,
    resetDelay = 2000
  } = options;

  const [state, setState] = useState<LoadingState>('idle');
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  const startLoading = useCallback(() => {
    if (initialDelay > 0) {
      setTimeout(() => {
        setState('loading');
        setLoadingStartTime(Date.now());
      }, initialDelay);
    } else {
      setState('loading');
      setLoadingStartTime(Date.now());
    }
  }, [initialDelay]);

  const stopLoading = useCallback(() => {
    if (loadingStartTime) {
      const elapsed = Date.now() - loadingStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      setTimeout(() => {
        setState('idle');
        setLoadingStartTime(null);
      }, remainingTime);
    } else {
      setState('idle');
    }
  }, [loadingStartTime, minLoadingTime]);

  const setSuccess = useCallback(() => {
    if (loadingStartTime) {
      const elapsed = Date.now() - loadingStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      setTimeout(() => {
        setState('success');
        setLoadingStartTime(null);
        
        if (autoReset) {
          setTimeout(() => setState('idle'), resetDelay);
        }
      }, remainingTime);
    } else {
      setState('success');
      if (autoReset) {
        setTimeout(() => setState('idle'), resetDelay);
      }
    }
  }, [loadingStartTime, minLoadingTime, autoReset, resetDelay]);

  const setError = useCallback(() => {
    if (loadingStartTime) {
      const elapsed = Date.now() - loadingStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      setTimeout(() => {
        setState('error');
        setLoadingStartTime(null);
        
        if (autoReset) {
          setTimeout(() => setState('idle'), resetDelay);
        }
      }, remainingTime);
    } else {
      setState('error');
      if (autoReset) {
        setTimeout(() => setState('idle'), resetDelay);
      }
    }
  }, [loadingStartTime, minLoadingTime, autoReset, resetDelay]);

  const reset = useCallback(() => {
    setState('idle');
    setLoadingStartTime(null);
  }, []);

  return {
    isLoading: state === 'loading',
    state,
    startLoading,
    stopLoading,
    setSuccess,
    setError,
    reset
  };
}

// Hook for simulating API calls with loading states
export function useAsyncOperation<T>(
  operation: () => Promise<T>,
  options: UseLoadingOptions = {}
) {
  const loading = useLoading(options);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    loading.startLoading();
    setError(null);
    
    try {
      const result = await operation();
      setData(result);
      loading.setSuccess();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      loading.setError();
      throw error;
    }
  }, [operation, loading]);

  return {
    ...loading,
    data,
    error,
    execute
  };
}

// Hook for managing multiple loading states
export function useMultipleLoading() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((key: string, isLoading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading
    }));
  }, []);

  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  const isAnyLoading = useCallback(() => {
    return Object.values(loadingStates).some(Boolean);
  }, [loadingStates]);

  const reset = useCallback(() => {
    setLoadingStates({});
  }, []);

  return {
    setLoading,
    isLoading,
    isAnyLoading,
    reset,
    loadingStates
  };
} 