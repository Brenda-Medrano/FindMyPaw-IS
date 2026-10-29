import type { Reporte } from './types';
export function marcarResuelto(reporte:Reporte):Reporte { return {...reporte,estado:'RESUELTO'}; }
