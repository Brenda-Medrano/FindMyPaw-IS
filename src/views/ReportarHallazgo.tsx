import { useState } from 'react';
import { nuevoHallazgo } from '../model/fabricas';
export default function ReportarHallazgo() {
  const [nombre,setNombre]=useState(nuevoHallazgo().nombre ?? '');
  return <main><h1>Reportar mascota encontrada</h1><form onSubmit={e=>e.preventDefault()}>
    <label htmlFor="nombre-h">Nombre (opcional)</label><input id="nombre-h" value={nombre} onChange={e=>setNombre(e.target.value)}/>
    <label htmlFor="zona-h">Zona aproximada *</label><input id="zona-h" required />
    <label htmlFor="desc-h">Descripción *</label><textarea id="desc-h" required/>
    <button type="submit">Publicar hallazgo</button>
  </form></main>;
}
