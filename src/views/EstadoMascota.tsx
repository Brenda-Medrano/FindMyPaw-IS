import type { EstadoReporte, TipoReporte } from '../model/types';
export default function EstadoMascota({estado,tipo}:{estado:EstadoReporte,tipo:TipoReporte}){
 const nombre=estado==='RESUELTO'?'Resuelto':tipo==='PERDIDO'?'Perdido':'Encontrado';
 const clase=estado==='RESUELTO'?'resuelto':tipo.toLowerCase();
 return <span className={'badge '+clase}>{nombre}</span>;
}
