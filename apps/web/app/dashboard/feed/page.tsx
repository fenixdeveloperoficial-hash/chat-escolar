'use client';

import { useRealtimeFeed } from '@/hooks/useRealtimeFeed';

export default function FeedPage() {
  const events = useRealtimeFeed();

  return (
    <main className="mx-auto max-w-4xl space-y-3 p-6">
      <h1 className="text-2xl font-bold">Feed ao vivo (atualização a cada 2.5s)</h1>
      <p className="text-sm text-slate-500">Novos pedidos aparecem sem refresh da página.</p>
      {events.length === 0 ? <p className="text-slate-500">Aguardando eventos…</p> : null}
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id} className="rounded border bg-white p-3 shadow-sm">
            <p className="font-medium">🔔 {event.message}</p>
            <p className="text-xs text-slate-500">{new Date(event.createdAt).toLocaleString('pt-BR')}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
