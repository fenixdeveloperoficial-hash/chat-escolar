import Link from 'next/link';

const bullets = [
  'Multi-tenant com isolamento por organização',
  'PWA mobile com fluxo de check-in e pedidos',
  'Dashboard com métricas, filtros e exportação CSV',
  'Arquitetura preparada para Stripe e integrações ERP'
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 px-6 py-10">
      <section className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="text-4xl font-extrabold tracking-tight">VendaForça</h1>
          <p className="mt-3 text-lg text-slate-600">SaaS para operação comercial de campo com experiência mobile-first.</p>
          <ul className="mt-6 space-y-2 text-slate-700">
            {bullets.map((item) => (
              <li key={item} className="rounded-lg bg-slate-50 p-3">✅ {item}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="touch-target rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white" href="/auth/signup">
              Começar agora
            </Link>
            <Link className="touch-target rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white" href="/auth/login">
              Já tenho conta
            </Link>
          </div>
        </article>
        <article className="rounded-2xl bg-slate-900 p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold">Score de UX atualizado</h2>
          <p className="mt-2 text-slate-300">Design orientado a toque, feedback de sincronização e telas com hierarquia visual forte.</p>
          <div className="mt-6 rounded-xl bg-slate-800 p-4">
            <p className="text-sm text-slate-300">Meta</p>
            <p className="text-3xl font-bold">75/100+</p>
          </div>
          <p className="mt-4 text-sm text-slate-300">Faça login como seller para experiência mobile, ou owner para dashboard completo.</p>
        </article>
      </section>
    </main>
  );
}
