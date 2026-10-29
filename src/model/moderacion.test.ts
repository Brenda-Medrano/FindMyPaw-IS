import { asignarPendiente } from './moderacion';
import type { Reporte } from './types';
const r:Reporte={id:'r1',autorId:'a1',tipo:'ENCONTRADO',estado:'ACTIVO',moderacion:'APROBADO',especie:'GATO',descripcion:'Gato',zona:'Centro',fecha:'2026-10-20'};
test('reporte nuevo ingresa pendiente de revisión',()=>expect(asignarPendiente(r).moderacion).toBe('PENDIENTE'));
test('administrador puede aprobar',()=>{
 const { moderarReporte } = require('./moderacion');
 expect(moderarReporte(r,'ADMIN','APROBADO').moderacion).toBe('APROBADO');
});
test('un ciudadano no puede aprobar',()=>{
 const { moderarReporte } = require('./moderacion');
 expect(()=>moderarReporte(r,'CIUDADANO','APROBADO')).toThrow();
});