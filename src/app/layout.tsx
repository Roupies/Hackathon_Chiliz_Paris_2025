import React from 'react';
import { Montserrat } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import Providers from './Providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sporty',
});

export const metadata = {
  title: 'Scoria',
  description: 'AI-powered match insights for true fans.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sporty bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen transition-colors">
        <Providers>
          <main className="flex-grow pb-20">{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
} 