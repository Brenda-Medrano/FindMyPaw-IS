import type { Reporte } from '../model/types';
import type { PerroEnAdopcion, SolicitudAdopcion } from '../model/adopcionTypes';
export interface ReporteRepository {
  listar(): Reporte[];
  guardar(reporte: Reporte): void;
  actualizar(reporte: Reporte): void;
}
export interface AdopcionRepository {
  perros(): PerroEnAdopcion[];
  solicitudes(): SolicitudAdopcion[];
  guardarSolicitud(solicitud: SolicitudAdopcion): void;
  actualizarSolicitud(solicitud: SolicitudAdopcion): void;
}
