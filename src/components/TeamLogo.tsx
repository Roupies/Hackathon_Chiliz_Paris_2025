'use client'
import React from 'react';
import { Shield } from 'lucide-react';

interface TeamLogoProps {
  teamName: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

export default function TeamLogo({ teamName, logoUrl, size = 'md', className = '' }: TeamLogoProps) {
  const [imageError, setImageError] = React.useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  if (!logoUrl || imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0`}>
        <Shield className="w-1/2 h-1/2 text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${teamName} logo`}
      className={`${sizeClasses[size]} ${className} object-contain flex-shrink-0`}
      onError={handleImageError}
      loading="lazy"
    />
  );
} 