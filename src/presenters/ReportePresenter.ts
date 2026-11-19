
import type { ReporteRepository } from '../repositories/interfaces';
import type { NuevoReporte, Reporte } from '../model/types';

import { validarReporte } from '../model/validarReporte';
import { puedeEditarReporte } from '../model/permisosReporte';
import { marcarResuelto } from '../model/estadosReporte';

export class ReportePresenter {
  private readonly repo: ReporteRepository;

  constructor(repo: ReporteRepository) {
    this.repo = repo;
  }

  private obtenerReporteEditable(
    usuarioId: string,
    id: string
  ): Reporte | undefined {
    const reporte = this.repo.listar().find(
      (reporte) => reporte.id === id
    );

    if (!reporte || !puedeEditarReporte(usuarioId, reporte)) {
      return undefined;
    }

    return reporte;
  }

  resolver(usuarioId: string, id: string): boolean {
    const reporte = this.obtenerReporteEditable(usuarioId, id);

    if (!reporte) {
      return false;
    }

    this.repo.actualizar(marcarResuelto(reporte, usuarioId));

    return true;
  }

  editar(usuarioId: string, actualizado: Reporte): boolean {
    const anterior = this.obtenerReporteEditable(
      usuarioId,
      actualizado.id
    );

    if (!anterior) {
      return false;
    }

    this.repo.actualizar({
      ...actualizado,
      autorId: anterior.autorId,
    });

    return true;
  }

  registrar(
    datos: NuevoReporte
  ): { ok: boolean; errores?: Record<string, string> } {
    const errores = validarReporte(datos);

    if (Object.keys(errores).length) {
      return { ok: false, errores };
    }

    this.repo.guardar({
      ...datos,
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
      estado: 'ACTIVO',
      moderacion: 'PENDIENTE',
    });

    return { ok: true };
  }
}
