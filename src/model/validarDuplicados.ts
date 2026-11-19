export function correoDuplicado(
  correo: string,
  registrados: readonly string[]
): boolean {
  const correoNormalizado = correo.trim().toLowerCase();

  return registrados.some(
    registrado =>
      registrado.trim().toLowerCase() === correoNormalizado
  );
}