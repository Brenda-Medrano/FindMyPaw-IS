
import { describe, expect, jest, test } from '@jest/globals';

import { AdopcionPresenter } from './AdopcionPresenter';
import type {
  PerroEnAdopcion,
  SolicitudAdopcion,
} from '../model/adopcionTypes';

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

  const repo = {
    perros: jest.fn(() => [perro]),
    solicitudes: jest.fn(() => [solicitud]),
    guardarSolicitud: jest.fn(),
    actualizarSolicitud: jest.fn(),
  };

  const presenter = new AdopcionPresenter(repo);

  return { presenter, perro, solicitud };
}

describe('Consultas de adopciones', () => {
  test('lista los perros en adopción', () => {
    const { presenter, perro } = prepararPresenter();

    expect(presenter.listarPerros()).toEqual([perro]);
  });

  test('encuentra un perro por su identificador', () => {
    const { presenter, perro } = prepararPresenter();

    expect(presenter.buscarPerroPorId('p1'))
      .toEqual(perro);
  });

  test('devuelve undefined si el perro no existe', () => {
    const { presenter } = prepararPresenter();

    expect(presenter.buscarPerroPorId('inexistente'))
      .toBeUndefined();
  });

  test('lista las solicitudes de adopción', () => {
    const { presenter, solicitud } =
      prepararPresenter();

    expect(presenter.listarSolicitudes())
      .toEqual([solicitud]);
  });
});
