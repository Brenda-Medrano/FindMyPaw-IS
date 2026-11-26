export function normalizarCorreo(correo: string): string {
  return correo.trim().toLowerCase();
}

export function normalizarTexto(valor?: string | null): string {
  return (valor ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}