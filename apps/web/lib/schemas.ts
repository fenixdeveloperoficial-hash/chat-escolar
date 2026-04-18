import { z } from 'zod';

export const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['seller', 'manager'])
});

export const signupSchema = z.object({
  name: z.string().min(2),
  organizationName: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['owner', 'manager', 'seller']).default('owner')
});

export const loginSchema = z.object({
  email: z.string().email(),
  role: z.enum(['owner', 'manager', 'seller']).default('owner')
});

export const customerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8).optional(),
  document: z.string().optional(),
  address: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional()
});

export const visitSchema = z.object({
  customerId: z.string().min(3),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  notes: z.string().max(1000).optional(),
  photoUrl: z.string().url().optional()
});

export const orderSchema = z.object({
  visitId: z.string().min(3),
  customerId: z.string().min(3),
  items: z.array(z.object({ productId: z.string().min(3), quantity: z.number().positive(), unitPrice: z.number().nonnegative() })).min(1),
  total: z.number().positive(),
  notes: z.string().max(2000).optional()
});

export const cursorSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional()
});
