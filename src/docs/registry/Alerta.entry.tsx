import alertaCode from "../../componentsUI/Alerta.tsx?raw";
import { Alerta } from "../../componentsUI/Alerta";
import { FiShield } from "react-icons/fi";
import type { ComponentEntry } from "./types";

export const alertaEntry: ComponentEntry = {
  name: "Alerta",
  group: "Alertas",
  description:
    "Componente de alerta con 5 variantes semánticas (success, error, warning, info, neutral), título opcional, contenido libre (children), ícono personalizable, acción secundaria y botón de cierre.",
  code: alertaCode,
  dependencies: ["clsx", "react-icons"],
  colors: [
    { name: "emerald-500/10", value: "rgba(16,185,129,0.1)", usage: "Fondo variante success" },
    { name: "emerald-700", value: "#047857", usage: "Texto variante success" },
    { name: "emerald-600", value: "#059669", usage: "Ícono y acción variante success" },
    { name: "emerald-500", value: "#10b981", usage: "Borde variante success" },
    { name: "red-500/10", value: "rgba(239,68,68,0.1)", usage: "Fondo variante error" },
    { name: "red-700", value: "#b91c1c", usage: "Texto variante error" },
    { name: "red-600", value: "#dc2626", usage: "Ícono y acción variante error" },
    { name: "red-500", value: "#ef4444", usage: "Borde variante error" },
    { name: "yellow-500/10", value: "rgba(234,179,8,0.1)", usage: "Fondo variante warning" },
    { name: "yellow-700", value: "#a16207", usage: "Texto variante warning" },
    { name: "yellow-600", value: "#ca8a04", usage: "Ícono y acción variante warning" },
    { name: "yellow-500", value: "#eab308", usage: "Borde variante warning" },
    { name: "sky-600/10", value: "rgba(2,132,199,0.1)", usage: "Fondo variante info" },
    { name: "sky-800", value: "#075985", usage: "Texto variante info" },
    { name: "sky-700", value: "#0369a1", usage: "Ícono y acción variante info" },
    { name: "sky-600", value: "#0284c7", usage: "Borde variante info" },
    { name: "slate-500/10", value: "rgba(100,116,139,0.1)", usage: "Fondo variante neutral" },
    { name: "slate-700", value: "#334155", usage: "Texto variante neutral" },
    { name: "slate-600", value: "#475569", usage: "Ícono variante neutral" },
    { name: "slate-400", value: "#94a3b8", usage: "Borde variante neutral" },
  ],
  propsInterface: `type VarianteAlerta = "success" | "error" | "warning" | "info" | "neutral";

interface AccionAlerta {
  label: string;
  onClick: () => void;
}

interface AlertaProps {
  /** Texto simple. Ignorado si se pasa children. */
  mensaje?: string;
  /** Título opcional en negrita sobre el mensaje. */
  titulo?: string;
  /** Contenido libre (JSX, listas, links, código) en vez de mensaje. */
  children?: ReactNode;
  /** Variante visual/semántica de la alerta. */
  variante?: VarianteAlerta;
  /** Callback típico de formularios de consulta. */
  setConsulta?: Dispatch<SetStateAction<boolean>>;
  /** Muestra el botón de cerrar (X). Default: true */
  cerrar?: boolean;
  /** Reemplaza el ícono por defecto de la variante. */
  icono?: ReactNode;
  /** Acción secundaria tipo botón de texto (ej. "Reintentar"). */
  accion?: AccionAlerta;
  /** Clases Tailwind extra para ajustar el layout. */
  className?: string;
  /** Se ejecuta al cerrar la alerta (aparte de setConsulta). */
  onClose?: () => void;
}`,
  variants: [
    {
      label: "Warning (por defecto)",
      props: { variante: "warning", mensaje: "Su sesión está a punto de expirar." },
      render: () => (
        <Alerta
          variante="warning"
          mensaje="Su sesión está a punto de expirar. Guarde sus cambios antes de continuar."
        />
      ),
      usageCode: `<Alerta
  variante="warning"
  mensaje="Su sesión está a punto de expirar. Guarde sus cambios antes de continuar."
/>`,
    },
    {
      label: "Success",
      props: { variante: "success", mensaje: "Solicitud enviada con éxito." },
      render: () => (
        <Alerta
          variante="success"
          mensaje="Su solicitud fue enviada con éxito. Recibirá una confirmación por correo electrónico."
        />
      ),
      usageCode: `<Alerta
  variante="success"
  mensaje="Su solicitud fue enviada con éxito. Recibirá una confirmación por correo electrónico."
/>`,
    },
    {
      label: "Error",
      props: { variante: "error", mensaje: "No se pudo procesar el pago." },
      render: () => (
        <Alerta
          variante="error"
          mensaje="No se pudo procesar el pago. Verifique los datos e intente nuevamente."
        />
      ),
      usageCode: `<Alerta
  variante="error"
  mensaje="No se pudo procesar el pago. Verifique los datos e intente nuevamente."
/>`,
    },
    {
      label: "Info",
      props: { variante: "info", mensaje: "Su cotización está siendo revisada." },
      render: () => (
        <Alerta
          variante="info"
          mensaje="Su cotización está siendo revisada por el equipo de Fonasa. Le notificaremos cuando esté lista."
        />
      ),
      usageCode: `<Alerta
  variante="info"
  mensaje="Su cotización está siendo revisada por el equipo de Fonasa. Le notificaremos cuando esté lista."
/>`,
    },
    {
      label: "Neutral",
      props: { variante: "neutral", mensaje: "Recuerde actualizar sus datos de contacto." },
      render: () => (
        <Alerta
          variante="neutral"
          mensaje="Recuerde actualizar sus datos de contacto periódicamente para recibir notificaciones."
        />
      ),
      usageCode: `<Alerta
  variante="neutral"
  mensaje="Recuerde actualizar sus datos de contacto periódicamente para recibir notificaciones."
/>`,
    },
    {
      label: "Con título",
      props: { variante: "error", titulo: "Error de conexión" },
      render: () => (
        <Alerta
          variante="error"
          titulo="Error de conexión"
          mensaje="No se pudo establecer conexión con el servidor. Intente más tarde."
        />
      ),
      usageCode: `<Alerta
  variante="error"
  titulo="Error de conexión"
  mensaje="No se pudo establecer conexión con el servidor. Intente más tarde."
/>`,
    },
    {
      label: "Con acción",
      props: { variante: "error", accion: { label: "Reintentar" } },
      render: () => (
        <Alerta
          variante="error"
          mensaje="Falló la carga del documento adjunto."
          accion={{ label: "Reintentar", onClick: () => alert("Reintentando...") }}
        />
      ),
      usageCode: `<Alerta
  variante="error"
  mensaje="Falló la carga del documento adjunto."
  accion={{ label: "Reintentar", onClick: () => { /* lógica de reintento */ } }}
/>`,
    },
    {
      label: "Con ícono personalizado",
      props: { variante: "info", icono: "<FiShield />" },
      render: () => (
        <Alerta
          variante="info"
          icono={<FiShield className="size-5" />}
          mensaje="Su información está protegida bajo la Ley de Datos Personales."
        />
      ),
      usageCode: `import { FiShield } from "react-icons/fi";

<Alerta
  variante="info"
  icono={<FiShield className="size-5" />}
  mensaje="Su información está protegida bajo la Ley de Datos Personales."
/>`,
    },
    {
      label: "Sin botón cerrar",
      props: { variante: "warning", cerrar: false },
      render: () => (
        <Alerta
          variante="warning"
          cerrar={false}
          mensaje="Este mensaje no puede ser descartado por el usuario."
        />
      ),
      usageCode: `<Alerta
  variante="warning"
  cerrar={false}
  mensaje="Este mensaje no puede ser descartado por el usuario."
/>`,
    },
    {
      label: "Con children (contenido libre)",
      props: { variante: "info" },
      render: () => (
        <Alerta variante="info" titulo="Documentación requerida">
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Cédula de identidad vigente</li>
            <li>Último comprobante de cotización</li>
            <li>Certificado médico (si aplica)</li>
          </ul>
        </Alerta>
      ),
      usageCode: `<Alerta variante="info" titulo="Documentación requerida">
  <ul className="list-disc list-inside space-y-1 text-sm">
    <li>Cédula de identidad vigente</li>
    <li>Último comprobante de cotización</li>
    <li>Certificado médico (si aplica)</li>
  </ul>
</Alerta>`,
    },
    {
      label: "Completa (título + acción + ícono)",
      props: { variante: "success", titulo: "Bono generado", accion: { label: "Descargar PDF" } },
      render: () => (
        <Alerta
          variante="success"
          titulo="Bono generado exitosamente"
          mensaje="Su bono de atención N° 12345678 fue generado correctamente."
          accion={{ label: "Descargar PDF", onClick: () => alert("Descargando...") }}
        />
      ),
      usageCode: `<Alerta
  variante="success"
  titulo="Bono generado exitosamente"
  mensaje="Su bono de atención N° 12345678 fue generado correctamente."
  accion={{ label: "Descargar PDF", onClick: () => { /* descargar */ } }}
/>`,
    },
  ],
};
