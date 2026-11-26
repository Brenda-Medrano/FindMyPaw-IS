import { obtenerConexion } from './conexion';
import { registrarCuentaSupabase } from './RegistroSupabase';

import {
  MENSAJES_DUPLICADOS,
} from '../model/RegistroDuplicadoError';

jest.mock('./conexion', () => ({
  obtenerConexion: jest.fn(),
}));

describe('RegistroSupabase', () => {
  const signUp = jest.fn();

  beforeEach(() => {
    signUp.mockReset();

    (obtenerConexion as jest.Mock).mockReturnValue({
      auth: { signUp },
    });
  });

  test('envía las credenciales a Supabase Auth', async () => {
    signUp.mockResolvedValue({
      data: {
        user: {
          id: 'usuario-1',
          identities: [{ id: 'identidad-1' }],
        },
      },
      error: null,
    });

    await registrarCuentaSupabase(
      'nuevo@gmail.com',
      'Clave12345'
    );

    expect(signUp).toHaveBeenCalledWith({
      email: 'nuevo@gmail.com',
      password: 'Clave12345',
    });
  });

  test.each([
    'user_already_exists',
    'email_exists',
  ])('detecta el código de duplicidad %s', async codigo => {
    signUp.mockResolvedValue({
      data: { user: null },
      error: { code: codigo },
    });

    await expect(
      registrarCuentaSupabase(
        'existente@gmail.com',
        'Clave12345'
      )
    ).rejects.toThrow(MENSAJES_DUPLICADOS.correo);
  });

  test('detecta la respuesta simulada de una cuenta existente', async () => {
    signUp.mockResolvedValue({
      data: {
        user: {
          id: 'usuario-simulado',
          identities: [],
        },
      },
      error: null,
    });

    await expect(
      registrarCuentaSupabase(
        'existente@gmail.com',
        'Clave12345'
      )
    ).rejects.toThrow(MENSAJES_DUPLICADOS.correo);
  });

  test('no confunde un fallo del servidor con un duplicado', async () => {
    signUp.mockResolvedValue({
      data: { user: null },
      error: { code: 'unexpected_failure' },
    });

    await expect(
      registrarCuentaSupabase(
        'nuevo@gmail.com',
        'Clave12345'
      )
    ).rejects.toThrow('No se pudo registrar la cuenta.');
  });
});