import { render,screen } from '@testing-library/react';
import DetalleReporte from './DetalleReporte';
import type { Reporte } from '../model/types';
const reporte:Reporte={id:'r1',autorId:'abc@mail.test',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',nombre:'Max',descripcion:'Cachorro',zona:'Sarco',fecha:'2026-10-20'};
test('detalle no revela el contacto del dueño',()=>{
 render(<DetalleReporte reporte={reporte}/>);
 expect(screen.queryByText('abc@mail.test')).not.toBeInTheDocument();
 expect(screen.getByText('Sarco')).toBeInTheDocument();
});
