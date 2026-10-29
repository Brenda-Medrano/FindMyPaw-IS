import { marcarResuelto } from './estadosReporte';
import type { Reporte } from './types';
const r:Reporte={id:'1',autorId:'u1',tipo:'ENCONTRADO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',descripcion:'Mascota',zona:'Cala Cala',fecha:'2026-10-20'};
test('cambia estado a resuelto',()=>expect(marcarResuelto(r).estado).toBe('RESUELTO'));
test('impide a otro usuario cerrar el caso',()=>{
 expect(()=>marcarResuelto(r,'otro')).toThrow(/permiso/i);
});
