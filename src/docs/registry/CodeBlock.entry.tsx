import codeBlockCode from "../../componentsUI/CodeBlock.tsx?raw";
import { CodeBlock } from "../../componentsUI/CodeBlock";
import type { ComponentEntry } from "./types";

export const codeBlockEntry: ComponentEntry = {
  name: "code-block",
  group: "Otros",
  description:
    "Bloque de código o comando con botón de copiar al portapapeles. Ideal para snippets, comandos de terminal o configuraciones copiables.",
  code: codeBlockCode,
  dependencies: ["clsx", "react-icons"],
  colors: [
    { name: "Fondos (overlay)", value: "#111827", usage: "Fondo del bloque variante dark" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Borde variante dark" },
    { name: "Fondo (50)", value: "#f9fafb", usage: "Fondo del bloque variante light" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Borde variante light" },
    { name: "Texto (placeholder)", value: "#9ca3af", usage: "Label y botón copiar (dark)" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Label y botón copiar (light)" },
    { name: "Ícono confirmación", value: "#22c55e", usage: "Ícono check al copiar exitosamente" },
  ],
  propsInterface: `interface CodeBlockProps {
  /** Código o comando a mostrar. */
  code: string;
  /** Variante visual: "dark" (fondo oscuro) o "light" (fondo claro). @default "light" */
  variant?: "dark" | "light";
  /** Label opcional sobre el bloque (ej. "Terminal", "bash", "tsx"). */
  label?: string;
  /** Si true, oculta el botón de copiar. @default false */
  hideCopy?: boolean;
  /** Clases CSS adicionales para el contenedor. */
  className?: string;
  /** Si true, muestra skeleton de carga. @default false */
  isLoading?: boolean;
  /** Texto descriptivo para lectores de pantalla. */
  ariaLabel?: string;
}`,
  variants: [
    {
      label: "Comando (light - por defecto)",
      props: { code: "npm install fonasa-ui", label: "Terminal" },
      render: () => (
        <CodeBlock code="npm install fonasa-ui" label="Terminal" />
      ),
      usageCode: `<CodeBlock code="npm install fonasa-ui" label="Terminal" />`,
    },
    {
      label: "Código multilínea",
      props: { code: "const x = 1;\nconst y = 2;\nconsole.log(x + y);", label: "javascript" },
      render: () => (
        <CodeBlock
          code={`const x = 1;\nconst y = 2;\nconsole.log(x + y);`}
          label="javascript"
        />
      ),
      usageCode: `<CodeBlock\n  code={\`const x = 1;\\nconst y = 2;\\nconsole.log(x + y);\`}\n  label="javascript"\n/>`,
    },
    {
      label: "Variante dark",
      props: { variant: "dark", code: "fonasa-ui add code-block", label: "Terminal" },
      render: () => (
        <CodeBlock
          code="fonasa-ui add code-block"
          variant="dark"
          label="Terminal"
        />
      ),
      usageCode: `<CodeBlock code="fonasa-ui add code-block" variant="dark" label="Terminal" />`,
    },
    {
      label: "Sin label",
      props: { code: "git push origin main" },
      render: () => <CodeBlock code="git push origin main" />,
      usageCode: `<CodeBlock code="git push origin main" />`,
    },
    {
      label: "Sin botón copiar",
      props: { code: "export default App;", hideCopy: true, label: "tsx" },
      render: () => (
        <CodeBlock code="export default App;" hideCopy label="tsx" />
      ),
      usageCode: `<CodeBlock code="export default App;" hideCopy label="tsx" />`,
    },
    {
      label: "Comando largo (scroll horizontal)",
      props: { code: "docker run --name fonasa-db -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=fonasa -p 5432:5432 -d postgres:15-alpine", label: "Terminal" },
      render: () => (
        <CodeBlock
          code="docker run --name fonasa-db -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=fonasa -p 5432:5432 -d postgres:15-alpine"
          label="Terminal"
        />
      ),
      usageCode: `<CodeBlock\n  code="docker run --name fonasa-db -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=fonasa -p 5432:5432 -d postgres:15-alpine"\n  label="Terminal"\n/>`,
    },
    {
      label: "Skeleton",
      props: { isLoading: true },
      render: () => <CodeBlock code="" isLoading label="Terminal" />,
      usageCode: `<CodeBlock code="" isLoading label="Terminal" />`,
    },
  ],
};
