import { env } from './env';

type Entry = { count: number; timestamps: number[] };
const store = new Map<string, Entry>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowStart = now - env.rateLimitWindowMs;
  const entry = store.get(identifier) ?? { count: 0, timestamps: [] };
  entry.timestamps = entry.timestamps.filter((ts) => ts >= windowStart);
  entry.count = entry.timestamps.length;
  if (entry.count >= env.rateLimitMax) {
    store.set(identifier, entry);
    return false;
  }
  entry.timestamps.push(now);
  entry.count = entry.timestamps.length;
  store.set(identifier, entry);
  return true;
}
