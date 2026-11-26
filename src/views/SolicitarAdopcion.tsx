import { useState } from 'react';
import type { FormEvent } from 'react';
import type { PerroEnAdopcion, SolicitudAdopcion } from '../model/adopcionTypes';
import { adopcionPresenter } from '../presenters/services';
interface Props {
    perro: PerroEnAdopcion;
    usuarioId: string;
}
export default function SolicitarAdopcion({ perro, usuarioId }: Props) {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [vivienda, setVivienda] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [guardando, setGuardando] = useState(false);
    async function enviar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        setGuardando(true);
        setError('');
        setMensaje('');
        const solicitud: SolicitudAdopcion = { id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()), perroId: perro.id, albergueId: perro.albergueId, adoptanteId: usuarioId, nombre, telefono, vivienda, motivo: 'Deseo adoptar', estado: 'PENDIENTE' };
        try {
            const resultado = await adopcionPresenter.registrar(solicitud);
            if (resultado.ok) setMensaje(resultado.mensaje);
            else setError(resultado.mensaje);
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'No se pudo guardar la solicitud.');
        }
        finally {
            setGuardando(false);
        }
    }
    return <main><h1>Solicitar adopción de {perro.nombre}</h1><aside className="card"><h2>Antes de solicitar</h2><p>{perro.requisitos}</p></aside>
    <form onSubmit={enviar}><label htmlFor="sol-n">Nombre *</label><input id="sol-n" required value={nombre} onChange={e => setNombre(e.target.value)}/>
    <label htmlFor="sol-t">Teléfono *</label><input id="sol-t" type="tel" required value={telefono} onChange={e => setTelefono(e.target.value)}/>
    <label htmlFor="sol-v">Vivienda *</label><input id="sol-v" required value={vivienda} onChange={e => setVivienda(e.target.value)}/>
    <button type="submit" disabled={guardando}>{guardando ? 'Guardando...' : 'Enviar solicitud'}</button></form>
    {mensaje && <p className="card" role="status">{mensaje}</p>}{error && <p role="alert">{error}</p>}</main>;
}
