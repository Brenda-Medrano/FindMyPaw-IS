import type { BaseDatos, Tabla } from '../data/BaseDatos';
// Doble de pruebas: simula almacenamiento persistente entre repositorios.
export class BaseDatosMemoria implements BaseDatos {
    private tablas = new Map<Tabla, Map<string, {
        id: string;
    }>>();
    fallar = false;
    private tabla(nombre: Tabla) {
        if (this.fallar)
            throw new Error('Sin conexión');
        let tabla = this.tablas.get(nombre);
        if (!tabla) {
            tabla = new Map();
            this.tablas.set(nombre, tabla);
        }
        return tabla;
    }
    async listar<T extends {
        id: string;
    }>(nombre: Tabla): Promise<T[]> { return Array.from(this.tabla(nombre).values(), f => ({ ...f } as T)); }
    async insertar<T extends {
        id: string;
    }>(nombre: Tabla, dato: T): Promise<T> {
        const tabla = this.tabla(nombre);
        if (tabla.has(dato.id))
            throw new Error('Duplicado');
        tabla.set(dato.id, { ...dato });
        return { ...dato };
    }
    async actualizar<T extends {
        id: string;
    }>(nombre: Tabla, id: string, cambios: Partial<T>): Promise<T> {
        const tabla = this.tabla(nombre);
        const anterior = tabla.get(id);
        if (!anterior)
            throw new Error('No existe');
        const dato = { ...anterior, ...cambios, id } as T;
        tabla.set(id, dato);
        return { ...dato };
    }
}
