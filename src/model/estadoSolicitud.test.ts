import { resolverSolicitud } from './estadoSolicitud';
import type { SolicitudAdopcion } from './adopcionTypes';
const s:SolicitudAdopcion={id:'s1',perroId:'p1',albergueId:'a1',adoptanteId:'u1',nombre:'Ana',telefono:'700',vivienda:'Casa',motivo:'Adoptar',estado:'PENDIENTE'};
test('un albergue puede aprobar su solicitud',()=>expect(resolverSolicitud(s,'a1','APROBADA').estado).toBe('APROBADA'));
test('otro albergue no puede resolverla',()=>expect(()=>resolverSolicitud(s,'otro','RECHAZADA')).toThrow());
