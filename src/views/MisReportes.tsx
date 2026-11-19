import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Reporte } from '../model/types';
import EstadoMascota from './EstadoMascota';
import { reportePresenter } from '../presenters/services';
export default function MisReportes({ usuarioId }: {
    usuarioId: string;
}) {
    const [reportes, setReportes] = useState(() => reportePresenter.listarPorAutor(usuarioId));
    const [edicion, setEdicion] = useState<Reporte | null>(null);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');
    async function ejecutar(accion: () => Promise<boolean>) { setGuardando(true); setError(''); try {
        if (!await accion())
            throw new Error('No se pudo modificar el reporte.');
        setReportes(reportePresenter.listarPorAutor(usuarioId));
        setEdicion(null);
    }
    catch (e) {
        setError(e instanceof Error ? e.message : 'No se pudo guardar el cambio.');
    }
    finally {
        setGuardando(false);
    } }
    function guardar(e: FormEvent<HTMLFormElement>) { e.preventDefault(); if (edicion) {
        const datos = edicion;
        void ejecutar(() => reportePresenter.editar(usuarioId, datos));
    } }
    return <main><h1>Mis publicaciones</h1>{error && <p role="alert">{error}</p>}
    <div className="grid">{reportes.map(r => <article className="card" key={r.id}><h3>{r.nombre || 'Sin nombre'}</h3><EstadoMascota tipo={r.tipo} estado={r.estado}/><p>{r.zona}</p>
      {r.estado !== 'RESUELTO' && <button disabled={guardando} onClick={() => ejecutar(() => reportePresenter.resolver(usuarioId, r.id))}>Marcar como resuelto</button>}
      <button disabled={guardando} onClick={() => setEdicion({ ...r })}>Editar reporte</button></article>)}</div>
    {edicion && <form onSubmit={guardar}><h2>Editar reporte</h2><label htmlFor="edit-n">Nombre</label><input id="edit-n" required={edicion.tipo === 'PERDIDO'} value={edicion.nombre ?? ''} onChange={e => setEdicion({ ...edicion, nombre: e.target.value })}/><label htmlFor="edit-d">Descripción *</label><textarea id="edit-d" required value={edicion.descripcion} onChange={e => setEdicion({ ...edicion, descripcion: e.target.value })}/><button disabled={guardando} type="submit">Guardar cambios</button><button disabled={guardando} type="button" onClick={() => setEdicion(null)}>Cancelar</button></form>}
  </main>;
}
