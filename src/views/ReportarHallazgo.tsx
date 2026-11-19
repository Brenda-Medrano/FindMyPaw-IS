import FormularioNuevoReporte from './FormularioNuevoReporte';
interface Props {
    usuarioId: string;
}
export default function ReportarHallazgo({ usuarioId }: Props) {
    return <FormularioNuevoReporte tipo="ENCONTRADO" usuarioId={usuarioId}/>;
}
