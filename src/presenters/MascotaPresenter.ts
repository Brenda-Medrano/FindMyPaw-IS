import type { PerroEnAdopcion } from '../model/adopcionTypes';
import type { MascotaRepository } from '../repositories/interfaces';
export type NuevaMascota = Omit<PerroEnAdopcion, 'id' | 'albergueId'>;
export class MascotaPresenter {
    private readonly repo: MascotaRepository;
    constructor(repo: MascotaRepository) { this.repo = repo; }
    listarPorAlbergue(albergueId: string): PerroEnAdopcion[] {
        return this.repo.perros().filter(mascota => mascota.albergueId === albergueId);
    }
    private validar(datos: NuevaMascota): void {
        if ([datos.nombre, datos.edad, datos.descripcion, datos.requisitos].some(valor => !valor.trim())) {
            throw new Error('Completa todos los campos obligatorios.');
        }
    }
    async registrar(albergueId: string, datos: NuevaMascota): Promise<void> {
        this.validar(datos);
        await this.repo.guardarMascota({ ...datos, id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()), albergueId });
    }
    async modificar(albergueId: string, id: string, datos: NuevaMascota): Promise<void> {
        const anterior = this.listarPorAlbergue(albergueId).find(mascota => mascota.id === id);
        if (!anterior)
            throw new Error('No tienes permiso para modificar esta mascota.');
        this.validar(datos);
        await this.repo.actualizarMascota({ ...datos, id, albergueId: anterior.albergueId });
    }
}
