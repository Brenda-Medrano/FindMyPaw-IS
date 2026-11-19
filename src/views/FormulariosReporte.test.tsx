import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReportarPerdida from './ReportarPerdida';
import ReportarHallazgo from './ReportarHallazgo';
import { reportePresenter } from '../presenters/services';
const COMUNES = { especie: 'GATO', zona: 'Sarco', descripcion: 'Mascota de color blanco', fecha: '2020-10-20' } as const;
const PERDIDA = { nombre: 'Luna', foto: 'https://example.com/luna.jpg' };
function completar(perdida: boolean) { for (const [label, value] of [[/especie/i, COMUNES.especie], [/zona aproximada/i, COMUNES.zona], [/descripción/i, COMUNES.descripcion], [/fecha/i, COMUNES.fecha]] as const)
    fireEvent.change(screen.getByLabelText(label), { target: { value } }); if (perdida) {
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: PERDIDA.nombre } });
    fireEvent.change(screen.getByLabelText(/fotografía/i), { target: { value: PERDIDA.foto } });
} }
afterEach(() => jest.restoreAllMocks());
describe('Formulario de pérdida', () => {
    test('requiere el nombre', () => { render(<ReportarPerdida usuarioId="u1"/>); expect(screen.getByLabelText(/nombre/i)).toBeRequired(); });
    test('requiere fotografía URL', () => { render(<ReportarPerdida usuarioId="u1"/>); const foto = screen.getByLabelText(/fotografía/i); expect(foto).toBeRequired(); expect(foto).toHaveAttribute('type', 'url'); });
    test('contiene los campos compartidos', () => { render(<ReportarPerdida usuarioId="u1"/>); for (const label of [/especie/i, /zona aproximada/i, /descripción/i, /fecha/i])
        expect(screen.getByLabelText(label)).toBeInTheDocument(); });
    test('envía los datos correctos al Presenter', async () => { const registrar = jest.spyOn(reportePresenter, 'registrar').mockResolvedValue({ ok: true }); render(<ReportarPerdida usuarioId="u1"/>); completar(true); await userEvent.setup().click(screen.getByRole('button', { name: /publicar pérdida/i })); expect(registrar).toHaveBeenCalledTimes(1); expect(registrar).toHaveBeenCalledWith({ autorId: 'u1', tipo: 'PERDIDO', ...COMUNES, ...PERDIDA }); expect(await screen.findByRole('status')).toHaveTextContent('Reporte creado. Pendiente de aprobación'); });
    test('muestra errores de validación', async () => { jest.spyOn(reportePresenter, 'registrar').mockResolvedValue({ ok: false, errores: { zona: 'Zona no válida' } }); render(<ReportarPerdida usuarioId="u1"/>); completar(true); await userEvent.setup().click(screen.getByRole('button', { name: /publicar pérdida/i })); expect(await screen.findByRole('status')).toHaveTextContent('Zona no válida'); });
});
describe('Formulario de hallazgo', () => {
    test('permite nombre opcional', () => { render(<ReportarHallazgo usuarioId="u1"/>); expect(screen.getByLabelText(/nombre/i)).not.toBeRequired(); });
    test('no solicita fotografía', () => { render(<ReportarHallazgo usuarioId="u1"/>); expect(screen.queryByLabelText(/fotografía/i)).not.toBeInTheDocument(); });
    test('contiene los campos compartidos', () => { render(<ReportarHallazgo usuarioId="u1"/>); for (const label of [/especie/i, /zona aproximada/i, /descripción/i, /fecha/i])
        expect(screen.getByLabelText(label)).toBeInTheDocument(); });
    test('registra un hallazgo sin nombre', async () => { const registrar = jest.spyOn(reportePresenter, 'registrar').mockResolvedValue({ ok: true }); render(<ReportarHallazgo usuarioId="u1"/>); completar(false); await userEvent.setup().click(screen.getByRole('button', { name: /publicar hallazgo/i })); expect(registrar).toHaveBeenCalledTimes(1); expect(registrar).toHaveBeenCalledWith({ autorId: 'u1', tipo: 'ENCONTRADO', nombre: '', ...COMUNES }); expect(await screen.findByRole('status')).toHaveTextContent('Hallazgo creado, pendiente de aprobación'); });
    test('muestra los errores de validación', async () => { jest.spyOn(reportePresenter, 'registrar').mockResolvedValue({ ok: false, errores: { zona: 'Zona no válida' } }); render(<ReportarHallazgo usuarioId="u1"/>); completar(false); await userEvent.setup().click(screen.getByRole('button', { name: /publicar hallazgo/i })); expect(await screen.findByRole('status')).toHaveTextContent('Zona no válida'); });
    test('muestra error de conexión sin confirmar el guardado', async () => { jest.spyOn(reportePresenter, 'registrar').mockRejectedValue(new Error('Sin conexión')); render(<ReportarHallazgo usuarioId="u1"/>); completar(false); await userEvent.setup().click(screen.getByRole('button', { name: /publicar hallazgo/i })); expect(await screen.findByRole('alert')).toHaveTextContent('Sin conexión'); expect(screen.queryByRole('status')).not.toBeInTheDocument(); });
});
