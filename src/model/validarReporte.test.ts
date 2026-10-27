import { validarReporte } from './validarReporte';
import type { NuevoReporte } from './types';
const hallazgo: NuevoReporte = { autorId:'u1', tipo:'ENCONTRADO', especie:'PERRO', zona:'Sarco', descripcion:'Perrito pequeño', fecha:'2026-10-20' };
test('un hallazgo puede registrarse sin nombre', () => {
  expect(validarReporte(hallazgo).nombre).toBeUndefined();
});
test('no permite hallazgo sin zona', () => {
  expect(validarReporte({...hallazgo, zona:'  '}).zona).toBeTruthy();
});
test('una pérdida requiere el nombre de mascota', () => {
  expect(validarReporte({...hallazgo,tipo:'PERDIDO',nombre:''}).nombre).toBeTruthy();
});
test('una pérdida requiere fotografía', () => {
  expect(validarReporte({...hallazgo,tipo:'PERDIDO',nombre:'Max',foto:''}).foto).toBeTruthy();
});
test('rechaza una fecha futura', () => {
  expect(validarReporte({...hallazgo,fecha:'2099-12-01'}).fecha).toBeTruthy();
});
test('rechaza una fecha inexistente', () => {
  expect(validarReporte({...hallazgo,fecha:'2026-02-31'}).fecha).toBeTruthy();
});
