import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
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

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(initialOpen);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  if (!isComponentsSection) return null;

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-800 bg-gray-950 p-6">
      <div className="mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Componentes
        </h3>
      </div>
      <nav className="flex flex-col gap-0.5">
        {ungrouped.map((entry) => (
          <NavLink
            key={entry.name}
            to={`/components/${slugify(entry.name)}`}
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

        {Object.entries(grouped).map(([groupName, entries]) => {
          const isOpen = openGroups[groupName] ?? false;
          return (
            <div key={groupName} className="mt-2">
              <button
                type="button"
                onClick={() => toggleGroup(groupName)}
                className="w-full flex items-center justify-between rounded-md px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
