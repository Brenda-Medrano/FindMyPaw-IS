import type { Reporte } from '../model/types';
import EstadoMascota from './EstadoMascota';
import { Link } from 'react-router-dom';
export default function Reportes({reportes}:{reportes:Reporte[]}) {
 return <div className="grid">{reportes.map(r=><article className="card" key={r.id}><h3>{r.nombre || 'Sin nombre'}</h3><EstadoMascota tipo={r.tipo} estado={r.estado}/><p>{r.especie} · {r.zona}</p><p>{r.descripcion}</p><Link to={`/mascota/${r.id}`}>Ver detalle</Link></article>)}</div>;
}
