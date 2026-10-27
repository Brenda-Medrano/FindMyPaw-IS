import { Link } from 'react-router-dom';
export default function Inicio() { return <main><h1>Cada huella merece volver a casa</h1><p>Encuentra mascotas, publica hallazgos y descubre perros en adopción en Cochabamba.</p><p><Link className="button" to="/buscar">Buscar mascotas</Link></p></main>; }
