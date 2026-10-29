import type { Reporte } from '../model/types';
import EstadoMascota from './EstadoMascota';
export default function DetalleReporte({reporte}:{reporte:Reporte}){
 return <main className="card"><h1>{reporte.nombre||'Sin identificar'}</h1><EstadoMascota tipo={reporte.tipo} estado={reporte.estado}/><p>{reporte.descripcion}</p><strong>Zona aproximada</strong><p>{reporte.zona}</p><strong>Fecha del reporte</strong><p>{reporte.fecha}</p><button type="button">Solicitar contacto</button></main>;
}
