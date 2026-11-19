import type { Sesion } from '../model/autenticacion';
import { obtenerConexion } from './conexion';
export interface AutenticacionRemota {
    iniciar(correo: string, clave: string): Promise<Sesion>;
    actual(): Promise<Sesion | null>;
    cerrar(): Promise<void>;
}
export class SupabaseAutenticacion implements AutenticacionRemota {
    private async perfil(id: string): Promise<Sesion> {
        const { data, error } = await obtenerConexion().from('perfiles')
            .select('id,rol,albergueId').eq('id', id).single();
        if (error || !data)
            throw new Error('No se pudo consultar el perfil de la cuenta.');
        if (data.rol === 'ALBERGUE' && typeof data.albergueId === 'string') {
            return { id, rol: 'ALBERGUE', albergueId: data.albergueId };
        }
        if (data.rol === 'CIUDADANO' || data.rol === 'ADMIN')
            return { id, rol: data.rol };
        throw new Error('La cuenta no tiene un rol válido.');
    }
    async iniciar(correo: string, clave: string): Promise<Sesion> {
        const { data, error } = await obtenerConexion().auth.signInWithPassword({ email: correo, password: clave });
        if (error || !data.user) {
            if (error?.code === 'invalid_credentials' || error?.status === 400) {
                throw new Error('Correo o contraseña incorrectos.');
            }
            throw new Error('No se pudo iniciar sesión. Revisa la conexión.');
        }
        try {
            return await this.perfil(data.user.id);
        }
        catch (error) {
            await obtenerConexion().auth.signOut({ scope: 'local' });
            throw error;
        }
    }
    async actual(): Promise<Sesion | null> {
        const { data, error } = await obtenerConexion().auth.getSession();
        if (error)
            throw new Error('No se pudo recuperar la sesión.');
        return data.session ? this.perfil(data.session.user.id) : null;
    }
    async cerrar(): Promise<void> {
        const { error } = await obtenerConexion().auth.signOut({ scope: 'local' });
        if (error)
            throw new Error('No se pudo cerrar sesión. Intenta nuevamente.');
    }
}
