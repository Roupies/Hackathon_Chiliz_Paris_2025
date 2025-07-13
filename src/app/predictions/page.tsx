'use client'
import React, { useState, useEffect } from 'react';
import { predictions } from '@/data/predictions';
import PredictionCard from '@/components/PredictionCard';
import { SkeletonPredictionCard } from '@/components/SkeletonCard';
import PullToRefresh from '@/components/PullToRefresh';
import { motion } from 'framer-motion';

export default function Predictions() {
  const [isLoading, setIsLoading] = useState(true);
  const [predictionData, setPredictionData] = useState(predictions);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    // Simulate API call to refresh predictions
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would fetch fresh data here
    // For demo purposes, we'll just shuffle the predictions
    const shuffled = [...predictions].sort(() => Math.random() - 0.5);
    setPredictionData(shuffled);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="p-4 relative min-h-screen bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">AI Predictions</h1>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SkeletonPredictionCard />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {predictionData.map((pred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PredictionCard prediction={pred} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Pull to refresh hint */}
        <div className="text-center mt-8 pb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pull down to refresh predictions
          </p>
        </div>
      </div>
    </PullToRefresh>
  );
} 