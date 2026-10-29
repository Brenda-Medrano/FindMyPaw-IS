import type { PerroEnAdopcion } from '../model/adopcionTypes';
export default function TarjetaAdopcion({perro}:{perro:PerroEnAdopcion}){
 return <article className="card"><h2>{perro.nombre}</h2><p>{perro.descripcion}</p><p>{perro.edad} · {perro.tamano}</p><strong>Requisitos: {perro.requisitos}</strong></article>;
}
