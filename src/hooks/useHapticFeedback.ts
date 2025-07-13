'use client';

import { useCallback, useEffect, useState } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

interface HapticFeedbackOptions {
  enabled?: boolean;
  fallbackToVibration?: boolean;
}

export function useHapticFeedback(options: HapticFeedbackOptions = {}) {
  const { enabled = true, fallbackToVibration = true } = options;
  const [isSupported, setIsSupported] = useState(false);
  const [hasVibrationAPI, setHasVibrationAPI] = useState(false);

  useEffect(() => {
    // Check if the device supports haptic feedback
    const checkSupport = () => {
      // iOS Safari haptic feedback
      const hasHapticFeedback = 'DeviceMotionEvent' in window && 
                               'requestPermission' in (DeviceMotionEvent as any);
      
      // Android Chrome haptic feedback
      const hasVibrationAPI = 'vibrate' in navigator;
      
      setIsSupported(hasHapticFeedback);
      setHasVibrationAPI(hasVibrationAPI);
    };

    checkSupport();
  }, []);

  const triggerHaptic = useCallback((type: HapticType) => {
    if (!enabled) return;

    // Try modern haptic feedback first (iOS)
    if (isSupported && (window as any).DeviceMotionEvent) {
      try {
        // iOS haptic feedback patterns
        const patterns = {
          light: () => (window as any).TapticEngine?.impact({ style: 'light' }),
          medium: () => (window as any).TapticEngine?.impact({ style: 'medium' }),
          heavy: () => (window as any).TapticEngine?.impact({ style: 'heavy' }),
          success: () => (window as any).TapticEngine?.notification({ type: 'success' }),
          warning: () => (window as any).TapticEngine?.notification({ type: 'warning' }),
          error: () => (window as any).TapticEngine?.notification({ type: 'error' }),
          selection: () => (window as any).TapticEngine?.selection()
        };

        const pattern = patterns[type];
        if (pattern) {
          pattern();
          return;
        }
      } catch (error) {
        console.warn('Haptic feedback failed:', error);
      }
    }

    // Fallback to vibration API
    if (fallbackToVibration && hasVibrationAPI && navigator.vibrate) {
      const vibrationPatterns = {
        light: [10],
        medium: [20],
        heavy: [30],
        success: [10, 50, 10],
        warning: [20, 100, 20],
        error: [50, 100, 50],
        selection: [5]
      };

      const pattern = vibrationPatterns[type];
      if (pattern) {
        navigator.vibrate(pattern);
      }
    }
  }, [enabled, isSupported, hasVibrationAPI, fallbackToVibration]);

  const triggerImpact = useCallback((intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
    triggerHaptic(intensity);
  }, [triggerHaptic]);

  const triggerNotification = useCallback((type: 'success' | 'warning' | 'error') => {
    triggerHaptic(type);
  }, [triggerHaptic]);

  const triggerSelection = useCallback(() => {
    triggerHaptic('selection');
  }, [triggerHaptic]);

  return {
    isSupported: isSupported || hasVibrationAPI,
    triggerHaptic,
    triggerImpact,
    triggerNotification,
    triggerSelection
  };
}

// Hook for button interactions
export function useButtonHaptics(options: HapticFeedbackOptions = {}) {
  const { triggerImpact, triggerNotification } = useHapticFeedback(options);

  const onPress = useCallback(() => {
    triggerImpact('light');
  }, [triggerImpact]);

  const onSuccess = useCallback(() => {
    triggerNotification('success');
  }, [triggerNotification]);

  const onError = useCallback(() => {
    triggerNotification('error');
  }, [triggerNotification]);

  return {
    onPress,
    onSuccess,
    onError
  };
}

// Hook for swipe gestures
export function useSwipeHaptics(options: HapticFeedbackOptions = {}) {
  const { triggerImpact, triggerSelection } = useHapticFeedback(options);

  const onSwipeStart = useCallback(() => {
    triggerSelection();
  }, [triggerSelection]);

  const onSwipeEnd = useCallback(() => {
    triggerImpact('medium');
  }, [triggerImpact]);

  return {
    onSwipeStart,
    onSwipeEnd
  };
}

// Hook for navigation haptics
export function useNavigationHaptics(options: HapticFeedbackOptions = {}) {
  const { triggerSelection, triggerImpact } = useHapticFeedback(options);

  const onNavigate = useCallback(() => {
    triggerSelection();
  }, [triggerSelection]);

  const onTabChange = useCallback(() => {
    triggerImpact('light');
  }, [triggerImpact]);

  return {
    onNavigate,
    onTabChange
  };
}

// Hook for form haptics
export function useFormHaptics(options: HapticFeedbackOptions = {}) {
  const { triggerImpact, triggerNotification } = useHapticFeedback(options);

  const onFieldFocus = useCallback(() => {
    triggerImpact('light');
  }, [triggerImpact]);

  const onFieldError = useCallback(() => {
    triggerNotification('error');
  }, [triggerNotification]);

  const onFormSubmit = useCallback(() => {
    triggerNotification('success');
  }, [triggerNotification]);

  return {
    onFieldFocus,
    onFieldError,
    onFormSubmit
  };
} 