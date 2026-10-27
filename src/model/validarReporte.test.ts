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
