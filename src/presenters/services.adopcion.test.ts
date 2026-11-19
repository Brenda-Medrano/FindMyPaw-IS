
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from '@jest/globals';

import { adopcionPresenter } from './services';
import type {
  SolicitudAdopcion,
} from '../model/adopcionTypes';

function crearSolicitudValida(): SolicitudAdopcion {
  const perro = adopcionPresenter.buscarPerroPorId('p1');

  if (!perro) {
    throw new Error('No se encontró el perro de prueba');
  }

  return {
    id: 'solicitud-prueba',
    perroId: perro.id,
    albergueId: perro.albergueId,
    adoptanteId: 'usuario-prueba',
    nombre: 'Ana',
    telefono: '70000000',
    vivienda: 'Casa',
    motivo: 'Deseo adoptar',
    estado: 'PENDIENTE',
  };
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('Servicio centralizado de adopciones', () => {
  test('permite consultar los perros disponibles', () => {
    const perros = adopcionPresenter.listarPerros();

    expect(perros.length).toBeGreaterThan(0);

    expect(
      adopcionPresenter.buscarPerroPorId('p1')
    ).toBeDefined();
  });

  test('registra y consulta una solicitud', () => {
    const solicitud = crearSolicitudValida();

    const resultado =
      adopcionPresenter.registrar(solicitud);

    expect(resultado.ok).toBe(true);

    expect(
      adopcionPresenter.listarSolicitudes()
    ).toEqual([solicitud]);
  });

  test('permite actualizar el estado de una solicitud', () => {
    const solicitud = crearSolicitudValida();

    adopcionPresenter.registrar(solicitud);

    const aprobado = adopcionPresenter.cambiarEstado(
      solicitud.id,
      solicitud.albergueId,
      'APROBADA'
    );

    expect(aprobado).toBe(true);

    expect(
      adopcionPresenter.listarSolicitudes()[0].estado
    ).toBe('APROBADA');

    const rechazado = adopcionPresenter.cambiarEstado(
      solicitud.id,
      solicitud.albergueId,
      'RECHAZADA'
    );

    expect(rechazado).toBe(true);

    expect(
      adopcionPresenter.listarSolicitudes()[0].estado
    ).toBe('RECHAZADA');
  });

  test('impide modificar solicitudes de otro albergue', () => {
    const solicitud = crearSolicitudValida();

    adopcionPresenter.registrar(solicitud);

    const resultado = adopcionPresenter.cambiarEstado(
      solicitud.id,
      'otro-albergue',
      'APROBADA'
    );

    expect(resultado).toBe(false);

    expect(
      adopcionPresenter.listarSolicitudes()[0].estado
    ).toBe('PENDIENTE');
  });

  test('no guarda solicitudes inválidas', () => {
    const solicitud = {
      ...crearSolicitudValida(),
      nombre: '',
    };

    const resultado =
      adopcionPresenter.registrar(solicitud);

    expect(resultado.ok).toBe(false);

    expect(
      adopcionPresenter.listarSolicitudes()
    ).toEqual([]);
  });
});
