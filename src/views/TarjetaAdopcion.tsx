import type { PerroEnAdopcion } from '../model/adopcionTypes';
import { Link } from 'react-router-dom';
export default function TarjetaAdopcion({perro}:{perro:PerroEnAdopcion}){
 return <article className="card"><h2>{perro.nombre}</h2><p>{perro.descripcion}</p><p>{perro.edad} · {perro.tamano}</p><strong>Requisitos: {perro.requisitos}</strong><p><Link className="button" to={`/adoptar/${perro.id}`}>Solicitar adopción</Link></p></article>;
}
