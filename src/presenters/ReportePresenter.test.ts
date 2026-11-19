import { ReportePresenter } from './ReportePresenter';
import type { Reporte } from '../model/types';
const reporte: Reporte = { id: 'r1', autorId: 'u1', tipo: 'PERDIDO', estado: 'ACTIVO', moderacion: 'APROBADO', especie: 'PERRO', nombre: 'Max', zona: 'Sarco', descripcion: 'Perro perdido', fecha: '2020-10-20' };
const repo = { listar: jest.fn<Reporte[], [
    ]>(() => []), guardar: jest.fn(), actualizar: jest.fn() };
beforeEach(() => { jest.resetAllMocks(); repo.listar.mockReturnValue([]); });
const datos = { autorId: 'u1', tipo: 'ENCONTRADO', especie: 'GATO', fecha: '2020-10-20', zona: 'Cala Cala', descripcion: 'Gatito blanco' } as const;
describe('ReportePresenter', () => {
    test('rechaza un reporte inválido sin guardar', async () => { expect((await new ReportePresenter(repo).registrar({ ...datos, zona: '', descripcion: '' })).ok).toBe(false); expect(repo.guardar).not.toHaveBeenCalled(); });
    test('guarda reporte válido', async () => { expect((await new ReportePresenter(repo).registrar(datos)).ok).toBe(true); expect(repo.guardar).toHaveBeenCalledTimes(1); });
    test('permite al autor resolver su reporte', async () => { repo.listar.mockReturnValue([reporte]); expect(await new ReportePresenter(repo).resolver('u1', 'r1')).toBe(true); expect(repo.actualizar).toHaveBeenCalledWith({ ...reporte, estado: 'RESUELTO' }); });
    test('rechaza la resolución de un reporte inexistente', async () => { expect(await new ReportePresenter(repo).resolver('u1', 'inexistente')).toBe(false); expect(repo.actualizar).not.toHaveBeenCalled(); });
    test('impide resolver reportes de otros usuarios', async () => { repo.listar.mockReturnValue([reporte]); expect(await new ReportePresenter(repo).resolver('u2', 'r1')).toBe(false); expect(repo.actualizar).not.toHaveBeenCalled(); });
    test('permite al autor editar su reporte', async () => { repo.listar.mockReturnValue([reporte]); const actualizado = { ...reporte, descripcion: 'Nueva descripción' }; expect(await new ReportePresenter(repo).editar('u1', actualizado)).toBe(true); expect(repo.actualizar).toHaveBeenCalledWith(actualizado); });
    test('rechaza la edición de un reporte inexistente', async () => { expect(await new ReportePresenter(repo).editar('u1', reporte)).toBe(false); expect(repo.actualizar).not.toHaveBeenCalled(); });
    test('impide editar reportes de otros usuarios', async () => { repo.listar.mockReturnValue([reporte]); expect(await new ReportePresenter(repo).editar('u2', { ...reporte, autorId: 'u2' })).toBe(false); expect(repo.actualizar).not.toHaveBeenCalled(); });
    test('conserva el autor original al editar', async () => { repo.listar.mockReturnValue([reporte]); expect(await new ReportePresenter(repo).editar('u1', { ...reporte, autorId: 'u2' })).toBe(true); expect(repo.actualizar).toHaveBeenCalledWith(reporte); });
    test('no confirma un registro si falla el guardado remoto', async () => { repo.guardar.mockRejectedValueOnce(new Error('Sin conexión')); await expect(new ReportePresenter(repo).registrar(datos)).rejects.toThrow('Sin conexión'); });
});
