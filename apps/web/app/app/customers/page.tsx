'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api-client';

export default function CustomersPage() {
  const [form, setForm] = useState({ name: '', phone: '', document: '', address: '' });
  const [feedback, setFeedback] = useState('');

  async function saveCustomer() {
    const response = await apiRequest<{ id: string; name: string }>('/api/customers', {
      method: 'POST',
      body: JSON.stringify(form)
    });

    if (response.error) {
      setFeedback(response.error);
      return;
    }

    setFeedback(`Cliente ${response.data?.name} criado com sucesso.`);
    setForm({ name: '', phone: '', document: '', address: '' });
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Cadastro rápido de cliente</h2>
      <input className="touch-target w-full rounded border p-3" placeholder="Nome" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
      <input className="touch-target w-full rounded border p-3" placeholder="Telefone" value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
      <input className="touch-target w-full rounded border p-3" placeholder="CNPJ/CPF" value={form.document} onChange={(e) => setForm((s) => ({ ...s, document: e.target.value }))} />
      <input className="touch-target w-full rounded border p-3" placeholder="Endereço" value={form.address} onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))} />
      <button onClick={saveCustomer} className="touch-target w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white">Salvar cliente</button>
      {feedback ? <p className="text-sm text-slate-600">{feedback}</p> : null}
    </section>
  );
}
