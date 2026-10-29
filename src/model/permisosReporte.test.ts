import { puedeEditarReporte } from './permisosReporte';
import type { Reporte } from './types';
const r:Reporte={id:'r1',autorId:'u1',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',nombre:'Max',descripcion:'Perro',zona:'Sarco',fecha:'2026-10-20'};
test('permite al dueño editar su reporte',()=>expect(puedeEditarReporte('u1',r)).toBe(true));
