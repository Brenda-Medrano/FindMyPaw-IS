
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
jest.mock('./styles.css', () => ({}));
import {
  MemoryRouter,
  Link,
} from 'react-router-dom';

import { AppRoutes } from './App';

function renderizar(ruta = '/acceso') {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Link to="/admin">
        Probar acceso a administración
      </Link>

      <Link to="/albergue">
        Probar acceso a albergue
      </Link>

      <AppRoutes />
    </MemoryRouter>
  );
}

function iniciarSesion(
  correo: string,
  clave: string
) {
  fireEvent.change(
    screen.getByLabelText('Correo electrónico'),
    {
      target: { value: correo },
    }
  );

  fireEvent.change(
    screen.getByLabelText('Contraseña'),
    {
      target: { value: clave },
    }
  );

  fireEvent.click(
    screen.getByRole('button', {
      name: 'Iniciar sesión',
    })
  );
}

describe('Inicio de sesión por roles', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test.each([
    [
      'usuario@findmypaw.test',
      'Usuario123',
      'Mis publicaciones',
    ],
    [
      'albergue@findmypaw.test',
      'Albergue123',
      'Solicitudes del albergue',
    ],
    [
      'admin@findmypaw.test',
      'Admin123',
      'Moderación de reportes',
    ],
  ])(
    'redirige la cuenta %s al panel correspondiente',
    (correo, clave, titulo) => {
      renderizar();

      iniciarSesion(correo, clave);

      expect(
        screen.getByRole('heading', {
          name: titulo,
        })
      ).toBeInTheDocument();
    }
  );

  test('muestra un error ante credenciales incorrectas', () => {
    renderizar();

    iniciarSesion(
      'usuario@findmypaw.test',
      'incorrecta'
    );

    expect(
      screen.getByRole('alert')
    ).toHaveTextContent(
      'Correo o contraseña incorrectos.'
    );
  });

  test('redirige al acceso si no existe una sesión', () => {
    renderizar('/admin');

    expect(
      screen.getByRole('heading', {
        name: 'Iniciar sesión',
      })
    ).toBeInTheDocument();
  });

  test('impide al ciudadano acceder a administración', () => {
    renderizar();

    iniciarSesion(
      'usuario@findmypaw.test',
      'Usuario123'
    );

    fireEvent.click(
      screen.getByRole('link', {
        name: 'Probar acceso a administración',
      })
    );

    expect(
      screen.getByRole('alert')
    ).toHaveTextContent(
      'No tienes permiso para acceder.'
    );
  });

  test('impide al ciudadano acceder al panel del albergue', () => {
    renderizar();

    iniciarSesion(
      'usuario@findmypaw.test',
      'Usuario123'
    );

    fireEvent.click(
      screen.getByRole('link', {
        name: 'Probar acceso a albergue',
      })
    );

    expect(
      screen.getByRole('alert')
    ).toHaveTextContent(
      'No tienes permiso para acceder.'
    );
  });

  test('permite cerrar sesión desde el menú', () => {
    renderizar();

    iniciarSesion(
      'admin@findmypaw.test',
      'Admin123'
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Abrir menú',
      })
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Cerrar sesión',
      })
    );

    expect(
      screen.getByRole('heading', {
        name: 'Iniciar sesión',
      })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('link', {
        name: 'Probar acceso a administración',
      })
    );

    expect(
      screen.getByRole('heading', {
        name: 'Iniciar sesión',
      })
    ).toBeInTheDocument();
  });
});
