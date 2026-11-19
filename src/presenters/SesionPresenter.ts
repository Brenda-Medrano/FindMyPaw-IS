
import type { Rol } from '../model/permisosAlbergue';
import type { Sesion } from '../model/autenticacion';

import {
  autenticar,
  tienePermiso,
} from '../model/autenticacion';

export class SesionPresenter {
  iniciarSesion(
    correo: string,
    clave: string
  ): Sesion | null {
    return autenticar(correo, clave);
  }

  puedeAcceder(
    sesion: Sesion | null,
    rol: Rol
  ): boolean {
    return tienePermiso(sesion, rol);
  }

  cerrarSesion(): null {
    return null;
  }
}
