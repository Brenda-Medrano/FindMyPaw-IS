import { buscarReporte } from './buscarReporte';
import type { Reporte } from './types';
const r:Reporte={id:'r1',autorId:'a',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'GATO',nombre:'Luna',descripcion:'Blanca',zona:'Centro',fecha:'2026-10-20'};
test('encuentra un reporte por identificador',()=>expect(buscarReporte([r],'r1')).toEqual(r));
test('no inventa reportes inexistentes',()=>expect(buscarReporte([r],'r99')).toBeUndefined());
