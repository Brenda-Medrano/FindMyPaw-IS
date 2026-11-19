import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Sesion } from '../model/autenticacion';
import type { Rol } from '../model/permisosAlbergue';
import { sesionPresenter } from '../presenters/services';
interface Props {
    sesion: Sesion | null;
    onSesion: (sesion: Sesion) => Promise<void>;
}
const DESTINOS: Record<Rol, string> = { CIUDADANO: '/mis-reportes', ALBERGUE: '/albergue', ADMIN: '/admin' };
export default function Acceso({ sesion, onSesion }: Props) {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    async function iniciar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        setError('');
        setCargando(true);
        try {
            const nueva = await sesionPresenter.iniciarSesion(correo, clave);
            await onSesion(nueva);
            setClave('');
            navigate(DESTINOS[nueva.rol], { replace: true });
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'No se pudo iniciar sesión.');
        }
        finally {
            setCargando(false);
        }
    }
    if (sesion)
        return <main className="card"><h1>Sesión activa</h1><p>Rol: {sesion.rol}</p><button onClick={() => navigate(DESTINOS[sesion.rol])}>Ir a mi panel</button></main>;
    return <main className="card"><h1>Iniciar sesión</h1><p>Accede a tu cuenta de FindMyPaw.</p>
    <form onSubmit={iniciar} noValidate>
      <label htmlFor="correo">Correo electrónico</label><input id="correo" type="email" autoComplete="username" required value={correo} onChange={e => setCorreo(e.target.value)}/>
      <label htmlFor="clave">Contraseña</label><input id="clave" type="password" autoComplete="current-password" required value={clave} onChange={e => setClave(e.target.value)}/>
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={cargando}>{cargando ? 'Conectando...' : 'Iniciar sesión'}</button>
    </form></main>;
}
