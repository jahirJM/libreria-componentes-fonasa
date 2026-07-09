export function Docs() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
        Documentación
      </p>
      <h1 className="text-4xl font-bold text-white mb-8">Primeros pasos</h1>

      <section className="space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-white">Requisitos</h2>
        <p>
          Los componentes están diseñados para proyectos React con Tailwind CSS 4.
          Asegúrate de tener instalado:
        </p>
        <div className="rounded-lg bg-gray-900 border border-gray-800 p-4">
          <code className="text-sm text-blue-400">
            npm install tailwindcss @tailwindcss/vite
          </code>
        </div>
      </section>

      <section className="mt-10 space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-white">Cómo usar</h2>
        <p>
          Cada componente está diseñado para ser copiado directamente a tu proyecto.
          No necesitas instalar ninguna dependencia adicional.
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-400">
          <li>Navega a la sección de Componentes</li>
          <li>Selecciona el componente que necesitas</li>
          <li>Copia el código fuente completo</li>
          <li>Pégalo en tu proyecto</li>
        </ol>
      </section>
    </div>
  );
}
