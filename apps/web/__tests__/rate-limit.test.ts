import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '@/lib/rate-limit';

describe('rate limit', () => {
  it('allows first request for identifier', () => {
    expect(checkRateLimit('test-user')).toBe(true);
  });
});
