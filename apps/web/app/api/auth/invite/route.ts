import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth';
import { inviteSchema } from '@/lib/schemas';
import { fail, ok } from '@/lib/http';
import { checkRateLimit } from '@/lib/rate-limit';
import { logActivity } from '@/lib/activity-log';
import { createInvitation } from '@/lib/mock-db';

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    if (!['owner', 'manager'].includes(session.role)) return NextResponse.json(fail('forbidden'), { status: 403 });
    if (!checkRateLimit(`invite:${session.userId}`)) return NextResponse.json(fail('rate_limit_exceeded'), { status: 429 });

    const payload = inviteSchema.parse(await request.json());
    const invitation = createInvitation(session.orgId, payload.email, payload.role);

    // TODO(owner): transactional e-mail provider integration for invitation delivery
    await logActivity({
      orgId: session.orgId,
      userId: session.userId,
      action: 'invitation.created',
      entity: 'invitation',
      entityId: invitation.id,
      metadata: { email: payload.email, role: payload.role },
      ip: session.ip
    });

    return NextResponse.json(ok(invitation));
  } catch (error) {
    return NextResponse.json(fail(error instanceof Error ? error.message : 'unknown_error'), { status: 400 });
  }
}
