'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import TeamLogo from './TeamLogo';
import { getTeamByName } from '@/data/teams';

type Prediction = {
  match: string;
  prediction: string;
  confidence_score: string;
  key_factors: string[];
  uncertainties: string[];
  player_insights: { name: string; team: string; insight: string }[];
};

export default function PredictionCard({ prediction }: { prediction: Prediction }) {
  const [showUncertainties, setShowUncertainties] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  // Parse team names from match string
  const teams = prediction.match.split(' vs ');
  const team1 = getTeamByName(teams[0]?.trim() || '');
  const team2 = getTeamByName(teams[1]?.trim() || '');

  // Parse prediction winner
  const winnerTeam = prediction.prediction.includes(team1?.name || '') ? team1 : team2;
  const confidenceNum = parseInt(prediction.confidence_score.replace('%', ''));

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
      whileHover={{ scale: 1.02, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Header with teams */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <TeamLogo teamName={team1?.name || teams[0]} logoUrl={team1?.logo} size="lg" />
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-200">{team1?.name || teams[0]}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{team1?.league}</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">VS</p>
            <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-500 mx-auto mt-1"></div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-bold text-gray-800 dark:text-gray-200">{team2?.name || teams[1]}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{team2?.league}</p>
            </div>
            <TeamLogo teamName={team2?.name || teams[1]} logoUrl={team2?.logo} size="lg" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        {/* Prediction */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary dark:text-blue-400" />
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">AI Prediction</span>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <TeamLogo 
                  teamName={winnerTeam?.name || ''} 
                  logoUrl={winnerTeam?.logo} 
                  size="md" 
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{prediction.prediction}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Predicted outcome</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-primary dark:text-blue-400">{prediction.confidence_score}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Confidence</p>
              </div>
            </div>
            
            {/* Confidence bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  confidenceNum >= 70 ? 'bg-green-500' : 
                  confidenceNum >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${confidenceNum}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Key Factors */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Factors</h3>
          <div className="space-y-2">
            {prediction.key_factors.map((factor, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary dark:bg-blue-400 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{factor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Uncertainties */}
        <div className="mb-4">
          <button
            onClick={() => setShowUncertainties(!showUncertainties)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Uncertainties</span>
            </div>
            {showUncertainties ? 
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            }
          </button>
          
          {showUncertainties && (
            <motion.div 
              className="mt-3 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {prediction.uncertainties.map((uncertainty, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{uncertainty}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Player Insights */}
        <div>
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Player Insights</span>
            </div>
            {showInsights ? 
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            }
          </button>
          
          {showInsights && (
            <motion.div 
              className="mt-3 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {prediction.player_insights.map((insight, index) => {
                const playerTeam = getTeamByName(insight.team);
                return (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <TeamLogo 
                        teamName={playerTeam?.name || insight.team} 
                        logoUrl={playerTeam?.logo} 
                        size="sm" 
                      />
                      <p className="font-medium text-gray-800 dark:text-gray-200">{insight.name}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({insight.team})</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{insight.insight}</p>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 