
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';

import { configurarConexion } from './data/conexion';

import App from './App';
import './styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'No se encontró el elemento root en index.html.'
  );
}

const root = createRoot(rootElement);


const supabaseUrl = (
  import.meta.env.VITE_SUPABASE_URL ?? ''
).trim();

const supabaseKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? ''
).trim();



if (import.meta.env.DEV) {
  console.info('Configuración Supabase:', {
    urlConfigurada: Boolean(supabaseUrl),
    claveConfigurada: Boolean(supabaseKey),
    formatoClaveValido:
      supabaseKey.startsWith('sb_publishable_'),
  });
}


if (!supabaseUrl || !supabaseKey) {
  root.render(
    <main>
      <h1>Error de configuración</h1>

      <p role="alert">
        No se encontraron las variables de entorno
        necesarias para conectar con Supabase.
      </p>

      <p>
        Verifica VITE_SUPABASE_URL y
        VITE_SUPABASE_PUBLISHABLE_KEY
        en el archivo .env.local.
      </p>
    </main>
  );
} else {
  try {

    const supabase = createClient(
      supabaseUrl,
      supabaseKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      }
    );

    configurarConexion(supabase);

    if (import.meta.env.DEV) {
      console.info(
        'Cliente de Supabase inicializado correctamente.'
      );
    }


    root.render(<App />);
  } catch (error) {
    console.error(
      'Error al inicializar Supabase:',
      error
    );

    root.render(
      <main>
        <h1>Error de configuración</h1>

        <p role="alert">
          No se pudo inicializar Supabase.
          Verifica la URL y la clave pública.
        </p>
      </main>
    );
  }
}
