import { comprobarErrorDuplicado } from './comprobarErrorDuplicado';
import { RegistroDuplicadoError } from '../model/RegistroDuplicadoError';

describe('RETRO-03: errores únicos PostgreSQL', () => {
  test('convierte un duplicado de reporte', () => {
    expect(() => comprobarErrorDuplicado({ code: '23505', message: 'uq_reportes_activos' }, 'reportes'))
      .toThrow(RegistroDuplicadoError);
  });
  test('convierte un duplicado de solicitud', () => {
    expect(() => comprobarErrorDuplicado({ code: '23505', message: 'uq_solicitudes_activas' }, 'solicitudes_adopcion'))
      .toThrow(RegistroDuplicadoError);
  });
  test('no convierte un error de permisos en duplicado', () => {
    expect(() => comprobarErrorDuplicado({ code: '42501', message: 'permission denied' }, 'reportes'))
      .not.toThrow();
  });
  test('no convierte un id duplicado en reporte duplicado', () => {
    expect(() => comprobarErrorDuplicado({ code: '23505', message: 'reportes_pkey' }, 'reportes'))
      .not.toThrow();
  });
});
