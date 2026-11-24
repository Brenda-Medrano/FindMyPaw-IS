import { ReportePresenter } from './ReportePresenter';
import { AdopcionPresenter } from './AdopcionPresenter';

import type {
  ReporteRepository,
  AdopcionRepository,
} from '../repositories/interfaces';

import type { NuevoReporte, Reporte } from '../model/types';
import type { SolicitudAdopcion } from '../model/adopcionTypes';

import {
  MENSAJES_DUPLICADOS,
} from '../model/RegistroDuplicadoError';

describe('ReportePresenter - duplicados', () => {
  const nuevo: NuevoReporte = {
    autorId: 'usuario-1',
    tipo: 'PERDIDO',
    especie: 'PERRO',
    nombre: 'Max',
    zona: 'Sarco',
    descripcion: 'Perro de color negro',
    fecha: '2026-10-20',
    foto: 'https://example.com/max.jpg',
  };

  const existente: Reporte = {
    ...nuevo,
    id: 'reporte-1',
    estado: 'ACTIVO',
    moderacion: 'APROBADO',
  };

  function preparar(reportes: Reporte[]) {
    const guardar = jest.fn().mockResolvedValue(undefined);

    const repo: ReporteRepository = {
      listar: jest.fn().mockReturnValue(reportes),
      guardar,
      actualizar: jest.fn(),
    };

    return {
      presenter: new ReportePresenter(repo),
      guardar,
    };
  }

  test('no guarda un reporte activo duplicado', async () => {
    const { presenter, guardar } = preparar([existente]);

    const resultado = await presenter.registrar(nuevo);

    expect(resultado.ok).toBe(false);

    expect(resultado.errores?.duplicado)
      .toBe(MENSAJES_DUPLICADOS.reporte);

    expect(guardar).not.toHaveBeenCalled();
  });

  test('guarda un reporte que no está duplicado', async () => {
    const { presenter, guardar } = preparar([]);

    const resultado = await presenter.registrar(nuevo);

    expect(resultado.ok).toBe(true);
    expect(guardar).toHaveBeenCalledTimes(1);
  });

  test('permite publicar nuevamente un reporte resuelto', async () => {
    const { presenter, guardar } = preparar([
      { ...existente, estado: 'RESUELTO' },
    ]);

    const resultado = await presenter.registrar(nuevo);

    expect(resultado.ok).toBe(true);
    expect(guardar).toHaveBeenCalledTimes(1);
  });
});

describe('AdopcionPresenter - duplicados', () => {
  const solicitud: SolicitudAdopcion = {
    id: 'solicitud-1',
    perroId: 'mascota-1',
    albergueId: 'albergue-1',
    adoptanteId: 'usuario-1',
    nombre: 'Usuario de prueba',
    telefono: '70000000',
    vivienda: 'Casa',
    motivo: 'Deseo adoptar',
    estado: 'PENDIENTE',
  };

  function preparar(solicitudes: SolicitudAdopcion[]) {
    const guardarSolicitud = jest.fn()
      .mockResolvedValue(undefined);

    const repo: AdopcionRepository = {
      perros: jest.fn().mockReturnValue([]),
      solicitudes: jest.fn().mockReturnValue(solicitudes),
      guardarSolicitud,
      actualizarSolicitud: jest.fn(),
    };

    return {
      presenter: new AdopcionPresenter(repo),
      guardarSolicitud,
    };
  }

  test('no guarda una solicitud duplicada', async () => {
    const { presenter, guardarSolicitud } = preparar([solicitud]);

    const resultado = await presenter.registrar({
      ...solicitud,
      id: 'solicitud-2',
    });

    expect(resultado).toEqual({
      ok: false,
      mensaje: MENSAJES_DUPLICADOS.solicitud,
    });

    expect(guardarSolicitud).not.toHaveBeenCalled();
  });

  test('guarda una solicitud nueva', async () => {
    const { presenter, guardarSolicitud } = preparar([]);

    const resultado = await presenter.registrar(solicitud);

    expect(resultado.ok).toBe(true);
    expect(guardarSolicitud).toHaveBeenCalledTimes(1);
  });

  test('permite solicitar después de un rechazo', async () => {
    const { presenter, guardarSolicitud } = preparar([
      { ...solicitud, estado: 'RECHAZADA' },
    ]);

    const resultado = await presenter.registrar({
      ...solicitud,
      id: 'solicitud-2',
    });

    expect(resultado.ok).toBe(true);
    expect(guardarSolicitud).toHaveBeenCalledTimes(1);
  });
});