export type Rol = 'CIUDADANO'|'ALBERGUE'|'ADMIN';
export function puedePublicarAdopcion(rol:Rol){return rol==='ALBERGUE'||rol==='ADMIN';}
