import type { Reporte } from '../model/types';
import type { ReporteRepository } from './interfaces';
import type { BaseDatos } from '../data/BaseDatos';
import { TablaRemota } from './TablaRemota';
export class SupabaseReporteRepository implements ReporteRepository {
    private readonly tabla: TablaRemota<Reporte>;
    constructor(db: BaseDatos) { this.tabla = new TablaRemota<Reporte>(db, 'reportes'); }
    listar(): Reporte[] { return this.tabla.listar().sort((a, b) => b.fecha.localeCompare(a.fecha)); }
    cargar(): Promise<void> { return this.tabla.cargar(); }
    limpiar(): void { this.tabla.limpiar(); }
    guardar(reporte: Reporte): Promise<void> { return this.tabla.guardar(reporte); }
    actualizar(reporte: Reporte): Promise<void> {
        const { id, ...campos } = reporte;
        const anterior = this.tabla.listar().find(item => item.id === id);
        const cambios = Object.fromEntries(Object.entries(campos).filter(([campo, valor]) => !anterior || anterior[campo as keyof Reporte] !== valor)) as Partial<Reporte>;
        if (!Object.keys(cambios).length)
            return Promise.resolve();
        return this.tabla.actualizar(id, cambios);
    }
}
