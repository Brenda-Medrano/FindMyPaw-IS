import type { PerroEnAdopcion,SolicitudAdopcion } from '../model/adopcionTypes';
import type { AdopcionRepository } from './interfaces';
const KEY_SOL='findmypaw_solicitudes_v1';
export class LocalAdopcionRepository implements AdopcionRepository {
 perros():PerroEnAdopcion[]{ return [
  {id:'p1',nombre:'Toby',albergueId:'demo',tamano:'PEQUEÑO',edad:'2 años',descripcion:'Cariñoso',disponible:true,requisitos:'Entrevista y compromiso de cuidado'},
  {id:'p2',nombre:'Mila',albergueId:'demo',tamano:'MEDIANO',edad:'1 año',descripcion:'Juguetona',disponible:true,requisitos:'Hogar seguro y tiempo disponible'},
  {id:'p3',nombre:'Rocky',albergueId:'demo',tamano:'GRANDE',edad:'3 años',descripcion:'Tranquilo',disponible:true,requisitos:'Espacio y evaluación del albergue'}]; }
 solicitudes():SolicitudAdopcion[]{ try{return JSON.parse(localStorage.getItem(KEY_SOL)||'[]') as SolicitudAdopcion[];}catch{return [];} }
 guardarSolicitud(s:SolicitudAdopcion):void{localStorage.setItem(KEY_SOL,JSON.stringify([...this.solicitudes(),s]));}
 actualizarSolicitud(s:SolicitudAdopcion):void{localStorage.setItem(KEY_SOL,JSON.stringify(this.solicitudes().map(x=>x.id===s.id?s:x)));}
}
