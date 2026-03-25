'use client';

import { AlertTriangle, WifiOff, CreditCard } from 'lucide-react';

interface ApiStatusProps {
  error?: string;
  backendDown?: boolean;
  apiCreditsOver?: boolean;
}

export default function ApiStatus({ error, backendDown, apiCreditsOver }: ApiStatusProps) {
  if (!backendDown && !apiCreditsOver) return null;

  return (
    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
      {backendDown ? (
        <>
          <WifiOff className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-500">Backend is not running</p>
            <p className="text-sm text-yellow-500/70 mt-1">
              The server is currently offline. Please try again later.
            </p>
          </div>
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-500">API credits exhausted</p>
            <p className="text-sm text-yellow-500/70 mt-1">
              {error || 'Please try again later.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-dark-400 text-sm">{message}</p>
      </div>
    </div>
  );
}

interface ErrorDisplayProps {
  title?: string;
  message?: string;
}

export function ErrorDisplay({ 
  title = 'Something went wrong', 
  message = 'Please try again later.' 
}: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-dark-400 text-center max-w-md">{message}</p>
    </div>
  );
}