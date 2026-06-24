'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/app', label: 'Início', icon: '🏠' },
  { href: '/app/checkins', label: 'Visitas', icon: '📍' },
  { href: '/app/customers', label: 'Clientes', icon: '👤' },
  { href: '/app/orders', label: 'Pedidos', icon: '🧾' }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white/95 p-2 backdrop-blur">
      <ul className="mx-auto grid max-w-md grid-cols-4 gap-2">
        {tabs.map((tab) => (
          <li key={tab.href}>
            <Link
              className={`touch-target flex flex-col items-center justify-center rounded px-1 py-2 text-xs font-medium ${
                pathname === tab.href ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
              href={tab.href}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
