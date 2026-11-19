-- Antes de ejecutar: crear las 3 cuentas desde Authentication > Users.
-- Si utilizas otros correos, sustituyelos en las tres filas VALUES.
begin;
do $$
begin
  if (select count(*) from auth.users where lower(email) in ('usuario@findmypaw.test','albergue@findmypaw.test','admin@findmypaw.test')) <> 3 then
    raise exception 'Crea primero las tres cuentas en Authentication > Users (o adapta los correos)';
  end if;
end $$;
insert into public.perfiles (id, rol, "albergueId")
select u.id, d.rol, d.albergue_id from auth.users u
join (values
  ('usuario@findmypaw.test','CIUDADANO',null::text),
  ('albergue@findmypaw.test','ALBERGUE','demo'),
  ('admin@findmypaw.test','ADMIN',null::text)
) as d(correo,rol,albergue_id) on lower(u.email) = d.correo
on conflict (id) do nothing;
insert into public.mascotas (id,nombre,"albergueId",tamano,edad,descripcion,disponible,foto,requisitos) values
 ('p1','Toby','demo','PEQUEÑO','2 años','Cariñoso',true,'/pets/pet-max.png','Entrevista y compromiso de cuidado'),
 ('p2','Mila','demo','MEDIANO','1 año','Juguetona',true,'/pets/pet-encontrado.png','Hogar seguro y tiempo disponible'),
 ('p3','Rocky','demo','GRANDE','3 años','Tranquilo',true,'/pets/pet-rocky.png','Espacio y evaluación del albergue')
on conflict (id) do nothing;
-- Reporte de ejemplo para comprobar el listado público de la aplicación.
insert into public.reportes (id,"autorId",tipo,estado,moderacion,especie,nombre,zona,descripcion,fecha,foto)
select 'r-demo-1', id, 'PERDIDO','ACTIVO','APROBADO','PERRO','Max','Sarco',
       'Reporte ficticio para las pruebas del MVP',current_date,'/pets/pet-max.png'
from auth.users where lower(email) = 'usuario@findmypaw.test'
on conflict (id) do nothing;
commit;
