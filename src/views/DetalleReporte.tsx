import type { Reporte } from '../model/types';
import { CalendarDays, MapPin } from 'lucide-react';
import EstadoMascota from './EstadoMascota';
import SolicitarContacto from './SolicitarContacto';
export default function DetalleReporte({reporte}:{reporte:Reporte}) {
  const foto = reporte.foto || (reporte.especie==='GATO' ? '/pets/pet-luna.jpg' : reporte.tipo==='ENCONTRADO' ? '/pets/pet-encontrado.jpg' : '/pets/pet-max.jpg');
  return <main className="detail-page">
    <div className="detail-photo"><img src={foto} alt={`Foto de ${reporte.nombre||'mascota sin nombre'}`}/></div>
    <section className="card detail-content"><EstadoMascota tipo={reporte.tipo} estado={reporte.estado}/><h1>{reporte.nombre || 'Sin identificar'}</h1><p>{reporte.descripcion}</p><div className="detail-facts"><div><MapPin size={20}/><span><strong>Zona aproximada</strong>{reporte.zona}</span></div><div><CalendarDays size={20}/><span><strong>Fecha del reporte</strong>{reporte.fecha}</span></div></div><SolicitarContacto/></section>
  </main>;
}
