import { useState } from 'react';
import { Heart, SlidersHorizontal } from 'lucide-react';
import type { PerroEnAdopcion } from '../model/adopcionTypes';
import { disponibles } from '../model/filtrarAdopciones';
import TarjetaAdopcion from './TarjetaAdopcion';

export default function Adopciones({ perros }: { perros: PerroEnAdopcion[] }) {
  const [talla, setTalla] = useState<PerroEnAdopcion['tamano'] | ''>('');
  const lista = disponibles(perros, talla);
  return (
    <main className="listing-page">
      <header className="page-intro">
        <div className="page-intro-icon"><Heart size={25} fill="currentColor"/></div>
        <span className="section-kicker">ADOPCIÓN RESPONSABLE EN COCHABAMBA</span>
        <h1>Conoce a tu nuevo <em>mejor amigo.</em></h1>
        <p>Estos perritos esperan una familia. Conoce sus historias y los requisitos para recibirlos con mucho amor.</p>
      </header>
      <div className="listing-toolbar">
        <span className="results-count">{lista.length} {lista.length === 1 ? 'perrito disponible' : 'perritos disponibles'}</span>
        <div className="filter-control"><SlidersHorizontal size={18}/><label htmlFor="talla-f">Tamaño</label><select id="talla-f" value={talla} onChange={e => setTalla(e.target.value as typeof talla)}><option value="">Todos</option><option value="PEQUEÑO">Pequeño</option><option value="MEDIANO">Mediano</option><option value="GRANDE">Grande</option></select></div>
      </div>
      {lista.length ? <div className="grid pet-grid">{lista.map(p => <TarjetaAdopcion key={p.id} perro={p}/>)}</div> : <div className="empty-state"><p>No hay perros disponibles con este tamaño.</p><button type="button" onClick={() => setTalla('')}>Ver todos</button></div>}
    </main>
  );
}
