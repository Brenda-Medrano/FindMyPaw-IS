import type { BaseDatos, Tabla } from './BaseDatos';
import { obtenerConexion } from './conexion';
export class BaseDatosSupabase implements BaseDatos {
    async listar<T extends {
        id: string;
    }>(tabla: Tabla): Promise<T[]> {
        const filas: T[] = [];
        const pagina = 100;
        for (let desde = 0;; desde += pagina) {
            const { data, error } = await obtenerConexion().from(tabla)
                .select('*').order('id').range(desde, desde + pagina - 1);
            if (error)
                throw new Error('No se pudieron consultar los datos. Revisa la conexión o los permisos.');
            const lote = (data ?? []) as unknown as T[];
            filas.push(...lote);
            if (lote.length < pagina)
                return filas;
        }
    }
    async insertar<T extends {
        id: string;
    }>(tabla: Tabla, dato: T): Promise<T> {
        const { data, error } = await obtenerConexion().from(tabla)
            .insert(dato).select().single();
        if (error || !data)
            throw new Error('No se pudo guardar el registro. Revisa la conexión o los permisos.');
        return data as unknown as T;
    }
    async actualizar<T extends {
        id: string;
    }>(tabla: Tabla, id: string, cambios: Partial<T>): Promise<T> {
        const { data, error } = await obtenerConexion().from(tabla)
            .update(cambios).eq('id', id).select().single();
        if (error || !data)
            throw new Error('No se pudo actualizar el registro. Revisa la conexión o los permisos.');
        return data as unknown as T;
    }
}
