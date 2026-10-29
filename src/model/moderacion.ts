import type { Reporte } from './types';
export function asignarPendiente(r:Reporte):Reporte{return {...r,moderacion:'PENDIENTE'};}
