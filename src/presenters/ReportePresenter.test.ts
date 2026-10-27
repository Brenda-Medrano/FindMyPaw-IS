import { ReportePresenter } from './ReportePresenter';
import type { Reporte } from '../model/types';
const repo = { listar:jest.fn<Reporte[], []>(()=>[]), guardar:jest.fn(), actualizar:jest.fn() };
beforeEach(()=>jest.clearAllMocks());
test('rechaza un reporte inválido sin guardar',()=>{
 const presenter = new ReportePresenter(repo);
 const r = presenter.registrar({autorId:'u1',tipo:'ENCONTRADO',especie:'PERRO',fecha:'2026-10-20',zona:'',descripcion:''});
 expect(r.ok).toBe(false);expect(repo.guardar).not.toHaveBeenCalled();
});
test('guarda reporte válido',()=>{
 const presenter = new ReportePresenter(repo);
 const r=presenter.registrar({autorId:'u1',tipo:'ENCONTRADO',especie:'GATO',fecha:'2026-10-20',zona:'Cala Cala',descripcion:'Gatito blanco'});
 expect(r.ok).toBe(true);expect(repo.guardar).toHaveBeenCalledTimes(1);
});
