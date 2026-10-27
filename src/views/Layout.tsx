import { Link, Outlet } from 'react-router-dom';
export default function Layout() {
  return <><header className="header"><Link to="/" className="brand"><img width="42" src="/findmypaw-logo.png" alt="Logo FindMyPaw"/><strong>FindMyPaw</strong></Link><nav aria-label="Principal"><Link to="/">Inicio</Link><Link to="/buscar">Buscar</Link><Link to="/reportar-perdida">Reportar pérdida</Link><Link to="/reportar-hallazgo">Reportar hallazgo</Link><Link to="/adopciones">Adopciones</Link></nav></header><div className="container"><Outlet/></div><footer>FindMyPaw — Proyecto académico para Cochabamba</footer></>;
}
