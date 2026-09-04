import { useState } from "react";
import { EditorMarkdown } from "../../componentsUI/EditorMarkdown";

const CONTENIDO_INICIAL = `# Título de ejemplo

Este es un párrafo con **negrita**, _cursiva_ y \`código inline\`.

- Elemento de lista
- Otro elemento

1. Primer paso
2. Segundo paso

- [x] Tarea completada
- [ ] Tarea pendiente

> Una cita de ejemplo.

[Ir a Fonasa](https://www.fonasa.cl)`;

/** Editor por defecto (Write/Preview + toolbar). */
export function EditorMarkdownDemo() {
  const [value, setValue] = useState("");
  return (
    <EditorMarkdown
      value={value}
      onChange={setValue}
      placeholder="Escribe con Markdown..."
    />
  );
}

/** Editor con contenido inicial cargado. */
export function EditorMarkdownConContenidoDemo() {
  const [value, setValue] = useState(CONTENIDO_INICIAL);
  return <EditorMarkdown value={value} onChange={setValue} />;
}

/** Editor en estado de error. */
export function EditorMarkdownErrorDemo() {
  const [value, setValue] = useState("");
  return (
    <EditorMarkdown
      value={value}
      onChange={setValue}
      placeholder="Este campo es obligatorio"
      error
    />
  );
}

/** Editor deshabilitado. */
export function EditorMarkdownDisabledDemo() {
  const [value, setValue] = useState("Contenido de solo lectura.");
  return <EditorMarkdown value={value} onChange={() => {}} disabled />;
}

/** Modo vista: renderiza Markdown como HTML de solo lectura. */
export function EditorMarkdownViewDemo() {
  return <EditorMarkdown mode="view" value={CONTENIDO_INICIAL} />;
}
