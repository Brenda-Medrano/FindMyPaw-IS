import type { SupabaseClient } from '@supabase/supabase-js';
let conexion: SupabaseClient | undefined;
export function configurarConexion(cliente: SupabaseClient): void {
    conexion = cliente;
}
export function obtenerConexion(): SupabaseClient {
    if (!conexion)
        throw new Error('La conexión con Supabase no está configurada.');
    return conexion;
}
