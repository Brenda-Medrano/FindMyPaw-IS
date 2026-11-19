-- Ejecutar una sola vez en un proyecto nuevo. No borra tablas ni datos existentes.
begin;
create table public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  rol text not null check (rol in ('CIUDADANO','ALBERGUE','ADMIN')),
  "albergueId" text unique,
  check ((rol = 'ALBERGUE' and "albergueId" is not null) or
         (rol <> 'ALBERGUE' and "albergueId" is null))
);
create table public.reportes (
  id text primary key,
  "autorId" uuid not null references public.perfiles(id),
  tipo text not null check (tipo in ('PERDIDO','ENCONTRADO')),
  estado text not null default 'ACTIVO' check (estado in ('ACTIVO','RESUELTO')),
  moderacion text not null default 'PENDIENTE' check (moderacion in ('PENDIENTE','APROBADO','RECHAZADO')),
  especie text not null check (especie in ('PERRO','GATO')),
  nombre text,
  zona text not null check (length(trim(zona)) > 0),
  descripcion text not null check (length(trim(descripcion)) > 0),
  fecha date not null,
  foto text
);
create table public.mascotas (
  id text primary key,
  nombre text not null check (length(trim(nombre)) > 0),
  "albergueId" text not null references public.perfiles("albergueId"),
  tamano text not null check (tamano in ('PEQUEÑO','MEDIANO','GRANDE')),
  edad text not null check (length(trim(edad)) > 0),
  descripcion text not null check (length(trim(descripcion)) > 0),
  disponible boolean not null default true,
  foto text,
  requisitos text not null check (length(trim(requisitos)) > 0),
  unique (id, "albergueId")
);
create table public.solicitudes_adopcion (
  id text primary key,
  "perroId" text not null,
  "albergueId" text not null,
  "adoptanteId" uuid not null references public.perfiles(id),
  nombre text not null check (length(trim(nombre)) > 0),
  telefono text not null check (length(trim(telefono)) > 0),
  vivienda text not null check (length(trim(vivienda)) > 0),
  motivo text not null,
  estado text not null default 'PENDIENTE' check (estado in ('PENDIENTE','APROBADA','RECHAZADA')),
  foreign key ("perroId", "albergueId") references public.mascotas(id, "albergueId")
);
create index on public.reportes("autorId");
create index on public.mascotas("albergueId");
create index on public.solicitudes_adopcion("adoptanteId");
create index on public.solicitudes_adopcion("albergueId");

alter table public.perfiles enable row level security;
alter table public.reportes enable row level security;
alter table public.mascotas enable row level security;
alter table public.solicitudes_adopcion enable row level security;

-- Roles asignados exclusivamente desde el servidor/SQL Editor.
create policy perfil_propio on public.perfiles for select to authenticated
  using (id = (select auth.uid()));
create function public.rol_actual() returns text language sql stable security invoker set search_path = '' as $$
  select rol from public.perfiles where id = (select auth.uid());
$$;
create function public.albergue_actual() returns text language sql stable security invoker set search_path = '' as $$
  select "albergueId" from public.perfiles where id = (select auth.uid()) and rol = 'ALBERGUE';
$$;
revoke all on function public.rol_actual() from public;
revoke all on function public.albergue_actual() from public;
grant execute on function public.rol_actual(), public.albergue_actual() to anon, authenticated;

create policy reportes_publicos on public.reportes for select to anon, authenticated
  using (moderacion = 'APROBADO');
create policy reportes_privados on public.reportes for select to authenticated
  using ("autorId" = (select auth.uid()) or (select public.rol_actual()) = 'ADMIN');
create policy reporte_insert on public.reportes for insert to authenticated with check (
  (select public.rol_actual()) = 'CIUDADANO' and "autorId" = (select auth.uid())
  and estado = 'ACTIVO' and moderacion = 'PENDIENTE'
);
create policy reporte_update on public.reportes for update to authenticated
  using (("autorId" = (select auth.uid()) and (select public.rol_actual()) = 'CIUDADANO') or (select public.rol_actual()) = 'ADMIN')
  with check (("autorId" = (select auth.uid()) and (select public.rol_actual()) = 'CIUDADANO') or (select public.rol_actual()) = 'ADMIN');
create function public.proteger_reporte() returns trigger language plpgsql set search_path = '' as $$
begin
  if (select auth.uid()) is not null then
    if new.id is distinct from old.id or new."autorId" is distinct from old."autorId" then
      raise exception 'No se puede cambiar la identidad del reporte';
    end if;
    if public.rol_actual() = 'ADMIN' then
      if (to_jsonb(new) - 'moderacion') is distinct from (to_jsonb(old) - 'moderacion') then
        raise exception 'El administrador solo puede moderar el reporte';
      end if;
      if new.moderacion not in ('APROBADO','RECHAZADO') then raise exception 'Moderacion invalida'; end if;
    elsif new.moderacion is distinct from old.moderacion then
      raise exception 'Solo el administrador puede moderar';
    end if;
  end if;
  return new;
end;
$$;
create trigger proteger_reporte before update on public.reportes for each row execute function public.proteger_reporte();

create policy mascotas_publicas on public.mascotas for select to anon, authenticated using (disponible);
create policy mascotas_propias on public.mascotas for select to authenticated
  using ("albergueId" = (select public.albergue_actual()) or (select public.rol_actual()) = 'ADMIN');
create policy mascota_insert on public.mascotas for insert to authenticated
  with check ("albergueId" = (select public.albergue_actual()));
create policy mascota_update on public.mascotas for update to authenticated
  using ("albergueId" = (select public.albergue_actual()))
  with check ("albergueId" = (select public.albergue_actual()));

create policy solicitud_select on public.solicitudes_adopcion for select to authenticated
  using ("adoptanteId" = (select auth.uid()) or "albergueId" = (select public.albergue_actual()));
create policy solicitud_insert on public.solicitudes_adopcion for insert to authenticated
  with check ((select public.rol_actual()) = 'CIUDADANO' and "adoptanteId" = (select auth.uid())
    and estado = 'PENDIENTE' and exists (select 1 from public.mascotas m
      where m.id = "perroId" and m."albergueId" = solicitudes_adopcion."albergueId" and m.disponible));
create policy solicitud_update on public.solicitudes_adopcion for update to authenticated
  using ("albergueId" = (select public.albergue_actual()))
  with check ("albergueId" = (select public.albergue_actual()) and estado in ('APROBADA','RECHAZADA'));

-- No se conceden permisos de escritura sobre perfiles ni DELETE sobre las tablas.
revoke all on public.perfiles, public.reportes, public.mascotas, public.solicitudes_adopcion from anon, authenticated;
grant select on public.reportes, public.mascotas to anon, authenticated;
grant select on public.perfiles, public.solicitudes_adopcion to authenticated;
grant insert, update on public.reportes to authenticated;
grant insert on public.mascotas, public.solicitudes_adopcion to authenticated;
grant update (nombre, tamano, edad, descripcion, disponible, foto, requisitos) on public.mascotas to authenticated;
grant update (estado) on public.solicitudes_adopcion to authenticated;
commit;
