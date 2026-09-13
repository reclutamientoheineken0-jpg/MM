-- HEINEKEN MEMOS - esquema inicial de producción
-- Ejecutar en Supabase Dashboard > SQL Editor.
-- Este script es idempotente: puede ejecutarse más de una vez sin borrar datos.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  employee_id text not null unique,
  name text not null,
  email text not null unique,
  role text not null default 'Cliente' check (role in ('Administrador', 'Cliente')),
  title text not null default 'Cliente',
  avatar text not null default '',
  zone text not null default 'Nacional',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sales_reps (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  email text not null,
  phone text not null default '',
  zone text not null check (zone in ('Lima Metro', 'Norte', 'Centro', 'Sur', 'Este')),
  avatar text not null default '',
  performance_q3 integer not null default 0 check (performance_q3 between 0 and 100),
  status text not null default 'Activo' check (status in ('Activo', 'Sancionado', 'Despedido')),
  memo_count integer not null default 0 check (memo_count >= 0),
  last_memo_date date,
  status_badge text not null default 'Limpio',
  hire_date date not null default current_date,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.memos (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  sales_rep_id uuid not null references public.sales_reps(id) on delete restrict,
  sales_rep_name text not null,
  sales_rep_code text not null,
  sales_rep_zone text not null,
  sales_rep_avatar text not null default '',
  type text not null check (type in ('Llamada de atención', 'Día no remunerado', 'Despido')),
  incident_date date not null,
  description text not null,
  file_attachment_name text,
  file_attachment_size text,
  file_attachment_url text,
  created_by uuid not null references public.profiles(id) on delete restrict,
  status text not null default 'Aprobado' check (status in ('Registrado', 'En revisión', 'Aprobado', 'Cerrado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  read boolean not null default false,
  type text not null check (type in ('info', 'warning', 'alert')),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists memos_created_by_idx on public.memos(created_by);
create index if not exists memos_sales_rep_idx on public.memos(sales_rep_id);
create index if not exists memos_incident_date_idx on public.memos(incident_date);
create index if not exists notifications_user_idx on public.notifications(user_id, created_at desc);
create index if not exists audit_logs_entity_idx on public.audit_logs(entity, entity_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists sales_reps_set_updated_at on public.sales_reps;
create trigger sales_reps_set_updated_at before update on public.sales_reps for each row execute function public.set_updated_at();
drop trigger if exists memos_set_updated_at on public.memos;
create trigger memos_set_updated_at before update on public.memos for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.sales_reps enable row level security;
alter table public.memos enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select to authenticated using (id = auth.uid());
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists sales_reps_authenticated_select on public.sales_reps;
create policy sales_reps_authenticated_select on public.sales_reps for select to authenticated using (true);
drop policy if exists sales_reps_authenticated_insert on public.sales_reps;
create policy sales_reps_authenticated_insert on public.sales_reps for insert to authenticated with check (created_by = auth.uid());
drop policy if exists sales_reps_authenticated_update on public.sales_reps;
create policy sales_reps_authenticated_update on public.sales_reps for update to authenticated using (true) with check (true);

drop policy if exists memos_authenticated_select on public.memos;
create policy memos_authenticated_select on public.memos for select to authenticated using (true);
drop policy if exists memos_authenticated_insert on public.memos;
create policy memos_authenticated_insert on public.memos for insert to authenticated with check (created_by = auth.uid());
drop policy if exists memos_authenticated_update on public.memos;
create policy memos_authenticated_update on public.memos for update to authenticated using (true) with check (true);

drop policy if exists notifications_own on public.notifications;
create policy notifications_own on public.notifications for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists audit_logs_authenticated_insert on public.audit_logs;
create policy audit_logs_authenticated_insert on public.audit_logs for insert to authenticated with check (user_id = auth.uid());
drop policy if exists audit_logs_authenticated_select on public.audit_logs;
create policy audit_logs_authenticated_select on public.audit_logs for select to authenticated using (user_id = auth.uid());
