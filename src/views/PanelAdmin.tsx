
import { useState } from 'react';

import type { Rol } from '../model/permisosAlbergue';
import { reportePresenter } from '../presenters/services';

interface PanelAdminProps {
  rol: Rol;
}

export default function PanelAdmin({
  rol,
}: PanelAdminProps) {
  const [lista, setLista] = useState(
    () => rol === 'ADMIN'
      ? reportePresenter.listarTodos()
      : []
  );

  function cambiar(
    id: string,
    estado: 'APROBADO' | 'RECHAZADO'
  ) {
    if (rol !== 'ADMIN') {
      return;
    }

    const actualizado = reportePresenter.moderar(
      id,
      rol,
      estado
    );

    if (actualizado) {
      setLista(reportePresenter.listarTodos());
    }
  }

  if (rol !== 'ADMIN') {
    return (
      <main>
        <p role="alert">
          No tienes permiso para acceder.
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Moderación de reportes</h1>

      {lista.length === 0 ? (
        <p>No existen reportes para moderar.</p>
      ) : (
        <div className="grid">
          {lista.map(reporte => (
            <article
              className="card"
              key={reporte.id}
            >
              <strong>
                {reporte.nombre || 'Sin identificar'}
              </strong>

              <p>{reporte.moderacion}</p>

              <button
                type="button"
                onClick={() =>
                  cambiar(reporte.id, 'APROBADO')
                }
              >
                Aprobar
              </button>

              {' '}

              <button
                type="button"
                onClick={() =>
                  cambiar(reporte.id, 'RECHAZADO')
                }
              >
                Rechazar
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
