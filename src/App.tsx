import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './views/Layout';
import Inicio from './views/Inicio';
import ReportarHallazgo from './views/ReportarHallazgo';
import Buscar from './views/Buscar';
const Proximamente = ({ titulo }: { titulo: string }) => <main><h1>{titulo}</h1><p>Próximamente.</p></main>;
export default function App() {
  return <BrowserRouter><Routes><Route element={<Layout/>}><Route index element={<Inicio/>}/><Route path="buscar" element={<Buscar reportes={[]}/>}/><Route path="reportar-perdida" element={<Proximamente titulo="Reportar pérdida"/>}/><Route path="reportar-hallazgo" element={<ReportarHallazgo/>}/><Route path="adopciones" element={<Proximamente titulo="Adopciones"/>}/></Route></Routes></BrowserRouter>;
}
