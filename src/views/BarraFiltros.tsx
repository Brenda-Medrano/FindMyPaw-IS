import type { CriteriosBusqueda } from '../model/Filtros';
import { FILTROS_LIMPIOS } from '../model/Filtros';
export default function BarraFiltros({filtros,cambiar}:{filtros:CriteriosBusqueda;cambiar:(f:CriteriosBusqueda)=>void}) {
 return <section className="card" aria-label="Filtros de búsqueda"><label htmlFor="texto">Nombre o descripción</label><input id="texto" value={filtros.texto??''} onChange={e=>cambiar({...filtros,texto:e.target.value})}/><button type="button" onClick={()=>cambiar({...FILTROS_LIMPIOS})}>Limpiar filtros</button></section>;
}
