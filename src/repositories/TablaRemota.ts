import type { BaseDatos, Tabla } from '../data/BaseDatos';
// La caché solo existe en memoria. Las escrituras se confirman primero en PostgreSQL.
export class TablaRemota<T extends {
    id: string;
}> {
    private datos: T[] = [];
    private version = 0;
    private readonly db: BaseDatos;
    private readonly tabla: Tabla;
    constructor(db: BaseDatos, tabla: Tabla) {
        this.db = db;
        this.tabla = tabla;
    }
    listar(): T[] {
        return this.datos.map(dato => ({ ...dato }));
    }
    limpiar(): void {
        this.version++;
        this.datos = [];
    }
    async cargar(): Promise<void> {
        const version = this.version;
        const datos = await this.db.listar<T>(this.tabla);
        if (version === this.version)
            this.datos = datos.map(dato => ({ ...dato }));
    }
    async guardar(dato: T): Promise<void> {
        const version = this.version;
        const confirmado = await this.db.insertar<T>(this.tabla, dato);
        if (version === this.version)
            this.reemplazar(confirmado);
    }
    async actualizar(id: string, cambios: Partial<T>): Promise<void> {
        const version = this.version;
        const confirmado = await this.db.actualizar<T>(this.tabla, id, cambios);
        if (version === this.version)
            this.reemplazar(confirmado);
    }
    private reemplazar(dato: T): void {
        this.datos = [...this.datos.filter(actual => actual.id !== dato.id), { ...dato }];
    }
}
