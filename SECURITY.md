# SECURITY — VendaForça MVP

## Superfície de ataque mapeada
1. APIs públicas (`/api/*`) com risco de abuso/input malicioso.
2. Sessões/cookies e escalonamento de permissões.
3. Multi-tenancy (vazamento entre tenants).
4. Front-end XSS em campos livres de texto.

## Mitigações aplicadas
- **RLS em todas as tabelas** e políticas por `org_id` (pronto para Supabase real).
- **Validação com Zod** em rotas críticas.
- **Sanitização com DOMPurify** para observações (`notes`).
- **Rate limiting** sliding window no endpoint de convite.
- **Headers de segurança** CSP, HSTS, X-Frame-Options.
- **Cookies SameSite=Strict** com `httpOnly`.
- **Audit log** para ações de convite/visita/pedido.

## Verificação de isolamento
- Script `supabase/rls_tenant_isolation_test.sql` simula tenant B tentando ler tenant A; retorno esperado `0 rows`.

## Regras operacionais
- Nunca expor `SUPABASE_SERVICE_ROLE_KEY` ao client.
- Evitar stack traces em produção.
- Revisar dependências no CI (`npm audit` antes do go-live).
