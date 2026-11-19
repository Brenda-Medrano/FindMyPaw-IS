import type { AdopcionRepository } from '../repositories/interfaces';
import type { SolicitudAdopcion } from '../model/adopcionTypes';
import { validarSolicitud,crearSolicitud } from '../model/validarSolicitud';
import { resolverSolicitud } from '../model/estadoSolicitud';
import type { PerroEnAdopcion } from '../model/adopcionTypes';

export class AdopcionPresenter {
    private repo: AdopcionRepository;

    constructor(repo: AdopcionRepository) {
    this.repo = repo;
    }

    listarPerros(): PerroEnAdopcion[] {
    return this.repo.perros();
    }

    buscarPerroPorId(id: string): PerroEnAdopcion | undefined {
    return this.listarPerros().find(
        perro => perro.id === id
    );
    }

    listarSolicitudes(): SolicitudAdopcion[] {
    return this.repo.solicitudes();
    }

    cambiarEstado(id:string,albergueId:string,estado:'APROBADA'|'RECHAZADA'):boolean{
    const s=this.repo.solicitudes().find(x=>x.id===id);
    if(!s || s.albergueId!==albergueId)return false;
    this.repo.actualizarSolicitud(resolverSolicitud(s,albergueId,estado));return true;
    }
    registrar(s:SolicitudAdopcion):{ok:boolean;mensaje:string}{
    const errores=validarSolicitud(s);if(errores.length)return {ok:false,mensaje:errores.join(', ')};
    this.repo.guardarSolicitud(crearSolicitud(s));return {ok:true,mensaje:'Solicitud enviada, estado Pendiente'};
    }
}
