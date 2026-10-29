import type { Rol } from './permisosAlbergue';
export function esAdministrador(rol:Rol):boolean{return rol==='ADMIN';}
export function esAlbergue(rol:Rol):boolean{return rol==='ALBERGUE'||esAdministrador(rol);}
