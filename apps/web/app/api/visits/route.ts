import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth';
import { visitSchema } from '@/lib/schemas';
import { fail, ok } from '@/lib/http';
import { sanitizeText } from '@/lib/sanitize';
import { logActivity } from '@/lib/activity-log';
import { createVisit } from '@/lib/mock-db';

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const payload = visitSchema.parse(await request.json());

    const visit = createVisit({
      orgId: session.orgId,
      sellerId: session.userId,
      customerId: payload.customerId,
      lat: payload.lat,
      lng: payload.lng,
      notes: payload.notes ? sanitizeText(payload.notes) : undefined
    });

    await logActivity({
      orgId: session.orgId,
      userId: session.userId,
      action: 'visit.created',
      entity: 'visit',
      entityId: visit.id,
      metadata: { customerId: visit.customerId, lat: visit.lat, lng: visit.lng },
      ip: session.ip
    });

    return NextResponse.json(ok({ ...visit, sync: 'saved' }));
  } catch (error) {
    return NextResponse.json(fail(error instanceof Error ? error.message : 'unknown_error'), { status: 400 });
  }
}
