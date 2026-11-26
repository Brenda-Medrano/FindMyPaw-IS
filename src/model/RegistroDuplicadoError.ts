export const MENSAJES_DUPLICADOS = {
  correo: 'Ya existe una cuenta registrada con este correo.',
  reporte: 'Ya existe un reporte activo con estos datos.',
  solicitud: 'Ya existe una solicitud para esta mascota.',
} as const;

export class RegistroDuplicadoError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'RegistroDuplicadoError';
  }
}