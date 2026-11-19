
import { useState } from 'react';
import type { ReactNode } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
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

import type { Sesion } from './model/autenticacion';
import type { Rol } from './model/permisosAlbergue';

import {
  reportePresenter,
  adopcionPresenter,
  sesionPresenter,
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

const PedirAdopcion = ({
  usuarioId,
}: {
  usuarioId: string;
}) => {
  const { id } = useParams();

  const perro = id
    ? adopcionPresenter.buscarPerroPorId(id)
    : undefined;

  if (!perro) {
    return <p>Perro no encontrado.</p>;
  }

  return (
    <SolicitarAdopcion
      perro={perro}
      usuarioId={usuarioId}
    />
  );
};

export function AppRoutes() {
  const [sesion, setSesion] = useState<Sesion | null>(null);
  const [, actualizarReportes] = useState(0);

  function proteger(
    rol: Rol,
    contenido: (sesion: Sesion) => ReactNode
  ): ReactNode {
    if (!sesion) {
      return <Navigate to="/acceso" replace />;
    }

    if (!sesionPresenter.puedeAcceder(sesion, rol)) {
      return <p role="alert">No tienes permiso para acceder.</p>;
    }

    return contenido(sesion);
  }

  function cerrarSesion() {
    setSesion(sesionPresenter.cerrarSesion());
  }

  return (
    <Routes>
      <Route
        element={
          <Layout
            sesion={sesion}
            onCerrarSesion={cerrarSesion}
          />
        }
      >
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
          path="acceso"
          element={
            <Acceso
              sesion={sesion}
              onSesion={setSesion}
            />
          }
        />

        <Route
          path="reportar-perdida"
          element={proteger('CIUDADANO', usuario => (
            <ReportarPerdida usuarioId={usuario.id} />
          ))}
        />

        <Route
          path="reportar-hallazgo"
          element={proteger('CIUDADANO', usuario => (
            <ReportarHallazgo usuarioId={usuario.id} />
          ))}
        />

        <Route
          path="adoptar/:id"
          element={proteger('CIUDADANO', usuario => (
            <PedirAdopcion usuarioId={usuario.id} />
          ))}
        />

        <Route
          path="mis-reportes"
          element={proteger('CIUDADANO', usuario => (
            <MisReportes
              reportes={reportePresenter.listarPorAutor(usuario.id)}
              resolver={id => {
                reportePresenter.resolver(usuario.id, id);
                actualizarReportes(valor => valor + 1);
              }}
            />
          ))}
        />

        <Route
          path="albergue"
          element={proteger('ALBERGUE', usuario =>
            usuario.rol === 'ALBERGUE'
              ? <PanelAlbergue albergueId={usuario.albergueId} />
              : null
          )}
        />

        <Route
          path="admin"
          element={proteger('ADMIN', usuario => (
            <PanelAdmin rol={usuario.rol} />
          ))}
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
