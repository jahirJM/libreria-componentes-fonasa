import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[99] h-14 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-full items-center px-6">
        {/* Logo + Título + Navegación */}
        <div className="flex items-center gap-6">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="/fonasa-favicon.ico"
              alt="Fonasa"
              className="h-8 w-8"
            />
            <span className="text-lg font-bold text-[#0572CE]">
              Fonasa UI
            </span>
          </NavLink>

          {/* Navegación con estilo Botones */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-[#0572CE] text-white"
                    : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/components"
              className={({ isActive }) =>
                `inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-[#0572CE] text-white"
                    : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
                }`
              }
            >
              Componentes
            </NavLink>
            <NavLink
              to="/methods"
              className={({ isActive }) =>
                `inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-[#0572CE] text-white"
                    : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
                }`
              }
            >
              Métodos
            </NavLink>
            <NavLink
              to="/colors"
              className={({ isActive }) =>
                `inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-[#0572CE] text-white"
                    : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
                }`
              }
            >
              Colores
            </NavLink>
            <NavLink
              to="/docs"
              className={({ isActive }) =>
                `inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-[#0572CE] text-white"
                    : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
                }`
              }
            >
              Docs
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
