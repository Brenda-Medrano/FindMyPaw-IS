
import { ReportePresenter } from './ReportePresenter';
import type { Reporte } from '../model/types';

const repo = {
  listar: jest.fn<Reporte[], []>(() => []),
  guardar: jest.fn(),
  actualizar: jest.fn(),
};

const reporte: Reporte = {
  id: 'r1',
  autorId: 'u1',
  tipo: 'PERDIDO',
  estado: 'ACTIVO',
  moderacion: 'APROBADO',
  especie: 'PERRO',
  nombre: 'Max',
  zona: 'Sarco',
  descripcion: 'Perro perdido',
  fecha: '2026-10-20',
};

beforeEach(() => {
  jest.clearAllMocks();
  repo.listar.mockReturnValue([]);
});

describe('ReportePresenter - registrar', () => {
  test('rechaza un reporte inválido sin guardar', () => {
    const presenter = new ReportePresenter(repo);

    const resultado = presenter.registrar({
      autorId: 'u1',
      tipo: 'ENCONTRADO',
      especie: 'PERRO',
      fecha: '2026-10-20',
      zona: '',
      descripcion: '',
    });

    expect(resultado.ok).toBe(false);
    expect(repo.guardar).not.toHaveBeenCalled();
  });

  test('guarda reporte válido', () => {
    const presenter = new ReportePresenter(repo);

    const resultado = presenter.registrar({
      autorId: 'u1',
      tipo: 'ENCONTRADO',
      especie: 'GATO',
      fecha: '2026-10-20',
      zona: 'Cala Cala',
      descripcion: 'Gatito blanco',
    });

    expect(resultado.ok).toBe(true);
    expect(repo.guardar).toHaveBeenCalledTimes(1);
  });
});

describe('ReportePresenter - resolver', () => {
  test('permite al autor resolver su reporte', () => {
    repo.listar.mockReturnValue([reporte]);

    const presenter = new ReportePresenter(repo);

    expect(presenter.resolver('u1', 'r1')).toBe(true);

    expect(repo.actualizar).toHaveBeenCalledTimes(1);

    expect(repo.actualizar).toHaveBeenCalledWith({
      ...reporte,
      estado: 'RESUELTO',
    });
  });

  test('rechaza la resolución de un reporte inexistente', () => {
    const presenter = new ReportePresenter(repo);

    expect(
      presenter.resolver('u1', 'inexistente')
    ).toBe(false);

    expect(repo.actualizar).not.toHaveBeenCalled();
  });

  test('impide resolver reportes de otros usuarios', () => {
    repo.listar.mockReturnValue([reporte]);

    const presenter = new ReportePresenter(repo);

    expect(presenter.resolver('u2', 'r1')).toBe(false);

    expect(repo.actualizar).not.toHaveBeenCalled();
  });
});

describe('ReportePresenter - editar', () => {
  test('permite al autor editar su reporte', () => {
    repo.listar.mockReturnValue([reporte]);

    const presenter = new ReportePresenter(repo);

    const actualizado: Reporte = {
      ...reporte,
      descripcion: 'Nueva descripción',
    };

    expect(
      presenter.editar('u1', actualizado)
    ).toBe(true);

    expect(repo.actualizar).toHaveBeenCalledTimes(1);
    expect(repo.actualizar).toHaveBeenCalledWith(actualizado);
  });

  test('rechaza la edición de un reporte inexistente', () => {
    const presenter = new ReportePresenter(repo);

    expect(
      presenter.editar('u1', reporte)
    ).toBe(false);

    expect(repo.actualizar).not.toHaveBeenCalled();
  });

  test('impide editar reportes de otros usuarios', () => {
    repo.listar.mockReturnValue([reporte]);

    const presenter = new ReportePresenter(repo);

    expect(
      presenter.editar('u2', {
        ...reporte,
        autorId: 'u2',
      })
    ).toBe(false);

    expect(repo.actualizar).not.toHaveBeenCalled();
  });

  test('conserva el autor original al editar', () => {
    repo.listar.mockReturnValue([reporte]);

    const presenter = new ReportePresenter(repo);

    expect(
      presenter.editar('u1', {
        ...reporte,
        autorId: 'u2',
      })
    ).toBe(true);

    expect(repo.actualizar).toHaveBeenCalledWith({
      ...reporte,
      autorId: 'u1',
    });
  });
});
