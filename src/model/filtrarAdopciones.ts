import type { PerroEnAdopcion } from './adopcionTypes';
export function disponibles(perros:PerroEnAdopcion[]):PerroEnAdopcion[]{return perros.filter(p=>p.disponible);}
