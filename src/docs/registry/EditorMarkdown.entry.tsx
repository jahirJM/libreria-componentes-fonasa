import editorMarkdownCode from "../../componentsUI/EditorMarkdown.tsx?raw";
import {
  EditorMarkdownDemo,
  EditorMarkdownConContenidoDemo,
  EditorMarkdownErrorDemo,
  EditorMarkdownDisabledDemo,
  EditorMarkdownViewDemo,
} from "../demos/EditorMarkdownDemo";
import { EditorMarkdownPlayground } from "../demos/EditorMarkdownPlayground";
import type { ComponentEntry } from "./types";

export const editorMarkdownEntry: ComponentEntry = {
  name: "editor-markdown",
  group: "Formularios",
  description:
    "Editor y visor Markdown unificado en un solo componente. Con mode='editor' muestra pestañas Write/Preview y barra de herramientas (encabezado, negrita, cursiva, cita, código, enlace, listas y checklist); con mode='view' renderiza el Markdown como HTML seguro de solo lectura. Incluye un parser propio sin dependencias que escapa el HTML de entrada (mitiga XSS).",
  code: editorMarkdownCode,
  dependencies: ["clsx", "react-icons"],
  playground: () => <EditorMarkdownPlayground />,
  propsInterface: `type EditorMarkdownMode = "editor" | "view";

interface EditorMarkdownProps {
  /** Contenido Markdown. En modo editor es controlado (requiere onChange). */
  value: string;
  /** Modo de uso: "editor" (pestañas + toolbar) o "view" (solo lectura). */
  mode?: EditorMarkdownMode;
  /** Callback al cambiar el contenido (Markdown crudo). Requerido en modo editor. */
  onChange?: (markdown: string) => void;
  placeholder?: string;
  minRows?: number;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  /** Texto descriptivo para lectores de pantalla. */
  ariaLabel?: string;
}`,
  colors: [
    { name: "Blanco", value: "#ffffff", usage: "Fondo del área de texto y pestaña activa" },
    { name: "Fondo (cards)", value: "#f9fafb", usage: "Fondo de la barra de pestañas y toolbar" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Bordes internos, separadores y borde de citas" },
    { name: "Bordes (dividers)", value: "#d1d5db", usage: "Borde del contenedor del editor" },
    { name: "Texto (placeholder)", value: "#9ca3af", usage: "Placeholder y texto 'Nada que previsualizar'" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Íconos de la toolbar, texto de citas y pestañas inactivas" },
    { name: "Texto (medio)", value: "#4b5563", usage: "Íconos de la toolbar en reposo" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Íconos y texto en hover" },
    { name: "Texto (principal)", value: "#1f2937", usage: "Texto del contenido y pestaña activa" },
    { name: "Fondo (código)", value: "#f3f4f6", usage: "Fondo de código inline" },
    { name: "Texto principal (oscuro)", value: "#111827", usage: "Fondo de bloques de código" },
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Ring/borde en focus, enlaces del render" },
    { name: "Bordes error, íconos", value: "#ef4444", usage: "Borde del editor en estado error" },
  ],
  variants: [
    {
      label: "Editor (default)",
      props: {},
      responsive: true,
      render: () => <EditorMarkdownDemo />,
      usageCode: `const [contenido, setContenido] = useState("");

<EditorMarkdown
  value={contenido}
  onChange={setContenido}
  placeholder="Escribe con Markdown..."
/>`,
    },
    {
      label: "Con contenido",
      props: {},
      responsive: true,
      render: () => <EditorMarkdownConContenidoDemo />,
      usageCode: `const [contenido, setContenido] = useState(
  "# Título\\n\\nUn párrafo con **negrita** y _cursiva_."
);

<EditorMarkdown value={contenido} onChange={setContenido} />`,
    },
    {
      label: "Con error",
      props: { error: true },
      responsive: true,
      render: () => <EditorMarkdownErrorDemo />,
      usageCode: `<EditorMarkdown
  value={contenido}
  onChange={setContenido}
  placeholder="Este campo es obligatorio"
  error
/>`,
    },
    {
      label: "Deshabilitado",
      props: { disabled: true },
      responsive: true,
      render: () => <EditorMarkdownDisabledDemo />,
      usageCode: `<EditorMarkdown
  value={contenido}
  onChange={setContenido}
  disabled
/>`,
    },
    {
      label: "Modo vista (solo lectura)",
      props: { mode: "view" },
      responsive: true,
      render: () => <EditorMarkdownViewDemo />,
      usageCode: `<EditorMarkdown mode="view" value={contenido} />`,
    },
  ],
};
