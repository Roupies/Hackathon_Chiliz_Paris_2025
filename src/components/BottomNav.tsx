'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListOrdered, User, BarChart } from 'lucide-react';
import { useNavigationHaptics } from '@/hooks/useHapticFeedback';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/matches', icon: ListOrdered, label: 'Matches' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/predictions', icon: BarChart, label: 'Predictions' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState('');
  const { onTabChange } = useNavigationHaptics();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    if (href !== currentPath) {
      onTabChange();
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = currentPath === href;
          
          return (
            <Link 
              key={href}
              href={href} 
              onClick={() => handleNavClick(href)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                isActive 
                  ? 'text-primary dark:text-blue-400 bg-primary/10 dark:bg-blue-400/10' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 hover:bg-primary/5 dark:hover:bg-blue-400/5'
              }`}
            >
              <Icon 
                size={22} 
                className={`mb-1 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'hover:scale-105'
                }`}
              />
              <span className="text-xs font-medium truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 