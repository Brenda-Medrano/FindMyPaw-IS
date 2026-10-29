import { useState } from 'react';
import '../styles.css';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Heart, PawPrint, ShieldCheck } from 'lucide-react';

const links = [
  { to: '/', text: 'Inicio', end: true },
  { to: '/buscar', text: 'Buscar mascotas' },
  { to: '/reportar-perdida', text: 'Reportar pérdida' },
  { to: '/reportar-hallazgo', text: 'Reportar hallazgo' },
  { to: '/adopciones', text: 'Adopciones' },
  { to: '/mis-reportes', text: 'Mis reportes' },
  { to: '/acceso', text: 'Acceso' },
  { to: '/albergue', text: 'Albergue' },
  { to: '/admin', text: 'Administración' },
];

export default function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const cerrar = () => setMenuAbierto(false);
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" onClick={cerrar} aria-label="FindMyPaw, ir al inicio">
            <span className="brand-icon"><img src="/pets/logo-icon.png" alt="" /></span>
            <span>FindMyPaw</span>
          </Link>
          <div className="header-actions">
            <span className="location-pill"><MapPin size={15}/> Cochabamba, Bolivia</span>
            <Link to="/adopciones" className="header-adopt"><Heart size={17}/> Adoptar</Link>
            <button type="button" className="menu-toggle" onClick={() => setMenuAbierto(v => !v)}
              aria-controls="main-navigation" aria-expanded={menuAbierto}
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}>
              {menuAbierto ? <X size={25}/> : <Menu size={25}/>}
            </button>
          </div>
          {menuAbierto && <button className="nav-scrim" aria-label="Cerrar menú" onClick={cerrar} />}
          <nav id="main-navigation" className={`navigation-menu ${menuAbierto ? 'is-open' : ''}`} aria-label="Navegación principal">
            <div className="navigation-title"><PawPrint size={18}/> Explorar FindMyPaw</div>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} onClick={cerrar}
                className={({isActive}) => isActive ? 'nav-link is-active' : 'nav-link'}>
                {link.text}
              </NavLink>
            ))}
            <div className="navigation-note"><ShieldCheck size={17}/> Publicaciones y adopciones responsables.</div>
          </nav>
        </div>
      </header>
      <div className="container" key={location.pathname}><Outlet/></div>
      <footer className="site-footer">
        <div className="footer-inner">
          <div><strong>🐾 FindMyPaw</strong><span> Cada huella merece volver a casa.</span></div>
          <div>Proyecto académico · Cochabamba, Bolivia</div>
        </div>
      </footer>
    </div>
  );
}
