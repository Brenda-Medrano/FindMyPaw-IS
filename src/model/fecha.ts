export function fechaValida(fecha: string, hoy = new Date().toISOString().slice(0,10)): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || fecha > hoy) return false;
  const fechaUTC = new Date(fecha + 'T12:00:00Z');
  return !Number.isNaN(fechaUTC.getTime()) && fechaUTC.toISOString().slice(0,10) === fecha;
}
