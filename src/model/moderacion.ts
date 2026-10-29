import type { Reporte } from './types';
export function asignarPendiente(r:Reporte):Reporte{return {...r,moderacion:'PENDIENTE'};}
export function moderarReporte(r:Reporte,rol:string,estado:'APROBADO'|'RECHAZADO'):Reporte{
 if(rol!=='ADMIN')throw new Error('Acción exclusiva del administrador');
 return {...r,moderacion:estado};
}
