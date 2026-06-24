import { describe, it, expect } from 'vitest';
import { createCustomer, listCustomers } from '@/lib/mock-db';

describe('mock db', () => {
  it('creates and lists customers by tenant', () => {
    const created = createCustomer({
      orgId: 'org-demo',
      createdBy: 'user-a',
      name: 'Cliente Teste',
      phone: '1199999999'
    });

    const { rows } = listCustomers('org-demo', undefined, 10, 'Cliente Teste');
    expect(rows.some((row) => row.id === created.id)).toBe(true);
  });
});
