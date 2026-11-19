import { useState } from 'react';
import type { FormEvent } from 'react';
import type { PerroEnAdopcion } from '../model/adopcionTypes';
import type { NuevaMascota } from '../presenters/MascotaPresenter';
import { mascotaPresenter } from '../presenters/services';
const vacia: NuevaMascota = { nombre: '', tamano: 'MEDIANO', edad: '', descripcion: '', disponible: true, foto: '', requisitos: '' };
export default function GestionMascotas({ albergueId }: {
    albergueId: string;
}) {
    const [lista, setLista] = useState(() => mascotaPresenter.listarPorAlbergue(albergueId));
    const [datos, setDatos] = useState<NuevaMascota>({ ...vacia });
    const [id, setId] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [guardando, setGuardando] = useState(false);
    function editar(p: PerroEnAdopcion) { setId(p.id); setDatos({ nombre: p.nombre, tamano: p.tamano, edad: p.edad, descripcion: p.descripcion, disponible: p.disponible, foto: p.foto ?? '', requisitos: p.requisitos }); setMensaje(''); setError(''); }
    async function guardar(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setGuardando(true);
        setError('');
        setMensaje('');
        try {
            if (id)
                await mascotaPresenter.modificar(albergueId, id, datos);
            else
                await mascotaPresenter.registrar(albergueId, datos);
            setLista(mascotaPresenter.listarPorAlbergue(albergueId));
            setId(null);
            setDatos({ ...vacia });
            setMensaje('Mascota guardada correctamente.');
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'No se pudo guardar la mascota.');
        }
        finally {
            setGuardando(false);
        }
    }
    return <section className="card"><h2>Gestionar mascotas en adopción</h2><ul>{lista.map(p => <li key={p.id}>{p.nombre} · {p.disponible ? 'Disponible' : 'No disponible'} <button disabled={guardando} type="button" onClick={() => editar(p)}>Editar {p.nombre}</button></li>)}</ul>
    <h3>{id ? 'Editar mascota' : 'Registrar mascota'}</h3><form onSubmit={guardar}>
    <label htmlFor="m-nombre">Nombre *</label><input id="m-nombre" required value={datos.nombre} onChange={e => setDatos({ ...datos, nombre: e.target.value })}/>
    <label htmlFor="m-tamano">Tamaño</label><select id="m-tamano" value={datos.tamano} onChange={e => setDatos({ ...datos, tamano: e.target.value as NuevaMascota['tamano'] })}><option>PEQUEÑO</option><option>MEDIANO</option><option>GRANDE</option></select>
    <label htmlFor="m-edad">Edad *</label><input id="m-edad" required value={datos.edad} onChange={e => setDatos({ ...datos, edad: e.target.value })}/>
    <label htmlFor="m-desc">Descripción *</label><textarea id="m-desc" required value={datos.descripcion} onChange={e => setDatos({ ...datos, descripcion: e.target.value })}/>
    <label htmlFor="m-foto">URL o ruta de fotografía</label><input id="m-foto" value={datos.foto ?? ''} onChange={e => setDatos({ ...datos, foto: e.target.value })}/>
    <label htmlFor="m-req">Requisitos *</label><input id="m-req" required value={datos.requisitos} onChange={e => setDatos({ ...datos, requisitos: e.target.value })}/>
    <label><input type="checkbox" checked={datos.disponible} onChange={e => setDatos({ ...datos, disponible: e.target.checked })}/> Disponible para adopción</label>
    <button disabled={guardando} type="submit">{guardando ? 'Guardando...' : 'Guardar mascota'}</button>{id && <button disabled={guardando} type="button" onClick={() => { setId(null); setDatos({ ...vacia }); }}>Cancelar edición</button>}</form>
    {error && <p role="alert">{error}</p>}{mensaje && <p role="status">{mensaje}</p>}</section>;
}
