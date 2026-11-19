import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Link } from 'react-router-dom';
import { AppRoutes } from './App';
import type { Sesion } from './model/autenticacion';
import { sesionPresenter } from './presenters/services';
jest.mock('./styles.css', () => ({}));
jest.mock('./presenters/services', () => ({
    sesionPresenter: { recuperarSesion: jest.fn(), iniciarSesion: jest.fn(), cerrarSesion: jest.fn(), puedeAcceder: (s: Sesion | null, r: string) => s?.rol === r },
    cargarDatos: jest.fn(async () => undefined), limpiarDatos: jest.fn(),
    reportePresenter: { listarPorAutor: () => [], listarTodos: () => [], listarPublicos: () => [] },
    adopcionPresenter: { listarSolicitudesPorAlbergue: () => [], listarPerros: () => [] },
    mascotaPresenter: { listarPorAlbergue: () => [] },
}));
const cuentas: Record<string, Sesion> = { usuario: { id: 'u1', rol: 'CIUDADANO' }, albergue: { id: 'a1', rol: 'ALBERGUE', albergueId: 'demo' }, admin: { id: 'ad1', rol: 'ADMIN' } };
beforeEach(() => { jest.clearAllMocks(); jest.mocked(sesionPresenter.recuperarSesion).mockResolvedValue(null); jest.mocked(sesionPresenter.cerrarSesion).mockResolvedValue(null); jest.mocked(sesionPresenter.iniciarSesion).mockImplementation(async (correo, clave) => { const sesion = cuentas[correo.split('@')[0]]; if (!sesion || clave !== 'prueba123')
    throw new Error('Correo o contraseña incorrectos.'); return sesion; }); });
function abrir(ruta = '/acceso') { render(<MemoryRouter initialEntries={[ruta]}><Link to="/admin">Probar administración</Link><Link to="/albergue">Probar albergue</Link><AppRoutes /></MemoryRouter>); }
async function iniciar(nombre: string, clave = 'prueba123') { fireEvent.change(await screen.findByLabelText('Correo electrónico'), { target: { value: `${nombre}@findmypaw.test` } }); fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: clave } }); fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' })); }
describe('Inicio de sesión remoto', () => {
    test.each([['usuario', 'Mis publicaciones'], ['albergue', 'Solicitudes del albergue'], ['admin', 'Moderación de reportes']])('redirige %s a su panel', async (nombre, titulo) => { abrir(); await iniciar(nombre); expect(await screen.findByRole('heading', { name: titulo })).toBeInTheDocument(); });
    test('muestra credenciales incorrectas', async () => { abrir(); await iniciar('usuario', 'mal'); expect(await screen.findByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.'); });
    test('redirige sin sesión', async () => { abrir('/admin'); expect(await screen.findByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument(); });
    test.each(['Probar administración', 'Probar albergue'])('impide acceso ciudadano a %s', async (enlace) => { abrir(); await iniciar('usuario'); await screen.findByRole('heading', { name: 'Mis publicaciones' }); fireEvent.click(screen.getByRole('link', { name: enlace })); expect(await screen.findByRole('alert')).toHaveTextContent('No tienes permiso para acceder.'); });
    test('cierra sesión', async () => { abrir(); await iniciar('admin'); await screen.findByRole('heading', { name: 'Moderación de reportes' }); fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' })); fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' })); expect(await screen.findByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument(); });
    test('recupera sesión al recargar', async () => { jest.mocked(sesionPresenter.recuperarSesion).mockResolvedValueOnce(cuentas.admin); abrir('/admin'); expect(await screen.findByRole('heading', { name: 'Moderación de reportes' })).toBeInTheDocument(); });
    test('muestra error de conexión inicial', async () => { jest.mocked(sesionPresenter.recuperarSesion).mockRejectedValueOnce(new Error('Sin conexión')); abrir(); expect(await screen.findByRole('heading', { name: 'Error de conexión' })).toBeInTheDocument(); expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument(); });
});
