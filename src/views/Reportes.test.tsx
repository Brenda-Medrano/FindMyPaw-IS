import {render,screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Reportes from './Reportes';
import type { Reporte } from '../model/types';
const reporte:Reporte={id:'1',autorId:'u1',tipo:'PERDIDO',estado:'ACTIVO',moderacion:'APROBADO',especie:'PERRO',nombre:'Max',descripcion:'Perrito',zona:'Sarco',fecha:'2026-10-20'};
test('muestra estado perdido',()=>{render(<MemoryRouter><Reportes reportes={[reporte]}/></MemoryRouter>);expect(screen.getByText('Perdido')).toBeInTheDocument()});
test('renderiza lista persistida después de cargarla',()=>{
 render(<MemoryRouter><Reportes reportes={[reporte,{...reporte,id:'2',nombre:'Luna',tipo:'ENCONTRADO'}]}/></MemoryRouter>);
 expect(screen.getByText('Max')).toBeInTheDocument();
 expect(screen.getByText('Luna')).toBeInTheDocument();
});
