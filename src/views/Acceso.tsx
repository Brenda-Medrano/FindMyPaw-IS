import {useState} from 'react';
import type {Rol} from '../model/permisosAlbergue';
import {crearSesionDemo,cerrarSesionDemo} from '../model/sesionDemo';
export default function Acceso(){
 const [rol,setRol]=useState<Rol>('CIUDADANO');const [sesion,setSesion]=useState<ReturnType<typeof crearSesionDemo>|null>(null);
 return <main><h1>Acceso de demostración</h1><p>Esta versión no usa autenticación real.</p><label htmlFor="rol">Rol</label><select id="rol" value={rol} onChange={e=>setRol(e.target.value as Rol)}><option value="CIUDADANO">Ciudadano</option><option value="ALBERGUE">Albergue</option><option value="ADMIN">Administrador</option></select><button onClick={()=>setSesion(crearSesionDemo(rol))}>Entrar</button>{sesion&&<section><p>Sesión de prueba: {sesion.rol}</p><button onClick={()=>setSesion(cerrarSesionDemo(sesion))}>Cerrar sesión</button></section>}</main>;
}
