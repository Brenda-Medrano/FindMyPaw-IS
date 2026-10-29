import type { Reporte } from './types';
import { normalizarTexto } from './normalizarTexto';
export interface CriteriosBusqueda { texto?:string; especie?:string; estado?:string; }
export function filtrarReportes(reportes:Reporte[],filtros:CriteriosBusqueda):Reporte[]{
 return reportes.filter(r=>(!filtros.texto || normalizarTexto((r.nombre||'')+' '+r.descripcion).includes(normalizarTexto(filtros.texto))) && (!filtros.especie || r.especie===filtros.especie) && (!filtros.estado || (r.estado==='RESUELTO'?'RESUELTO':r.tipo)===filtros.estado));
}
