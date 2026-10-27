export interface PerroEnAdopcion {
  id: string; nombre: string; albergueId: string; tamano: 'PEQUEÑO' | 'MEDIANO' | 'GRANDE';
  edad: string; descripcion: string; disponible: boolean; foto?: string; requisitos: string;
}
export type EstadoSolicitud = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
export interface SolicitudAdopcion {
  id: string; perroId: string; albergueId: string; adoptanteId: string;
  nombre: string; telefono: string; vivienda: string; motivo: string; estado: EstadoSolicitud;
}
