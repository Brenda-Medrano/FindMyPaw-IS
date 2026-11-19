import { useState } from 'react';

import { adopcionPresenter } from '../presenters/services';

export default function PanelAlbergue() {
  const [solicitudes, setSolicitudes] = useState(
    () => adopcionPresenter.listarSolicitudes()
  );

  function cambiar(
    id: string,
    estado: 'APROBADA' | 'RECHAZADA'
  ) {
    adopcionPresenter.cambiarEstado(
      id,
      'demo',
      estado
    );

    setSolicitudes(
      adopcionPresenter.listarSolicitudes()
    );
  }

  return (
    <main>
      <h1>Solicitudes del albergue</h1>

      {!solicitudes.length ? (
        <p>No existen solicitudes.</p>
      ) : (
        <div className="grid">
          {solicitudes
            .filter(solicitud =>
              solicitud.albergueId === 'demo'
            )
            .map(solicitud => (
              <article
                className="card"
                key={solicitud.id}
              >
                <h3>{solicitud.nombre}</h3>

                <p>{solicitud.estado}</p>

                <p>
                  Vivienda: {solicitud.vivienda}
                </p>

                <button
                  onClick={() =>
                    cambiar(
                      solicitud.id,
                      'APROBADA'
                    )
                  }
                >
                  Aprobar
                </button>

                {' '}

                <button
                  onClick={() =>
                    cambiar(
                      solicitud.id,
                      'RECHAZADA'
                    )
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
