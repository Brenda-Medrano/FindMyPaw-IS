import { useState } from 'react';
export default function ReportarHallazgo() {
  const [nombre,setNombre]=useState('');
  return <main><h1>Reportar mascota encontrada</h1><form onSubmit={e=>e.preventDefault()}>
    <label htmlFor="nombre-h">Nombre (opcional)</label><input id="nombre-h" value={nombre} onChange={e=>setNombre(e.target.value)}/>
    <button type="submit">Publicar hallazgo</button>
  </form></main>;
}
