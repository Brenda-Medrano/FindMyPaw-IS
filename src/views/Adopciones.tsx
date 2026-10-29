import { useState } from 'react';
import type { PerroEnAdopcion } from '../model/adopcionTypes';
import { disponibles } from '../model/filtrarAdopciones';
export default function Adopciones({perros}:{perros:PerroEnAdopcion[]}){
 const [talla,setTalla]=useState<PerroEnAdopcion['tamano']|''>('');
 return <main><h1>Perros en adopción</h1><label htmlFor="talla-f">Tamaño</label><select id="talla-f" value={talla} onChange={e=>setTalla(e.target.value as typeof talla)}><option value="">Todos</option><option value="PEQUEÑO">Pequeño</option><option value="MEDIANO">Mediano</option><option value="GRANDE">Grande</option></select><div className="grid">{disponibles(perros,talla).map(p=><article className="card" key={p.id}><h2>{p.nombre}</h2><p>{p.descripcion}</p><p>{p.edad} · {p.tamano}</p><strong>Requisitos: {p.requisitos}</strong></article>)}</div></main>;
}
