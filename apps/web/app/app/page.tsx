import Link from 'next/link';
import { SyncBadge } from '@/components/sync-badge';

export default function SellerHome() {
  return (
    <section className="space-y-4">
      <header className="rounded-2xl bg-white p-4 shadow">
        <p className="text-xs uppercase tracking-wide text-slate-500">Modo vendedor</p>
        <h1 className="text-2xl font-bold">Operação em campo</h1>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-slate-600">Sincronização:</span>
          <SyncBadge />
        </div>
      </header>

      <div className="grid gap-3">
        <Link href="/app/checkins" className="touch-target rounded-xl bg-blue-600 px-4 py-4 font-semibold text-white">Registrar visita</Link>
        <Link href="/app/customers" className="touch-target rounded-xl bg-emerald-600 px-4 py-4 font-semibold text-white">Cadastrar cliente</Link>
        <Link href="/app/orders" className="touch-target rounded-xl bg-indigo-600 px-4 py-4 font-semibold text-white">Criar pedido</Link>
      </div>

      {/* TODO(owner): push notifications com VAPID via service worker */}
    </section>
  );
}
