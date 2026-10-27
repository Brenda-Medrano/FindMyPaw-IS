import type { NuevoReporte } from './types';
export function nuevoHallazgo(): NuevoReporte {
  return {autorId:'demo',tipo:'ENCONTRADO',especie:'PERRO',zona:'',descripcion:'',fecha:''};
}
