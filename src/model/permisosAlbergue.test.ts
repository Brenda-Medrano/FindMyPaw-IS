import { puedePublicarAdopcion } from './permisosAlbergue';
test('ciudadano no publica perros del albergue',()=>expect(puedePublicarAdopcion('CIUDADANO')).toBe(false));
test('albergue sí publica',()=>expect(puedePublicarAdopcion('ALBERGUE')).toBe(true));
