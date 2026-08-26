import { Card, CardContent } from "../../componentsUI/Card";
import { Alerta } from "../../componentsUI/Alerta";
import { Breadcrumb } from "../projectComponents/Breadcrumb";

export function DocsUso() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Documentación", to: "/docs" }, { label: "Uso de componentes" }]} />
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Uso de componentes</h1>

      {/* Agregar componentes */}
      <section className="space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Agregar componentes</h2>
        <div className="space-y-3">
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">Un componente:</p>
              <code className="text-sm text-[#0572CE]">npx fonasa-ui add Input</code>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">Varios a la vez:</p>
              <code className="text-sm text-[#0572CE]">npx fonasa-ui add Input Select Badge Drawer</code>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">Nombre compuesto (usar comillas):</p>
              <code className="text-sm text-[#0572CE]">npx fonasa-ui add "Input Calendario"</code>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Qué sucede al agregar */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">¿Qué sucede al agregar?</h2>
        <p>La CLI realiza automáticamente:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-500">
          <li>Copia el archivo <code className="text-[#0572CE]">.tsx</code> del componente a tu carpeta configurada</li>
          <li>Resuelve dependencias internas — si el componente usa otro componente de la librería, lo descarga también</li>
          <li>Muestra las dependencias npm externas que necesitas instalar</li>
        </ol>
        <Card>
          <CardContent>
            <pre className="text-xs text-gray-700 font-mono whitespace-pre">{`$ npx fonasa-ui add Label

📋 Componentes a instalar:
   IndicadorRequerido.tsx (dependencia interna)
   Label.tsx

✔ IndicadorRequerido.tsx instalado
✔ Label.tsx instalado

⚠️  Dependencias npm requeridas:
   npm install clsx react-icons

✅ ¡Listo! Componentes instalados.`}</pre>
          </CardContent>
        </Card>
      </section>

      {/* Instalar dependencias */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Instalar dependencias npm</h2>
        <p>
          Después de agregar componentes, ejecuta el comando que te indica la CLI para instalar
          las librerías externas requeridas:
        </p>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">npm install clsx react-icons</code>
          </CardContent>
        </Card>
        <p className="text-sm text-gray-500">
          Solo necesitas instalar las dependencias una vez. Si ya las tienes, el comando no hará nada adicional.
        </p>
      </section>

      {/* Importar y usar */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Importar y usar en tu código</h2>
        <p>Los componentes se importan directamente desde la carpeta donde los instalaste:</p>
        <Card>
          <CardContent>
            <pre className="text-xs text-gray-700 font-mono whitespace-pre">{`import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";

function MiFormulario() {
  return (
    <div className="space-y-4">
      <Label text="Nombre completo" indicador />
      <Input type="text" placeholder="Ingrese su nombre" />
      <Badge variant="estado-pendiente" text="Pendiente" />
    </div>
  );
}`}</pre>
          </CardContent>
        </Card>
        <Alerta variante="info" cerrar={false} mensaje="El código es tuyo. Puedes editar los componentes libremente para adaptarlos a tus necesidades. No dependes de actualizaciones externas." />
      </section>

      {/* Actualizar un componente */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Actualizar un componente</h2>
        <p>
          Si el equipo publicó una mejora y quieres la versión nueva, primero actualiza la CLI
          y luego usa <code className="text-[#0572CE]">--overwrite</code>:
        </p>
        <div className="space-y-3">
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">Actualizar CLI:</p>
              <code className="text-sm text-[#0572CE]">npm install -D github:jahirJM/libreria-componentes-fonasa</code>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">Reinstalar componente:</p>
              <code className="text-sm text-[#0572CE]">npx fonasa-ui add Input --overwrite</code>
            </CardContent>
          </Card>
        </div>
        <Alerta variante="warning" cerrar={false} mensaje="Si editaste el componente localmente, --overwrite reemplazará tus cambios con la versión del repositorio." />
      </section>

      {/* Listar componentes */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Ver componentes disponibles</h2>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">npx fonasa-ui list</code>
          </CardContent>
        </Card>
        <p className="text-sm text-gray-500">
          Muestra todos los componentes agrupados por categoría, con su descripción y dependencias.
          Los componentes con test disponible se marcan con 🧪.
          También puedes explorar los componentes visualmente en la sección{" "}
          <a href="/components" className="text-[#0572CE] hover:underline">Componentes</a> de esta documentación.
        </p>
      </section>

      {/* Tests */}
      <section className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-800">Tests (Jest)</h2>
        <p>
          Cada componente de la librería incluye un archivo de test opcional con Jest y Testing Library.
          Puedes elegir si instalarlo o no según las necesidades de tu proyecto.
        </p>

        <h3 className="text-lg font-medium text-gray-700 mt-6">Instalar componente con test incluido</h3>
        <p className="text-sm text-gray-500">
          Usa la flag <code className="text-[#0572CE]">--with-tests</code> para copiar el componente y su test de una sola vez:
        </p>
        <div className="space-y-3">
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">Un componente con test:</p>
              <code className="text-sm text-[#0572CE]">npx fonasa-ui add Input --with-tests</code>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">Varios componentes con tests:</p>
              <code className="text-sm text-[#0572CE]">npx fonasa-ui add Input Select Badge --with-tests</code>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-lg font-medium text-gray-700 mt-6">Agregar solo el test (componente ya instalado)</h3>
        <p className="text-sm text-gray-500">
          Si ya instalaste un componente y luego decides agregar su test, usa <code className="text-[#0572CE]">--only-tests</code>:
        </p>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">npx fonasa-ui add Input --only-tests</code>
          </CardContent>
        </Card>
        <p className="text-sm text-gray-500">
          Esto copia únicamente el archivo de test sin tocar el componente existente.
        </p>

        <h3 className="text-lg font-medium text-gray-700 mt-6">¿Dónde se guardan los tests?</h3>
        <p className="text-sm text-gray-500">
          Por defecto se copian a la carpeta <code className="text-[#0572CE]">__tests__/</code> en la raíz de tu proyecto.
          Puedes configurar una ruta diferente durante <code className="text-[#0572CE]">npx fonasa-ui init</code> o
          agregando <code className="text-[#0572CE]">testsDir</code> a tu <code className="text-[#0572CE]">fonasa-ui.json</code>:
        </p>
        <Card>
          <CardContent>
            <pre className="text-xs text-gray-700 font-mono whitespace-pre">{`{
  "componentsDir": "src/components/ui",
  "typescript": true,
  "testsDir": "src/__tests__/ui"
}`}</pre>
          </CardContent>
        </Card>

        <h3 className="text-lg font-medium text-gray-700 mt-6">Dependencias de testing</h3>
        <p className="text-sm text-gray-500">
          Al instalar tests, la CLI te mostrará las devDependencies que necesitas:
        </p>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">npm install -D jest @testing-library/react @testing-library/jest-dom @types/jest ts-jest jest-environment-jsdom</code>
          </CardContent>
        </Card>

        <h3 className="text-lg font-medium text-gray-700 mt-6">Ejecutar tests</h3>
        <Card>
          <CardContent>
            <code className="text-sm text-[#0572CE]">npx jest</code>
          </CardContent>
        </Card>

        <Alerta variante="info" cerrar={false} mensaje="Los tests son opcionales. Si tu proyecto no usa testing, puedes ignorar esta funcionalidad y solo instalar los componentes." />
      </section>
    </div>
  );
}
