import type { NuevoReporte, Reporte } from './types';
import type { SolicitudAdopcion } from './adopcionTypes';

export function solicitudDuplicada(
  nueva: SolicitudAdopcion,
  solicitudes: readonly SolicitudAdopcion[]
): boolean {
  return solicitudes.some(solicitud =>
    solicitud.adoptanteId === nueva.adoptanteId &&
    solicitud.perroId === nueva.perroId &&
    solicitud.estado !== 'RECHAZADA'
  );
}
export function reporteDuplicado(
  nuevo: NuevoReporte,
  reportes: readonly Reporte[]
): boolean {
  const normalizar = (valor?: string): string =>
    (valor ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

  return reportes.some(reporte =>
    reporte.estado === 'ACTIVO' &&
    reporte.autorId === nuevo.autorId &&
    reporte.tipo === nuevo.tipo &&
    reporte.especie === nuevo.especie &&
    reporte.fecha === nuevo.fecha &&
    normalizar(reporte.nombre) === normalizar(nuevo.nombre) &&
    normalizar(reporte.zona) === normalizar(nuevo.zona) &&
    normalizar(reporte.descripcion) ===
      normalizar(nuevo.descripcion)
  );
}
export function correoDuplicado(
  correo: string,
  registrados: readonly string[]
): boolean {
  const correoNormalizado = correo.trim().toLowerCase();

  return registrados.some(
    registrado =>
      registrado.trim().toLowerCase() === correoNormalizado
  );
}