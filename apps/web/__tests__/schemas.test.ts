import { describe, it, expect } from 'vitest';
import { inviteSchema, orderSchema, signupSchema } from '@/lib/schemas';

describe('schemas', () => {
  it('validates invitation payload', () => {
    const parsed = inviteSchema.parse({ email: 'seller@acme.com', role: 'seller' });
    expect(parsed.email).toBe('seller@acme.com');
  });

  it('validates signup payload', () => {
    const parsed = signupSchema.parse({
      name: 'Owner',
      organizationName: 'Acme',
      email: 'owner@acme.com',
      role: 'owner'
    });
    expect(parsed.organizationName).toBe('Acme');
  });

  it('rejects invalid order', () => {
    expect(() =>
      orderSchema.parse({
        visitId: '',
        customerId: '',
        items: [],
        total: 0
      })
    ).toThrowError();
  });
});
