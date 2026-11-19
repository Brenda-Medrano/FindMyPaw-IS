
import { useState } from 'react';
import { adopcionPresenter } from '../presenters/services';

type EstadoSolicitud = 'APROBADA' | 'RECHAZADA';

export default function PanelAlbergue() {

  const [solicitudes, setSolicitudes] = useState(
    () => adopcionPresenter.listarSolicitudes()
  );

  // Cambiar el estado de una solicitud
  function cambiar(
    id: string,
    estado: EstadoSolicitud
  ) {
    adopcionPresenter.cambiarEstado(
      id,
      'demo',
      estado
    );

    // Actualizar solicitudes
    setSolicitudes(
      adopcionPresenter.listarSolicitudes()
    );
  }

  // Filtrar solicitudes del albergue
  const solicitudesAlbergue = solicitudes.filter(
    (s) => s.albergueId === 'demo'
  );

  return (
    <main>
      <h1>Solicitudes del albergue</h1>

      {solicitudesAlbergue.length === 0 ? (
        <p>No existen solicitudes.</p>
      ) : (
        <div className="grid">
          {solicitudesAlbergue.map((s) => (
            <article className="card" key={s.id}>

              <h3>{s.nombre}</h3>

              <p>Estado: {s.estado}</p>

              <p>Vivienda: {s.vivienda}</p>

              <button
                onClick={() => cambiar(s.id, 'APROBADA')}
                disabled={
                  s.estado === 'APROBADA' ||
                  s.estado === 'RECHAZADA'
                }
              >
                Aprobar
              </button>

              <button
                onClick={() => cambiar(s.id, 'RECHAZADA')}
                disabled={
                  s.estado === 'APROBADA' ||
                  s.estado === 'RECHAZADA'
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
