import type { PerroEnAdopcion } from '../model/adopcionTypes';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, PawPrint } from 'lucide-react';

function imagenAdopcion(perro: PerroEnAdopcion) {
  if (perro.foto) return perro.foto;
  if (perro.id === 'p1') return '/pets/pet-max.png';
  if (perro.id === 'p2') return '/pets/pet-encontrado.png';
  return '/pets/pet-max.png';
}
export default function TarjetaAdopcion({ perro }: { perro: PerroEnAdopcion }) {
  return (
    <article className="card pet-card adoption-card">
      <Link to={`/adoptar/${perro.id}`} className="pet-card-image" aria-label={`Conocer a ${perro.nombre}`}>
        <img src={imagenAdopcion(perro)} alt={`Fotografía ilustrativa de ${perro.nombre}`} loading="lazy" />
        <span className="adoption-photo-badge"><Heart size={13} fill="currentColor"/> En adopción</span>
      </Link>
      <div className="pet-card-content">
        <div className="pet-card-heading"><h2>{perro.nombre}</h2><span className="adoption-heart"><Heart size={19}/></span></div>
        <p className="adoption-description">{perro.descripcion}</p>
        <div className="adoption-tags"><span><PawPrint size={15}/>{perro.tamano.toLowerCase()}</span><span>{perro.edad}</span></div>
        <div className="adoption-requirements"><strong>Para adoptarlo:</strong> {perro.requisitos}</div>
        <Link className="button adoption-button" to={`/adoptar/${perro.id}`}>Solicitar adopción <ArrowUpRight size={17}/></Link>
      </div>
    </article>
  );
}
