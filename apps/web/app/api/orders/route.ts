import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth';
import { orderSchema } from '@/lib/schemas';
import { fail, ok } from '@/lib/http';
import { sanitizeText } from '@/lib/sanitize';
import { logActivity } from '@/lib/activity-log';
import { createOrder, listOrders } from '@/lib/mock-db';

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const payload = orderSchema.parse(await request.json());

    const order = createOrder({
      orgId: session.orgId,
      visitId: payload.visitId,
      sellerId: session.userId,
      customerId: payload.customerId,
      items: payload.items,
      total: payload.total,
      notes: payload.notes ? sanitizeText(payload.notes) : undefined
    });

    await logActivity({
      orgId: session.orgId,
      userId: session.userId,
      action: 'order.created',
      entity: 'order',
      entityId: order.id,
      metadata: { items: payload.items.length, total: payload.total },
      ip: session.ip
    });

    return NextResponse.json(ok(order));
  } catch (error) {
    return NextResponse.json(fail(error instanceof Error ? error.message : 'unknown_error'), { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await requireSession();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') ?? undefined;
    const sellerId = searchParams.get('sellerId') ?? undefined;
    return NextResponse.json(ok(listOrders(session.orgId, status ?? undefined, sellerId ?? undefined)));
  } catch (error) {
    return NextResponse.json(fail(error instanceof Error ? error.message : 'unknown_error'), { status: 400 });
  }
}
