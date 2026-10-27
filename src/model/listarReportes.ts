import type { Reporte } from './types';
export function listarPublicos(reportes: Reporte[]): Reporte[] {
  return reportes.filter(r=>r.moderacion==='APROBADO');
}
