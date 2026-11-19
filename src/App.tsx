import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';


import Layout from './views/Layout';
import Inicio from './views/Inicio';
import ReportarHallazgo from './views/ReportarHallazgo';
import Buscar from './views/Buscar';
import Adopciones from './views/Adopciones';
import ReportarPerdida from './views/ReportarPerdida';
import SolicitarAdopcion from './views/SolicitarAdopcion';
import PanelAlbergue from './views/PanelAlbergue';
import PanelAdmin from './views/PanelAdmin';
import Acceso from './views/Acceso';
import MisReportes from './views/MisReportes';
import DetalleReporte from './views/DetalleReporte';

import {
  reportePresenter,
  adopcionPresenter,
} from './presenters/services';

const Detalle = () => {
  const { id } = useParams();

  const reporte = id
    ? reportePresenter.buscarPorId(id)
    : undefined;

  if (!reporte) {
    return <p>Reporte no encontrado.</p>;
  }

  return <DetalleReporte reporte={reporte} />;
};

const PedirAdopcion = () => {
  const { id } = useParams();

  const perro = id
    ? adopcionPresenter.buscarPerroPorId(id)
    : undefined;

  if (!perro) {
    return <p>Perro no encontrado.</p>;
  }

  return <SolicitarAdopcion perro={perro} />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />

          <Route path="buscar" element={<Buscar />} />

          <Route path="mascota/:id" element={<Detalle />} />

          <Route
            path="adopciones"
            element={
              <Adopciones
                perros={adopcionPresenter.listarPerros()}
              />
            }
          />

          <Route
            path="adoptar/:id"
            element={<PedirAdopcion />}
          />

          <Route
            path="mis-reportes"
            element={
              <MisReportes
                reportes={reportePresenter.listarPorAutor('demo')}
                resolver={(id) =>
                  reportePresenter.resolver('demo', id)
                }
              />
            }
          />

          <Route path="albergue" element={<PanelAlbergue />} />
          <Route path="admin" element={<PanelAdmin />} />
          <Route path="acceso" element={<Acceso />} />

          <Route
            path="reportar-perdida"
            element={<ReportarPerdida />}
          />

          <Route
            path="reportar-hallazgo"
            element={<ReportarHallazgo />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}