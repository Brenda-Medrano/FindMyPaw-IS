
import { describe, expect, test } from '@jest/globals';

import { AdopcionPresenter } from './AdopcionPresenter';

import type {
  PerroEnAdopcion,
  SolicitudAdopcion,
} from '../model/adopcionTypes';

import type {
  AdopcionRepository,
} from '../repositories/interfaces';

function prepararPresenter() {
  const perro: PerroEnAdopcion = {
    id: 'p1',
    nombre: 'Toby',
    albergueId: 'a1',
    tamano: 'MEDIANO',
    edad: '2 años',
    descripcion: 'Perro cariñoso',
    disponible: true,
    requisitos: 'Entrevista previa',
  };

  const perros: PerroEnAdopcion[] = [
    perro,
    {
      ...perro,
      id: 'p2',
      nombre: 'Mila',
    },
  ];

  const solicitud: SolicitudAdopcion = {
    id: 's1',
    perroId: perro.id,
    albergueId: perro.albergueId,
    adoptanteId: 'u1',
    nombre: 'Ana',
    telefono: '70000000',
    vivienda: 'Casa',
    motivo: 'Deseo adoptar',
    estado: 'PENDIENTE',
  };

  const solicitudes: SolicitudAdopcion[] = [
    solicitud,
  ];

  const repo: AdopcionRepository = {
    perros: () => perros,

    solicitudes: () => solicitudes,

    guardarSolicitud: nueva => {
      solicitudes.push(nueva);
    },

    actualizarSolicitud: actualizada => {
      const indice = solicitudes.findIndex(
        item => item.id === actualizada.id
      );

      if (indice !== -1) {
        solicitudes[indice] = actualizada;
      }
    },
  };

  const presenter = new AdopcionPresenter(repo);

  return {
    presenter,
    perros,
    solicitudes,
  };
}

describe('Consultas de AdopcionPresenter', () => {
  test('lista los perros del repositorio', () => {
    const { presenter, perros } =
      prepararPresenter();

    expect(presenter.listarPerros())
      .toEqual(perros);
  });

  test('busca un perro por su identificador', () => {
    const { presenter, perros } =
      prepararPresenter();

    expect(presenter.buscarPerroPorId('p2'))
      .toEqual(perros[1]);
  });

  test('devuelve undefined si el perro no existe', () => {
    const { presenter } = prepararPresenter();

    expect(presenter.buscarPerroPorId('inexistente'))
      .toBeUndefined();
  });

  test('lista las solicitudes del repositorio', () => {
    const { presenter, solicitudes } =
      prepararPresenter();

    expect(presenter.listarSolicitudes())
      .toEqual(solicitudes);
  });

  test('devuelve una lista vacía si no hay solicitudes', () => {
    const { presenter, solicitudes } =
      prepararPresenter();

    solicitudes.length = 0;

    expect(presenter.listarSolicitudes())
      .toEqual([]);
  });
});
