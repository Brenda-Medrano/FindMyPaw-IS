import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import type { Reporte } from '../model/types';
import EstadoMascota from './EstadoMascota';

// Las fotos de muestra vienen de la vista previa de Lovable. La foto subida por
// el usuario siempre tiene prioridad. Si no existe, se muestra una imagen local.
function imagenReporte(r: Reporte): string {
  if (r.foto) return r.foto;
  if (r.especie === 'GATO') return '/pets/pet-luna.png';
  return r.tipo === 'ENCONTRADO' ? '/pets/pet-encontrado.png' : '/pets/pet-max.png';
}
function formatearFecha(fecha: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
  const [a,m,d] = fecha.split('-').map(Number);
  return new Intl.DateTimeFormat('es-BO', {day:'numeric', month:'short', year:'numeric'}).format(new Date(a,m-1,d));
}
export default function Reportes({ reportes }: { reportes: Reporte[] }) {
  return (
    <div className="grid pet-grid">
      {reportes.map((r) => (
        <article className="card pet-card" key={r.id}>
          <Link to={`/mascota/${r.id}`} className="pet-card-image" aria-label={`Ver a ${r.nombre || 'mascota sin nombre'}`}>
            <img src={imagenReporte(r)} alt={`Mascota ${r.nombre || 'sin nombre'} - ${r.zona}`} loading="lazy" />
          </Link>
          <div className="pet-card-content">
            <div className="pet-card-heading">
              <h3>{r.nombre || 'Sin nombre'}</h3>
              <EstadoMascota tipo={r.tipo} estado={r.estado}/>
            </div>
            <div className="pet-card-meta"><MapPin size={15}/><span>{r.zona}</span><span className="meta-dot">·</span><CalendarDays size={14}/><span>{formatearFecha(r.fecha)}</span></div>
            <p className="pet-card-description">{r.descripcion}</p>
            <Link to={`/mascota/${r.id}`} className="pet-card-link">Ver detalles <ArrowUpRight size={17}/></Link>
          </div>
        </article>
      ))}
    </div>
  );
}
