import { Card, CardContent } from "../../componentsUI/Card";
import { Alerta } from "../../componentsUI/Alerta";
import { Breadcrumb } from "../projectComponents/Breadcrumb";

export function DocsColaboradores() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Documentación", to: "/docs" }, { label: "Guía para colaboradores" }]} />
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Guía para colaboradores</h1>

      <section className="space-y-4 text-gray-600">
        <p>
          Esta guía explica cómo agregar, modificar y publicar componentes en la librería.
          Si quieres contribuir con un componente nuevo o mejorar uno existente, sigue estos pasos.
        </p>
      </section>

      {/* Estructura */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Estructura del proyecto</h2>
        <Card>
          <CardContent>
            <pre className="text-xs text-gray-700 font-mono whitespace-pre overflow-x-auto">{`libreria-componentes-fonasa/
├── src/
│   ├── componentsUI/          ← Código fuente de los componentes
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── ...
│   └── docs/
│       └── registry/          ← Metadata y documentación de cada componente
│           ├── input.entry.tsx
│           ├── Badge.entry.tsx
│           └── types.ts
├── cli/                       ← CLI para consumidores
├── scripts/
│   └── generate-registry.js   ← Genera registry.json
├── registry.json              ← Generado automáticamente (NO editar)
└── package.json`}</pre>
          </CardContent>
        </Card>
      </section>

      {/* Paso 1 */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Paso 1: Crear el componente</h2>
        <p>
          Crea un archivo <code className="text-[#0572CE]">.tsx</code> en{" "}
          <code className="text-[#0572CE]">src/componentsUI/</code>:
        </p>
        <Card>
          <CardContent>
            <pre className="text-xs text-gray-700 font-mono whitespace-pre overflow-x-auto">{`// src/componentsUI/MiComponente.tsx
import clsx from "clsx";

interface MiComponenteProps {
  titulo: string;
  variante?: "primary" | "secondary";
  disabled?: boolean;
}

export function MiComponente({
  titulo,
  variante = "primary",
  disabled = false,
}: MiComponenteProps) {
  return (
    <div className={clsx(
      "p-4 rounded-lg border",
      variante === "primary" && "bg-[#eff6ff] border-[#2563eb]",
      variante === "secondary" && "bg-[#f9fafb] border-[#e5e7eb]",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      {titulo}
    </div>
  );
}`}</pre>
          </CardContent>
        </Card>

        <h3 className="text-lg font-medium text-gray-800 mt-6">Reglas del componente:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-500">
          <li>Usar <strong>solo colores de la paleta oficial</strong> (ver sección Colores)</li>
          <li>Usar Tailwind CSS para estilos</li>
          <li>Exportar con <code className="text-[#0572CE]">export function</code> o <code className="text-[#0572CE]">export const</code></li>
          <li>Tipar las props con una interface TypeScript</li>
          <li>El componente debe ser autosuficiente (un solo archivo .tsx)</li>
        </ul>
      </section>

      {/* Paso 2 */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Paso 2: Crear el entry (registro)</h2>
        <p>
          Crea un archivo <code className="text-[#0572CE]">MiComponente.entry.tsx</code> en{" "}
          <code className="text-[#0572CE]">src/docs/registry/</code>:
        </p>
        <Card>
          <CardContent>
            <pre className="text-xs text-gray-700 font-mono whitespace-pre overflow-x-auto">{`// src/docs/registry/MiComponente.entry.tsx
import miComponenteCode from "../../componentsUI/MiComponente.tsx?raw";
import { MiComponente } from "../../componentsUI/MiComponente";
import type { ComponentEntry } from "./types";

export const miComponenteEntry: ComponentEntry = {
  name: "MiComponente",
  description: "Descripción breve del componente.",
  code: miComponenteCode,
  dependencies: ["clsx"],
  colors: [
    { name: "Fondo badge revisión", value: "#eff6ff", usage: "Fondo variante primary" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Borde variante secondary" },
  ],
  propsInterface: \`interface MiComponenteProps {
  titulo: string;
  variante?: "primary" | "secondary";
  disabled?: boolean;
}\`,
  variants: [
    {
      label: "Primary",
      props: { titulo: "Hola", variante: "primary" },
      render: () => <MiComponente titulo="Hola" variante="primary" />,
      usageCode: \`<MiComponente titulo="Hola" variante="primary" />\`,
    },
    {
      label: "Secondary",
      props: { titulo: "Hola", variante: "secondary" },
      render: () => <MiComponente titulo="Hola" variante="secondary" />,
      usageCode: \`<MiComponente titulo="Hola" variante="secondary" />\`,
    },
  ],
};`}</pre>
          </CardContent>
        </Card>
      </section>

      {/* Campos del entry */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Campos del entry</h2>

        <h3 className="text-lg font-medium text-gray-700 mt-4">Obligatorios:</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Campo</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Descripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-[#0572CE] font-mono text-xs">name</td>
                <td className="px-4 py-2 text-gray-600">Nombre del componente (aparece en CLI y docs)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-[#0572CE] font-mono text-xs">description</td>
                <td className="px-4 py-2 text-gray-600">Descripción breve</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-[#0572CE] font-mono text-xs">code</td>
                <td className="px-4 py-2 text-gray-600">Import del código raw (<code>?raw</code>)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-[#0572CE] font-mono text-xs">colors</td>
                <td className="px-4 py-2 text-gray-600">Array de colores usados (de la paleta oficial)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-[#0572CE] font-mono text-xs">propsInterface</td>
                <td className="px-4 py-2 text-gray-600">Interface TypeScript de las props</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-[#0572CE] font-mono text-xs">variants</td>
                <td className="px-4 py-2 text-gray-600">Array de variantes para preview visual</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-700 mt-6">Opcionales:</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Campo</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Descripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-[#0572CE] font-mono text-xs">dependencies</td>
                <td className="px-4 py-2 text-gray-600">Array de paquetes npm externos (no incluir react ni tailwind)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-[#0572CE] font-mono text-xs">group</td>
                <td className="px-4 py-2 text-gray-600">Grupo para el sidebar (ej: "Modales", "Tablas")</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Dependencias internas */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Dependencias internas</h2>
        <p>
          Si tu componente usa otro componente de la librería (ej: importa <code className="text-[#0572CE]">Badge</code>),
          debes declararlo en la <code className="text-[#0572CE]">description</code>:
        </p>
        <Card>
          <CardContent>
            <code className="text-sm text-gray-700">
              description: "Utiliza: Badge, Paginación. Mi componente con estados y paginación."
            </code>
          </CardContent>
        </Card>
        <p className="text-sm text-gray-500">
          El patrón <code className="text-[#0572CE]">"Utiliza: X, Y."</code> al inicio de la description
          permite a la CLI resolver automáticamente qué componentes adicionales descargar.
        </p>
      </section>

      {/* Publicar */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Paso 3: Publicar los cambios</h2>
        <p>Después de crear o modificar un componente, ejecuta estos comandos:</p>
        <div className="space-y-3">
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">1. Regenerar el registry.json:</p>
              <code className="text-sm text-[#0572CE]">npm run generate:registry</code>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">2. Recompilar la CLI:</p>
              <code className="text-sm text-[#0572CE]">npm run cli:build</code>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">3. Verificar que aparece:</p>
              <code className="text-sm text-[#0572CE]">node cli/dist/index.js list</code>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">4. Commit y push:</p>
              <code className="text-sm text-[#0572CE]">git add . && git commit -m "feat: agregar MiComponente" && git push</code>
            </CardContent>
          </Card>
        </div>
        <Alerta variante="error" cerrar={false} titulo="Importante" mensaje="Siempre ejecutar generate:registry y cli:build antes de hacer push. Sin esto, el componente no estará disponible para los consumidores." />
      </section>

      {/* Checklist */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Checklist antes de hacer push</h2>
        <Card>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">☐</span>
                El componente usa solo colores de la paleta oficial
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">☐</span>
                El entry tiene todos los campos obligatorios
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">☐</span>
                Si usa dependencias npm externas, están en el campo <code>dependencies</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">☐</span>
                Si usa otros componentes internos, declara <code>"Utiliza: X."</code> en la description
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">☐</span>
                Ejecuté <code>npm run generate:registry</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">☐</span>
                Ejecuté <code>npm run cli:build</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">☐</span>
                El componente aparece en <code>node cli/dist/index.js list</code>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
