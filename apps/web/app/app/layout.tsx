import { MobileNav } from '@/components/mobile-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-md px-4 pb-24 pt-4">
      {children}
      <MobileNav />
    </main>
  );
}
