import { useState } from 'react';
import { adopcionPresenter } from '../presenters/services';
import GestionMascotas from './GestionMascotas';
export default function PanelAlbergue({ albergueId }: {
    albergueId: string;
}) {
    const [solicitudes, setSolicitudes] = useState(() => adopcionPresenter.listarSolicitudesPorAlbergue(albergueId));
    const [error, setError] = useState('');
    const [guardando, setGuardando] = useState(false);
    async function cambiar(id: string, estado: 'APROBADA' | 'RECHAZADA') {
        setError('');
        setGuardando(true);
        try {
            if (!await adopcionPresenter.cambiarEstado(id, albergueId, estado))
                throw new Error('No tienes permiso para modificar esta solicitud.');
            setSolicitudes(adopcionPresenter.listarSolicitudesPorAlbergue(albergueId));
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'No se pudo actualizar la solicitud.');
        }
        finally {
            setGuardando(false);
        }
    }
    return <main><h1>Solicitudes del albergue</h1>{error && <p role="alert">{error}</p>}
    {solicitudes.length === 0 ? <p>No existen solicitudes.</p> : <div className="grid">{solicitudes.map(s => <article className="card" key={s.id}><h3>{s.nombre}</h3><p>{s.estado}</p><p>Vivienda: {s.vivienda}</p>
    <button disabled={guardando} onClick={() => cambiar(s.id, 'APROBADA')}>Aprobar</button>{' '}<button disabled={guardando} onClick={() => cambiar(s.id, 'RECHAZADA')}>Rechazar</button></article>)}</div>}
    <GestionMascotas albergueId={albergueId}/></main>;
}
