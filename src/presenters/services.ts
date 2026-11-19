
import { LocalReporteRepository } from '../repositories/LocalReporteRepository';
import { LocalAdopcionRepository } from '../repositories/LocalAdopcionRepository';

import { ReportePresenter } from './ReportePresenter';
import { AdopcionPresenter } from './AdopcionPresenter';

const reporteRepo = new LocalReporteRepository();
const adopcionRepo = new LocalAdopcionRepository();

export const reportePresenter =
  new ReportePresenter(reporteRepo);

export const adopcionPresenter =
  new AdopcionPresenter(adopcionRepo);
