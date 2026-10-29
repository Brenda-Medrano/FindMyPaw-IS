import type { SolicitudAdopcion } from './adopcionTypes';
export function solicitudesDelAlbergue(solicitudes:SolicitudAdopcion[],albergueId:string):SolicitudAdopcion[]{return solicitudes.filter(s=>s.albergueId===albergueId);}
