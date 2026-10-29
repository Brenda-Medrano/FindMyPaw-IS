import type { Reporte } from './types';
import { puedeEditarReporte } from './permisosReporte';
export function marcarResuelto(reporte:Reporte,usuarioId=reporte.autorId):Reporte {
 if(!puedeEditarReporte(usuarioId,reporte)) throw new Error('Sin permiso para cerrar este reporte');
 return {...reporte,estado:'RESUELTO'};
}
