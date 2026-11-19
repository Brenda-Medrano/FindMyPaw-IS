
import FormularioNuevoReporte from './FormularioNuevoReporte';

interface ReportarHallazgoProps {
  usuarioId: string;
}

export default function ReportarHallazgo({
  usuarioId,
}: ReportarHallazgoProps) {
  return (
    <FormularioNuevoReporte
      tipo="ENCONTRADO"
      usuarioId={usuarioId}
    />
  );
}
