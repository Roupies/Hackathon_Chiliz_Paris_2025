'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target, Users } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "AI Predictions",
      description: "Advanced algorithms analyze team performance"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Live match data and instant notifications"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Accuracy Tracking",
      description: "Monitor prediction success rates"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Player Insights",
      description: "Detailed analysis of key players"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 dark:bg-white/3 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-white/5 dark:bg-white/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 pb-24">
        {/* Logo and Title */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4">
            <div className="w-20 h-20 bg-white/20 dark:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Scoria</h1>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            AI-powered match insights for true fans
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-white mb-2 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-white/70 text-xs">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/matches">
            <motion.button
              className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Matches
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 