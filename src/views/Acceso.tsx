
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Sesion } from '../model/autenticacion';
import type { Rol } from '../model/permisosAlbergue';
import { sesionPresenter } from '../presenters/services';

interface AccesoProps {
  sesion: Sesion | null;
  onSesion: (sesion: Sesion) => void;
}

const DESTINOS: Record<Rol, string> = {
  CIUDADANO: '/mis-reportes',
  ALBERGUE: '/albergue',
  ADMIN: '/admin',
};

export default function Acceso({
  sesion,
  onSesion,
}: AccesoProps) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function iniciarSesion(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError('');

    const resultado = sesionPresenter.iniciarSesion(
      correo,
      clave
    );

    if (!resultado) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    setClave('');
    onSesion(resultado);

    navigate(DESTINOS[resultado.rol], {
      replace: true,
    });
  }

  if (sesion) {
    return (
      <main className="card">
        <h1>Sesión activa</h1>
        <p>Rol: {sesion.rol}</p>

        <button onClick={() => navigate(DESTINOS[sesion.rol])}>
          Ir a mi panel
        </button>
      </main>
    );
  }

  return (
    <main className="card">
      <h1>Iniciar sesión</h1>
      <p>Accede a tu cuenta de FindMyPaw.</p>

      <form onSubmit={iniciarSesion} noValidate>
        <label htmlFor="correo">
          Correo electrónico
        </label>

        <input
          id="correo"
          type="email"
          autoComplete="username"
          value={correo}
          required
          onChange={e => setCorreo(e.target.value)}
        />

        <label htmlFor="clave">
          Contraseña
        </label>

        <input
          id="clave"
          type="password"
          autoComplete="current-password"
          value={clave}
          required
          onChange={e => setClave(e.target.value)}
        />

        {error && (
          <p role="alert">{error}</p>
        )}

        <button type="submit">
          Iniciar sesión
        </button>
      </form>
    </main>
  );
}
