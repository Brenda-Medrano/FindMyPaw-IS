import {
  correoDuplicado,
} from './validarDuplicados';

describe('Validación de correos duplicados', () => {
  const correosRegistrados = [
    'usuario@gmail.com',
    'admin@gmail.com',
  ];

  test('detecta un correo previamente registrado', () => {
    expect(
      correoDuplicado(
        'usuario@gmail.com',
        correosRegistrados
      )
    ).toBe(true);
  });

  test('ignora diferencias entre mayúsculas y minúsculas', () => {
    expect(
      correoDuplicado(
        'USUARIO@GMAIL.COM',
        correosRegistrados
      )
    ).toBe(true);
  });

  test('ignora espacios al inicio y al final', () => {
    expect(
      correoDuplicado(
        '  usuario@gmail.com  ',
        correosRegistrados
      )
    ).toBe(true);
  });

  test('permite un correo que no está registrado', () => {
    expect(
      correoDuplicado(
        'nuevo@gmail.com',
        correosRegistrados
      )
    ).toBe(false);
  });

  test('permite registrar la primera cuenta', () => {
    expect(
      correoDuplicado('nuevo@gmail.com', [])
    ).toBe(false);
  });
});