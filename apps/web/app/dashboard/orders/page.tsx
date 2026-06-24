'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/lib/api-client';

type Order = { id: string; sellerId: string; status: string; total: number; createdAt: string };

function toCsv(rows: Order[]) {
  const headers = 'id,sellerId,status,total,createdAt';
  const data = rows.map((r) => `${r.id},${r.sellerId},${r.status},${r.total},${r.createdAt}`);
  return [headers, ...data].join('\n');
}

export default function DashboardOrdersPage() {
  const [rows, setRows] = useState<Order[]>([]);
  const [status, setStatus] = useState('');

  async function load() {
    const qp = new URLSearchParams();
    if (status) qp.set('status', status);
    const res = await apiRequest<Order[]>(`/api/orders?${qp.toString()}`);
    if (!res.error && res.data) setRows(res.data);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const csv = useMemo(() => toCsv(rows), [rows]);

  return (
    <main className="mx-auto max-w-5xl space-y-3 p-6">
      <h1 className="text-2xl font-bold">Pedidos</h1>
      <div className="flex gap-2">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="touch-target rounded border p-3">
          <option value="">Todos</option>
          <option value="created">Criado</option>
          <option value="sent">Enviado</option>
          <option value="paid">Pago</option>
        </select>
        <button className="touch-target rounded bg-slate-900 px-4 py-3 text-white" onClick={() => void load()}>Aplicar filtros</button>
        <a
          className="touch-target rounded bg-emerald-600 px-4 py-3 font-semibold text-white"
          download="pedidos.csv"
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
        >
          Exportar CSV
        </a>
      </div>
      <table className="w-full rounded-xl bg-white shadow">
        <thead>
          <tr className="text-left text-sm text-slate-500">
            <th className="p-3">ID</th>
            <th className="p-3">Vendedor</th>
            <th className="p-3">Status</th>
            <th className="p-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="p-3 text-xs">{row.id.slice(0, 8)}...</td>
              <td className="p-3">{row.sellerId}</td>
              <td className="p-3">{row.status}</td>
              <td className="p-3">R$ {row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
