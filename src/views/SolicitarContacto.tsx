import { useState } from 'react';
export default function SolicitarContacto(){
 const [solicitado,setSolicitado]=useState(false);
 return <section><button type="button" onClick={()=>setSolicitado(true)}>Solicitar contacto</button>{solicitado&&<p role="status">Solicitud registrada en esta demostración. No se envían datos reales.</p>}</section>;
}
