import { useState } from 'react';
import type { PerroEnAdopcion } from '../model/adopcionTypes';
export default function PublicarPerro({guardar}:{guardar:(p:PerroEnAdopcion)=>void}){
 const [nombre,setNombre]=useState('');const [tamano,setTamano]=useState<PerroEnAdopcion['tamano']>('MEDIANO');
 return <form onSubmit={e=>{e.preventDefault();guardar({id:String(Date.now()),nombre,albergueId:'demo',tamano,edad:'',descripcion:'',disponible:true,requisitos:'Entrevista de adopción'})}}><h2>Publicar perro en adopción</h2><label htmlFor="nombre-p">Nombre *</label><input id="nombre-p" required value={nombre} onChange={e=>setNombre(e.target.value)}/><label htmlFor="talla">Tamaño</label><select id="talla" value={tamano} onChange={e=>setTamano(e.target.value as PerroEnAdopcion['tamano'])}><option value="PEQUEÑO">Pequeño</option><option value="MEDIANO">Mediano</option><option value="GRANDE">Grande</option></select><button>Publicar</button></form>;
}
