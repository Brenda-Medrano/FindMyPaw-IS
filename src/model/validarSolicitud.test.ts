import { validarSolicitud } from './validarSolicitud';
import type { SolicitudAdopcion } from './adopcionTypes';
const solicitud:SolicitudAdopcion={id:'s1',perroId:'p1',albergueId:'a1',adoptanteId:'u1',nombre:'',telefono:'',vivienda:'',motivo:'',estado:'PENDIENTE'};
test('exige nombre, teléfono y vivienda',()=>expect(validarSolicitud(solicitud)).toHaveLength(3));
