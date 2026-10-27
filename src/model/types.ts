export type TipoReporte = 'PERDIDO' | 'ENCONTRADO';
export type EstadoReporte = 'ACTIVO' | 'RESUELTO';
export type Moderacion = 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
export type Especie = 'PERRO' | 'GATO';
export interface Reporte {
  id: string; autorId: string; tipo: TipoReporte; estado: EstadoReporte;
  moderacion: Moderacion; especie: Especie; nombre?: string;
  zona: string; descripcion: string; fecha: string; foto?: string;
}
export type NuevoReporte = Omit<Reporte, 'id' | 'estado' | 'moderacion'>;
export type ErroresFormulario = Record<string, string>;
