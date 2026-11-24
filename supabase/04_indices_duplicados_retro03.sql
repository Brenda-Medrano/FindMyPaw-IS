-- RETRO-03. Ejecutar DESPUÉS de 03_auth_perfiles_retro03.sql.
-- Si ya existen duplicados previos, CREATE INDEX UNIQUE fallará con 23505.
-- En ese caso, inspeccionar/conciliar los duplicados; NO borrarlos automáticamente.
begin;

create or replace function public.normalizar_texto_retro03(valor text)
returns text
language sql
immutable
set search_path = ''
as $$
  select lower(btrim(regexp_replace(coalesce(valor, ''), '[[:space:]]+', ' ', 'g')));
$$;

create unique index if not exists uq_reportes_activos
on public.reportes (
  "autorId", tipo, especie, fecha,
  md5(public.normalizar_texto_retro03(nombre)),
  md5(public.normalizar_texto_retro03(zona)),
  md5(public.normalizar_texto_retro03(descripcion))
)
where estado = 'ACTIVO';

create unique index if not exists uq_solicitudes_activas
on public.solicitudes_adopcion ("adoptanteId", "perroId")
where estado in ('PENDIENTE', 'APROBADA');

commit;
