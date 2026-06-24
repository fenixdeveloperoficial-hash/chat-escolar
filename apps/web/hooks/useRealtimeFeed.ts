'use client';

import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '@/lib/api-client';

type FeedEvent = {
  id: string;
  type: 'order' | 'visit';
  createdAt: string;
  message: string;
};

type Order = { id: string; total: number; createdAt: string };

export function useRealtimeFeed() {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const seen = useRef(new Set<string>());

  useEffect(() => {
    const timer = setInterval(async () => {
      const res = await apiRequest<Order[]>('/api/orders');
      if (res.error || !res.data) return;

      const fresh = res.data
        .filter((order) => !seen.current.has(order.id))
        .map((order) => ({
          id: order.id,
          type: 'order' as const,
          createdAt: order.createdAt,
          message: `Novo pedido #${order.id.slice(0, 8)} — R$ ${order.total}`
        }));

      if (!fresh.length) return;
      fresh.forEach((item) => seen.current.add(item.id));
      setEvents((prev) => [...fresh, ...prev].slice(0, 25));
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return events;
}
