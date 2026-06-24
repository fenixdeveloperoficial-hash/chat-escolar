const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];

required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Missing env var: ${key}`);
  }
});

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? '60'),
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? '60000')
};
