import { crearSesionDemo } from './sesionDemo';
test('crea sesión solo con los roles definidos',()=>expect(crearSesionDemo('ALBERGUE').rol).toBe('ALBERGUE'));
test('cerrar sesión borra el usuario actual',()=>{
 const { cerrarSesionDemo } = require('./sesionDemo');
 expect(cerrarSesionDemo(crearSesionDemo('CIUDADANO'))).toBeNull();
});
