import { appendActivity } from './mock-db';

export async function logActivity(input: {
  orgId: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ip: string;
}) {
  appendActivity({
    orgId: input.orgId,
    userId: input.userId,
    action: input.action,
    entity: input.entity,
    entityId: input.entityId,
    metadata: input.metadata ?? {},
    ip: input.ip
  });
}
