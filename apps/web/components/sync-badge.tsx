'use client';

import { useSyncStatus } from '@/hooks/useSyncStatus';

export function SyncBadge() {
  const { status } = useSyncStatus();
  const config = {
    saved: { label: 'Salvo', color: 'bg-emerald-100 text-emerald-700' },
    syncing: { label: 'Sincronizando', color: 'bg-amber-100 text-amber-700' },
    offline: { label: 'Offline', color: 'bg-rose-100 text-rose-700' }
  } as const;

  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${config[status].color}`}>{config[status].label}</span>;
}
