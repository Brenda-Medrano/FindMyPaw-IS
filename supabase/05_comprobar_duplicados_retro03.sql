-- Diagnóstico antes de aplicar índices únicos. Solo lectura; no modifica datos.
select 'solicitudes_adopcion' as tabla,
       "adoptanteId"::text as usuario,
       "perroId" as referencia,
       count(*) as cantidad
from public.solicitudes_adopcion
where estado in ('PENDIENTE','APROBADA')
group by "adoptanteId", "perroId"
having count(*) > 1;

-- Para reportes agrupamos por reglas equivalentes a la migración.
select "autorId", tipo, especie, fecha,
       md5(lower(btrim(regexp_replace(coalesce(nombre,''),'[[:space:]]+',' ','g')))) as nombre_hash,
       md5(lower(btrim(regexp_replace(zona,'[[:space:]]+',' ','g')))) as zona_hash,
       md5(lower(btrim(regexp_replace(descripcion,'[[:space:]]+',' ','g')))) as descripcion_hash,
       count(*) as cantidad
from public.reportes
where estado = 'ACTIVO'
group by 1,2,3,4,5,6,7
having count(*) > 1;
