
import type {
  AdopcionRepository,
} from '../repositories/interfaces';
import { solicitudesDelAlbergue } from '../model/solicitudesAlbergue';

import type {
  PerroEnAdopcion,
  SolicitudAdopcion,
} from '../model/adopcionTypes';

import {
  validarSolicitud,
  crearSolicitud,
} from '../model/validarSolicitud';

import {
  resolverSolicitud,
} from '../model/estadoSolicitud';

export class AdopcionPresenter {
  private readonly repo: AdopcionRepository;

  constructor(repo: AdopcionRepository) {
    this.repo = repo;
  }

  listarPerros(): PerroEnAdopcion[] {
    return this.repo.perros();
  }

  buscarPerroPorId(
    id: string
  ): PerroEnAdopcion | undefined {
    return this.listarPerros().find(
      perro => perro.id === id
    );
  }

  listarSolicitudes(): SolicitudAdopcion[] {
    return this.repo.solicitudes();
  }
  listarSolicitudesPorAlbergue(
    albergueId: string
  ): SolicitudAdopcion[] {
    return solicitudesDelAlbergue(
      this.listarSolicitudes(),
      albergueId
    );
  }

  cambiarEstado(
    id: string,
    albergueId: string,
    estado: 'APROBADA' | 'RECHAZADA'
  ): boolean {
    const solicitud = this.listarSolicitudes().find(
      item => item.id === id
    );

    if (
      !solicitud ||
      solicitud.albergueId !== albergueId
    ) {
      return false;
    }

    this.repo.actualizarSolicitud(
      resolverSolicitud(
        solicitud,
        albergueId,
        estado
      )
    );

    return true;
  }

  registrar(
    solicitud: SolicitudAdopcion
  ): { ok: boolean; mensaje: string } {
    const errores = validarSolicitud(solicitud);

    if (errores.length) {
      return {
        ok: false,
        mensaje: errores.join(', '),
      };
    }

    this.repo.guardarSolicitud(
      crearSolicitud(solicitud)
    );

    return {
      ok: true,
      mensaje: 'Solicitud enviada, estado Pendiente',
    };
  }
}
