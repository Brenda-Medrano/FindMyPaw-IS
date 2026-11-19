import { useState } from 'react';
import type { Rol } from '../model/permisosAlbergue';
import { reportePresenter } from '../presenters/services';
export default function PanelAdmin({ rol }: {
    rol: Rol;
}) {
    const [lista, setLista] = useState(() => rol === 'ADMIN' ? reportePresenter.listarTodos() : []);
    const [error, setError] = useState('');
    const [guardando, setGuardando] = useState(false);
    async function cambiar(id: string, estado: 'APROBADO' | 'RECHAZADO') {
        setError('');
        setGuardando(true);
        try {
            if (!await reportePresenter.moderar(id, rol, estado))
                throw new Error('No se encontró el reporte.');
            setLista(reportePresenter.listarTodos());
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'No se pudo moderar el reporte.');
        }
        finally {
            setGuardando(false);
        }
    }
    if (rol !== 'ADMIN')
        return <p role="alert">No tienes permiso para acceder.</p>;
    return <main><h1>Moderación de reportes</h1>{error && <p role="alert">{error}</p>}
    {lista.length === 0 ? <p>No existen reportes para moderar.</p> : <div className="grid">{lista.map(r => <article className="card" key={r.id}><strong>{r.nombre || 'Sin identificar'}</strong><p>{r.moderacion}</p>
    <button disabled={guardando} onClick={() => cambiar(r.id, 'APROBADO')}>Aprobar</button>{' '}<button disabled={guardando} onClick={() => cambiar(r.id, 'RECHAZADO')}>Rechazar</button></article>)}</div>}
  </main>;
}
