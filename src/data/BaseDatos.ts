export type Tabla = 'reportes' | 'mascotas' | 'solicitudes_adopcion';
export interface BaseDatos {
    listar<T extends {
        id: string;
    }>(tabla: Tabla): Promise<T[]>;
    insertar<T extends {
        id: string;
    }>(tabla: Tabla, dato: T): Promise<T>;
    actualizar<T extends {
        id: string;
    }>(tabla: Tabla, id: string, cambios: Partial<T>): Promise<T>;
}
