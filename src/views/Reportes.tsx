import type { Reporte } from '../model/types';
export default function Reportes({reportes}:{reportes:Reporte[]}) {
 return <div className="grid">{reportes.map(r=><article className="card" key={r.id}><h3>{r.nombre || 'Sin nombre'}</h3><span className={'badge '+(r.estado==='RESUELTO'?'resuelto':r.tipo.toLowerCase())}>{r.estado==='RESUELTO'?'Resuelto':r.tipo==='PERDIDO'?'Perdido':'Encontrado'}</span><p>{r.especie} · {r.zona}</p><p>{r.descripcion}</p></article>)}</div>;
}
