'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api-client';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('Dono Demo');
  const [organizationName, setOrganizationName] = useState('Org Demo');
  const [email, setEmail] = useState('owner@demo.com');
  const [feedback, setFeedback] = useState('');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await apiRequest<{ message: string }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, organizationName, email, role: 'owner' })
    });

    if (response.error) {
      setFeedback(response.error);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <main className="mx-auto mt-10 max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <h1 className="text-2xl font-bold">Criar organização</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="touch-target w-full rounded-lg border p-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
        <input className="touch-target w-full rounded-lg border p-3" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} placeholder="Nome da organização" />
        <input className="touch-target w-full rounded-lg border p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button className="touch-target w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">Criar conta</button>
      </form>
      {feedback ? <p className="mt-3 text-sm text-rose-600">{feedback}</p> : null}
    </main>
  );
}
