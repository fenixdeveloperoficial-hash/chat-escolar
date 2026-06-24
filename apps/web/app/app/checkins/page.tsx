'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api-client';

export default function CheckinsPage() {
  const [customerId, setCustomerId] = useState('customer-demo');
  const [lat, setLat] = useState(-23.55);
  const [lng, setLng] = useState(-46.63);
  const [notes, setNotes] = useState('Cheguei ao cliente e iniciei negociação.');
  const [feedback, setFeedback] = useState('');

  function getGPS() {
    if (!navigator.geolocation) {
      setFeedback('Geolocalização indisponível.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(Number(position.coords.latitude.toFixed(6)));
        setLng(Number(position.coords.longitude.toFixed(6)));
      },
      () => setFeedback('Falha no GPS. Você pode digitar manualmente.')
    );
  }

  async function saveVisit() {
    const response = await apiRequest<{ id: string }>('/api/visits', {
      method: 'POST',
      body: JSON.stringify({ customerId, lat, lng, notes })
    });

    setFeedback(response.error ?? `Visita salva: ${response.data?.id}`);
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Check-in de visita</h2>
      <button onClick={getGPS} className="touch-target w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white">Usar GPS atual</button>
      <div className="grid grid-cols-2 gap-2">
        <input className="touch-target rounded border p-3" type="number" value={lat} onChange={(e) => setLat(Number(e.target.value))} />
        <input className="touch-target rounded border p-3" type="number" value={lng} onChange={(e) => setLng(Number(e.target.value))} />
      </div>
      <input className="touch-target w-full rounded border p-3" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="ID cliente" />
      <textarea className="w-full rounded border p-3" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
      <button onClick={saveVisit} className="touch-target w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white">Salvar visita</button>
      {feedback ? <p className="text-sm text-slate-600">{feedback}</p> : null}
    </section>
  );
}
