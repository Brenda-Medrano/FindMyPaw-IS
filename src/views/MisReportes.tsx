import type { Reporte } from '../model/types';
import EstadoMascota from './EstadoMascota';
export default function MisReportes({reportes,resolver}:{reportes:Reporte[];resolver:(id:string)=>void}) {
 return <main><h1>Mis publicaciones</h1><div className="grid">{reportes.map(r=><article className="card" key={r.id}><h3>{r.nombre||'Sin nombre'}</h3><EstadoMascota tipo={r.tipo} estado={r.estado}/><p>{r.zona}</p>{r.estado!=='RESUELTO'&&<button onClick={()=>resolver(r.id)}>Marcar como resuelto</button>}</article>)}</div></main>;
}
