import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface DependencyDoc {
  id: string;
  name: string;
  description: string;
  install: string;
  docsUrl: string;
  usage: string;
}

const dependencies: DependencyDoc[] = [
  {
    id: "clsx",
    name: "clsx",
    description:
      "Utilidad para construir cadenas de clases CSS de forma condicional. Liviana (~228B) y sin dependencias.",
    install: "npm install clsx",
    docsUrl: "https://github.com/lukeed/clsx",
    usage: `import clsx from "clsx";

// Uso básico: combina clases condicionalmente
const className = clsx(
  "base-class",
  isActive && "active",
  { "bg-red-500": hasError, "bg-green-500": isValid }
);

// Resultado: "base-class active bg-green-500" (según estado)`,
  },
  {
    id: "react-icons",
    name: "react-icons",
    description:
      "Colección de íconos populares (Font Awesome, Material, Heroicons, Lucide, etc.) como componentes React. Importación por familia para tree-shaking eficiente.",
    install: "npm install react-icons",
    docsUrl: "https://react-icons.github.io/react-icons",
    usage: `// Importar desde la familia correspondiente
import { FaRegCheckCircle } from "react-icons/fa";  // Font Awesome
import { LuChevronDown } from "react-icons/lu";     // Lucide
import { MdEdit, MdDelete } from "react-icons/md";  // Material Design
import { FiCode, FiCopy } from "react-icons/fi";    // Feather

// Uso en JSX
<FaRegCheckCircle className="text-green-500" size={24} />
<LuChevronDown className="text-gray-400" />`,
  },
  {
    id: "@headlessui/react",
    name: "@headlessui/react",
    description:
      "Componentes UI completamente accesibles y sin estilos (unstyled), diseñados para integrarse con Tailwind CSS. Incluye Dialog, Transition, Menu, Listbox, entre otros.",
    install: "npm install @headlessui/react",
    docsUrl: "https://headlessui.com",
    usage: `import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

// Modal con transición
<Transition show={isOpen}>
  <Dialog onClose={() => setIsOpen(false)}>
    <TransitionChild
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/30" />
    </TransitionChild>
    <DialogPanel className="bg-white rounded-xl p-6">
      {/* Contenido del modal */}
    </DialogPanel>
  </Dialog>
</Transition>`,
  },
  {
    id: "sonner",
    name: "sonner",
    description:
      "Librería de notificaciones toast opinionada y liviana. Soporta múltiples variantes (success, error, info, warning) con animaciones fluidas y stacking automático.",
    install: "npm install sonner",
    docsUrl: "https://sonner.emilkowal.ski",
    usage: `import { Toaster, toast } from "sonner";

// 1. Agregar el Toaster al layout principal
function App() {
  return (
    <>
      <Toaster position="top-right" />
      {/* ... */}
    </>
  );
}

// 2. Disparar notificaciones desde cualquier componente
toast.success("Operación exitosa");
toast.error("Ocurrió un error");
toast.info("Información importante");
toast("Mensaje neutral");`,
  },
];

export function Docs() {
  const location = useLocation();

  // Scroll al hash cuando cambia la URL
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, [location.hash]);

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
          No necesitas instalar ninguna dependencia adicional a menos que se indique.
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-400">
          <li>Navega a la sección de Componentes</li>
          <li>Selecciona el componente que necesitas</li>
          <li>Revisa si tiene dependencias adicionales (se muestran como pills amarillas)</li>
          <li>Instala las dependencias necesarias</li>
          <li>Copia el código fuente completo</li>
          <li>Pégalo en tu proyecto</li>
        </ol>
      </section>

      {/* Sección de dependencias */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-2">Dependencias externas</h2>
        <p className="text-gray-400 mb-8">
          Algunas librerías se usan en ciertos componentes. Aquí encontrarás la info de instalación y uso básico de cada una.
        </p>

        <div className="space-y-10">
          {dependencies.map((dep) => (
            <article
              key={dep.id}
              id={`dep-${dep.id}`}
              className="scroll-mt-24 rounded-xl border border-gray-800 bg-gray-900/50 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-white">{dep.name}</h3>
                <a
                  href={dep.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Documentación oficial ↗
                </a>
              </div>

              <p className="text-sm text-gray-300 mb-4">{dep.description}</p>

              {/* Instalación */}
              <div className="mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instalación
                </span>
                <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-gray-950 border border-gray-800 px-4 py-2.5">
                  <code className="text-sm text-green-400 flex-1 font-mono">
                    {dep.install}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(dep.install);
                    }}
                    className="text-xs text-gray-500 hover:text-white transition-colors px-2 py-1 rounded border border-gray-700 hover:border-gray-500"
                  >
                    Copiar
                  </button>
                </div>
              </div>

              {/* Uso básico */}
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uso básico
                </span>
                <div className="mt-1.5 rounded-lg bg-gray-950 border border-gray-800 p-4 overflow-x-auto">
                  <pre className="text-xs text-gray-300 font-mono whitespace-pre">
                    {dep.usage}
                  </pre>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
