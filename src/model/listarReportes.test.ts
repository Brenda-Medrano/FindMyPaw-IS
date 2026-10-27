import { listarPublicos } from './listarReportes';
import type { Reporte } from './types';
const base:Reporte={id:'1',autorId:'u1',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',nombre:'Max',descripcion:'Perro café',zona:'Sarco',fecha:'2026-10-20'};
test('solo aparecen los reportes aprobados',()=>{
 expect(listarPublicos([base,{...base,id:'2',moderacion:'PENDIENTE'}])).toHaveLength(1);
});
