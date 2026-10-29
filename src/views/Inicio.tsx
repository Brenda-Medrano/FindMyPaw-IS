import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, PawPrint, Search, ShieldCheck, Sparkles } from 'lucide-react';
import Reportes from './Reportes';
import { reporteRepo } from '../presenters/services';
import { listarPublicos } from '../model/listarReportes';

export default function Inicio() {
  const destacados = listarPublicos(reporteRepo.listar()).slice(0, 4);
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><PawPrint size={16}/> Juntos podemos reunirlos</span>
          <h1>Cada huella merece <em>volver a casa.</em></h1>
          <p>Un espacio para encontrar mascotas perdidas, reportar hallazgos y dar una nueva oportunidad a perros rescatados en Cochabamba.</p>
          <div className="hero-actions">
            <Link className="button" to="/buscar"><Search size={19}/> Buscar mascotas</Link>
            <Link className="button button-outline" to="/reportar-perdida"><PawPrint size={18}/> Perdí mi mascota</Link>
          </div>
          <div className="hero-trust"><ShieldCheck size={18}/> Información clara y contacto responsable</div>
        </div>
        <div className="hero-visual" aria-label="Fotografías de mascotas">
          <img className="hero-photo-main" src="/pets/pet-max.png" alt="Perro dorado del prototipo de FindMyPaw" />
          <div className="hero-photo-small"><img src="/pets/pet-luna.png" alt="Gato blanco y negro"/></div>
          <span className="hero-heart"><Heart size={22} fill="currentColor"/></span>
          <div className="hero-tag"><span>♥</span> Una comunidad que ayuda</div>
        </div>
      </section>

      <section className="quick-actions" aria-label="Acciones principales">
        <Link className="quick-action" to="/reportar-perdida"><span className="quick-icon quick-icon-coral"><PawPrint size={24}/></span><span><strong>Perdí mi mascota</strong><small>Publica un aviso de búsqueda</small></span><ArrowRight size={18}/></Link>
        <Link className="quick-action" to="/reportar-hallazgo"><span className="quick-icon quick-icon-mint"><MapPin size={24}/></span><span><strong>Encontré una mascota</strong><small>Ayuda a reunirla con su familia</small></span><ArrowRight size={18}/></Link>
        <Link className="quick-action" to="/adopciones"><span className="quick-icon quick-icon-lilac"><Heart size={24}/></span><span><strong>Quiero adoptar</strong><small>Conoce perros que esperan un hogar</small></span><ArrowRight size={18}/></Link>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="section-heading">
          <div><span className="section-kicker">UN PEQUEÑO GESTO, UNA GRAN DIFERENCIA</span><h2 id="featured-title">Reportes recientes <span>🐾</span></h2><p>Ayudemos a que estas mascotas regresen a casa.</p></div>
          <Link className="text-link" to="/buscar">Ver todos <ArrowRight size={19}/></Link>
        </div>
        {destacados.length ? <Reportes reportes={destacados}/> : <div className="empty-state"><Search size={30}/><h3>No hay reportes públicos todavía</h3><p>Puedes registrar una mascota perdida o un hallazgo.</p><Link className="button" to="/reportar-perdida">Crear reporte</Link></div>}
      </section>

      <section className="adoption-promo">
        <div className="promo-illustration"><img src="/pets/pet-encontrado.png" alt="Perrito rescatado"/></div>
        <div><span className="section-kicker">ADOPTA, NO COMPRES</span><h2>Una nueva historia comienza contigo 💜</h2><p>Conoce a los perros rescatados que esperan cariño y un hogar responsable.</p><Link className="button" to="/adopciones"><Heart size={18}/> Conocer adopciones</Link></div>
        <Sparkles className="promo-sparkle" size={42}/>
      </section>
    </main>
  );
}
