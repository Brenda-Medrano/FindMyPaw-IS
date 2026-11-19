
import { useState } from 'react';
import { reportePresenter } from '../presenters/services';

export default function PanelAdmin() {
  const [lista, setLista] = useState(
    () => reportePresenter.listarTodos()
  );

  function cambiar(
    id: string,
    estado: 'APROBADO' | 'RECHAZADO'
  ) {
    const actualizado = reportePresenter.moderar(
      id,
      'ADMIN',
      estado
    );

    if (actualizado) {
      setLista(reportePresenter.listarTodos());
    }
  }

  return (
    <main>
      <h1>Moderación de reportes</h1>

      <p>Panel únicamente para demostración.</p>

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
              onClick={() =>
                cambiar(reporte.id, 'APROBADO')
              }
            >
              Aprobar
            </button>

            {' '}

            <button
              onClick={() =>
                cambiar(reporte.id, 'RECHAZADO')
              }
            >
              Rechazar
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
