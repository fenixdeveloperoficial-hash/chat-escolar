insert into organizations (id, name, slug, plan)
values
  ('11111111-1111-1111-1111-111111111111', 'Org Demo A', 'org-a', 'starter'),
  ('22222222-2222-2222-2222-222222222222', 'Org Demo B', 'org-b', 'growth')
on conflict do nothing;

insert into profiles (org_id, user_id, role, name)
values
  ('11111111-1111-1111-1111-111111111111', gen_random_uuid(), 'owner', 'Owner A'),
  ('22222222-2222-2222-2222-222222222222', gen_random_uuid(), 'owner', 'Owner B')
on conflict do nothing;

insert into products (org_id, name, price, unit)
values
  ('11111111-1111-1111-1111-111111111111', 'Produto Demo', 29.90, 'un')
on conflict do nothing;
