export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-3 p-6">
      <h1 className="text-2xl font-bold">Configurações da organização</h1>
      <input className="touch-target w-full rounded border p-3" defaultValue="Minha Organização" />
      <input className="touch-target w-full rounded border p-3" defaultValue="Plano Start" />
      {/* TODO(owner): Stripe billing portal e gestão de plano */}
      {/* TODO(owner): white-label via subdomínios por tenant */}
    </main>
  );
}
