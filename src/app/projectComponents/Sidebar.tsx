import { NavLink, useLocation } from "react-router-dom";
import { registry } from "../../registry";

export function Sidebar() {
  const location = useLocation();
  const isComponentsSection = location.pathname.startsWith("/components");

  if (!isComponentsSection) return null;

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-800 bg-gray-950 p-6">
      <div className="mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Componentes
        </h3>
      </div>
      <nav className="flex flex-col gap-0.5">
        {registry.map((entry) => (
          <NavLink
            key={entry.name}
            to={`/components/${entry.name.toLowerCase()}`}
            className={({ isActive }) =>
              `rounded-md px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "bg-gray-800 text-white font-medium"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`
            }
          >
            {entry.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
