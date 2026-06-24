import { NextResponse } from 'next/server';
import { z } from 'zod';
import { fail, ok } from '@/lib/http';

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  try {
    const payload = schema.parse(await request.json());
    // TODO(owner): transactional e-mail provider for magic-link delivery
    return NextResponse.json(ok({ email: payload.email, sent: true }));
  } catch (error) {
    return NextResponse.json(fail(error instanceof Error ? error.message : 'invalid_request'), { status: 400 });
  }
}
