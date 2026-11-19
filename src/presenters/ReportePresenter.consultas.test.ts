
import { describe, expect, jest, test } from '@jest/globals';

import { ReportePresenter } from './ReportePresenter';
import type { Reporte } from '../model/types';

function crearReportes(): Reporte[] {
  const reporteBase: Reporte = {
    id: 'r1',
    autorId: 'u1',
    tipo: 'PERDIDO',
    estado: 'ACTIVO',
    moderacion: 'APROBADO',
    especie: 'PERRO',
    nombre: 'Luna',
    zona: 'Sarco',
    descripcion: 'Mascota de color blanco',
    fecha: '2020-10-20',
  };

  return [
    reporteBase,
    {
      ...reporteBase,
      id: 'r2',
      nombre: 'Max',
      moderacion: 'PENDIENTE',
    },
    {
      ...reporteBase,
      id: 'r3',
      autorId: 'u2',
      nombre: 'Toby',
      moderacion: 'RECHAZADO',
    },
    {
      ...reporteBase,
      id: 'r4',
      autorId: 'u2',
      nombre: 'Mila',
    },
  ];
}

function prepararPresenter() {
  const reportes = crearReportes();

  const repo = {
    listar: jest.fn(() => reportes),
    guardar: jest.fn(),
    actualizar: jest.fn(),
  };

  const presenter = new ReportePresenter(repo);

  return { presenter, repo, reportes };
}

describe('Consultas de ReportePresenter', () => {
  test('lista solamente los reportes aprobados', () => {
    const { presenter, repo, reportes } =
      prepararPresenter();

    const resultado = presenter.listarPublicos();

    expect(resultado).toEqual([
      reportes[0],
      reportes[3],
    ]);

    expect(repo.listar).toHaveBeenCalledTimes(1);
  });

  test('lista todos los reportes para moderación', () => {
    const { presenter, reportes } =
      prepararPresenter();

    expect(presenter.listarTodos()).toEqual(reportes);
  });

  test('encuentra un reporte por su identificador', () => {
    const { presenter, reportes } =
      prepararPresenter();

    expect(presenter.buscarPorId('r2'))
      .toEqual(reportes[1]);
  });

  test('devuelve undefined cuando el reporte no existe', () => {
    const { presenter } = prepararPresenter();

    expect(presenter.buscarPorId('inexistente'))
      .toBeUndefined();
  });

  test('lista únicamente los reportes del autor solicitado', () => {
    const { presenter, reportes } =
      prepararPresenter();

    expect(presenter.listarPorAutor('u1'))
      .toEqual([reportes[0], reportes[1]]);
  });

  test('devuelve una lista vacía si el autor no tiene reportes', () => {
    const { presenter } = prepararPresenter();

    expect(presenter.listarPorAutor('u3'))
      .toEqual([]);
  });
});
