import { Card, CardContent } from "../../componentsUI/Card";
import { Alerta } from "../../componentsUI/Alerta";
import { Breadcrumb } from "../projectComponents/Breadcrumb";

export function DocsInstalacion() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Documentación", to: "/docs" }, { label: "Instalación CLI" }]} />
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Instalación CLI</h1>

      {/* Requisitos previos */}
      <section className="space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Requisitos previos</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-500">
          <li>Node.js 18 o superior</li>
          <li>Acceso al repositorio privado de GitHub (colaborador o miembro de la organización)</li>
        </ul>
        <Alerta variante="warning" cerrar={false} mensaje="Si no tienes acceso al repositorio, solicítalo al equipo mantenedor. Sin acceso, la CLI no podrá descargar los componentes." />
      </section>

      {/* Paso 1 */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">1. Instalar la CLI</h2>
        <p>Desde la raíz de tu proyecto, ejecuta:</p>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">
              npm install -D github:jahirJM/libreria-componentes-fonasa
            </code>
          </CardContent>
        </Card>
        <p className="text-sm text-gray-500">
          Esto agrega la CLI <code className="text-[#0572CE]">fonasa-ui</code> como dependencia de desarrollo en tu proyecto.
        </p>
      </section>

      {/* Paso 2 */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">2. Inicializar configuración</h2>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">npx fonasa-ui init</code>
          </CardContent>
        </Card>
        <p>Te preguntará:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-500">
          <li><strong>¿Dónde guardar los componentes?</strong> — Ejemplo: <code className="text-[#0572CE]">src/components/ui</code></li>
          <li><strong>¿Usas TypeScript?</strong> — Selecciona <code className="text-[#0572CE]">true</code></li>
        </ul>
        <p className="text-sm text-gray-500">
          Esto crea un archivo <code className="text-[#0572CE]">fonasa-ui.json</code> en la raíz de tu proyecto:
        </p>
        <Card>
          <CardContent>
            <pre className="text-xs text-gray-700 font-mono whitespace-pre">{`{
  "componentsDir": "src/components/ui",
  "typescript": true
}`}</pre>
          </CardContent>
        </Card>
      </section>

      {/* Paso 3 */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">3. Verificar instalación</h2>
        <p>Comprueba que la CLI funciona listando los componentes disponibles:</p>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">npx fonasa-ui list</code>
          </CardContent>
        </Card>
      </section>

      {/* Actualizar */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Actualizar la CLI</h2>
        <p>Cuando el equipo publique nuevos componentes o mejoras, actualiza con:</p>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">
              npm install -D github:jahirJM/libreria-componentes-fonasa
            </code>
          </CardContent>
        </Card>
        <p className="text-sm text-gray-500">
          Esto descarga la versión más reciente del repositorio con todos los componentes actualizados.
        </p>
      </section>

      {/* Acceso */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Acceso al repositorio</h2>
        <p>Para usar la CLI necesitas acceso de lectura al repo privado de GitHub:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Opción</th>
                <th className="text-left px-4 py-2 font-medium text-gray-700">Cómo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-gray-600">Colaborador directo</td>
                <td className="px-4 py-2 text-gray-500">El mantenedor te agrega en Settings → Collaborators</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-600">Miembro de organización</td>
                <td className="px-4 py-2 text-gray-500">Pertenecer a la organización de GitHub es suficiente</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Asegúrate de tener Git configurado con autenticación (credential manager en Windows o clave SSH).
        </p>
      </section>
    </div>
  );
}
