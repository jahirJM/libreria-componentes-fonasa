import { Card, CardContent } from "../../componentsUI/Card";
import { Alerta } from "../../componentsUI/Alerta";

export function DocsUso() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
        Documentación
      </p>
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
          También puedes explorar los componentes visualmente en la sección{" "}
          <a href="/components" className="text-[#0572CE] hover:underline">Componentes</a> de esta documentación.
        </p>
      </section>
    </div>
  );
}
