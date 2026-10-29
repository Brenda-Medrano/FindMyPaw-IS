import { useState } from 'react';
import { reporteRepo } from '../presenters/services';
import { moderarReporte } from '../model/moderacion';
export default function PanelAdmin(){
 const [lista,setLista]=useState(()=>reporteRepo.listar());
 const cambiar=(id:string,estado:'APROBADO'|'RECHAZADO')=>{
   const anterior=lista.find(r=>r.id===id);if(!anterior)return;
   reporteRepo.actualizar(moderarReporte(anterior,'ADMIN',estado));setLista(reporteRepo.listar());
 };
 return <main><h1>Moderación de reportes</h1><p>Panel únicamente para demostración.</p><div className="grid">{lista.map(r=><article className="card" key={r.id}><strong>{r.nombre||'Sin identificar'}</strong><p>{r.moderacion}</p><button onClick={()=>cambiar(r.id,'APROBADO')}>Aprobar</button> <button onClick={()=>cambiar(r.id,'RECHAZADO')}>Rechazar</button></article>)}</div></main>;
}
