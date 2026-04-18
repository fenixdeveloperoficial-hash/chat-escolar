'use client';

import { useEffect, useState } from 'react';

export function useSyncStatus() {
  const [isOnline, setOnline] = useState(true);
  const [status, setStatus] = useState<'saved' | 'syncing' | 'offline'>('saved');

  useEffect(() => {
    const onOnline = () => {
      setOnline(true);
      setStatus('syncing');
      setTimeout(() => setStatus('saved'), 600);
    };
    const onOffline = () => {
      setOnline(false);
      setStatus('offline');
    };

    onLineSync();

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };

    function onLineSync() {
      if (navigator.onLine) {
        setOnline(true);
        setStatus('saved');
      } else {
        setOnline(false);
        setStatus('offline');
      }
    }
  }, []);

  return { isOnline, status, setStatus };
}
