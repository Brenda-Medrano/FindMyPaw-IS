import { ReportePresenter } from './ReportePresenter';
import type { Reporte } from '../model/types';
const reporte: Reporte = { id: 'r1', autorId: 'u1', tipo: 'ENCONTRADO', estado: 'ACTIVO', moderacion: 'PENDIENTE', especie: 'GATO', nombre: 'Milo', zona: 'Sarco', descripcion: 'Gato encontrado', fecha: '2020-10-20' };
function preparar() { const repo = { listar: jest.fn(() => [reporte]), guardar: jest.fn(), actualizar: jest.fn() }; return { repo, presenter: new ReportePresenter(repo) }; }
describe('Moderación mediante ReportePresenter', () => {
    test.each(['APROBADO', 'RECHAZADO'] as const)('permite moderar a %s', async (estado) => { const { repo, presenter } = preparar(); expect(await presenter.moderar('r1', 'ADMIN', estado)).toBe(true); expect(repo.actualizar).toHaveBeenCalledWith({ ...reporte, moderacion: estado }); });
    test('no modifica un reporte inexistente', async () => { const { repo, presenter } = preparar(); expect(await presenter.moderar('x', 'ADMIN', 'APROBADO')).toBe(false); expect(repo.actualizar).not.toHaveBeenCalled(); });
    test.each(['CIUDADANO', 'ALBERGUE'] as const)('impide que %s modere', async (rol) => { const { repo, presenter } = preparar(); await expect(presenter.moderar('r1', rol, 'APROBADO')).rejects.toThrow(); expect(repo.actualizar).not.toHaveBeenCalled(); });
});
