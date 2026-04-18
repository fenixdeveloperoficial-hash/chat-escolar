export type Role = 'owner' | 'manager' | 'seller';
export type Plan = 'starter' | 'growth' | 'enterprise';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
}

export interface Profile {
  id: string;
  orgId: string;
  userId: string;
  role: Role;
  name: string;
}

export interface Customer {
  id: string;
  orgId: string;
  createdBy: string;
  name: string;
  document?: string;
  phone?: string;
  address?: string;
  lat?: number;
  lng?: number;
  createdAt: string;
}

export interface Visit {
  id: string;
  orgId: string;
  sellerId: string;
  customerId: string;
  lat: number;
  lng: number;
  notes?: string;
  status: 'open' | 'completed';
  startedAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orgId: string;
  visitId: string;
  sellerId: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  notes?: string;
  status: 'created' | 'sent' | 'paid';
  createdAt: string;
}
