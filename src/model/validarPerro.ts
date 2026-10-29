import type { PerroEnAdopcion } from './adopcionTypes';
export function validarPerro(perro:PerroEnAdopcion):string[]{
 const errores:string[]=[];
 if(!perro.nombre.trim()) errores.push('Falta el nombre');
 if(!perro.albergueId.trim()) errores.push('Falta el albergue');
 return errores;
}
