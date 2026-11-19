import type { NuevoReporte, Reporte } from './types';

export function reporteDuplicado(
  _nuevo: NuevoReporte,
  _reportes: readonly Reporte[]
): boolean {
  return false;
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