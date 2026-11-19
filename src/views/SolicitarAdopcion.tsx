
import { useState } from 'react';
import type { FormEvent } from 'react';

import type {
  PerroEnAdopcion,
  SolicitudAdopcion,
} from '../model/adopcionTypes';

import { adopcionPresenter } from '../presenters/services';

interface SolicitarAdopcionProps {
  perro: PerroEnAdopcion;
  usuarioId: string;
}

export default function SolicitarAdopcion({
  perro,
  usuarioId,
}: SolicitarAdopcionProps) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [vivienda, setVivienda] = useState('');
  const [mensaje, setMensaje] = useState('');

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const solicitud: SolicitudAdopcion = {
      id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
      perroId: perro.id,
      albergueId: perro.albergueId,
      adoptanteId: usuarioId,
      nombre,
      telefono,
      vivienda,
      motivo: 'Deseo adoptar',
      estado: 'PENDIENTE',
    };

    const resultado = adopcionPresenter.registrar(solicitud);

    setMensaje(resultado.mensaje);
  }

  return (
    <main>
      <h1>Solicitar adopción de {perro.nombre}</h1>

      <aside className="card">
        <h2>Antes de solicitar</h2>
        <p>{perro.requisitos}</p>
      </aside>

      <form onSubmit={enviar}>
        <label htmlFor="sol-n">
          Nombre *
        </label>

        <input
          id="sol-n"
          required
          value={nombre}
          onChange={evento =>
            setNombre(evento.target.value)
          }
        />

        <label htmlFor="sol-t">
          Teléfono *
        </label>

        <input
          id="sol-t"
          type="tel"
          required
          value={telefono}
          onChange={evento =>
            setTelefono(evento.target.value)
          }
        />

        <label htmlFor="sol-v">
          Vivienda *
        </label>

        <input
          id="sol-v"
          required
          value={vivienda}
          onChange={evento =>
            setVivienda(evento.target.value)
          }
        />

        <button type="submit">
          Enviar solicitud
        </button>
      </form>

      {mensaje && (
        <p className="card" role="status">
          {mensaje}
        </p>
      )}
    </main>
  );
}
