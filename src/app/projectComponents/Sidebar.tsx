import { useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuChevronDown, LuSearch, LuX } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { registry } from "../../docs/registry";
import { slugify } from "../../docs/registry/slugify";

export function Sidebar() {
  const location = useLocation();
  const isComponentsSection = location.pathname.startsWith("/components");

  const [filter, setFilter] = useState("");

  // Filtrar entries según el texto de búsqueda
  const filteredRegistry = useMemo(() => {
    if (!filter.trim()) return registry;
    const term = filter.toLowerCase().trim();
    return registry.filter(
      (entry) =>
        entry.name.toLowerCase().includes(term) ||
        entry.group?.toLowerCase().includes(term) ||
        entry.description?.toLowerCase().includes(term)
    );
  }, [filter]);

  // Separar componentes con grupo y sin grupo
  const ungrouped = filteredRegistry.filter((entry) => !entry.group);
  const grouped = filteredRegistry.reduce<Record<string, typeof registry>>(
    (acc, entry) => {
      if (entry.group) {
        if (!acc[entry.group]) acc[entry.group] = [];
        acc[entry.group].push(entry);
      }
      return acc;
    },
    {},
  );

  // Determinar qué grupos empiezan abiertos (si la ruta activa pertenece al grupo, o si hay filtro activo)
  const initialOpen = Object.entries(grouped).reduce<Record<string, boolean>>(
    (acc, [groupName, entries]) => {
      acc[groupName] =
        !!filter.trim() ||
        entries.some(
          (e) => location.pathname === `/components/${slugify(e.name)}`,
        );
      return acc;
    },
    {},
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    __componentes__: true,
    ...initialOpen,
  });

  // Cuando hay filtro activo, forzar todos los grupos abiertos
  const effectiveOpenGroups = useMemo(() => {
    if (filter.trim()) {
      const allOpen: Record<string, boolean> = { __componentes__: true };
      Object.keys(grouped).forEach((g) => (allOpen[g] = true));
      return allOpen;
    }
    return openGroups;
  }, [filter, openGroups, grouped]);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  if (!isComponentsSection) return null;

  return (
    <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-200 bg-gray-100 p-4">
      {/* Inicio link */}
      <NavLink
        to="/components"
        end
        className={({ isActive }) =>
          `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-100 ${
            isActive
              ? "bg-[#0572CE] text-white font-semibold"
              : "text-gray-600 hover:bg-[#0572CE] hover:text-white"
          }`
        }
      >
        <IoMdHome className="size-4" />
        <span>Inicio</span>
      </NavLink>

      {/* Filtro de búsqueda */}
      <div className="relative mt-3 mb-2">
        <LuSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar componente..."
          className="w-full rounded-lg border border-gray-300 bg-white py-1.5 pl-8 pr-8 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#0572CE] focus:outline-none focus:ring-1 focus:ring-[#0572CE] transition-colors"
        />
        {filter && (
          <button
            type="button"
            onClick={() => setFilter("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <LuX className="size-3.5" />
          </button>
        )}
      </div>

      {/* Mensaje sin resultados */}
      {filter.trim() && filteredRegistry.length === 0 && (
        <p className="px-3 py-2 text-xs text-gray-500 italic">
          Sin resultados para "{filter}"
        </p>
      )}

      {/* Sección Componentes (indentada bajo Inicio) */}
      <div className="ml-3 mt-2 border-l-2 border-gray-300 pl-3">
        <button
          type="button"
          onClick={() => toggleGroup("__componentes__")}
          className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-[#0572CE] hover:text-white transition-colors duration-100"
        >
          <span className="font-bold">Componentes</span>
          <LuChevronDown
            className={`text-xs transition-transform duration-200 ${
              (effectiveOpenGroups["__componentes__"] ?? true) ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-200 ease-in-out"
          style={{ gridTemplateRows: (effectiveOpenGroups["__componentes__"] ?? true) ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-0.5 mt-1 text-sm font-medium">
              {/* Componentes sin grupo */}
              {ungrouped.map((entry) => (
                <NavLink
                  key={entry.name}
                  to={`/components/${slugify(entry.name)}`}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-1.5 transition-colors duration-100 ${
                      isActive
                        ? "bg-[#0572CE] text-white font-semibold"
                        : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
                    }`
                  }
                >
                  {entry.name}
                </NavLink>
              ))}

              {/* Sub-secciones agrupadas */}
              {Object.entries(grouped).map(([groupName, entries]) => {
                const isOpen = effectiveOpenGroups[groupName] ?? false;
                return (
                  <div key={groupName} className="mt-1">
                    <button
                      type="button"
                      onClick={() => toggleGroup(groupName)}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm text-gray-900 hover:bg-[#0572CE] hover:text-white transition-colors duration-100 group"
                    >
                      <span className="font-semibold">{groupName}</span>
                      <LuChevronDown
                        className={`text-xs transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-200 ease-in-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-0.5 pl-3 mt-0.5">
                          {entries.map((entry) => (
                            <NavLink
                              key={entry.name}
                              to={`/components/${slugify(entry.name)}`}
                              className={({ isActive }) =>
                                `rounded-lg px-3 py-1.5 text-sm transition-colors duration-100 ${
                                  isActive
                                    ? "bg-[#0572CE] text-white font-semibold"
                                    : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
                                }`
                              }
                            >
                              {entry.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
