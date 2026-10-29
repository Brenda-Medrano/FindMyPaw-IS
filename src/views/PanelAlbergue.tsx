import { useState } from 'react';
import { LocalAdopcionRepository } from '../repositories/LocalAdopcionRepository';
import { AdopcionPresenter } from '../presenters/AdopcionPresenter';
const repo=new LocalAdopcionRepository();const presenter=new AdopcionPresenter(repo);
export default function PanelAlbergue(){
 const [solicitudes,setSolicitudes]=useState(()=>repo.solicitudes());
 const cambiar=(id:string,estado:'APROBADA'|'RECHAZADA')=>{presenter.cambiarEstado(id,'demo',estado);setSolicitudes(repo.solicitudes());};
 return <main><h1>Solicitudes del albergue</h1>{!solicitudes.length?<p>No existen solicitudes.</p>:<div className="grid">{solicitudes.filter(s=>s.albergueId==='demo').map(s=><article className="card" key={s.id}><h3>{s.nombre}</h3><p>{s.estado}</p><p>Vivienda: {s.vivienda}</p><button onClick={()=>cambiar(s.id,'APROBADA')}>Aprobar</button> <button onClick={()=>cambiar(s.id,'RECHAZADA')}>Rechazar</button></article>)}</div>}</main>;
}
