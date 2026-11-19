import { BaseDatosMemoria } from './BaseDatosMemoria.testHelper';
import { SupabaseReporteRepository } from './SupabaseReporteRepository';
import { SupabaseAdopcionRepository } from './SupabaseAdopcionRepository';
import type { Reporte } from '../model/types';
import type { PerroEnAdopcion, SolicitudAdopcion } from '../model/adopcionTypes';
const reporte: Reporte = { id: 'r1', autorId: 'u1', tipo: 'ENCONTRADO', estado: 'ACTIVO', moderacion: 'PENDIENTE', especie: 'PERRO', nombre: 'Max', zona: 'Sarco', descripcion: 'Perro encontrado', fecha: '2020-10-20' };
const mascota: PerroEnAdopcion = { id: 'p1', albergueId: 'a1', nombre: 'Toby', tamano: 'MEDIANO', edad: '2 años', descripcion: 'Cariñoso', disponible: true, requisitos: 'Casa segura' };
const solicitud: SolicitudAdopcion = { id: 's1', perroId: 'p1', albergueId: 'a1', adoptanteId: 'u1', nombre: 'Ana', telefono: '70000000', vivienda: 'Casa', motivo: 'Adoptar', estado: 'PENDIENTE' };
describe('Repositorios remotos', () => {
    test('guarda y recupera reportes desde una nueva instancia', async () => {
        const db = new BaseDatosMemoria();
        await new SupabaseReporteRepository(db).guardar(reporte);
        const nuevo = new SupabaseReporteRepository(db);
        await nuevo.cargar();
        expect(nuevo.listar()).toEqual([reporte]);
    });
    test('persiste cambios en el reporte', async () => {
        const db = new BaseDatosMemoria();
        const repo = new SupabaseReporteRepository(db);
        await repo.guardar(reporte);
        await repo.actualizar({ ...reporte, estado: 'RESUELTO' });
        const nuevo = new SupabaseReporteRepository(db);
        await nuevo.cargar();
        expect(nuevo.listar()[0].estado).toBe('RESUELTO');
    });
    test('no guarda en caché si falla la conexión', async () => {
        const db = new BaseDatosMemoria();
        const repo = new SupabaseReporteRepository(db);
        db.fallar = true;
        await expect(repo.guardar(reporte)).rejects.toThrow('Sin conexión');
        expect(repo.listar()).toEqual([]);
    });
    test('conserva datos anteriores si falla una actualización', async () => {
        const db = new BaseDatosMemoria();
        const repo = new SupabaseReporteRepository(db);
        await repo.guardar(reporte);
        db.fallar = true;
        await expect(repo.actualizar({ ...reporte, estado: 'RESUELTO' })).rejects.toThrow();
        expect(repo.listar()).toEqual([reporte]);
    });
    test('propaga errores de lectura', async () => {
        const db = new BaseDatosMemoria();
        db.fallar = true;
        await expect(new SupabaseReporteRepository(db).cargar()).rejects.toThrow();
    });
    test('persiste mascotas y solicitudes cuando se recarga', async () => {
        const db = new BaseDatosMemoria();
        const repo = new SupabaseAdopcionRepository(db);
        await repo.guardarMascota(mascota);
        await repo.guardarSolicitud(solicitud);
        await repo.actualizarSolicitud({ ...solicitud, estado: 'APROBADA' });
        await repo.actualizarMascota({ ...mascota, nombre: 'Toby nuevo', foto: '' });
        const nuevo = new SupabaseAdopcionRepository(db);
        await nuevo.cargar(true);
        expect(nuevo.perros()[0].nombre).toBe('Toby nuevo');
        expect(nuevo.solicitudes()[0].estado).toBe('APROBADA');
    });
    test('no conserva solicitudes privadas al salir de la cuenta', async () => {
        const db = new BaseDatosMemoria();
        const repo = new SupabaseAdopcionRepository(db);
        await repo.guardarSolicitud(solicitud);
        await repo.cargar(false);
        expect(repo.solicitudes()).toEqual([]);
    });
});
