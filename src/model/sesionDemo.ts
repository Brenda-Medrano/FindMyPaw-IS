import type { Rol } from './permisosAlbergue';
export interface SesionDemo {id:string;rol:Rol}
export function crearSesionDemo(rol:Rol):SesionDemo{return {id:'demo',rol};}
