import type { Reporte } from '../model/types';
export default function FormularioReporte({reporte,cambiar}:{reporte:Reporte;cambiar:(r:Reporte)=>void}){
 return <div><label htmlFor="nombre-ed">Nombre</label><input id="nombre-ed" value={reporte.nombre??''} onChange={e=>cambiar({...reporte,nombre:e.target.value})}/><label htmlFor="desc-ed">Descripción</label><textarea id="desc-ed" value={reporte.descripcion} onChange={e=>cambiar({...reporte,descripcion:e.target.value})}/></div>;
}
