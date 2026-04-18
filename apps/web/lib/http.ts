export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  meta?: Record<string, unknown>;
}

export function ok<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T> {
  return { data, error: null, meta };
}

export function fail(error: string, meta?: Record<string, unknown>): ApiResponse<null> {
  return { data: null, error, meta };
}
