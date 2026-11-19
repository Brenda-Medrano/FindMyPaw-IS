import { AdopcionPresenter } from './AdopcionPresenter';
import { SupabaseAdopcionRepository } from '../repositories/SupabaseAdopcionRepository';
import { BaseDatosMemoria } from '../repositories/BaseDatosMemoria.testHelper';
import type { PerroEnAdopcion, SolicitudAdopcion } from '../model/adopcionTypes';
const perro: PerroEnAdopcion = { id: 'p1', albergueId: 'a1', nombre: 'Toby', tamano: 'MEDIANO', edad: '2 años', descripcion: 'Cariñoso', disponible: true, requisitos: 'Casa segura' };
const solicitud: SolicitudAdopcion = { id: 's1', perroId: 'p1', albergueId: 'a1', adoptanteId: 'u1', nombre: 'Ana', telefono: '70000000', vivienda: 'Casa', motivo: 'Adoptar', estado: 'PENDIENTE' };
async function preparar() { const db = new BaseDatosMemoria(); const repo = new SupabaseAdopcionRepository(db); await repo.guardarMascota(perro); return { db, repo, presenter: new AdopcionPresenter(repo) }; }
describe('Adopciones con repositorio remoto', () => {
    test('consulta mascotas', async () => { const { presenter } = await preparar(); expect(presenter.listarPerros()).toEqual([perro]); expect(presenter.buscarPerroPorId('p1')).toEqual(perro); });
    test('registra y consulta una solicitud', async () => { const { presenter } = await preparar(); expect((await presenter.registrar(solicitud)).ok).toBe(true); expect(presenter.listarSolicitudes()).toEqual([solicitud]); });
    test('actualiza el estado', async () => { const { presenter } = await preparar(); await presenter.registrar(solicitud); expect(await presenter.cambiarEstado('s1', 'a1', 'APROBADA')).toBe(true); expect(presenter.listarSolicitudes()[0].estado).toBe('APROBADA'); expect(await presenter.cambiarEstado('s1', 'a1', 'RECHAZADA')).toBe(true); expect(presenter.listarSolicitudes()[0].estado).toBe('RECHAZADA'); });
    test('impide modificar solicitudes de otro albergue', async () => { const { presenter } = await preparar(); await presenter.registrar(solicitud); expect(await presenter.cambiarEstado('s1', 'a2', 'APROBADA')).toBe(false); expect(presenter.listarSolicitudes()[0].estado).toBe('PENDIENTE'); });
    test('no guarda una solicitud inválida', async () => { const { presenter } = await preparar(); expect((await presenter.registrar({ ...solicitud, nombre: '' })).ok).toBe(false); expect(presenter.listarSolicitudes()).toEqual([]); });
    test('propaga fallo de escritura', async () => { const { presenter, db } = await preparar(); db.fallar = true; await expect(presenter.registrar(solicitud)).rejects.toThrow(); });
});
