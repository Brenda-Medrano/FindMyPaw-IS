
import { render, screen } from '@testing-library/react';
import ReportarHallazgo from './ReportarHallazgo';

describe('ReportarHallazgo', () => {
  test('el nombre del animal encontrado es opcional', () => {
    render(<ReportarHallazgo usuarioId="demo" />);

    expect(
      screen.getByLabelText(/nombre \(opcional\)/i)
    ).toBeInTheDocument();
  });

  test('el formulario muestra descripción obligatoria', () => {
    render(<ReportarHallazgo usuarioId="demo" />);

    expect(
      screen.getByLabelText(/descripción/i)
    ).toBeRequired();
  });
});
