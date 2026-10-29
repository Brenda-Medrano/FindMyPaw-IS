import type { CriteriosBusqueda } from '../model/Filtros';
import { FILTROS_LIMPIOS } from '../model/Filtros';
import { RotateCcw, Search } from 'lucide-react';

export default function BarraFiltros({ filtros, cambiar }: { filtros: CriteriosBusqueda; cambiar: (f: CriteriosBusqueda) => void }) {
  return (
    <section className="card filter-bar" aria-label="Filtros de búsqueda">
      <div className="filter-field filter-search"><label htmlFor="texto">Buscar por nombre o descripción</label><div className="input-with-icon"><Search size={19}/><input id="texto" placeholder="Ej. perrito café, Luna..." value={filtros.texto ?? ''} onChange={e=>cambiar({...filtros,texto:e.target.value})}/></div></div>
      <div className="filter-field"><label htmlFor="esp-filter">Especie</label><select id="esp-filter" value={filtros.especie ?? ''} onChange={e=>cambiar({...filtros,especie:e.target.value as CriteriosBusqueda['especie']})}><option value="">Todas</option><option value="PERRO">Perros</option><option value="GATO">Gatos</option></select></div>
      <div className="filter-field"><label htmlFor="estado-filter">Estado</label><select id="estado-filter" value={filtros.estado ?? ''} onChange={e=>cambiar({...filtros,estado:e.target.value as CriteriosBusqueda['estado']})}><option value="">Todos</option><option value="PERDIDO">Perdido</option><option value="ENCONTRADO">Encontrado</option><option value="RESUELTO">Resuelto</option></select></div>
      <button className="button button-outline filter-reset" type="button" onClick={()=>cambiar({...FILTROS_LIMPIOS})}><RotateCcw size={17}/> Limpiar filtros</button>
    </section>
  );
}
