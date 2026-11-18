
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

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

import { LocalAdopcionRepository } from './repositories/LocalAdopcionRepository';
import { reportePresenter } from './presenters/services';

// Repositorio de adopciones
const adopcionesRepo = new LocalAdopcionRepository();

// Componente para mostrar el detalle de un reporte
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

// Componente para solicitar una adopción
const PedirAdopcion = () => {
  const { id } = useParams();

  const perro = adopcionesRepo
    .perros()
    .find((x) => x.id === id);

  if (!perro) {
    return <p>Perro no encontrado.</p>;
  }

  return <SolicitarAdopcion perro={perro} />;
};

// Componente principal
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          {/* Página de inicio */}
          <Route index element={<Inicio />} />

          {/* Búsqueda y detalles */}
          <Route path="buscar" element={<Buscar />} />
          <Route path="mascota/:id" element={<Detalle />} />

          {/* Adopciones */}
          <Route
            path="adopciones"
            element={<Adopciones perros={adopcionesRepo.perros()} />}
          />

          <Route
            path="adoptar/:id"
            element={<PedirAdopcion />}
          />

          {/* Reportes del usuario */}
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

          {/* Paneles */}
          <Route path="albergue" element={<PanelAlbergue />} />
          <Route path="admin" element={<PanelAdmin />} />
          <Route path="acceso" element={<Acceso />} />

          {/* Reportar mascotas */}
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
