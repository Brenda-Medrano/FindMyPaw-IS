import type { PerroEnAdopcion } from '../model/adopcionTypes';
import type { Rol } from '../model/permisosAlbergue';
import { puedePublicarAdopcion } from '../model/permisosAlbergue';
import { validarPerro } from '../model/validarPerro';
export class AlberguePresenter {
  publicar(rol:Rol,perro:PerroEnAdopcion): {ok:boolean;mensaje:string}{
    if(!puedePublicarAdopcion(rol)) return {ok:false,mensaje:'Sin autorización'};
    const errores=validarPerro(perro);return errores.length?{ok:false,mensaje:errores.join(', ')}:{ok:true,mensaje:'Publicación lista'};
  }
}
