import { RegistroPresenter } from './RegistroPresenter';

import {
  MENSAJES_DUPLICADOS,
  RegistroDuplicadoError,
} from '../model/RegistroDuplicadoError';

describe('RegistroPresenter', () => {
  const registrarCuenta = jest.fn();

  let presenter: RegistroPresenter;

  beforeEach(() => {
    registrarCuenta.mockReset();
    registrarCuenta.mockResolvedValue(undefined);
    presenter = new RegistroPresenter(registrarCuenta);
  });

  test('registra una cuenta válida', async () => {
    const resultado = await presenter.registrar(
      'nuevo@gmail.com',
      'Clave12345'
    );

    expect(resultado.ok).toBe(true);

    expect(registrarCuenta).toHaveBeenCalledTimes(1);
  });

  test('normaliza el correo antes de registrarlo', async () => {
    await presenter.registrar(
      '  NUEVO@GMAIL.COM  ',
      'Clave12345'
    );

    expect(registrarCuenta).toHaveBeenCalledWith(
      'nuevo@gmail.com',
      'Clave12345'
    );
  });

  test('rechaza correos inválidos sin consultar el servidor', async () => {
    const resultado = await presenter.registrar(
      'correo-invalido',
      'Clave12345'
    );

    expect(resultado.ok).toBe(false);
    expect(registrarCuenta).not.toHaveBeenCalled();
  });

  test('rechaza contraseñas menores a ocho caracteres', async () => {
    const resultado = await presenter.registrar(
      'nuevo@gmail.com',
      '123'
    );

    expect(resultado.ok).toBe(false);
    expect(registrarCuenta).not.toHaveBeenCalled();
  });

  test('muestra un mensaje cuando la cuenta existe', async () => {
    registrarCuenta.mockRejectedValue(
      new RegistroDuplicadoError(MENSAJES_DUPLICADOS.correo)
    );

    const resultado = await presenter.registrar(
      'usuario@gmail.com',
      'Clave12345'
    );

    expect(resultado).toEqual({
      ok: false,
      mensaje: MENSAJES_DUPLICADOS.correo,
    });
  });

  test('no confunde un fallo de conexión con un duplicado', async () => {
    registrarCuenta.mockRejectedValue(
      new Error('Error de conexión')
    );

    const resultado = await presenter.registrar(
      'nuevo@gmail.com',
      'Clave12345'
    );

    expect(resultado.ok).toBe(false);
    expect(resultado.mensaje).not.toBe(MENSAJES_DUPLICADOS.correo);
  });
});