import type { ReporteRepository } from '../repositories/interfaces';
import type { NuevoReporte } from '../model/types';
import { validarReporte } from '../model/validarReporte';
import { puedeEditarReporte } from '../model/permisosReporte';
import { marcarResuelto } from '../model/estadosReporte';
import type { Reporte } from '../model/types';
import { listarPublicos } from '../model/listarReportes';
export class ReportePresenter {
  private repo: ReporteRepository;

  constructor(repo: ReporteRepository) {
    this.repo = repo;
  }

  listarTodos(): Reporte[] {
    return this.repo.listar();
  }

  listarPublicos(): Reporte[] {
    return listarPublicos(this.listarTodos());
  }

  buscarPorId(id: string): Reporte | undefined {
    return this.listarTodos().find(
      reporte => reporte.id === id
    );
  }

  listarPorAutor(autorId: string): Reporte[] {
    return this.listarTodos().filter(
      reporte => reporte.autorId === autorId
    );
  }

  resolver(usuarioId:string,id:string):boolean {
    const anterior = this.buscarPorId(id);
    if (!anterior || !puedeEditarReporte(usuarioId,anterior)) return false;
    this.repo.actualizar(marcarResuelto(anterior,usuarioId));return true;
  }
  editar(usuarioId:string, actualizado:Reporte):boolean {
    const anterior = this.buscarPorId(actualizado.id);
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
