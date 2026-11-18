
import { useState } from 'react';
import type { FormEvent } from 'react';

import type {
  Especie,
  NuevoReporte,
  TipoReporte,
} from '../model/types';

import { nuevoHallazgo } from '../model/fabricas';
import { reportePresenter } from '../presenters/services';

interface FormularioNuevoReporteProps {
  tipo: TipoReporte;
}

const CONFIGURACION_FORMULARIO = {
  PERDIDO: {
    titulo: 'Reportar mascota perdida',
    etiquetaNombre: 'Nombre *',
    etiquetaFecha: 'Fecha de pérdida *',
    boton: 'Publicar pérdida',
    mensajeExito: 'Reporte creado. Pendiente de aprobación',
    ids: {
      nombre: 'rp-n',
      especie: 'rp-e',
      zona: 'rp-z',
      descripcion: 'rp-d',
      fecha: 'rp-f',
    },
  },
  ENCONTRADO: {
    titulo: 'Reportar mascota encontrada',
    etiquetaNombre: 'Nombre (opcional)',
    etiquetaFecha: 'Fecha *',
    boton: 'Publicar hallazgo',
    mensajeExito: 'Hallazgo creado, pendiente de aprobación',
    ids: {
      nombre: 'nombre-h',
      especie: 'esp-h',
      zona: 'zona-h',
      descripcion: 'desc-h',
      fecha: 'fecha-h',
    },
  },
} as const;

export default function FormularioNuevoReporte({
  tipo,
}: FormularioNuevoReporteProps) {
  const esPerdida = tipo === 'PERDIDO';
  const configuracion = CONFIGURACION_FORMULARIO[tipo];
  const { ids } = configuracion;

  const [nombre, setNombre] = useState(
    () => esPerdida ? '' : (nuevoHallazgo().nombre ?? '')
  );

  const [especie, setEspecie] = useState<Especie>('PERRO');
  const [zona, setZona] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [foto, setFoto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const fechaMaxima = new Date().toISOString().slice(0, 10);

  function publicar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const datos: NuevoReporte = {
      autorId: 'demo',
      tipo,
      nombre,
      especie,
      zona,
      descripcion,
      fecha,
      ...(esPerdida ? { foto } : {}),
    };

    const resultado = reportePresenter.registrar(datos);

    const mensajeResultado = resultado.ok
      ? configuracion.mensajeExito
      : Object.values(resultado.errores ?? {}).join('. ');

    setMensaje(mensajeResultado);
  }

  const campoEspecie = (
    <>
      <label htmlFor={ids.especie}>
        Especie *
      </label>

      <select
        id={ids.especie}
        value={especie}
        onChange={(evento) =>
          setEspecie(evento.target.value as Especie)
        }
      >
        <option value="PERRO">Perro</option>
        <option value="GATO">Gato</option>
      </select>
    </>
  );

  return (
    <main>
      <h1>{configuracion.titulo}</h1>

      <form onSubmit={publicar}>
        <label htmlFor={ids.nombre}>
          {configuracion.etiquetaNombre}
        </label>

        <input
          id={ids.nombre}
          required={esPerdida}
          value={nombre}
          onChange={(evento) =>
            setNombre(evento.target.value)
          }
        />

        {esPerdida && campoEspecie}

        <label htmlFor={ids.zona}>
          Zona aproximada *
        </label>

        <input
          id={ids.zona}
          required
          value={zona}
          onChange={(evento) =>
            setZona(evento.target.value)
          }
        />

        <label htmlFor={ids.descripcion}>
          Descripción *
        </label>

        <textarea
          id={ids.descripcion}
          required
          value={descripcion}
          onChange={(evento) =>
            setDescripcion(evento.target.value)
          }
        />

        {!esPerdida && campoEspecie}

        <label htmlFor={ids.fecha}>
          {configuracion.etiquetaFecha}
        </label>

        <input
          id={ids.fecha}
          type="date"
          required
          max={fechaMaxima}
          value={fecha}
          onChange={(evento) =>
            setFecha(evento.target.value)
          }
        />

        {esPerdida && (
          <>
            <label htmlFor="rp-i">
              URL de fotografía *
            </label>

            <input
              id="rp-i"
              type="url"
              required
              value={foto}
              onChange={(evento) =>
                setFoto(evento.target.value)
              }
            />
          </>
        )}

        <button type="submit">
          {configuracion.boton}
        </button>
      </form>

      {mensaje && (
        <p role="status">{mensaje}</p>
      )}
    </main>
  );
}
