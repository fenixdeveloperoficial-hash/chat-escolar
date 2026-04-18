import { randomUUID } from 'node:crypto';
import type { Customer, Order, Profile, Visit } from '@vendaforca/types';

type Invitation = { id: string; orgId: string; email: string; role: 'seller' | 'manager'; token: string; expiresAt: string; acceptedAt?: string };

type Activity = {
  id: string;
  orgId: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  metadata: Record<string, unknown>;
  ip: string;
  createdAt: string;
};

const now = new Date().toISOString();

const state: {
  profiles: Profile[];
  customers: Customer[];
  visits: Visit[];
  orders: Order[];
  invitations: Invitation[];
  activities: Activity[];
} = {
  profiles: [
    { id: randomUUID(), orgId: 'org-demo', userId: 'user-owner', role: 'owner', name: 'Dono Demo' },
    { id: randomUUID(), orgId: 'org-demo', userId: 'user-seller', role: 'seller', name: 'Vendedora Ana' }
  ],
  customers: [
    {
      id: randomUUID(),
      orgId: 'org-demo',
      createdBy: 'user-owner',
      name: 'Padaria Estrela',
      phone: '+55 11 98888-0001',
      address: 'Rua Central, 120',
      lat: -23.551,
      lng: -46.633,
      createdAt: now
    }
  ],
  visits: [],
  orders: [],
  invitations: [],
  activities: []
};

export function listCustomers(orgId: string, cursor: string | undefined, limit: number, search?: string) {
  const byOrg = state.customers.filter((c) => c.orgId === orgId);
  const filtered = search ? byOrg.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())) : byOrg;
  const start = cursor ? Math.max(filtered.findIndex((x) => x.id === cursor) + 1, 0) : 0;
  const page = filtered.slice(start, start + limit);
  const nextCursor = page.length === limit ? page.at(-1)?.id ?? null : null;
  return { rows: page, nextCursor };
}

export function createCustomer(input: Omit<Customer, 'id' | 'createdAt'>): Customer {
  const customer: Customer = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
  state.customers.unshift(customer);
  return customer;
}

export function createVisit(input: Omit<Visit, 'id' | 'startedAt' | 'status'>): Visit {
  const visit: Visit = { ...input, id: randomUUID(), status: 'open', startedAt: new Date().toISOString() };
  state.visits.unshift(visit);
  return visit;
}

export function createOrder(input: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  const order: Order = { ...input, id: randomUUID(), status: 'created', createdAt: new Date().toISOString() };
  state.orders.unshift(order);
  return order;
}

export function listOrders(orgId: string, status?: string, sellerId?: string) {
  return state.orders.filter((o) => o.orgId === orgId && (!status || o.status === status) && (!sellerId || o.sellerId === sellerId));
}

export function listVisits(orgId: string) {
  return state.visits.filter((v) => v.orgId === orgId);
}

export function createInvitation(orgId: string, email: string, role: 'seller' | 'manager') {
  const invitation: Invitation = {
    id: randomUUID(),
    orgId,
    email,
    role,
    token: randomUUID(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString()
  };
  state.invitations.unshift(invitation);
  return invitation;
}

export function listProfiles(orgId: string) {
  return state.profiles.filter((p) => p.orgId === orgId);
}

export function appendActivity(input: Omit<Activity, 'id' | 'createdAt'>) {
  state.activities.unshift({ ...input, id: randomUUID(), createdAt: new Date().toISOString() });
}

export function getSummary(orgId: string) {
  const orders = state.orders.filter((o) => o.orgId === orgId);
  const day = orders.reduce((acc, o) => acc + o.total, 0);
  return { salesToday: day, salesWeek: day * 2, salesMonth: day * 4, orders: orders.length, visits: state.visits.length };
}
