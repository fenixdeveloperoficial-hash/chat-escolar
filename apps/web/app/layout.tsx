import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VendaForça',
  description: 'SaaS multi-tenant para vendas em campo',
  manifest: '/manifest.json'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
