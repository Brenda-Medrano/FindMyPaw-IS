import type { SolicitudAdopcion,EstadoSolicitud } from './adopcionTypes';
export function resolverSolicitud(s:SolicitudAdopcion,albergueId:string,estado:Extract<EstadoSolicitud,'APROBADA'|'RECHAZADA'>):SolicitudAdopcion{
 if(s.albergueId!==albergueId)throw new Error('No autorizado');
 return {...s,estado};
}
