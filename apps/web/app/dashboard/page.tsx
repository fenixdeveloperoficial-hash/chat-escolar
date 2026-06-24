'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api-client';

type Summary = { salesToday: number; salesWeek: number; salesMonth: number; orders: number; visits: number; mapPins: Array<{ id: string; lat: number; lng: number }> };

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    void apiRequest<Summary>('/api/dashboard/summary').then((res) => {
      if (!res.error && res.data) setSummary(res.data);
    });
  }, []);

  const cards = useMemo(
    () => [
      { label: 'Vendas do dia', value: summary?.salesToday ?? 0 },
      { label: 'Vendas da semana', value: summary?.salesWeek ?? 0 },
      { label: 'Vendas do mês', value: summary?.salesMonth ?? 0 }
    ],
    [summary]
  );

  return (
    <main className="mx-auto max-w-6xl space-y-5 p-6">
      <h1 className="text-3xl font-bold">Dashboard em tempo real</h1>
      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="text-3xl font-semibold">R$ {card.value.toLocaleString('pt-BR')}</p>
          </article>
        ))}
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-white p-4 shadow">
          <h2 className="font-semibold">Mapa de check-ins (mock)</h2>
          <div className="mt-3 h-56 rounded-lg border border-dashed p-3 text-sm text-slate-600">
            {summary?.mapPins.length ? summary.mapPins.map((pin) => <p key={pin.id}>📍 {pin.lat}, {pin.lng}</p>) : 'Sem check-ins ainda.'}
          </div>
        </article>
        <article className="rounded-xl bg-white p-4 shadow">
          <h2 className="font-semibold">Atalhos</h2>
          <div className="mt-3 grid gap-2">
            <Link href="/dashboard/feed" className="touch-target rounded-lg bg-blue-600 px-4 py-3 text-white">Feed ao vivo</Link>
            <Link href="/dashboard/customers" className="touch-target rounded-lg bg-emerald-600 px-4 py-3 text-white">Clientes com filtros</Link>
            <Link href="/dashboard/orders" className="touch-target rounded-lg bg-indigo-600 px-4 py-3 text-white">Pedidos e exportação CSV</Link>
            <Link href="/dashboard/sellers" className="touch-target rounded-lg bg-slate-800 px-4 py-3 text-white">Ranking de vendedores</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
