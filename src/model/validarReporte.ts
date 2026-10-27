import type { NuevoReporte, ErroresFormulario } from './types';
import { MENSAJES } from './mensajes';
export function validarReporte(datos: NuevoReporte): ErroresFormulario {
  const errores: ErroresFormulario = {};
  if (!datos.zona.trim()) errores.zona = MENSAJES.zona;
  if (!datos.descripcion.trim()) errores.descripcion = MENSAJES.descripcion;
  if (datos.tipo==='PERDIDO' && !datos.nombre?.trim()) errores.nombre = MENSAJES.nombre;
  if (datos.tipo==='PERDIDO' && !datos.foto?.trim()) errores.foto = MENSAJES.foto;
  return errores;
}
