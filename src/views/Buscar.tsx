import { useState } from 'react';
import type { Reporte } from '../model/types';
import { filtrarReportes } from '../model/filtrarReportes';
import { FILTROS_LIMPIOS } from '../model/Filtros';
import BarraFiltros from './BarraFiltros';
import type { CriteriosBusqueda } from '../model/Filtros';
import Reportes from './Reportes';
export default function Buscar({reportes}:{reportes:Reporte[]}){
 const [filtros,setFiltros]=useState<CriteriosBusqueda>({...FILTROS_LIMPIOS});
 const resultados=filtrarReportes(reportes,filtros);
 return <main><h1>Buscar mascotas</h1><BarraFiltros filtros={filtros} cambiar={setFiltros}/>{resultados.length?<Reportes reportes={resultados}/>:<p>No hay reportes con estos filtros.</p>}</main>;
}
