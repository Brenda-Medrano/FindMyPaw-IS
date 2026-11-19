
import { LocalAdopcionRepository } from './LocalAdopcionRepository';
import { obtenerImagenAdopcion } from '../utils/imagenesMascotas';

describe('Fotografías de perros en adopción', () => {
  const repositorio = new LocalAdopcionRepository();

  test('cada perro tiene una fotografía registrada', () => {
    const perros = repositorio.perros();

    expect(perros.length).toBeGreaterThan(0);

    perros.forEach((perro) => {
      expect(perro.foto?.trim()).toBeTruthy();
    });
  });

  test('los perros de demostración tienen fotografías diferentes', () => {
    const perros = repositorio.perros();

    const fotografias = perros.map((perro) => perro.foto);

    expect(new Set(fotografias).size).toBe(perros.length);
  });

  test('cada perro muestra su fotografía registrada', () => {
    const perros = repositorio.perros();

    perros.forEach((perro) => {
      expect(obtenerImagenAdopcion(perro)).toBe(perro.foto);
    });
  });

  test('las fotografías seleccionadas son diferentes', () => {
    const perros = repositorio.perros();

    const fotografias = perros.map(obtenerImagenAdopcion);

    expect(new Set(fotografias).size).toBe(perros.length);
  });
});
