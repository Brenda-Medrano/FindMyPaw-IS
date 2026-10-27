import { filtrarReportes } from './filtrarReportes';
import type { Reporte } from './types';
const base:Reporte={id:'1',autorId:'u1',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',nombre:'MAX',descripcion:'Perrito',zona:'Sarco',fecha:'2026-10-20'};
const reportes:Reporte[]=[base,{...base,id:'2',nombre:'Luna'}];
test('buscar por nombre ignora mayúsculas',()=>expect(filtrarReportes(reportes,{texto:'max'})).toHaveLength(1));
test('buscar también encuentra palabras de la descripción',()=>{
 expect(filtrarReportes(reportes,{texto:'perrito'})).toHaveLength(2);
});
