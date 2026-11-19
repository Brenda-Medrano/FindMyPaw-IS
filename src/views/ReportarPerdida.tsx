
import FormularioNuevoReporte from './FormularioNuevoReporte';

interface ReportarPerdidaProps {
  usuarioId: string;
}

export default function ReportarPerdida({
  usuarioId,
}: ReportarPerdidaProps) {
  return (
    <FormularioNuevoReporte
      tipo="PERDIDO"
      usuarioId={usuarioId}
    />
  );
}
