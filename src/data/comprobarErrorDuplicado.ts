import type { Tabla } from './BaseDatos';
import { MENSAJES_DUPLICADOS, RegistroDuplicadoError } from '../model/RegistroDuplicadoError';

export function comprobarErrorDuplicado(error: { code?: string; message?: string }, tabla: Tabla): void {
  if (error.code !== '23505') return;
  if (tabla === 'reportes' && (error.message ?? '').includes('uq_reportes_activos')) {
    throw new RegistroDuplicadoError(MENSAJES_DUPLICADOS.reporte);
  }
  if (tabla === 'solicitudes_adopcion' && (error.message ?? '').includes('uq_solicitudes_activas')) {
    throw new RegistroDuplicadoError(MENSAJES_DUPLICADOS.solicitud);
  }
  // No confundir otra restricción UNIQUE (p. ej., una clave primaria) con un duplicado funcional.
}
