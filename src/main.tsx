import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { configurarConexion } from './data/conexion';
import App from './App';
import './styles.css';

const root = createRoot(document.getElementById('root')!);
const url = import.meta.env.VITE_SUPABASE_URL;
const clave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !clave) {
    root.render(<main><h1>Error de configuración</h1><p role="alert">Configura VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY.</p></main>);
}
else {
    try {
        configurarConexion(createClient(url, clave));
        root.render(<App />);
    }
    catch {
        root.render(<main><h1>Error de configuración</h1><p role="alert">Revisa la URL y la clave pública de Supabase.</p></main>);
    }
}
