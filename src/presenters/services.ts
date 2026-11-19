import { BaseDatosSupabase } from '../data/BaseDatosSupabase';
import { SupabaseAutenticacion } from '../data/AutenticacionRemota';
import { SupabaseReporteRepository } from '../repositories/SupabaseReporteRepository';
import { SupabaseAdopcionRepository } from '../repositories/SupabaseAdopcionRepository';
import { ReportePresenter } from './ReportePresenter';
import { AdopcionPresenter } from './AdopcionPresenter';
import { SesionPresenter } from './SesionPresenter';
import { MascotaPresenter } from './MascotaPresenter';
import type { Sesion } from '../model/autenticacion';
const db = new BaseDatosSupabase();
const reporteRepo = new SupabaseReporteRepository(db);
const adopcionRepo = new SupabaseAdopcionRepository(db);
export const reportePresenter = new ReportePresenter(reporteRepo);
export const adopcionPresenter = new AdopcionPresenter(adopcionRepo);
export const mascotaPresenter = new MascotaPresenter(adopcionRepo);
export const sesionPresenter = new SesionPresenter(new SupabaseAutenticacion());
export function limpiarDatos(): void {
    reporteRepo.limpiar();
    adopcionRepo.limpiar();
}
export async function cargarDatos(sesion: Sesion | null): Promise<void> {
    limpiarDatos();
    try {
        await Promise.all([reporteRepo.cargar(), adopcionRepo.cargar(Boolean(sesion))]);
    }
    catch (error) {
        limpiarDatos();
        throw error;
    }
}
