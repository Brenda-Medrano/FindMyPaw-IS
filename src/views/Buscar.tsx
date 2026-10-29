import { useState } from 'react';
import type { Reporte } from '../model/types';
import { filtrarReportes } from '../model/filtrarReportes';
import { FILTROS_LIMPIOS } from '../model/Filtros';
import type { CriteriosBusqueda } from '../model/Filtros';
import Reportes from './Reportes';
export default function Buscar({reportes}:{reportes:Reporte[]}){
 const [filtros,setFiltros]=useState<CriteriosBusqueda>({...FILTROS_LIMPIOS});
 const resultados=filtrarReportes(reportes,filtros);
 return <main><h1>Buscar mascotas</h1><label htmlFor="texto">Nombre o descripción</label><input id="texto" value={filtros.texto} onChange={e=>setFiltros({...filtros,texto:e.target.value})}/><button onClick={()=>setFiltros({...FILTROS_LIMPIOS})}>Limpiar filtros</button>{resultados.length?<Reportes reportes={resultados}/>:<p>No hay reportes con estos filtros.</p>}</main>;
}
