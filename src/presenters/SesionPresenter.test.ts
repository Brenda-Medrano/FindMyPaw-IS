import { SesionPresenter } from './SesionPresenter';
import type { Sesion } from '../model/autenticacion';
const cuentas: Record<string, Sesion> = { usuario: { id: 'u1', rol: 'CIUDADANO' }, albergue: { id: 'a1', rol: 'ALBERGUE', albergueId: 'demo' }, admin: { id: 'ad1', rol: 'ADMIN' } };
function preparar() { let actual: Sesion | null = null; const auth = { iniciar: jest.fn(async (correo: string, clave: string) => { const cuenta = cuentas[correo.split('@')[0]]; if (!cuenta || clave !== 'prueba123')
        throw new Error('Correo o contraseña incorrectos.'); actual = cuenta; return cuenta; }), actual: jest.fn(async () => actual), cerrar: jest.fn(async () => { actual = null; }) }; return { auth, presenter: new SesionPresenter(auth) }; }
describe('SesionPresenter', () => {
    test.each(['usuario', 'albergue', 'admin'])('autentica %s', async (nombre) => { const { presenter } = preparar(); expect(await presenter.iniciarSesion(`${nombre}@findmypaw.test`, 'prueba123')).toEqual(cuentas[nombre]); });
    test.each([['', ''], ['correo-invalido', 'prueba123'], ['usuario@findmypaw.test', '']])('rechaza formato inválido %s', async (correo, clave) => { const { presenter, auth } = preparar(); await expect(presenter.iniciarSesion(correo, clave)).rejects.toThrow(); expect(auth.iniciar).not.toHaveBeenCalled(); });
    test.each([['usuario@findmypaw.test', 'incorrecta'], ['desconocido@findmypaw.test', 'prueba123']])('rechaza credenciales erróneas %s', async (correo, clave) => { await expect(preparar().presenter.iniciarSesion(correo, clave)).rejects.toThrow(); });
    test('normaliza el correo', async () => { const { presenter, auth } = preparar(); await presenter.iniciarSesion(' USUARIO@findmypaw.test ', 'prueba123'); expect(auth.iniciar).toHaveBeenCalledWith('usuario@findmypaw.test', 'prueba123'); });
    test('no incluye la clave', async () => { expect(await preparar().presenter.iniciarSesion('usuario@findmypaw.test', 'prueba123')).not.toHaveProperty('clave'); });
    test('permite acceder al rol correspondiente', () => { expect(preparar().presenter.puedeAcceder(cuentas.admin, 'ADMIN')).toBe(true); });
    test('impide acceder a otros roles', () => { const { presenter } = preparar(); expect(presenter.puedeAcceder(cuentas.usuario, 'ADMIN')).toBe(false); expect(presenter.puedeAcceder(cuentas.usuario, 'ALBERGUE')).toBe(false); });
    test('impide acceder sin sesión', () => { expect(preparar().presenter.puedeAcceder(null, 'ADMIN')).toBe(false); });
    test('recupera y cierra la sesión', async () => { const { presenter } = preparar(); await presenter.iniciarSesion('admin@findmypaw.test', 'prueba123'); expect(await presenter.recuperarSesion()).toEqual(cuentas.admin); expect(await presenter.cerrarSesion()).toBeNull(); expect(await presenter.recuperarSesion()).toBeNull(); });
});
