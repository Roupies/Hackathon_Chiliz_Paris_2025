'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import TeamLogo from '@/components/TeamLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { HapticToggle } from '@/components/HapticSettings';
import { getTeamByName } from '@/data/teams';

export default function Profile() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const favoriteTeam = getTeamByName('Man City');

  const predictionHistory = [
    { 
      id: 'hist1', 
      match: 'Arsenal vs Man City', 
      prediction: 'Man City 63%', 
      actual: 'Man City won',
      team1: 'Arsenal',
      team2: 'Man City',
      correct: true
    },
    { 
      id: 'hist2', 
      match: 'Liverpool vs Chelsea', 
      prediction: 'Liverpool 55%', 
      actual: 'Draw',
      team1: 'Liverpool',
      team2: 'Chelsea',
      correct: false
    },
    { 
      id: 'hist3', 
      match: 'Real Madrid vs Barcelona', 
      prediction: 'Real Madrid 72%', 
      actual: 'Real Madrid won',
      team1: 'Real Madrid',
      team2: 'Barcelona',
      correct: true
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Wallet</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          {isConnected ? (
            <div>
              <p className="mb-2 text-gray-700 dark:text-gray-300">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
              <button 
                onClick={() => disconnect()} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-2 text-gray-700 dark:text-gray-300">Connect your wallet to access premium features</p>
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                >
                  Connect {connector.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Theme</span>
              <ThemeToggle />
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />
            <HapticToggle />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Favorite Team</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <div className="flex items-center space-x-4">
            <TeamLogo 
              teamName={favoriteTeam?.name || 'Man City'} 
              logoUrl={favoriteTeam?.logo} 
              size="xl" 
            />
            <div>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{favoriteTeam?.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{favoriteTeam?.league}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: favoriteTeam?.colors.primary }}
                ></div>
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: favoriteTeam?.colors.secondary }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Team Colors</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Prediction History</h2>
        <div className="space-y-4">
          {predictionHistory.map((pred) => {
            const team1Data = getTeamByName(pred.team1);
            const team2Data = getTeamByName(pred.team2);
            
            return (
              <motion.div 
                key={pred.id} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <TeamLogo 
                      teamName={team1Data?.name || pred.team1} 
                      logoUrl={team1Data?.logo} 
                      size="sm" 
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">vs</span>
                    <TeamLogo 
                      teamName={team2Data?.name || pred.team2} 
                      logoUrl={team2Data?.logo} 
                      size="sm" 
                    />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    pred.correct 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {pred.correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Predicted: {pred.prediction}
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  Actual: {pred.actual}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 