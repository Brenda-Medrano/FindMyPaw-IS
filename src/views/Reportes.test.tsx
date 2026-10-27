import {render,screen} from '@testing-library/react';
import Reportes from './Reportes';
import type { Reporte } from '../model/types';
const reporte:Reporte={id:'1',autorId:'u1',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',nombre:'Max',descripcion:'Perrito',zona:'Sarco',fecha:'2026-10-20'};
test('muestra estado perdido',()=>{render(<Reportes reportes={[reporte]}/>);expect(screen.getByText('Perdido')).toBeInTheDocument()});
