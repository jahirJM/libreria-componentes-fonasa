import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { registry } from "../../docs/registry";
import { slugify } from "../../docs/registry/slugify";

export function Sidebar() {
  const location = useLocation();
  const isComponentsSection = location.pathname.startsWith("/components");

  // Separar componentes con grupo y sin grupo
  const ungrouped = registry.filter((entry) => !entry.group);
  const grouped = registry.reduce<Record<string, typeof registry>>(
    (acc, entry) => {
      if (entry.group) {
        if (!acc[entry.group]) acc[entry.group] = [];
        acc[entry.group].push(entry);
      }
      return acc;
    },
    {},
  );

  // Determinar qué grupos empiezan abiertos (si la ruta activa pertenece al grupo)
  const initialOpen = Object.entries(grouped).reduce<Record<string, boolean>>(
    (acc, [groupName, entries]) => {
      acc[groupName] = entries.some(
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

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  if (!isComponentsSection) return null;

  return (
    <aside className="fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-200 bg-gray-100 p-4">
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
              (openGroups["__componentes__"] ?? true) ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-200 ease-in-out"
          style={{ gridTemplateRows: (openGroups["__componentes__"] ?? true) ? "1fr" : "0fr" }}
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
                const isOpen = openGroups[groupName] ?? false;
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
