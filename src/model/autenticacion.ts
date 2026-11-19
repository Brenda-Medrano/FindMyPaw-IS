import type { Rol } from './permisosAlbergue';
export type Sesion = {
    id: string;
    rol: 'CIUDADANO';
} | {
    id: string;
    rol: 'ADMIN';
} | {
    id: string;
    rol: 'ALBERGUE';
    albergueId: string;
};
export function tienePermiso(sesion: Sesion | null, rol: Rol): boolean {
    return sesion?.rol === rol;
}
