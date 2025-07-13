'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import TeamLogo from './TeamLogo';
import { getTeamByName } from '@/data/teams';
import { useButtonHaptics } from '@/hooks/useHapticFeedback';

type Match = {
  id: string;
  date: string;
  team1: { name: string; logo: string };
  team2: { name: string; logo: string };
  predictedWinner: string;
  confidenceScore: number;
  keyPlayers: { name: string; position: string }[];
  stadium?: string;
  league?: string;
};

export default function MatchCard({ match }: { match: Match }) {
  const team1Data = getTeamByName(match.team1.name);
  const team2Data = getTeamByName(match.team2.name);
  const { onPress } = useButtonHaptics();
  
  const matchDate = new Date(match.date);
  const formattedDate = matchDate.toLocaleDateString('fr-FR', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  });
  const formattedTime = matchDate.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const winnerTeam = match.predictedWinner === match.team1.name ? team1Data : team2Data;
  const confidenceColor = match.confidenceScore >= 70 ? 'bg-green-500' : 
                          match.confidenceScore >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
      whileHover={{ scale: 1.02, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Header with date and league */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-primary dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formattedDate} • {formattedTime}
            </span>
          </div>
          {match.league && (
            <span className="text-xs bg-primary/20 dark:bg-blue-600/20 text-primary dark:text-blue-400 px-2 py-1 rounded-full font-medium">
              {match.league}
            </span>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        {/* Teams */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <TeamLogo 
              teamName={team1Data?.name || match.team1.name} 
              logoUrl={team1Data?.logo} 
              size="lg" 
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{team1Data?.name || match.team1.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{team1Data?.league}</p>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">VS</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{team2Data?.name || match.team2.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{team2Data?.league}</p>
            </div>
            <TeamLogo 
              teamName={team2Data?.name || match.team2.name} 
              logoUrl={team2Data?.logo} 
              size="lg" 
            />
          </div>
        </div>

        {/* Stadium info */}
        {match.stadium && (
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{match.stadium}</span>
          </div>
        )}

        {/* Prediction */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-primary dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Prediction</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${confidenceColor}`}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{match.confidenceScore}% confident</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <TeamLogo 
              teamName={winnerTeam?.name || match.predictedWinner} 
              logoUrl={winnerTeam?.logo} 
              size="md" 
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{match.predictedWinner}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Predicted Winner</p>
            </div>
          </div>
          
          {/* Confidence bar */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Confidence</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{match.confidenceScore}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${confidenceColor}`}
                style={{ width: `${match.confidenceScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Key Players */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Players to Watch</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {match.keyPlayers.map((player, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1">
                <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{player.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{player.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <Link href={`/matches/${match.id}`}>
          <motion.button 
            className="w-full bg-primary dark:bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseDown={onPress}
            onTouchStart={onPress}
          >
            View Full Analysis
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
} 