import type { Reporte } from '../model/types';
import type { PerroEnAdopcion, SolicitudAdopcion } from '../model/adopcionTypes';
export interface ReporteRepository {
    listar(): Reporte[];
    guardar(reporte: Reporte): void | Promise<void>;
    actualizar(reporte: Reporte): void | Promise<void>;
}
export interface AdopcionRepository {
    perros(): PerroEnAdopcion[];
    solicitudes(): SolicitudAdopcion[];
    guardarSolicitud(solicitud: SolicitudAdopcion): void | Promise<void>;
    actualizarSolicitud(solicitud: SolicitudAdopcion): void | Promise<void>;
}
export interface MascotaRepository {
    perros(): PerroEnAdopcion[];
    guardarMascota(mascota: PerroEnAdopcion): Promise<void>;
    actualizarMascota(mascota: PerroEnAdopcion): Promise<void>;
}
