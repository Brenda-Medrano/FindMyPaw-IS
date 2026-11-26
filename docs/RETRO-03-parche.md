# RETRO-03 — Validar registros duplicados

## Alcance

1. Crear cuentas ciudadanas con Supabase Auth, sin escribir contraseñas en `public.perfiles`.
2. Crear automáticamente un perfil `CIUDADANO` mediante trigger SQL; roles elevados siguen asignándose administrativamente.
3. Rechazar reportes activos repetidos por autor, tipo, especie, fecha, nombre, zona y descripción normalizados.
4. Rechazar solicitudes de adopción pendientes o aprobadas del mismo usuario para la misma mascota.
5. Mostrar errores en la UI y convertir `23505` a mensajes de dominio.
6. Garantizar unicidad en PostgreSQL aunque existan dos pestañas concurrentes.

## Migraciones (SQL Editor)

Aplicar en este orden, una sola vez por base, después de `01_schema.sql`:

- `supabase/03_auth_perfiles_retro03.sql`
- `supabase/04_indices_duplicados_retro03.sql`

El archivo `02` de datos de demostración es opcional.
No volver a ejecutar `01_schema.sql` si las tablas ya existen.
Si hay índices previos con el mismo nombre pero definición distinta, inspeccionarlos antes de continuar.

## Reglas/limitaciones

- Supabase puede ocultar la existencia de un correo por privacidad. En ese caso, la respuesta de registro es deliberadamente genérica; no consultar públicamente `auth.users`.
- La unicidad de reportes se basa en las huellas MD5 de los valores normalizados. Existe una posibilidad teórica de colisión, aunque extremadamente pequeña para datos normales.
- Las verificaciones del presenter dependen de lo visible en memoria. PostgreSQL es la autoridad definitiva frente a condiciones de carrera.
- Un reporte resuelto y una solicitud rechazada permiten volver a registrar; un reporte pendiente de moderación permanece activo.

## Verificación

```powershell
npm test
npm run build
npm run dev
```

Pruebas manuales: crear cuenta con correo real, confirmarla, iniciar sesión,
repetir correo, publicar un reporte dos veces, enviar dos solicitudes de adopción,
intentar operaciones simultáneas desde dos pestañas.

No subir `.env.local`, credenciales privadas ni capturas que muestren claves.
