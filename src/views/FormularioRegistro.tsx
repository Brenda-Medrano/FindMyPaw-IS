import { useState } from 'react';
import type { FormEvent } from 'react';
import { registroPresenter } from '../presenters/services';

interface Props { onVolver: () => void }

export default function FormularioRegistro({ onVolver }: Props) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (cargando) return;
    setMensaje('');
    setError('');
    if (clave !== confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setCargando(true);
    try {
      const resultado = await registroPresenter.registrar(correo, clave);
      if (resultado.ok) {
        setMensaje(resultado.mensaje);
        setClave('');
        setConfirmacion('');
      } else {
        setError(resultado.mensaje);
      }
    } catch {
      setError('No se pudo completar el registro.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="card">
      <h1>Crear cuenta</h1>
      <p>Regístrate para reportar mascotas y solicitar adopciones.</p>
      <form onSubmit={enviar}>
        <label htmlFor="registro-correo">Correo electrónico</label>
        <input id="registro-correo" type="email" autoComplete="email" required
          value={correo} onChange={e => setCorreo(e.target.value)} />
        <label htmlFor="registro-clave">Contraseña</label>
        <input id="registro-clave" type="password" autoComplete="new-password" required minLength={8}
          value={clave} onChange={e => setClave(e.target.value)} />
        <label htmlFor="registro-confirmacion">Confirmar contraseña</label>
        <input id="registro-confirmacion" type="password" autoComplete="new-password" required
          value={confirmacion} onChange={e => setConfirmacion(e.target.value)} />
        {error && <p role="alert">{error}</p>}
        {mensaje && <p role="status">{mensaje}</p>}
        <button type="submit" disabled={cargando || Boolean(mensaje)}>
          {cargando ? 'Registrando...' : 'Crear cuenta'}
        </button>
      </form>
      <button type="button" onClick={onVolver} disabled={cargando}>Volver a iniciar sesión</button>
    </main>
  );
}
