import { obtenerConexion } from './conexion';

import {
  MENSAJES_DUPLICADOS,
  RegistroDuplicadoError,
} from '../model/RegistroDuplicadoError';

const CODIGOS_CORREO_DUPLICADO = new Set([
  'user_already_exists',
  'email_exists',
]);

export async function registrarCuentaSupabase(
  correo: string,
  clave: string
): Promise<void> {
  const { data, error } = await obtenerConexion()
    .auth.signUp({
      email: correo,
      password: clave,
    });

  if (error) {
    if (CODIGOS_CORREO_DUPLICADO.has(error.code ?? '')) {
      throw new RegistroDuplicadoError(
        MENSAJES_DUPLICADOS.correo
      );
    }

    throw new Error('No se pudo registrar la cuenta.');
  }

  if (!data.user) {
    throw new Error('No se pudo registrar la cuenta.');
  }

  if (data.user.identities?.length === 0) {
    throw new RegistroDuplicadoError(
      MENSAJES_DUPLICADOS.correo
    );
  }
}