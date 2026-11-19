import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import Layout from './views/Layout';
import Inicio from './views/Inicio';
import Buscar from './views/Buscar';
import Adopciones from './views/Adopciones';
import ReportarPerdida from './views/ReportarPerdida';
import ReportarHallazgo from './views/ReportarHallazgo';
import SolicitarAdopcion from './views/SolicitarAdopcion';
import PanelAlbergue from './views/PanelAlbergue';
import PanelAdmin from './views/PanelAdmin';
import Acceso from './views/Acceso';
import MisReportes from './views/MisReportes';
import DetalleReporte from './views/DetalleReporte';
import type { Sesion } from './model/autenticacion';
import type { Rol } from './model/permisosAlbergue';
import { reportePresenter, adopcionPresenter, sesionPresenter, cargarDatos, limpiarDatos } from './presenters/services';
function Detalle() {
    const { id } = useParams();
    const reporte = id ? reportePresenter.buscarPorId(id) : undefined;
    return reporte ? <DetalleReporte reporte={reporte}/> : <p>Reporte no encontrado.</p>;
}
function PedirAdopcion({ usuarioId }: {
    usuarioId: string;
}) {
    const { id } = useParams();
    const perro = id ? adopcionPresenter.buscarPerroPorId(id) : undefined;
    return perro?.disponible ? <SolicitarAdopcion perro={perro} usuarioId={usuarioId}/> : <p>Perro no disponible.</p>;
}
export function AppRoutes() {
    const navigate = useNavigate();
    const [sesion, setSesion] = useState<Sesion | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [intento, setIntento] = useState(0);
    useEffect(() => {
        let activo = true;
        async function iniciar() {
            try {
                const actual = await sesionPresenter.recuperarSesion();
                if (!activo)
                    return;
                await cargarDatos(actual);
                if (activo)
                    setSesion(actual);
            }
            catch {
                if (activo) {
                    limpiarDatos();
                    setError('No se pudo conectar con la base de datos. Revisa tu conexión y vuelve a intentar.');
                }
            }
            finally {
                if (activo)
                    setCargando(false);
            }
        }
        void iniciar();
        return () => { activo = false; };
    }, [intento]);
    async function establecerSesion(nueva: Sesion) {
        try {
            await cargarDatos(nueva);
            setSesion(nueva);
        }
        catch (error) {
            limpiarDatos();
            setSesion(null);
            setError('No se pudieron cargar los datos de la cuenta. Vuelve a intentar.');
            throw error;
        }
    }
    async function cerrarSesion(): Promise<boolean> {
        setCargando(true);
        try {
            await sesionPresenter.cerrarSesion();
            limpiarDatos();
            setSesion(null);
            await cargarDatos(null);
            navigate('/acceso', { replace: true });
            return true;
        }
        catch {
            limpiarDatos();
            setSesion(null);
            setError('No se pudo completar el cierre de sesión o recargar los datos. Reintenta.');
            return false;
        }
        finally {
            setCargando(false);
        }
    }
    function proteger(rol: Rol, contenido: (usuario: Sesion) => ReactNode): ReactNode {
        if (!sesion)
            return <Navigate to="/acceso" replace/>;
        if (!sesionPresenter.puedeAcceder(sesion, rol))
            return <p role="alert">No tienes permiso para acceder.</p>;
        return contenido(sesion);
    }
    if (cargando)
        return <main><p role="status">Conectando con la base de datos...</p></main>;
    if (error)
        return <main><h1>Error de conexión</h1><p role="alert">{error}</p><button onClick={() => { setError(''); setCargando(true); setIntento(v => v + 1); }}>Reintentar</button></main>;
    return (<Routes>
      <Route element={<Layout sesion={sesion} onCerrarSesion={cerrarSesion}/>}>
        <Route index element={<Inicio />}/>
        <Route path="buscar" element={<Buscar />}/>
        <Route path="mascota/:id" element={<Detalle />}/>
        <Route path="adopciones" element={<Adopciones perros={adopcionPresenter.listarPerros()}/>}/>
        <Route path="acceso" element={<Acceso sesion={sesion} onSesion={establecerSesion}/>}/>
        <Route path="reportar-perdida" element={proteger('CIUDADANO', u => <ReportarPerdida usuarioId={u.id}/>)}/>
        <Route path="reportar-hallazgo" element={proteger('CIUDADANO', u => <ReportarHallazgo usuarioId={u.id}/>)}/>
        <Route path="adoptar/:id" element={proteger('CIUDADANO', u => <PedirAdopcion usuarioId={u.id}/>)}/>
        <Route path="mis-reportes" element={proteger('CIUDADANO', u => <MisReportes usuarioId={u.id}/>)}/>
        <Route path="albergue" element={proteger('ALBERGUE', u => u.rol === 'ALBERGUE' ? <PanelAlbergue albergueId={u.albergueId}/> : null)}/>
        <Route path="admin" element={proteger('ADMIN', u => <PanelAdmin rol={u.rol}/>)}/>
        <Route path="*" element={<p>Página no encontrada.</p>}/>
      </Route>
    </Routes>);
}
export default function App() {
    return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
