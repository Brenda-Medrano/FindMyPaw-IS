import type { Reporte } from '../model/types';
import type { ReporteRepository } from './interfaces';
const EJEMPLOS:Reporte[]=[{id:'ej-1',autorId:'ejemplo',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',nombre:'Max',descripcion:'Perro marrón pequeño; datos de demostración',zona:'Cala Cala',fecha:'2026-10-18'},{id:'ej-2',autorId:'ejemplo',tipo:'ENCONTRADO',estado:'ACTIVO',moderacion:'APROBADO',especie:'GATO',descripcion:'Gato blanco y negro; datos de demostración',zona:'Sarco',fecha:'2026-10-19'}];
export class LocalReporteRepository implements ReporteRepository {
  private key='findmypaw_reportes_v1';
  listar(): Reporte[] { try { return JSON.parse(localStorage.getItem(this.key)||JSON.stringify(EJEMPLOS)) as Reporte[]; } catch { return [...EJEMPLOS]; } }
  guardar(reporte:Reporte):void { localStorage.setItem(this.key, JSON.stringify([...this.listar(),reporte])); }
  actualizar(reporte:Reporte):void { localStorage.setItem(this.key,JSON.stringify(this.listar().map(r=>r.id===reporte.id?reporte:r))); }
}
