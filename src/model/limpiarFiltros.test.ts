import { FILTROS_LIMPIOS } from './Filtros';
test('un reinicio de filtros vacía todos los campos',()=>expect(Object.values(FILTROS_LIMPIOS).every(x=>x==='')).toBe(true));
