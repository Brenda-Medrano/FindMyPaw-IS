import type { NuevoReporte, ErroresFormulario } from './types';
import { MENSAJES } from './mensajes';
export function validarReporte(datos: NuevoReporte): ErroresFormulario {
  const errores: ErroresFormulario = {};
  if (!datos.zona.trim()) errores.zona = MENSAJES.zona;
  if (!datos.descripcion.trim()) errores.descripcion = MENSAJES.descripcion;
  if (datos.tipo==='PERDIDO') {
    if (!datos.nombre?.trim()) errores.nombre = MENSAJES.nombre;
    if (!datos.foto?.trim()) errores.foto = MENSAJES.foto;
  }
  if (datos.fecha && (datos.fecha > new Date().toISOString().slice(0,10) || Number.isNaN(Date.parse(datos.fecha)) || new Date(datos.fecha+'T12:00:00Z').toISOString().slice(0,10) !== datos.fecha)) errores.fecha = MENSAJES.fecha;
  return errores;
}
