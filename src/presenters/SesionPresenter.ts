import type { Rol } from '../model/permisosAlbergue';
import type { Sesion } from '../model/autenticacion';
import { tienePermiso } from '../model/autenticacion';
import type { AutenticacionRemota } from '../data/AutenticacionRemota';
export class SesionPresenter {
    private readonly auth: AutenticacionRemota;
    constructor(auth: AutenticacionRemota) { this.auth = auth; }
    async iniciarSesion(correo: string, clave: string): Promise<Sesion> {
        const normalizado = correo.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizado) || !clave) {
            throw new Error('Correo o contraseña incorrectos.');
        }
        return this.auth.iniciar(normalizado, clave);
    }
    recuperarSesion(): Promise<Sesion | null> { return this.auth.actual(); }
    puedeAcceder(sesion: Sesion | null, rol: Rol): boolean { return tienePermiso(sesion, rol); }
    async cerrarSesion(): Promise<null> { await this.auth.cerrar(); return null; }
}
