'use client';

import type { ApiResponse } from './http';

export async function apiRequest<T>(url: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) }
  });
  return (await response.json()) as ApiResponse<T>;
}
