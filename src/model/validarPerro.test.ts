import { validarPerro } from './validarPerro';
import type { PerroEnAdopcion } from './adopcionTypes';
const perro:PerroEnAdopcion={id:'p1',nombre:'',albergueId:'',tamano:'PEQUEÑO',edad:'2 años',descripcion:'',disponible:true,requisitos:''};
test('requiere nombre y albergue',()=>expect(validarPerro(perro)).toEqual(expect.arrayContaining(['Falta el nombre','Falta el albergue'])));
