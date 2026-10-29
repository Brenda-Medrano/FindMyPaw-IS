import type { SolicitudAdopcion } from './adopcionTypes';
export function validarSolicitud(s:SolicitudAdopcion):string[]{
 const errores:string[]=[];
 if(!s.nombre.trim()) errores.push('Ingresa tu nombre');
 if(!s.telefono.trim()) errores.push('Ingresa un teléfono');
 if(!s.vivienda.trim()) errores.push('Indica el tipo de vivienda');
 return errores;
}
