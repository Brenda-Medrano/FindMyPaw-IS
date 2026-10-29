import type { ReporteRepository } from '../repositories/interfaces';
import type { NuevoReporte } from '../model/types';
import { validarReporte } from '../model/validarReporte';
import { puedeEditarReporte } from '../model/permisosReporte';
import { marcarResuelto } from '../model/estadosReporte';
import type { Reporte } from '../model/types';
export class ReportePresenter {
  constructor(private repo:ReporteRepository){}
  resolver(usuarioId:string,id:string):boolean {
    const anterior = this.repo.listar().find(r=>r.id===id);
    if (!anterior || !puedeEditarReporte(usuarioId,anterior)) return false;
    this.repo.actualizar(marcarResuelto(anterior,usuarioId));return true;
  }
  editar(usuarioId:string, actualizado:Reporte):boolean {
    const anterior = this.repo.listar().find(r=>r.id===actualizado.id);
    if (!anterior || !puedeEditarReporte(usuarioId,anterior)) return false;
    this.repo.actualizar({...actualizado,autorId:anterior.autorId});
    return true;
  }
  registrar(datos:NuevoReporte): {ok:boolean; errores?:Record<string,string>} {
    const errores = validarReporte(datos);
    if (Object.keys(errores).length) return {ok:false,errores};
    this.repo.guardar({...datos,id:globalThis.crypto?.randomUUID?.() ?? String(Date.now()),estado:'ACTIVO',moderacion:'PENDIENTE'});
    return {ok:true};
  }
}
