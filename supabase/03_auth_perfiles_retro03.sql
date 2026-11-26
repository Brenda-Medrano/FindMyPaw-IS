-- RETRO-03. Ejecutar después de supabase/01_schema.sql.
-- No habilita inserciones anónimas sobre public.perfiles.
begin;

create or replace function public.crear_perfil_ciudadano()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfiles (id, rol, "albergueId")
  values (new.id, 'CIUDADANO', null)
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.crear_perfil_ciudadano() from public, anon, authenticated;
drop trigger if exists crear_perfil_nuevo_usuario on auth.users;
create trigger crear_perfil_nuevo_usuario
after insert on auth.users
for each row execute function public.crear_perfil_ciudadano();

-- Repara cuentas creadas ANTES del trigger; nunca cambia roles existentes.
insert into public.perfiles (id, rol, "albergueId")
select u.id, 'CIUDADANO', null
from auth.users u
where not exists (select 1 from public.perfiles p where p.id = u.id)
on conflict (id) do nothing;

commit;
