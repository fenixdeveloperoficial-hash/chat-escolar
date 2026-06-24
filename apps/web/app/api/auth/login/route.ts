import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { loginSchema } from '@/lib/schemas';
import { fail, ok } from '@/lib/http';
import { COOKIE_OPTIONS } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const payload = loginSchema.parse(await request.json());
    const response = NextResponse.json(ok({ message: `Login efetuado para ${payload.email}` }));
    response.cookies.set('vf_user_id', randomUUID(), COOKIE_OPTIONS);
    response.cookies.set('vf_org_id', 'org-demo', COOKIE_OPTIONS);
    response.cookies.set('vf_role', payload.role, COOKIE_OPTIONS);
    return response;
  } catch (error) {
    return NextResponse.json(fail(error instanceof Error ? error.message : 'invalid_request'), { status: 400 });
  }
}
