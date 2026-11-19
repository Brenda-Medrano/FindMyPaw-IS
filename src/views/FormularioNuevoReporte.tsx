import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Especie, NuevoReporte, TipoReporte } from '../model/types';
import { nuevoHallazgo } from '../model/fabricas';
import { reportePresenter } from '../presenters/services';
interface Props {
    tipo: TipoReporte;
    usuarioId: string;
}
const configuraciones = {
    PERDIDO: { titulo: 'Reportar mascota perdida', nombre: 'Nombre *', fecha: 'Fecha de pérdida *', boton: 'Publicar pérdida', exito: 'Reporte creado. Pendiente de aprobación', ids: { nombre: 'rp-n', especie: 'rp-e', zona: 'rp-z', descripcion: 'rp-d', fecha: 'rp-f' } },
    ENCONTRADO: { titulo: 'Reportar mascota encontrada', nombre: 'Nombre (opcional)', fecha: 'Fecha *', boton: 'Publicar hallazgo', exito: 'Hallazgo creado, pendiente de aprobación', ids: { nombre: 'nombre-h', especie: 'esp-h', zona: 'zona-h', descripcion: 'desc-h', fecha: 'fecha-h' } },
} as const;
export default function FormularioNuevoReporte({ tipo, usuarioId }: Props) {
    const perdida = tipo === 'PERDIDO';
    const c = configuraciones[tipo];
    const ids = c.ids;
    const [nombre, setNombre] = useState(() => perdida ? '' : (nuevoHallazgo().nombre ?? ''));
    const [especie, setEspecie] = useState<Especie>('PERRO');
    const [zona, setZona] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [foto, setFoto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [guardando, setGuardando] = useState(false);
    async function publicar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        setMensaje('');
        setError('');
        setGuardando(true);
        const datos: NuevoReporte = { autorId: usuarioId, tipo, nombre, especie, zona, descripcion, fecha, ...(perdida ? { foto } : {}) };
        try {
            const resultado = await reportePresenter.registrar(datos);
            setMensaje(resultado.ok ? c.exito : Object.values(resultado.errores ?? {}).join('. '));
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'No se pudo guardar el reporte.');
        }
        finally {
            setGuardando(false);
        }
    }
    const campoEspecie = <><label htmlFor={ids.especie}>Especie *</label><select id={ids.especie} value={especie} onChange={e => setEspecie(e.target.value as Especie)}><option value="PERRO">Perro</option><option value="GATO">Gato</option></select></>;
    return <main><h1>{c.titulo}</h1><form onSubmit={publicar}>
    <label htmlFor={ids.nombre}>{c.nombre}</label><input id={ids.nombre} required={perdida} value={nombre} onChange={e => setNombre(e.target.value)}/>
    {perdida && campoEspecie}
    <label htmlFor={ids.zona}>Zona aproximada *</label><input id={ids.zona} required value={zona} onChange={e => setZona(e.target.value)}/>
    <label htmlFor={ids.descripcion}>Descripción *</label><textarea id={ids.descripcion} required value={descripcion} onChange={e => setDescripcion(e.target.value)}/>
    {!perdida && campoEspecie}
    <label htmlFor={ids.fecha}>{c.fecha}</label><input id={ids.fecha} type="date" required max={new Date().toISOString().slice(0, 10)} value={fecha} onChange={e => setFecha(e.target.value)}/>
    {perdida && <><label htmlFor="rp-i">URL de fotografía *</label><input id="rp-i" type="url" required value={foto} onChange={e => setFoto(e.target.value)}/></>}
    <button type="submit" disabled={guardando}>{guardando ? 'Guardando...' : c.boton}</button>
  </form>{mensaje && <p role="status">{mensaje}</p>}{error && <p role="alert">{error}</p>}</main>;
}
