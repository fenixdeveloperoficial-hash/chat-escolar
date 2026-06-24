import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth';
import { cursorSchema, customerSchema } from '@/lib/schemas';
import { ok, fail } from '@/lib/http';
import { createCustomer, listCustomers } from '@/lib/mock-db';

export async function GET(request: Request) {
  try {
    const session = await requireSession();
    const { searchParams } = new URL(request.url);
    const parsed = cursorSchema.parse({
      cursor: searchParams.get('cursor') ?? undefined,
      limit: searchParams.get('limit') ?? '20',
      search: searchParams.get('search') ?? undefined
    });

    const { rows, nextCursor } = listCustomers(session.orgId, parsed.cursor, parsed.limit, parsed.search);
    return NextResponse.json(ok(rows, { nextCursor }));
  } catch (error) {
    return NextResponse.json(fail(error instanceof Error ? error.message : 'unknown_error'), { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const payload = customerSchema.parse(await request.json());
    const customer = createCustomer({ ...payload, orgId: session.orgId, createdBy: session.userId });
    return NextResponse.json(ok(customer));
  } catch (error) {
    return NextResponse.json(fail(error instanceof Error ? error.message : 'unknown_error'), { status: 400 });
  }
}
