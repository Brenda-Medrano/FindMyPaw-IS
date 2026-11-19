
import { render, screen } from '@testing-library/react';

import SolicitarAdopcion from './SolicitarAdopcion';
import type { PerroEnAdopcion } from '../model/adopcionTypes';

const perro: PerroEnAdopcion = {
  id: 'p1',
  albergueId: 'demo',
  nombre: 'Toby',
  tamano: 'MEDIANO',
  edad: '2 años',
  descripcion: 'Cariñoso',
  disponible: true,
  requisitos: 'Entrevista previa',
};

describe('SolicitarAdopcion', () => {
  test('muestra requisitos antes del formulario', () => {
    render(
      <SolicitarAdopcion
        perro={perro}
        usuarioId="demo"
      />
    );

    expect(
      screen.getByText('Entrevista previa')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /enviar solicitud/i,
      })
    ).toBeInTheDocument();
  });
});
