import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioRegistro from './FormularioRegistro';
import { registroPresenter } from '../presenters/services';

jest.mock('../presenters/services', () => ({ registroPresenter: { registrar: jest.fn() } }));
const registrar = registroPresenter.registrar as jest.Mock;

beforeEach(() => { registrar.mockReset(); });

test('muestra el error cuando el registro ya existe', async () => {
  registrar.mockResolvedValue({ ok: false, mensaje: 'Ya existe una cuenta registrada con este correo.' });
  const usuario = userEvent.setup();
  render(<FormularioRegistro onVolver={jest.fn()} />);
  await usuario.type(screen.getByLabelText('Correo electrónico'), 'nuevo@ejemplo.com');
  await usuario.type(screen.getByLabelText('Contraseña', { exact: true }), 'Clave12345');
  await usuario.type(screen.getByLabelText('Confirmar contraseña'), 'Clave12345');
  await usuario.click(screen.getByRole('button', { name: 'Crear cuenta' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Ya existe una cuenta');
});

test('no envía contraseñas que no coinciden', async () => {
  const usuario = userEvent.setup();
  render(<FormularioRegistro onVolver={jest.fn()} />);
  await usuario.type(screen.getByLabelText('Correo electrónico'), 'nuevo@ejemplo.com');
  await usuario.type(screen.getByLabelText('Contraseña', { exact: true }), 'Clave12345');
  await usuario.type(screen.getByLabelText('Confirmar contraseña'), 'Clave12346');
  await usuario.click(screen.getByRole('button', { name: 'Crear cuenta' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Las contraseñas no coinciden');
  expect(registrar).not.toHaveBeenCalled();
});

test('muestra confirmación de registro exitoso', async () => {
  registrar.mockResolvedValue({ ok: true, mensaje: 'Revisa tu correo para confirmar el registro.' });
  const usuario = userEvent.setup();
  render(<FormularioRegistro onVolver={jest.fn()} />);
  await usuario.type(screen.getByLabelText('Correo electrónico'), 'nuevo@ejemplo.com');
  await usuario.type(screen.getByLabelText('Contraseña', { exact: true }), 'Clave12345');
  await usuario.type(screen.getByLabelText('Confirmar contraseña'), 'Clave12345');
  await usuario.click(screen.getByRole('button', { name: 'Crear cuenta' }));
  expect(await screen.findByRole('status')).toHaveTextContent('Revisa tu correo');
});

test('permite volver al inicio de sesión', async () => {
  const usuario = userEvent.setup();
  const onVolver = jest.fn();
  render(<FormularioRegistro onVolver={onVolver} />);
  await usuario.click(screen.getByRole('button', { name: 'Volver a iniciar sesión' }));
  expect(onVolver).toHaveBeenCalledTimes(1);
});
