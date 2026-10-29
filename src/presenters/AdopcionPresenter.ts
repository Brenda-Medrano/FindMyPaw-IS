import type { AdopcionRepository } from '../repositories/interfaces';
import type { SolicitudAdopcion } from '../model/adopcionTypes';
import { validarSolicitud,crearSolicitud } from '../model/validarSolicitud';
export class AdopcionPresenter {
 constructor(private repo:AdopcionRepository){}
 registrar(s:SolicitudAdopcion):{ok:boolean;mensaje:string}{
  const errores=validarSolicitud(s);if(errores.length)return {ok:false,mensaje:errores.join(', ')};
  this.repo.guardarSolicitud(crearSolicitud(s));return {ok:true,mensaje:'Solicitud enviada, estado Pendiente'};
 }
}
