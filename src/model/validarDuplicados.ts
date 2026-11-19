import type { NuevoReporte, Reporte } from './types';
import type { SolicitudAdopcion } from './adopcionTypes';

import {
  normalizarCorreo,
  normalizarTexto,
} from './normalizarTexto';

export function correoDuplicado(
  correo: string,
  registrados: readonly string[]
): boolean {
  return registrados.some(
    registrado =>
      normalizarCorreo(registrado) === normalizarCorreo(correo)
  );
}

function mismoReporte(
  primero: NuevoReporte,
  segundo: NuevoReporte
): boolean {
  return (
    primero.autorId === segundo.autorId &&
    primero.tipo === segundo.tipo &&
    primero.especie === segundo.especie &&
    primero.fecha === segundo.fecha &&
    normalizarTexto(primero.nombre) ===
      normalizarTexto(segundo.nombre) &&
    normalizarTexto(primero.zona) ===
      normalizarTexto(segundo.zona) &&
    normalizarTexto(primero.descripcion) ===
      normalizarTexto(segundo.descripcion)
  );
}

export function reporteDuplicado(
  nuevo: NuevoReporte,
  reportes: readonly Reporte[]
): boolean {
  return reportes.some(
    reporte =>
      reporte.estado === 'ACTIVO' &&
      mismoReporte(reporte, nuevo)
  );
}

export function solicitudDuplicada(
  nueva: SolicitudAdopcion,
  solicitudes: readonly SolicitudAdopcion[]
): boolean {
  return solicitudes.some(
    solicitud =>
      solicitud.adoptanteId === nueva.adoptanteId &&
      solicitud.perroId === nueva.perroId &&
      solicitud.estado !== 'RECHAZADA'
  );
}