
import { describe, expect, jest, test } from '@jest/globals';

import { ReportePresenter } from './ReportePresenter';
import type { Reporte } from '../model/types';

function prepararPresenter() {
  const reporte: Reporte = {
    id: 'r1',
    autorId: 'u1',
    tipo: 'ENCONTRADO',
    estado: 'ACTIVO',
    moderacion: 'PENDIENTE',
    especie: 'GATO',
    nombre: 'Milo',
    zona: 'Sarco',
    descripcion: 'Gato encontrado',
    fecha: '2020-10-20',
  };

  const repo = {
    listar: jest.fn(() => [reporte]),
    guardar: jest.fn(),
    actualizar: jest.fn(),
  };

  const presenter = new ReportePresenter(repo);

  return { presenter, repo, reporte };
}

describe('Moderación mediante ReportePresenter', () => {
  test('permite aprobar un reporte', () => {
    const { presenter, repo, reporte } =
      prepararPresenter();

    const resultado = presenter.moderar(
      reporte.id,
      'ADMIN',
      'APROBADO'
    );

    expect(resultado).toBe(true);

    expect(repo.actualizar).toHaveBeenCalledTimes(1);

    expect(repo.actualizar).toHaveBeenCalledWith({
      ...reporte,
      moderacion: 'APROBADO',
    });
  });

  test('permite rechazar un reporte', () => {
    const { presenter, repo, reporte } =
      prepararPresenter();

    const resultado = presenter.moderar(
      reporte.id,
      'ADMIN',
      'RECHAZADO'
    );

    expect(resultado).toBe(true);

    expect(repo.actualizar).toHaveBeenCalledWith({
      ...reporte,
      moderacion: 'RECHAZADO',
    });
  });

  test('no modifica un reporte que no existe', () => {
    const { presenter, repo } = prepararPresenter();

    const resultado = presenter.moderar(
      'inexistente',
      'ADMIN',
      'APROBADO'
    );

    expect(resultado).toBe(false);
    expect(repo.actualizar).not.toHaveBeenCalled();
  });

  test('impide que un ciudadano modere reportes', () => {
    const { presenter, repo, reporte } =
      prepararPresenter();

    expect(() =>
      presenter.moderar(
        reporte.id,
        'CIUDADANO',
        'APROBADO'
      )
    ).toThrow();

    expect(repo.actualizar).not.toHaveBeenCalled();
  });

  test('impide que un albergue modere reportes', () => {
    const { presenter, repo, reporte } =
      prepararPresenter();

    expect(() =>
      presenter.moderar(
        reporte.id,
        'ALBERGUE',
        'RECHAZADO'
      )
    ).toThrow();

    expect(repo.actualizar).not.toHaveBeenCalled();
  });
});
