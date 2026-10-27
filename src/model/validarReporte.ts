import type { NuevoReporte, ErroresFormulario } from './types';
export function validarReporte(datos: NuevoReporte): ErroresFormulario {
  const errores: ErroresFormulario = {};
  if (!datos.zona.trim()) errores.zona = 'Indica la zona aproximada';
  return errores;
}
