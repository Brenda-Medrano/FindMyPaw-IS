import { useState } from 'react';
import { nuevoHallazgo } from '../model/fabricas';
import type { NuevoReporte, Especie } from '../model/types';
import { reportePresenter } from '../presenters/services';
export default function ReportarHallazgo() {
  const [nombre,setNombre]=useState(nuevoHallazgo().nombre ?? '');
  const [zona,setZona]=useState(''),[descripcion,setDescripcion]=useState(''),[fecha,setFecha]=useState(''),[especie,setEspecie]=useState<Especie>('PERRO'),[mensaje,setMensaje]=useState('');
  const publicar=(e:React.FormEvent)=>{e.preventDefault();const datos:NuevoReporte={autorId:'demo',tipo:'ENCONTRADO',nombre,zona,descripcion,fecha,especie};const r=reportePresenter.registrar(datos);setMensaje(r.ok?'Hallazgo creado, pendiente de aprobación':Object.values(r.errores||{}).join('. '));};
  return <main><h1>Reportar mascota encontrada</h1><form onSubmit={publicar}>
    <label htmlFor="nombre-h">Nombre (opcional)</label><input id="nombre-h" value={nombre} onChange={e=>setNombre(e.target.value)}/>
    <label htmlFor="zona-h">Zona aproximada *</label><input id="zona-h" required value={zona} onChange={e=>setZona(e.target.value)}/>
    <label htmlFor="desc-h">Descripción *</label><textarea id="desc-h" required value={descripcion} onChange={e=>setDescripcion(e.target.value)}/>
    <label htmlFor="esp-h">Especie *</label><select id="esp-h" value={especie} onChange={e=>setEspecie(e.target.value as Especie)}><option value="PERRO">Perro</option><option value="GATO">Gato</option></select>
    <label htmlFor="fecha-h">Fecha *</label><input id="fecha-h" type="date" required max={new Date().toISOString().slice(0,10)} value={fecha} onChange={e=>setFecha(e.target.value)}/>
    <button type="submit">Publicar hallazgo</button>
  </form>{mensaje&&<p role="status">{mensaje}</p>}</main>;
}
