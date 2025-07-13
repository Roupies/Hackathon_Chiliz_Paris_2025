'use client'
import React, { useState, useEffect } from 'react'
import { matches } from '@/data/matches';
import MatchCard from '@/components/MatchCard';
import SkeletonCard from '@/components/SkeletonCard';
import PullToRefresh from '@/components/PullToRefresh';
import { motion } from 'framer-motion';

export default function Matches() {
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState(matches);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    // Simulate API call to refresh data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would fetch fresh data here
    // For demo purposes, we'll just shuffle the matches
    const shuffled = [...matches].sort(() => Math.random() - 0.5);
    setMatchData(shuffled);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Match Predictions</h1>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SkeletonCard />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {matchData.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MatchCard match={match} />
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