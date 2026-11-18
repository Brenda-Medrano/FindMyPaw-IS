
import { LocalReporteRepository } from '../repositories/LocalReporteRepository';
import { ReportePresenter } from './ReportePresenter';

const reporteRepo = new LocalReporteRepository();

export const reportePresenter =
  new ReportePresenter(reporteRepo);
