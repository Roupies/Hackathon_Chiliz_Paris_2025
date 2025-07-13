'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      {/* Header */}
      <div className="bg-gray-200 dark:bg-gray-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        {/* Teams */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div>
              <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-8 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Stadium */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>

        {/* Prediction */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div>
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div className="w-3/4 h-2 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
          </div>
        </div>

        {/* Key Players */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1">
                <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="w-full h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
      </div>
    </div>
  );
}

export function SkeletonPredictionCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      {/* Header */}
      <div className="bg-gray-200 dark:bg-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div>
              <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="w-8 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        {/* Prediction */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-32 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div>
                  <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                  <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="w-2/3 h-2 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Key Factors */}
        <div className="mb-4">
          <div className="w-24 h-5 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mt-2"></div>
                <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable sections */}
        <div className="space-y-4">
          <div className="w-32 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-28 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
} 