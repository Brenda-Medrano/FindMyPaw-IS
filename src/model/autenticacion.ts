
import type { Rol } from './permisosAlbergue';

export type Sesion =
  | { id: string; rol: 'CIUDADANO' }
  | { id: string; rol: 'ADMIN' }
  | { id: string; rol: 'ALBERGUE'; albergueId: string };

interface CuentaDemo {
  correo: string;
  clave: string;
  sesion: Sesion;
}

// Cuentas ficticias exclusivas para el MVP.
const CUENTAS_DEMO: readonly CuentaDemo[] = [
  {
    correo: 'usuario@findmypaw.test',
    clave: 'Usuario123',
    sesion: {
      id: 'demo',
      rol: 'CIUDADANO',
    },
  },
  {
    correo: 'albergue@findmypaw.test',
    clave: 'Albergue123',
    sesion: {
      id: 'albergue-demo',
      rol: 'ALBERGUE',
      albergueId: 'demo',
    },
  },
  {
    correo: 'admin@findmypaw.test',
    clave: 'Admin123',
    sesion: {
      id: 'admin-demo',
      rol: 'ADMIN',
    },
  },
];

export function autenticar(
  correo: string,
  clave: string
): Sesion | null {
  const correoNormalizado = correo.trim().toLowerCase();

  const cuenta = CUENTAS_DEMO.find(
    cuenta =>
      cuenta.correo === correoNormalizado &&
      cuenta.clave === clave
  );

  return cuenta ? { ...cuenta.sesion } : null;
}

export function tienePermiso(
  sesion: Sesion | null,
  rol: Rol
): boolean {
  return sesion?.rol === rol;
}
