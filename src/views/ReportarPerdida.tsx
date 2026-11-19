import FormularioNuevoReporte from './FormularioNuevoReporte';
interface Props {
    usuarioId: string;
}
export default function ReportarPerdida({ usuarioId }: Props) {
    return <FormularioNuevoReporte tipo="PERDIDO" usuarioId={usuarioId}/>;
}
