
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Buscar from './Buscar';


test('se pueden limpiar los filtros', async () => {
  const user = userEvent.setup();

  render(<Buscar reportes={[]} />);

  const botonLimpiar = screen.getByRole('button', {
    name: /limpiar filtros/i,
  });

  expect(botonLimpiar).toBeInTheDocument();

  await user.click(botonLimpiar);

  expect(
    screen.getByText(/no hay reportes/i)
  ).toBeInTheDocument();
});
