import { puedeEditarReporte } from './permisosReporte';
import type { Reporte } from './types';
const r:Reporte={id:'r1',autorId:'u1',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',nombre:'Max',descripcion:'Perro',zona:'Sarco',fecha:'2026-10-20'};
test('permite al dueño editar su reporte',()=>expect(puedeEditarReporte('u1',r)).toBe(true));
test('no permite editar el reporte de otra persona',()=>expect(puedeEditarReporte('otro',r)).toBe(false));
