
import {
  afterEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';

import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import ReportarPerdida from './ReportarPerdida';
import ReportarHallazgo from './ReportarHallazgo';

import { reportePresenter } from '../presenters/services';

const DATOS_COMUNES = {
  especie: 'GATO',
  zona: 'Sarco',
  descripcion: 'Mascota de color blanco',
  fecha: '2020-10-20',
} as const;

const DATOS_PERDIDA = {
  nombre: 'Luna',
  foto: 'https://example.com/luna.jpg',
};

function completarCamposComunes() {
  fireEvent.change(
    screen.getByLabelText(/especie/i),
    {
      target: { value: DATOS_COMUNES.especie },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/zona aproximada/i),
    {
      target: { value: DATOS_COMUNES.zona },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/descripción/i),
    {
      target: { value: DATOS_COMUNES.descripcion },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/fecha/i),
    {
      target: { value: DATOS_COMUNES.fecha },
    }
  );
}

function completarCamposPerdida() {
  completarCamposComunes();

  fireEvent.change(
    screen.getByLabelText(/nombre/i),
    {
      target: { value: DATOS_PERDIDA.nombre },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/fotografía/i),
    {
      target: { value: DATOS_PERDIDA.foto },
    }
  );
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Formulario de pérdida', () => {
  test('requiere el nombre de la mascota', () => {
    render(<ReportarPerdida usuarioId="demo" />);

    const nombre =
      screen.getByLabelText<HTMLInputElement>(/nombre/i);

    expect(nombre.required).toBe(true);
  });

  test('requiere una fotografía', () => {
    render(<ReportarPerdida usuarioId="demo" />);

    const foto =
      screen.getByLabelText<HTMLInputElement>(/fotografía/i);

    expect(foto.required).toBe(true);
    expect(foto.type).toBe('url');
  });

  test('contiene todos los campos compartidos', () => {
    render(<ReportarPerdida usuarioId="demo" />);

    expect(screen.getByLabelText(/especie/i))
      .toBeTruthy();

    expect(screen.getByLabelText(/zona aproximada/i))
      .toBeTruthy();

    expect(screen.getByLabelText(/descripción/i))
      .toBeTruthy();

    expect(screen.getByLabelText(/fecha/i))
      .toBeTruthy();
  });

  test('envía los datos correctos al Presenter', async () => {
    const registrar = jest
      .spyOn(reportePresenter, 'registrar')
      .mockReturnValue({ ok: true });

    const user = userEvent.setup();

    render(<ReportarPerdida usuarioId="demo" />);

    completarCamposPerdida();

    await user.click(
      screen.getByRole('button', {
        name: /publicar pérdida/i,
      })
    );

    expect(registrar).toHaveBeenCalledTimes(1);

    expect(registrar).toHaveBeenCalledWith({
      autorId: 'demo',
      tipo: 'PERDIDO',
      ...DATOS_COMUNES,
      ...DATOS_PERDIDA,
    });

    expect(screen.getByRole('status').textContent)
      .toBe('Reporte creado. Pendiente de aprobación');
  });

  test('muestra los errores devueltos por el Presenter', async () => {
    jest
      .spyOn(reportePresenter, 'registrar')
      .mockReturnValue({
        ok: false,
        errores: {
          zona: 'Zona no válida',
        },
      });

    const user = userEvent.setup();

    render(<ReportarPerdida usuarioId="demo" />);

    completarCamposPerdida();

    await user.click(
      screen.getByRole('button', {
        name: /publicar pérdida/i,
      })
    );

    expect(screen.getByRole('status').textContent)
      .toBe('Zona no válida');
  });
});

describe('Formulario de hallazgo', () => {
  test('permite que el nombre sea opcional', () => {
    render(<ReportarHallazgo usuarioId="demo" />);

    const nombre =
      screen.getByLabelText<HTMLInputElement>(/nombre/i);

    expect(nombre.required).toBe(false);
  });

  test('no solicita una fotografía', () => {
    render(<ReportarHallazgo usuarioId="demo" />);

    expect(screen.queryByLabelText(/fotografía/i))
      .toBeNull();
  });

  test('contiene todos los campos compartidos', () => {
    render(<ReportarHallazgo usuarioId="demo" />);

    expect(screen.getByLabelText(/especie/i))
      .toBeTruthy();

    expect(screen.getByLabelText(/zona aproximada/i))
      .toBeTruthy();

    expect(screen.getByLabelText(/descripción/i))
      .toBeTruthy();

    expect(screen.getByLabelText(/fecha/i))
      .toBeTruthy();
  });

  test('registra un hallazgo sin nombre', async () => {
    const registrar = jest
      .spyOn(reportePresenter, 'registrar')
      .mockReturnValue({ ok: true });

    const user = userEvent.setup();

    render(<ReportarHallazgo usuarioId="demo" />);

    completarCamposComunes();

    await user.click(
      screen.getByRole('button', {
        name: /publicar hallazgo/i,
      })
    );

    expect(registrar).toHaveBeenCalledTimes(1);

    expect(registrar).toHaveBeenCalledWith({
      autorId: 'demo',
      tipo: 'ENCONTRADO',
      nombre: '',
      ...DATOS_COMUNES,
    });

    expect(screen.getByRole('status').textContent)
      .toBe('Hallazgo creado, pendiente de aprobación');
  });

  test('muestra los errores devueltos por el Presenter', async () => {
    jest
      .spyOn(reportePresenter, 'registrar')
      .mockReturnValue({
        ok: false,
        errores: {
          descripcion: 'Descripción no válida',
        },
      });

    const user = userEvent.setup();

    render(<ReportarHallazgo usuarioId="demo" />);

    completarCamposComunes();

    await user.click(
      screen.getByRole('button', {
        name: /publicar hallazgo/i,
      })
    );

    expect(screen.getByRole('status').textContent)
      .toBe('Descripción no válida');
  });
});

