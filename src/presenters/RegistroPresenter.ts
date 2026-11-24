import { normalizarCorreo } from '../model/normalizarTexto';
import { RegistroDuplicadoError } from '../model/RegistroDuplicadoError';

export type RegistrarCuenta = (
  correo: string,
  clave: string
) => Promise<void>;

interface ResultadoRegistro {
  ok: boolean;
  mensaje: string;
}

const LONGITUD_MINIMA_CLAVE = 8;

export class RegistroPresenter {
  private readonly registrarCuenta: RegistrarCuenta;

  constructor(registrarCuenta: RegistrarCuenta) {
    this.registrarCuenta = registrarCuenta;
  }

  async registrar(
    correo: string,
    clave: string
  ): Promise<ResultadoRegistro> {
    const email = normalizarCorreo(correo);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        ok: false,
        mensaje: 'Ingresa un correo electrónico válido.',
      };
    }

    if (clave.length < LONGITUD_MINIMA_CLAVE) {
      return {
        ok: false,
        mensaje: 'La contraseña debe tener al menos 8 caracteres.',
      };
    }

    try {
      await this.registrarCuenta(email, clave);

      return {
        ok: true,
        mensaje:
          'Revisa tu correo para confirmar el registro. ' +
          'Si ya tienes una cuenta, puedes iniciar sesión.',
      };
    } catch (error) {
      if (error instanceof RegistroDuplicadoError) {
        return {
          ok: false,
          mensaje: error.message,
        };
      }

      return {
        ok: false,
        mensaje:
          'No se pudo completar el registro. Intenta nuevamente.',
      };
    }
  }
}