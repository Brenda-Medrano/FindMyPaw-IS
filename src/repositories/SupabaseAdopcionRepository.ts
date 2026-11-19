import type { PerroEnAdopcion, SolicitudAdopcion } from '../model/adopcionTypes';
import type { AdopcionRepository, MascotaRepository } from './interfaces';
import type { BaseDatos } from '../data/BaseDatos';
import { TablaRemota } from './TablaRemota';
export class SupabaseAdopcionRepository implements AdopcionRepository, MascotaRepository {
    private readonly mascotas: TablaRemota<PerroEnAdopcion>;
    private readonly tablaSolicitudes: TablaRemota<SolicitudAdopcion>;
    constructor(db: BaseDatos) {
        this.mascotas = new TablaRemota<PerroEnAdopcion>(db, 'mascotas');
        this.tablaSolicitudes = new TablaRemota<SolicitudAdopcion>(db, 'solicitudes_adopcion');
    }
    perros(): PerroEnAdopcion[] { return this.mascotas.listar(); }
    solicitudes(): SolicitudAdopcion[] { return this.tablaSolicitudes.listar(); }
    async cargar(conSesion: boolean): Promise<void> {
        this.tablaSolicitudes.limpiar();
        await Promise.all([this.mascotas.cargar(), conSesion ? this.tablaSolicitudes.cargar() : Promise.resolve()]);
    }
    limpiar(): void { this.mascotas.limpiar(); this.tablaSolicitudes.limpiar(); }
    guardarSolicitud(solicitud: SolicitudAdopcion): Promise<void> { return this.tablaSolicitudes.guardar(solicitud); }
    actualizarSolicitud(solicitud: SolicitudAdopcion): Promise<void> {
        return this.tablaSolicitudes.actualizar(solicitud.id, { estado: solicitud.estado });
    }
    guardarMascota(mascota: PerroEnAdopcion): Promise<void> { return this.mascotas.guardar(mascota); }
    actualizarMascota(mascota: PerroEnAdopcion): Promise<void> {
        const { id, nombre, tamano, edad, descripcion, disponible, foto, requisitos } = mascota;
        return this.mascotas.actualizar(id, { nombre, tamano, edad, descripcion, disponible, foto: foto ?? '', requisitos });
    }
}
