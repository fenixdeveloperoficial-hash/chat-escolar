import { cookies, headers } from 'next/headers';

export type Session = {
  userId: string;
  orgId: string;
  role: 'owner' | 'manager' | 'seller';
  ip: string;
};

export const COOKIE_OPTIONS = {
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  path: '/'
};

export async function requireSession(): Promise<Session> {
  const cookieStore = cookies();
  const userId = cookieStore.get('vf_user_id')?.value;
  const orgId = cookieStore.get('vf_org_id')?.value;
  const role = cookieStore.get('vf_role')?.value as Session['role'] | undefined;

  if (!userId || !orgId || !role) throw new Error('unauthorized');

  const ip = headers().get('x-forwarded-for') ?? '127.0.0.1';
  return { userId, orgId, role, ip };
}
