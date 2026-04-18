'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api-client';

type Customer = { id: string; name: string; phone?: string };

export default function DashboardCustomersPage() {
  const [rows, setRows] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [cursor, setCursor] = useState<string | null>(null);

  async function load(nextCursor?: string | null) {
    const qp = new URLSearchParams();
    if (search) qp.set('search', search);
    if (nextCursor) qp.set('cursor', nextCursor);
    qp.set('limit', '10');
    const res = await apiRequest<Customer[]>(`/api/customers?${qp.toString()}`);
    if (!res.error && res.data) {
      setRows(res.data);
      setCursor((res.meta?.nextCursor as string | null) ?? null);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-4xl space-y-3 p-6">
      <h1 className="text-2xl font-bold">Clientes</h1>
      <div className="flex gap-2">
        <input className="touch-target flex-1 rounded border p-3" placeholder="Buscar cliente" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="touch-target rounded bg-slate-900 px-4 py-3 text-white" onClick={() => void load()}>Buscar</button>
      </div>
      <ul className="rounded-xl bg-white shadow">
        {rows.map((row) => (
          <li key={row.id} className="border-b p-3 last:border-b-0">
            <p className="font-medium">{row.name}</p>
            <p className="text-sm text-slate-500">{row.phone ?? 'Sem telefone'}</p>
          </li>
        ))}
      </ul>
      <button disabled={!cursor} className="touch-target rounded bg-blue-600 px-4 py-3 text-white disabled:opacity-50" onClick={() => void load(cursor)}>
        Próxima página
      </button>
    </main>
  );
}
