const dependenciesInfo: Record<string, { description: string; install: string; docs: string }> = {
  "react-icons": {
    description: "Colección de íconos populares como componentes React (Font Awesome, Heroicons, Feather, etc.).",
    install: "npm install react-icons",
    docs: "https://react-icons.github.io/react-icons/",
  },
  "@headlessui/react": {
    description: "Componentes UI accesibles y sin estilos para React (modales, menús, transiciones).",
    install: "npm install @headlessui/react",
    docs: "https://headlessui.com/",
  },
  "sonner": {
    description: "Librería de notificaciones toast ligera y elegante para React.",
    install: "npm install sonner",
    docs: "https://sonner.emilkowal.ski/",
  },
  "clsx": {
    description: "Utilidad para construir strings de clases CSS condicionalmente.",
    install: "npm install clsx",
    docs: "https://github.com/lukeed/clsx",
  },
};

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
          No necesitas instalar ninguna dependencia adicional salvo las indicadas por cada componente.
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-400">
          <li>Navega a la sección de Componentes</li>
          <li>Selecciona el componente que necesitas</li>
          <li>Copia el código fuente completo</li>
          <li>Pégalo en tu proyecto</li>
          <li>Instala las dependencias indicadas si las tiene</li>
        </ol>
      </section>

      <section className="mt-10 space-y-6 text-gray-300">
        <h2 className="text-xl font-semibold text-white">Dependencias</h2>
        <p>
          Algunos componentes requieren librerías externas. A continuación se detalla cada una con su comando de instalación.
        </p>
        {Object.entries(dependenciesInfo).map(([name, info]) => (
          <div
            key={name}
            id={`dep-${name}`}
            className="rounded-lg border border-gray-800 bg-gray-900 p-5 scroll-mt-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center rounded-full bg-blue-900/40 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-700/50">
                {name}
              </span>
              <a
                href={info.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-blue-400 transition-colors underline"
              >
                Documentación oficial ↗
              </a>
            </div>
            <p className="text-sm text-gray-400 mb-3">{info.description}</p>
            <div className="rounded-md bg-gray-950 border border-gray-800 px-4 py-2.5">
              <code className="text-sm text-blue-400 font-mono">{info.install}</code>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
