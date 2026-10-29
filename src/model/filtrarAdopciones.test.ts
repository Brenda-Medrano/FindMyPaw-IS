import { disponibles } from './filtrarAdopciones';
import type { PerroEnAdopcion } from './adopcionTypes';
const p:PerroEnAdopcion={id:'p1',nombre:'Toby',albergueId:'a',tamano:'PEQUEÑO',edad:'1 año',descripcion:'Cariñoso',disponible:true,requisitos:'Entrevista'};
const perros=[p,{...p,id:'p2',disponible:false}];
test('lista únicamente perros disponibles',()=>expect(disponibles(perros)).toHaveLength(1));
