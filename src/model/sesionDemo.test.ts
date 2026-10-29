import { crearSesionDemo } from './sesionDemo';
test('crea sesión solo con los roles definidos',()=>expect(crearSesionDemo('ALBERGUE').rol).toBe('ALBERGUE'));
