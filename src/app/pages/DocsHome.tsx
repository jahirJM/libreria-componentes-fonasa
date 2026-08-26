import { Card, CardContent } from "../../componentsUI/Card";
import { Breadcrumb } from "../projectComponents/Breadcrumb";

export function DocsHome() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Documentación" }]} />
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Primeros pasos</h1>

      <section className="space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">¿Qué es esta librería?</h2>
        <p>
          Una colección de componentes UI internos construidos con React, TypeScript y Tailwind CSS.
          Cada componente se instala individualmente mediante una CLI propia —similar a shadcn/ui— sin
          necesidad de descargar toda la librería.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Requisitos</h2>
        <p>
          Los componentes están diseñados para proyectos React con Tailwind CSS 4.
          Asegúrate de tener instalado:
        </p>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">
              npm install tailwindcss @tailwindcss/vite
            </code>
          </CardContent>
        </Card>
      </section>

      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">¿Cómo funciona?</h2>
        <p>
          La librería usa una CLI que copia el código fuente del componente directamente
          a tu proyecto. Esto significa:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-500">
          <li>Solo instalas los componentes que necesitas</li>
          <li>El código es tuyo: puedes editarlo y adaptarlo</li>
          <li>No dependes de versionado externo</li>
          <li>Las dependencias internas se resuelven automáticamente</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Inicio rápido</h2>
        <div className="space-y-3">
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">1. Instalar la CLI</p>
              <code className="text-sm text-[#0572CE]">
                npm install -D github:jahirJM/libreria-componentes-fonasa
              </code>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">2. Inicializar configuración</p>
              <code className="text-sm text-[#0572CE]">npx fonasa-ui init</code>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">3. Agregar un componente</p>
              <code className="text-sm text-[#0572CE]">npx fonasa-ui add Input</code>
            </CardContent>
          </Card>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Consulta las secciones de <strong>Instalación CLI</strong> y <strong>Uso de componentes</strong> para más detalles.
        </p>
      </section>
    </div>
  );
}
