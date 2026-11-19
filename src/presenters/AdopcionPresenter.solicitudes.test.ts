
import { AdopcionPresenter } from './AdopcionPresenter';
import type { SolicitudAdopcion } from '../model/adopcionTypes';
import type { AdopcionRepository } from '../repositories/interfaces';

const solicitud: SolicitudAdopcion = {
  id: 's1',
  perroId: 'p1',
  albergueId: 'a1',
  adoptanteId: 'u1',
  nombre: 'Ana',
  telefono: '70012345',
  vivienda: 'Casa',
  motivo: 'Adoptar',
  estado: 'PENDIENTE',
};

const otraSolicitud: SolicitudAdopcion = {
  ...solicitud,
  id: 's2',
  albergueId: 'a2',
};

describe('AdopcionPresenter - solicitudes del albergue', () => {
  let presenter: AdopcionPresenter;

  beforeEach(() => {
    const repo: AdopcionRepository = {
      perros: jest.fn(() => []),
      solicitudes: jest.fn(() => [
        solicitud,
        otraSolicitud,
      ]),
      guardarSolicitud: jest.fn(),
      actualizarSolicitud: jest.fn(),
    };

    presenter = new AdopcionPresenter(repo);
  });

  test('lista únicamente las solicitudes del albergue indicado', () => {
    expect(
      presenter.listarSolicitudesPorAlbergue('a1')
    ).toEqual([solicitud]);
  });

  test('excluye las solicitudes de otros albergues', () => {
    expect(
      presenter.listarSolicitudesPorAlbergue('a2')
    ).toEqual([otraSolicitud]);
  });

  test('devuelve una lista vacía si el albergue no tiene solicitudes', () => {
    expect(
      presenter.listarSolicitudesPorAlbergue('a3')
    ).toEqual([]);
  });
});
