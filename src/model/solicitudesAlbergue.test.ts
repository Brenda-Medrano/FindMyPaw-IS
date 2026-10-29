import { solicitudesDelAlbergue } from './solicitudesAlbergue';
import type { SolicitudAdopcion } from './adopcionTypes';
const s:SolicitudAdopcion={id:'s1',perroId:'p1',albergueId:'a1',adoptanteId:'u1',nombre:'Ana',telefono:'700',vivienda:'Casa',motivo:'Adoptar',estado:'PENDIENTE'};
test('solo muestra solicitudes del albergue indicado',()=>expect(solicitudesDelAlbergue([s,{...s,id:'s2',albergueId:'a2'}],'a1')).toHaveLength(1));
