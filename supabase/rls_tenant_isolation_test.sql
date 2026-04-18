-- Simula tenant B tentando ler tenant A
set local role authenticated;
set local request.jwt.claim.org_id = '22222222-2222-2222-2222-222222222222';

select count(*) as leaking_rows
from customers
where org_id = '11111111-1111-1111-1111-111111111111';
-- esperado: 0
