import { useState } from 'react';
import type { Reporte } from '../model/types';
import { filtrarReportes } from '../model/filtrarReportes';
import { FILTROS_LIMPIOS } from '../model/Filtros';
import type { CriteriosBusqueda } from '../model/Filtros';

import BarraFiltros from './BarraFiltros';
import Reportes from './Reportes';

import { reporteRepo } from '../presenters/services';
import { listarPublicos } from '../model/listarReportes';

export default function Buscar({
  reportes,
}: {
  reportes?: Reporte[];
}) {
  const lista = reportes ?? listarPublicos(reporteRepo.listar());

  const [filtros, setFiltros] = useState<CriteriosBusqueda>({
    ...FILTROS_LIMPIOS,
  });

  const resultados = filtrarReportes(lista, filtros);

  return (
    <main>
      <h1>Buscar mascotas</h1>

      <BarraFiltros
        filtros={filtros}
        cambiar={setFiltros}
      />

      {resultados.length > 0 ? (
        <Reportes reportes={resultados} />
      ) : (
        <p>No hay reportes con estos filtros.</p>
      )}
    </main>
  );
}