import { filtrarReportes } from './filtrarReportes';
import type { Reporte } from './types';
const base:Reporte={id:'1',autorId:'u1',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',nombre:'MAX',descripcion:'Perrito',zona:'Sarco',fecha:'2026-10-20'};
const reportes:Reporte[]=[base,{...base,id:'2',nombre:'Luna'}];
test('buscar por nombre ignora mayúsculas',()=>expect(filtrarReportes(reportes,{texto:'max'})).toHaveLength(1));
test('buscar también encuentra palabras de la descripción',()=>{
 expect(filtrarReportes(reportes,{texto:'perrito'})).toHaveLength(2);
});
test('filtra reportes por especie',()=>{
 expect(filtrarReportes([...reportes,{...base,id:'3',especie:'GATO'}],{especie:'GATO'}).map(r=>r.id)).toEqual(['3']);
});
test('combina filtros de especie y estado',()=>{
 const datos=[base,{...base,id:'2',especie:'GATO' as const,estado:'RESUELTO' as const}];
 expect(filtrarReportes(datos,{especie:'GATO',estado:'RESUELTO'}).map(r=>r.id)).toEqual(['2']);
 expect(filtrarReportes(datos,{especie:'PERRO',estado:'RESUELTO'})).toHaveLength(0);
});
test('limpiar filtros devuelve el conjunto original',()=>{
 expect(filtrarReportes(reportes,{texto:'',especie:'',estado:''})).toHaveLength(reportes.length);
});
