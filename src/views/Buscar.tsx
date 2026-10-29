import { useState } from 'react';
import { Search } from 'lucide-react';
import type { Reporte } from '../model/types';
import { filtrarReportes } from '../model/filtrarReportes';
import { FILTROS_LIMPIOS } from '../model/Filtros';
import BarraFiltros from './BarraFiltros';
import type { CriteriosBusqueda } from '../model/Filtros';
import Reportes from './Reportes';
import { reporteRepo } from '../presenters/services';
import { listarPublicos } from '../model/listarReportes';

export default function Buscar({ reportes }: { reportes?: Reporte[] }) {
  const lista = reportes ?? listarPublicos(reporteRepo.listar());
  const [filtros, setFiltros] = useState<CriteriosBusqueda>({...FILTROS_LIMPIOS});
  const resultados = filtrarReportes(lista, filtros);
  return (
    <main className="listing-page">
      <header className="page-intro">
        <div className="page-intro-icon"><Search size={26}/></div>
        <span className="section-kicker">CADA REENCUENTRO CUENTA</span>
        <h1>Encuentra a quien <em>estás buscando.</em></h1>
        <p>Explora las mascotas perdidas y encontradas en Cochabamba. Filtra los reportes para ayudar a reunirlas con sus familias.</p>
      </header>
      <BarraFiltros filtros={filtros} cambiar={setFiltros}/>
      <div className="listing-toolbar"><span className="results-count">{resultados.length} {resultados.length===1?'reporte':'reportes'} encontrados</span></div>
      {resultados.length ? <Reportes reportes={resultados}/> : <div className="empty-state"><Search size={29}/><p>No hay reportes con estos filtros.</p><button type="button" onClick={() => setFiltros({...FILTROS_LIMPIOS})}>Mostrar todos</button></div>}
    </main>
  );
}
