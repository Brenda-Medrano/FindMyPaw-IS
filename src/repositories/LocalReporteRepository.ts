import type { Reporte } from '../model/types';
import type { ReporteRepository } from './interfaces';
export class LocalReporteRepository implements ReporteRepository {
  private key='findmypaw_reportes_v1';
  listar(): Reporte[] { try { return JSON.parse(localStorage.getItem(this.key)||'[]') as Reporte[]; } catch { return []; } }
  guardar(reporte:Reporte):void { localStorage.setItem(this.key, JSON.stringify([...this.listar(),reporte])); }
  actualizar(reporte:Reporte):void { localStorage.setItem(this.key,JSON.stringify(this.listar().map(r=>r.id===reporte.id?reporte:r))); }
}
