
import type { Reporte } from '../model/types';
import type { PerroEnAdopcion } from '../model/adopcionTypes';

const IMAGENES_PREDETERMINADAS = {
  GATO: '/pets/pet-luna.png',
  PERRO_PERDIDO: '/pets/pet-max.png',
  PERRO_ENCONTRADO: '/pets/pet-encontrado.png',
} as const;

type DatosImagenReporte = Pick<
  Reporte,
  'especie' | 'tipo' | 'foto'
>;

type DatosImagenAdopcion = Pick<
  PerroEnAdopcion,
  'foto'
>;

function seleccionarImagen(
  foto: string | undefined,
  imagenPredeterminada: string
): string {
  return foto?.trim() || imagenPredeterminada;
}

export function obtenerImagenReporte(
  reporte: DatosImagenReporte
): string {
  const imagenPredeterminada =
    reporte.especie === 'GATO'
      ? IMAGENES_PREDETERMINADAS.GATO
      : reporte.tipo === 'ENCONTRADO'
        ? IMAGENES_PREDETERMINADAS.PERRO_ENCONTRADO
        : IMAGENES_PREDETERMINADAS.PERRO_PERDIDO;

  return seleccionarImagen(
    reporte.foto,
    imagenPredeterminada
  );
}

export function obtenerImagenAdopcion(
  perro: DatosImagenAdopcion
): string {
  return seleccionarImagen(
    perro.foto,
    IMAGENES_PREDETERMINADAS.PERRO_PERDIDO
  );
}
