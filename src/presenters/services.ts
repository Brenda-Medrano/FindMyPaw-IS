import { LocalReporteRepository } from '../repositories/LocalReporteRepository';
import { ReportePresenter } from './ReportePresenter';
export const reporteRepo = new LocalReporteRepository();
export const reportePresenter = new ReportePresenter(reporteRepo);
