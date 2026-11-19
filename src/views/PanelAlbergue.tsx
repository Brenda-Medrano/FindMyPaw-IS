
import { useState } from 'react';

import type { SolicitudAdopcion } from '../model/adopcionTypes';
import { adopcionPresenter } from '../presenters/services';

interface PanelAlbergueProps {
  albergueId: string;
}

export default function PanelAlbergue({
  albergueId,
}: PanelAlbergueProps) {
  const [solicitudes, setSolicitudes] = useState<SolicitudAdopcion[]>(
    () => adopcionPresenter.listarSolicitudesPorAlbergue(albergueId)
  );

  function cambiar(
    id: string,
    estado: 'APROBADA' | 'RECHAZADA'
  ) {
    const actualizado = adopcionPresenter.cambiarEstado(
      id,
      albergueId,
      estado
    );

    if (actualizado) {
      setSolicitudes(
        adopcionPresenter.listarSolicitudesPorAlbergue(albergueId)
      );
    }
  }

  return (
    <main>
      <h1>Solicitudes del albergue</h1>

      {solicitudes.length === 0 ? (
        <p>No existen solicitudes.</p>
      ) : (
        <div className="grid">
          {solicitudes.map(solicitud => (
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
                type="button"
                onClick={() =>
                  cambiar(solicitud.id, 'APROBADA')
                }
              >
                Aprobar
              </button>

              {' '}

              <button
                type="button"
                onClick={() =>
                  cambiar(solicitud.id, 'RECHAZADA')
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
