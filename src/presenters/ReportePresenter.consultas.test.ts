import { ReportePresenter } from './ReportePresenter';
import type { Reporte } from '../model/types';
const base: Reporte = { id: 'r1', autorId: 'u1', tipo: 'PERDIDO', estado: 'ACTIVO', moderacion: 'APROBADO', especie: 'PERRO', nombre: 'Luna', zona: 'Sarco', descripcion: 'Mascota blanca', fecha: '2020-10-20' };
function preparar() { const reportes: Reporte[] = [base, { ...base, id: 'r2', moderacion: 'PENDIENTE' }, { ...base, id: 'r3', autorId: 'u2', moderacion: 'RECHAZADO' }, { ...base, id: 'r4', autorId: 'u2' }]; const repo = { listar: jest.fn(() => reportes), guardar: jest.fn(), actualizar: jest.fn() }; return { reportes, repo, presenter: new ReportePresenter(repo) }; }
describe('Consultas de ReportePresenter', () => {
    test('lista solamente los aprobados', () => { const { reportes, presenter, repo } = preparar(); expect(presenter.listarPublicos()).toEqual([reportes[0], reportes[3]]); expect(repo.listar).toHaveBeenCalledTimes(1); });
    test('lista todos los reportes', () => { const { reportes, presenter } = preparar(); expect(presenter.listarTodos()).toEqual(reportes); });
    test('encuentra por id', () => { const { reportes, presenter } = preparar(); expect(presenter.buscarPorId('r2')).toEqual(reportes[1]); });
    test('devuelve undefined para id inexistente', () => { expect(preparar().presenter.buscarPorId('x')).toBeUndefined(); });
    test('lista por autor', () => { const { reportes, presenter } = preparar(); expect(presenter.listarPorAutor('u1')).toEqual(reportes.slice(0, 2)); });
    test('no muestra reportes de otro autor', () => { expect(preparar().presenter.listarPorAutor('u3')).toEqual([]); });
});
