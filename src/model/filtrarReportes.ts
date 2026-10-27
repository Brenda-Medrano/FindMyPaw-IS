import type { Reporte } from './types';
export interface CriteriosBusqueda { texto?:string; especie?:string; estado?:string; }
export function filtrarReportes(reportes:Reporte[],filtros:CriteriosBusqueda):Reporte[]{
 return reportes.filter(r=>!filtros.texto || ((r.nombre||'')+' '+r.descripcion).toLowerCase().includes(filtros.texto.toLowerCase()));
}
