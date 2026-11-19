import type { ReporteRepository } from '../repositories/interfaces';
import type { NuevoReporte, Reporte } from '../model/types';
import type { Rol } from '../model/permisosAlbergue';
import { validarReporte } from '../model/validarReporte';
import { puedeEditarReporte } from '../model/permisosReporte';
import { marcarResuelto } from '../model/estadosReporte';
import { listarPublicos } from '../model/listarReportes';
import { moderarReporte } from '../model/moderacion';
import { buscarReporte } from '../model/buscarReporte';
export class ReportePresenter {
    private readonly repo: ReporteRepository;
    constructor(repo: ReporteRepository) { this.repo = repo; }
    listarTodos(): Reporte[] { return this.repo.listar(); }
    listarPublicos(): Reporte[] { return listarPublicos(this.listarTodos()); }
    buscarPorId(id: string): Reporte | undefined { return buscarReporte(this.listarTodos(), id); }
    listarPorAutor(autorId: string): Reporte[] { return this.listarTodos().filter(reporte => reporte.autorId === autorId); }
    private obtenerReporteEditable(usuarioId: string, id: string): Reporte | undefined {
        const reporte = this.buscarPorId(id);
        return reporte && puedeEditarReporte(usuarioId, reporte) ? reporte : undefined;
    }
    async moderar(id: string, rol: Rol, estado: 'APROBADO' | 'RECHAZADO'): Promise<boolean> {
        const reporte = this.buscarPorId(id);
        if (!reporte)
            return false;
        await this.repo.actualizar(moderarReporte(reporte, rol, estado));
        return true;
    }
    async resolver(usuarioId: string, id: string): Promise<boolean> {
        const reporte = this.obtenerReporteEditable(usuarioId, id);
        if (!reporte)
            return false;
        await this.repo.actualizar(marcarResuelto(reporte, usuarioId));
        return true;
    }
    async editar(usuarioId: string, actualizado: Reporte): Promise<boolean> {
        const anterior = this.obtenerReporteEditable(usuarioId, actualizado.id);
        if (!anterior)
            return false;
        await this.repo.actualizar({ ...actualizado, autorId: anterior.autorId, moderacion: anterior.moderacion });
        return true;
    }
    async registrar(datos: NuevoReporte): Promise<{
        ok: boolean;
        errores?: Record<string, string>;
    }> {
        const errores = validarReporte(datos);
        if (Object.keys(errores).length)
            return { ok: false, errores };
        await this.repo.guardar({ ...datos, id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()), estado: 'ACTIVO', moderacion: 'PENDIENTE' });
        return { ok: true };
    }
}
