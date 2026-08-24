import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface DocSection {
  label: string;
  path: string;
}

const sections: DocSection[] = [
  { label: "Primeros pasos", path: "/docs" },
  { label: "Instalación CLI", path: "/docs/instalacion" },
  { label: "Uso de componentes", path: "/docs/uso" },
  { label: "Guía para colaboradores", path: "/docs/colaboradores" },
  { label: "Dependencias externas", path: "/docs/dependencias" },
];

export function DocsSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón mobile */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-16 left-4 z-40 p-2 bg-white dark:bg-[#061018] border border-gray-200 dark:border-[#1e3044] rounded-lg shadow-sm"
        aria-label="Abrir menú de documentación"
      >
        <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Overlay mobile */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] w-64 bg-white dark:bg-[#061018] border-r border-gray-200 dark:border-[#1e3044]
          overflow-y-auto transition-transform duration-200
          lg:translate-x-0 lg:z-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header mobile */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#1e3044]">
          <span className="text-sm font-semibold text-gray-700 dark:text-[#e2e8f0]">Documentación</span>
          <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="p-4 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3 px-3">
            Guía
          </p>
          {sections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              end={section.path === "/docs"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#eff6ff] dark:bg-[#0572CE]/15 text-[#0572CE] font-medium"
                    : "text-gray-600 dark:text-[#94a3b8] hover:bg-gray-50 dark:hover:bg-[#111d2a] hover:text-gray-900 dark:hover:text-[#e2e8f0]"
                }`
              }
            >
              {section.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
