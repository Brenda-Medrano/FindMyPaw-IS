import { render, screen } from '@testing-library/react';
import ReportarHallazgo from './ReportarHallazgo';
test('el nombre del animal encontrado es opcional', () => {
  render(<ReportarHallazgo/>);
  expect(screen.getByLabelText(/nombre \(opcional\)/i)).toBeInTheDocument();
});
