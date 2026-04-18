'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api-client';

export default function OrdersPage() {
  const [customerId, setCustomerId] = useState('customer-demo');
  const [visitId, setVisitId] = useState('visit-demo');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(29.9);
  const [notes, setNotes] = useState('Cliente pediu entrega até sexta');
  const [feedback, setFeedback] = useState('');

  async function saveOrder() {
    const total = Number((quantity * unitPrice).toFixed(2));
    const response = await apiRequest<{ id: string; total: number }>('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        visitId,
        customerId,
        items: [{ productId: 'prod-demo', quantity, unitPrice }],
        total,
        notes
      })
    });
    setFeedback(response.error ?? `Pedido ${response.data?.id} salvo. Total: R$ ${response.data?.total}`);
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Novo pedido</h2>
      <input className="touch-target w-full rounded border p-3" value={visitId} onChange={(e) => setVisitId(e.target.value)} placeholder="Visit ID" />
      <input className="touch-target w-full rounded border p-3" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Customer ID" />
      <div className="grid grid-cols-2 gap-2">
        <input className="touch-target rounded border p-3" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        <input className="touch-target rounded border p-3" type="number" value={unitPrice} onChange={(e) => setUnitPrice(Number(e.target.value))} />
      </div>
      <textarea className="w-full rounded border p-3" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      <button onClick={saveOrder} className="touch-target w-full rounded-xl bg-indigo-600 px-4 py-4 text-lg font-semibold text-white">Confirmar pedido</button>
      {feedback ? <p className="text-sm text-slate-600">{feedback}</p> : null}
    </section>
  );
}
