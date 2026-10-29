import type { Reporte } from './types';
export const buscarReporte=(reportes:Reporte[],id:string):Reporte|undefined=>reportes.find(r=>r.id===id);
