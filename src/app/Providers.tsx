'use client'
import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { injected } from '@wagmi/connectors';
import { ThemeProvider } from '@/contexts/ThemeContext';

const queryClient = new QueryClient();
const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            {children}
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
} 