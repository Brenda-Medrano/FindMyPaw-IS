import { useState } from 'react';
import type { PerroEnAdopcion,SolicitudAdopcion } from '../model/adopcionTypes';
import { AdopcionPresenter } from '../presenters/AdopcionPresenter';
import { LocalAdopcionRepository } from '../repositories/LocalAdopcionRepository';
export default function SolicitarAdopcion({perro}:{perro:PerroEnAdopcion}){
 const [nombre,setNombre]=useState('');const [telefono,setTelefono]=useState('');const [vivienda,setVivienda]=useState('');
 const [mensaje,setMensaje]=useState('');
 function enviar(e:React.FormEvent){e.preventDefault();const s:SolicitudAdopcion={id:String(Date.now()),perroId:perro.id,albergueId:perro.albergueId,adoptanteId:'demo',nombre,telefono,vivienda,motivo:'Deseo adoptar',estado:'PENDIENTE'};setMensaje(new AdopcionPresenter(new LocalAdopcionRepository()).registrar(s).mensaje);}
 return <main><h1>Solicitar adopción de {perro.nombre}</h1><aside className="card"><h2>Antes de solicitar</h2><p>{perro.requisitos}</p></aside><form onSubmit={enviar}><label htmlFor="sol-n">Nombre *</label><input id="sol-n" required value={nombre} onChange={e=>setNombre(e.target.value)}/><label htmlFor="sol-t">Teléfono *</label><input id="sol-t" required value={telefono} onChange={e=>setTelefono(e.target.value)}/><label htmlFor="sol-v">Vivienda *</label><input id="sol-v" required value={vivienda} onChange={e=>setVivienda(e.target.value)}/><button>Enviar solicitud</button></form>{mensaje&&<p className="card" role="status">{mensaje}</p>}</main>;
}
