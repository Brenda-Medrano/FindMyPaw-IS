
import { useState } from 'react';
import { adopcionPresenter } from '../presenters/services';

const ALBERGUE_ID = 'demo';

export default function PanelAlbergue() {
  const [solicitudes, setSolicitudes] = useState(() =>
    adopcionPresenter.listarSolicitudesPorAlbergue(ALBERGUE_ID)
  );

  const cambiar = (
    id: string,
    estado: 'APROBADA' | 'RECHAZADA'
  ) => {
    adopcionPresenter.cambiarEstado(
      id,
      ALBERGUE_ID,
      estado
    );

    setSolicitudes(
      adopcionPresenter.listarSolicitudesPorAlbergue(ALBERGUE_ID)
    );
  };

  return (
    <main>
      <h1>Solicitudes del albergue</h1>

      {solicitudes.length === 0 ? (
        <p>No existen solicitudes.</p>
      ) : (
        <div className="grid">
          {solicitudes.map(solicitud => (
            <article className="card" key={solicitud.id}>
              <h3>{solicitud.nombre}</h3>

              <p>{solicitud.estado}</p>

              <p>Vivienda: {solicitud.vivienda}</p>

              <button
                onClick={() => cambiar(solicitud.id, 'APROBADA')}
              >
                Aprobar
              </button>

              {' '}

              <button
                onClick={() => cambiar(solicitud.id, 'RECHAZADA')}
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
