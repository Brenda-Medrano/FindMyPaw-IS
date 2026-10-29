import type { Reporte } from './types';
export function puedeEditarReporte(usuarioId:string,reporte:Reporte):boolean {
 return usuarioId===reporte.autorId;
}
