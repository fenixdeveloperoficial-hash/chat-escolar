'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api-client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('owner@demo.com');
  const [role, setRole] = useState<'owner' | 'manager' | 'seller'>('owner');
  const [feedback, setFeedback] = useState('');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await apiRequest<{ message: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, role })
    });

    if (response.error) {
      setFeedback(response.error);
      return;
    }

    setFeedback('Login realizado!');
    router.push(role === 'seller' ? '/app' : '/dashboard');
  }

  async function sendMagicLink() {
    const response = await apiRequest<{ sent: boolean }>('/api/auth/magic-link', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    setFeedback(response.error ?? 'Magic link enviado (mock).');
  }

  return (
    <main className="mx-auto mt-10 max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <h1 className="text-2xl font-bold">Entrar no VendaForça</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="touch-target w-full rounded-lg border p-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select className="touch-target w-full rounded-lg border p-3" value={role} onChange={(e) => setRole(e.target.value as 'owner' | 'manager' | 'seller')}>
          <option value="owner">Owner</option>
          <option value="manager">Manager</option>
          <option value="seller">Seller</option>
        </select>
        <button className="touch-target w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">Login</button>
        <button type="button" onClick={sendMagicLink} className="touch-target w-full rounded-lg bg-slate-100 px-4 py-3 font-semibold text-slate-900">
          Receber magic link
        </button>
      </form>
      {feedback ? <p className="mt-3 text-sm text-slate-600">{feedback}</p> : null}
    </main>
  );
}
