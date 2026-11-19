
import type {
  PerroEnAdopcion,
  SolicitudAdopcion,
} from '../model/adopcionTypes';

import type { AdopcionRepository } from './interfaces';

const KEY_SOL = 'findmypaw_solicitudes_v1';

export class LocalAdopcionRepository implements AdopcionRepository {
  perros(): PerroEnAdopcion[] {
    return [
      {
        id: 'p1',
        nombre: 'Toby',
        albergueId: 'demo',
        tamano: 'PEQUEÑO',
        edad: '2 años',
        descripcion: 'Cariñoso',
        disponible: true,
        foto: '/pets/pet-max.png',
        requisitos: 'Entrevista y compromiso de cuidado',
      },
      {
        id: 'p2',
        nombre: 'Mila',
        albergueId: 'demo',
        tamano: 'MEDIANO',
        edad: '1 año',
        descripcion: 'Juguetona',
        disponible: true,
        foto: '/pets/pet-encontrado.png',
        requisitos: 'Hogar seguro y tiempo disponible',
      },
      {
        id: 'p3',
        nombre: 'Rocky',
        albergueId: 'demo',
        tamano: 'GRANDE',
        edad: '3 años',
        descripcion: 'Tranquilo',
        disponible: true,
        foto: '/pets/pet-rocky.png',
        requisitos: 'Espacio y evaluación del albergue',
      },
    ];
  }

  solicitudes(): SolicitudAdopcion[] {
    try {
      return JSON.parse(
        localStorage.getItem(KEY_SOL) || '[]'
      ) as SolicitudAdopcion[];
    } catch {
      return [];
    }
  }

  guardarSolicitud(solicitud: SolicitudAdopcion): void {
    const solicitudes = [
      ...this.solicitudes(),
      solicitud,
    ];

    localStorage.setItem(
      KEY_SOL,
      JSON.stringify(solicitudes)
    );
  }

  actualizarSolicitud(solicitud: SolicitudAdopcion): void {
    const solicitudes = this.solicitudes().map(
      (actual) =>
        actual.id === solicitud.id
          ? solicitud
          : actual
    );

    localStorage.setItem(
      KEY_SOL,
      JSON.stringify(solicitudes)
    );
  }
}
