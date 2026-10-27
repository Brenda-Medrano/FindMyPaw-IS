import type { ReporteRepository } from '../repositories/interfaces';
import type { NuevoReporte } from '../model/types';
import { validarReporte } from '../model/validarReporte';
export class ReportePresenter {
  constructor(private repo:ReporteRepository){}
  registrar(datos:NuevoReporte): {ok:boolean; errores?:Record<string,string>} {
    const errores = validarReporte(datos);
    if (Object.keys(errores).length) return {ok:false,errores};
    this.repo.guardar({...datos,id:globalThis.crypto?.randomUUID?.() ?? String(Date.now()),estado:'ACTIVO',moderacion:'PENDIENTE'});
    return {ok:true};
  }
}
