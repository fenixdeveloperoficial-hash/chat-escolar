create extension if not exists "pgcrypto";

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  plan text not null default 'starter',
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('owner','manager','seller')),
  name text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  created_by uuid not null,
  name text not null,
  document text,
  phone text,
  address text,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now()
);

create table if not exists visits (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  seller_id uuid not null,
  customer_id uuid not null references customers(id) on delete cascade,
  lat double precision,
  lng double precision,
  photo_url text,
  notes text,
  status text not null default 'open',
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  visit_id uuid references visits(id) on delete set null,
  seller_id uuid not null,
  customer_id uuid not null references customers(id) on delete cascade,
  items jsonb not null,
  total numeric(12,2) not null,
  status text not null default 'created',
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  price numeric(12,2) not null,
  unit text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null,
  action text not null,
  entity text not null,
  entity_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  ip text,
  created_at timestamptz not null default now()
);

create table if not exists invitations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  email text not null,
  role text not null check (role in ('manager','seller')),
  token text not null unique,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table profiles enable row level security;
alter table customers enable row level security;
alter table visits enable row level security;
alter table orders enable row level security;
alter table products enable row level security;
alter table activity_log enable row level security;
alter table invitations enable row level security;

create or replace function current_org_id() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.org_id', true), '')::uuid
$$;

create policy org_select on organizations for select using (id = current_org_id());
create policy org_all_profiles on profiles for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy org_all_customers on customers for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy org_all_visits on visits for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy org_all_orders on orders for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy org_all_products on products for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy org_all_activity_log on activity_log for all using (org_id = current_org_id()) with check (org_id = current_org_id());
create policy org_all_invitations on invitations for all using (org_id = current_org_id()) with check (org_id = current_org_id());
