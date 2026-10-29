import type { Especie } from './types';
export type EstadoFiltro = 'PERDIDO'|'ENCONTRADO'|'RESUELTO';
export interface CriteriosBusqueda {texto?:string;especie?:Especie|'';estado?:EstadoFiltro|''}
export const FILTROS_LIMPIOS: CriteriosBusqueda = { texto:'',especie:'',estado:'' };
