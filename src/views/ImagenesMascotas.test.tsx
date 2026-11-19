
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Reportes from './Reportes';
import DetalleReporte from './DetalleReporte';
import TarjetaAdopcion from './TarjetaAdopcion';

import type { Reporte } from '../model/types';
import type { PerroEnAdopcion } from '../model/adopcionTypes';

const reporte: Reporte = {
  id: 'r1',
  autorId: 'u1',
  tipo: 'PERDIDO',
  estado: 'ACTIVO',
  moderacion: 'APROBADO',
  especie: 'PERRO',
  nombre: 'Max',
  zona: 'Sarco',
  descripcion: 'Mascota perdida',
  fecha: '2026-10-20',
};

const perro: PerroEnAdopcion = {
  id: 'p2',
  nombre: 'Rocky',
  albergueId: 'a1',
  tamano: 'MEDIANO',
  edad: '2 años',
  descripcion: 'Perro en adopción',
  disponible: true,
  requisitos: 'Tener un hogar seguro',
};

describe('Fotografías de mascotas en las vistas', () => {
  test('Reportes muestra la fotografía registrada por el usuario', () => {
    render(
      <MemoryRouter>
        <Reportes
          reportes={[
            { ...reporte, foto: '/foto-personalizada.png' },
          ]}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/foto-personalizada.png'
    );
  });

  test('Reportes muestra una imagen predeterminada para gatos', () => {
    render(
      <MemoryRouter>
        <Reportes
          reportes={[{ ...reporte, especie: 'GATO' }]}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/pets/pet-luna.png'
    );
  });

  test('DetalleReporte utiliza la misma imagen predeterminada que Reportes', () => {
    render(<DetalleReporte reporte={reporte} />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/pets/pet-max.png'
    );
  });

  test('DetalleReporte respeta la fotografía del usuario', () => {
    render(
      <DetalleReporte
        reporte={{ ...reporte, foto: '/foto-reporte.png' }}
      />
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/foto-reporte.png'
    );
  });

  test('TarjetaAdopcion no depende del ID para seleccionar la imagen', () => {
    const { rerender } = render(
      <MemoryRouter>
        <TarjetaAdopcion perro={perro} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/pets/pet-max.png'
    );

    rerender(
      <MemoryRouter>
        <TarjetaAdopcion
          perro={{ ...perro, id: 'perro-nuevo' }}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/pets/pet-max.png'
    );
  });

  test('TarjetaAdopcion prioriza la fotografía registrada', () => {
    render(
      <MemoryRouter>
        <TarjetaAdopcion
          perro={{ ...perro, foto: '/foto-adopcion.png' }}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/foto-adopcion.png'
    );
  });
});
