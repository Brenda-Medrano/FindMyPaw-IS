
import { SesionPresenter } from './SesionPresenter';

describe('SesionPresenter', () => {
  const presenter = new SesionPresenter();

  test.each([
    ['usuario@findmypaw.test', 'Usuario123', 'CIUDADANO'],
    ['albergue@findmypaw.test', 'Albergue123', 'ALBERGUE'],
    ['admin@findmypaw.test', 'Admin123', 'ADMIN'],
  ])('permite iniciar sesión con %s', (correo, clave, rol) => {
    const sesion = presenter.iniciarSesion(correo, clave);

    expect(sesion?.rol).toBe(rol);
  });

  test.each([
    ['', ''],
    ['correo-invalido', 'Usuario123'],
    ['usuario@findmypaw.test', 'incorrecta'],
    ['desconocido@findmypaw.test', 'Usuario123'],
    ['usuario@findmypaw.test', ''],
  ])('rechaza credenciales incorrectas: %s', (correo, clave) => {
    expect(
      presenter.iniciarSesion(correo, clave)
    ).toBeNull();
  });

  test('permite normalizar el correo electrónico', () => {
    const sesion = presenter.iniciarSesion(
      ' USUARIO@findmypaw.test ',
      'Usuario123'
    );

    expect(sesion?.rol).toBe('CIUDADANO');
  });

  test('no incluye la contraseña en la sesión', () => {
    const sesion = presenter.iniciarSesion(
      'usuario@findmypaw.test',
      'Usuario123'
    );

    expect(sesion).not.toHaveProperty('clave');
  });

  test('permite acceder al rol correspondiente', () => {
    const sesion = presenter.iniciarSesion(
      'admin@findmypaw.test',
      'Admin123'
    );

    expect(
      presenter.puedeAcceder(sesion, 'ADMIN')
    ).toBe(true);
  });

  test('impide acceder a funciones de otros roles', () => {
    const sesion = presenter.iniciarSesion(
      'usuario@findmypaw.test',
      'Usuario123'
    );

    expect(
      presenter.puedeAcceder(sesion, 'ADMIN')
    ).toBe(false);

    expect(
      presenter.puedeAcceder(sesion, 'ALBERGUE')
    ).toBe(false);
  });

  test('impide acceder sin una sesión activa', () => {
    expect(
      presenter.puedeAcceder(null, 'ADMIN')
    ).toBe(false);
  });

  test('permite cerrar sesión', () => {
    expect(presenter.cerrarSesion()).toBeNull();
  });
});

