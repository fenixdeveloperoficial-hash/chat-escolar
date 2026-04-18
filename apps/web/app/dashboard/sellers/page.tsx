const sellers = [
  { name: 'Ana', orders: 29, total: 'R$ 21.000' },
  { name: 'Carlos', orders: 22, total: 'R$ 18.700' },
  { name: 'Marta', orders: 18, total: 'R$ 15.300' }
];

export default function SellerRankingPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Perfil e ranking de vendedores</h1>
      <table className="mt-4 w-full rounded bg-white shadow">
        <thead>
          <tr className="text-left">
            <th className="p-3">Vendedor</th>
            <th className="p-3">Pedidos</th>
            <th className="p-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.name} className="border-t">
              <td className="p-3">{seller.name}</td>
              <td className="p-3">{seller.orders}</td>
              <td className="p-3">{seller.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
