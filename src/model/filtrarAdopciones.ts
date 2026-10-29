import type { PerroEnAdopcion } from './adopcionTypes';
export function disponibles(perros:PerroEnAdopcion[],tamano:PerroEnAdopcion['tamano']|''=''):PerroEnAdopcion[]{return perros.filter(p=>p.disponible&&(!tamano||p.tamano===tamano));}
