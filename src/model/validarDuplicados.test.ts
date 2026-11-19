import {
  correoDuplicado,
} from './validarDuplicados';
import type { NuevoReporte, Reporte } from './types';
import { reporteDuplicado } from './validarDuplicados';

describe('Validación de correos duplicados', () => {
  const correosRegistrados = [
    'usuario@gmail.com',
    'admin@gmail.com',
  ];

  test('detecta un correo previamente registrado', () => {
    expect(
      correoDuplicado(
        'usuario@gmail.com',
        correosRegistrados
      )
    ).toBe(true);
  });

  test('ignora diferencias entre mayúsculas y minúsculas', () => {
    expect(
      correoDuplicado(
        'USUARIO@GMAIL.COM',
        correosRegistrados
      )
    ).toBe(true);
  });

  test('ignora espacios al inicio y al final', () => {
    expect(
      correoDuplicado(
        '  usuario@gmail.com  ',
        correosRegistrados
      )
    ).toBe(true);
  });

  test('permite un correo que no está registrado', () => {
    expect(
      correoDuplicado(
        'nuevo@gmail.com',
        correosRegistrados
      )
    ).toBe(false);
  });

  test('permite registrar la primera cuenta', () => {
    expect(
      correoDuplicado('nuevo@gmail.com', [])
    ).toBe(false);
  });
});
describe('Validación de reportes duplicados', () => {
  const reporte: Reporte = {
    id: 'reporte-1',
    autorId: 'usuario-1',
    tipo: 'PERDIDO',
    estado: 'ACTIVO',
    moderacion: 'APROBADO',
    especie: 'PERRO',
    nombre: 'Max',
    zona: 'Sarco',
    descripcion: 'Perro de color negro',
    fecha: '2026-10-20',
    foto: 'https://example.com/max.jpg',
  };

  const nuevo: NuevoReporte = {
    autorId: reporte.autorId,
    tipo: reporte.tipo,
    especie: reporte.especie,
    nombre: reporte.nombre,
    zona: reporte.zona,
    descripcion: reporte.descripcion,
    fecha: reporte.fecha,
    foto: reporte.foto,
  };

  test('rechaza un reporte activo idéntico', () => {
    expect(
      reporteDuplicado(nuevo, [reporte])
    ).toBe(true);
  });

  test('detecta duplicados ignorando espacios y mayúsculas', () => {
    expect(
      reporteDuplicado(
        {
          ...nuevo,
          nombre: ' MAX ',
          zona: ' SARCO ',
          descripcion: 'PERRO  DE COLOR NEGRO',
        },
        [reporte]
      )
    ).toBe(true);
  });

  test('permite un reporte de otro usuario', () => {
    expect(
      reporteDuplicado(
        { ...nuevo, autorId: 'usuario-2' },
        [reporte]
      )
    ).toBe(false);
  });

  test('permite registrar después de resolver el anterior', () => {
    expect(
      reporteDuplicado(nuevo, [
        { ...reporte, estado: 'RESUELTO' },
      ])
    ).toBe(false);
  });

  test('permite reportes de distinto tipo', () => {
    expect(
      reporteDuplicado(
        { ...nuevo, tipo: 'ENCONTRADO' },
        [reporte]
      )
    ).toBe(false);
  });

  test('permite un reporte con una fecha diferente', () => {
    expect(
      reporteDuplicado(
        { ...nuevo, fecha: '2026-10-21' },
        [reporte]
      )
    ).toBe(false);
  });

  test('no permite duplicados por cambiar solamente la foto', () => {
    expect(
      reporteDuplicado(
        { ...nuevo, foto: 'https://example.com/otra.jpg' },
        [reporte]
      )
    ).toBe(true);
  });

  test('detecta duplicados de hallazgos sin nombre', () => {
    const hallazgo: Reporte = {
      ...reporte,
      tipo: 'ENCONTRADO',
      nombre: undefined,
    };

    expect(
      reporteDuplicado(
        { ...hallazgo, nombre: '' },
        [hallazgo]
      )
    ).toBe(true);
  });

  test('permite registrar cuando no existen reportes', () => {
    expect(reporteDuplicado(nuevo, [])).toBe(false);
  });
});