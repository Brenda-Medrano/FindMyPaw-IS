import type { Reporte } from './types';
import { esAdministrador } from './permisos';
import type { Rol } from './permisosAlbergue';
export function asignarPendiente(r:Reporte):Reporte{return {...r,moderacion:'PENDIENTE'};}
export function moderarReporte(r:Reporte,rol:Rol,estado:'APROBADO'|'RECHAZADO'):Reporte{
 if(!esAdministrador(rol))throw new Error('Acción exclusiva del administrador');
 return {...r,moderacion:estado};
}
