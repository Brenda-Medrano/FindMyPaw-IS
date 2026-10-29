import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './views/Layout';
import Inicio from './views/Inicio';
import ReportarHallazgo from './views/ReportarHallazgo';
import Buscar from './views/Buscar';
import Adopciones from './views/Adopciones';
import ReportarPerdida from './views/ReportarPerdida';
import { reporteRepo } from './presenters/services';
import { listarPublicos } from './model/listarReportes';
import { LocalAdopcionRepository } from './repositories/LocalAdopcionRepository';
import SolicitarAdopcion from './views/SolicitarAdopcion';
import PanelAlbergue from './views/PanelAlbergue';
import PanelAdmin from './views/PanelAdmin';
import Acceso from './views/Acceso';
import MisReportes from './views/MisReportes';
import { reportePresenter } from './presenters/services';
import DetalleReporte from './views/DetalleReporte';
import { useParams } from 'react-router-dom';
const adopcionesRepo = new LocalAdopcionRepository();
const Detalle = () => { const {id}=useParams(); const r=reporteRepo.listar().find(x=>x.id===id); return r?<DetalleReporte reporte={r}/>:<p>Reporte no encontrado.</p>; };
const PedirAdopcion = () => { const {id}=useParams(); const perro=adopcionesRepo.perros().find(x=>x.id===id);return perro?<SolicitarAdopcion perro={perro}/>:<p>Perro no encontrado.</p>; };

export default function App() {
  return <BrowserRouter><Routes><Route element={<Layout/>}><Route index element={<Inicio/>}/><Route path="buscar" element={<Buscar reportes={listarPublicos(reporteRepo.listar())}/>}/><Route path="mascota/:id" element={<Detalle/>}/><Route path="adoptar/:id" element={<PedirAdopcion/>}/><Route path="mis-reportes" element={<MisReportes reportes={reporteRepo.listar().filter(r=>r.autorId==='demo')} resolver={id=>reportePresenter.resolver('demo',id)}/>}/><Route path="albergue" element={<PanelAlbergue/>}/><Route path="admin" element={<PanelAdmin/>}/><Route path="acceso" element={<Acceso/>}/><Route path="reportar-perdida" element={<ReportarPerdida/>}/><Route path="reportar-hallazgo" element={<ReportarHallazgo/>}/><Route path="adopciones" element={<Adopciones perros={adopcionesRepo.perros()}/>}/></Route></Routes></BrowserRouter>;
}
