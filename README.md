# VendaForça — SaaS de Vendas em Campo (MVP Funcional)

Este repositório agora roda **localmente sem depender de banco externo** (usa mock in-memory), mantendo a estrutura pronta para conectar Supabase/Stripe depois.

## O que já funciona ponta-a-ponta
- Signup + login + magic link (mock)
- Controle de acesso por role (`owner`, `manager`, `seller`)
- Fluxo vendedor mobile (`/app/*`): cliente → visita → pedido
- Dashboard desktop (`/dashboard/*`): resumo, feed, clientes com busca/paginação, pedidos com filtro e exportação CSV
- Segurança base: Zod, sanitização, rate limit, activity log, headers, SameSite strict

## Stack
- Next.js 14 + TypeScript strict + Tailwind
- Estrutura Supabase (migrations + RLS + seed)
- Vitest + Testing Library + scaffold Playwright
- CI com GitHub Actions

## Setup em 5 comandos
```bash
git clone <repo-url>
cd chat-escolar
cp .env.example .env
npm install
npm run dev
```

## Scripts
- `npm run dev`
- `npm run lint`
- `npm run test`
- `npm run build`

## Rotas principais
- `/auth/signup`
- `/auth/login`
- `/app` (vendedor)
- `/dashboard` (gestão)

## Produção (próximos passos)
- Conectar handlers ao Supabase real.
- Ativar envio de e-mails transacionais.
- Ligar Stripe em billing/planos.

## TODO(owner)
- Stripe billing.
- E-mails transacionais.
- Push notifications (VAPID).
- Integração NF-e/ERP.
- White-label.
