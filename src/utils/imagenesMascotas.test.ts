
import {
  obtenerImagenReporte,
  obtenerImagenAdopcion,
} from './imagenesMascotas';

describe('obtenerImagenReporte', () => {
  test('prioriza la fotografía registrada por el usuario', () => {
    const resultado = obtenerImagenReporte({
      especie: 'PERRO',
      tipo: 'PERDIDO',
      foto: '/foto-usuario.png',
    });

    expect(resultado).toBe('/foto-usuario.png');
  });

  test('prioriza la fotografía registrada de un gato', () => {
    const resultado = obtenerImagenReporte({
      especie: 'GATO',
      tipo: 'ENCONTRADO',
      foto: '/foto-gato.png',
    });

    expect(resultado).toBe('/foto-gato.png');
  });

  test.each(['PERDIDO', 'ENCONTRADO'] as const)(
    'utiliza la imagen de gato para un reporte %s',
    (tipo) => {
      expect(
        obtenerImagenReporte({
          especie: 'GATO',
          tipo,
        })
      ).toBe('/pets/pet-luna.png');
    }
  );

  test('utiliza la imagen de perro perdido', () => {
    expect(
      obtenerImagenReporte({
        especie: 'PERRO',
        tipo: 'PERDIDO',
      })
    ).toBe('/pets/pet-max.png');
  });

  test('utiliza la imagen de perro encontrado', () => {
    expect(
      obtenerImagenReporte({
        especie: 'PERRO',
        tipo: 'ENCONTRADO',
      })
    ).toBe('/pets/pet-encontrado.png');
  });

  test.each(['', '   ', undefined])(
    'utiliza una imagen predeterminada cuando la foto es %p',
    (foto) => {
      expect(
        obtenerImagenReporte({
          especie: 'PERRO',
          tipo: 'PERDIDO',
          foto,
        })
      ).toBe('/pets/pet-max.png');
    }
  );
});

describe('obtenerImagenAdopcion', () => {
  test('prioriza la fotografía registrada del perro', () => {
    expect(
      obtenerImagenAdopcion({
        foto: '/foto-adopcion.png',
      })
    ).toBe('/foto-adopcion.png');
  });

  test.each(['', '   ', undefined])(
    'utiliza una imagen predeterminada cuando la foto es %p',
    (foto) => {
      expect(
        obtenerImagenAdopcion({ foto })
      ).toBe('/pets/pet-max.png');
    }
  );

  test('obtiene una imagen sin necesitar el ID del perro', () => {
    expect(
      obtenerImagenAdopcion({})
    ).toBe('/pets/pet-max.png');
  });
});
