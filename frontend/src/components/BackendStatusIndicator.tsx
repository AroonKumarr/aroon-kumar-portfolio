'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

type BackendState = 'checking' | 'online' | 'offline';

export default function BackendStatusIndicator() {
  const [state, setState] = useState<BackendState>('checking');

  useEffect(() => {
    let isMounted = true;

    const checkStatus = async () => {
      const health = await api.checkHealth();
      if (!isMounted) return;
      setState(health.backendDown ? 'offline' : 'online');
    };

    checkStatus();
    const timer = window.setInterval(checkStatus, 12000);

    return () => {
      isMounted = false;
      window.clearInterval(timer);
    };
  }, []);

  const isOnline = state === 'online';
  const isChecking = state === 'checking';

  return (
    <div className="fixed right-4 bottom-4 z-40 pointer-events-none">
      <div
        className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
          isOnline
            ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.45)]'
            : isChecking
            ? 'border-sky-400/40 bg-sky-500/10 text-sky-300'
            : 'border-rose-400/45 bg-rose-500/10 text-rose-300'
        }`}
        aria-live="polite"
      >
        <span className="relative flex h-2.5 w-2.5">
          {isOnline ? (
            <>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </>
          ) : isChecking ? (
            <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-sky-300" />
          ) : (
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-300" />
          )}
        </span>
        <span>{isOnline ? 'Online' : isChecking ? 'Checking' : 'Offline'}</span>
      </div>
    </div>
  );
}
