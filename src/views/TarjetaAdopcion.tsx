
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, PawPrint } from 'lucide-react';

import type { PerroEnAdopcion } from '../model/adopcionTypes';
import { obtenerImagenAdopcion } from '../utils/imagenesMascotas';

interface TarjetaAdopcionProps {
  perro: PerroEnAdopcion;
}

export default function TarjetaAdopcion({
  perro,
}: TarjetaAdopcionProps) {
  return (
    <article className="card pet-card adoption-card">
      <Link
        to={`/adoptar/${perro.id}`}
        className="pet-card-image"
        aria-label={`Conocer a ${perro.nombre}`}
      >
        <img
          src={obtenerImagenAdopcion(perro)}
          alt={`Fotografía ilustrativa de ${perro.nombre}`}
          loading="lazy"
        />

        <span className="adoption-photo-badge">
          <Heart size={13} fill="currentColor" />
          En adopción
        </span>
      </Link>

      <div className="pet-card-content">
        <div className="pet-card-heading">
          <h2>{perro.nombre}</h2>

          <span className="adoption-heart">
            <Heart size={19} />
          </span>
        </div>

        <p className="adoption-description">
          {perro.descripcion}
        </p>

        <div className="adoption-tags">
          <span>
            <PawPrint size={15} />
            {perro.tamano.toLowerCase()}
          </span>

          <span>{perro.edad}</span>
        </div>

        <div className="adoption-requirements">
          <strong>Para adoptarlo:</strong>
          {' '}{perro.requisitos}
        </div>

        <Link
          className="button adoption-button"
          to={`/adoptar/${perro.id}`}
        >
          Solicitar adopción
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}