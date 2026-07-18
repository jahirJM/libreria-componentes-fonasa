import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
import { methodsRegistry } from "../../docs/methods-registry";
import { slugify } from "../../docs/registry/slugify";

export function MethodsSidebar() {
  const location = useLocation();
  const isMethodsSection = location.pathname.startsWith("/methods");

  // Separar métodos con grupo y sin grupo
  const ungrouped = methodsRegistry.filter((entry) => !entry.group);
  const grouped = methodsRegistry.reduce<Record<string, typeof methodsRegistry>>(
    (acc, entry) => {
      if (entry.group) {
        if (!acc[entry.group]) acc[entry.group] = [];
        acc[entry.group].push(entry);
      }
      return acc;
    },
    {},
  );

  // Determinar qué grupos empiezan abiertos
  const initialOpen = Object.entries(grouped).reduce<Record<string, boolean>>(
    (acc, [groupName, entries]) => {
      acc[groupName] = entries.some(
        (e) => location.pathname === `/methods/${slugify(e.name)}`,
      );
      return acc;
    },
    {},
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(initialOpen);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  if (!isMethodsSection) return null;

  return (
    <aside className="fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-200 bg-gray-100 p-4">
      <div className="my-4 text-center">
        <h3 className="text-gray-500 font-bold text-base mb-2">
          Métodos
        </h3>
        <hr className="text-gray-300" />
      </div>
      <nav className="flex flex-col gap-1 px-2 text-sm font-medium">
        {ungrouped.map((entry) => (
          <NavLink
            key={entry.name}
            to={`/methods/${slugify(entry.name)}`}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 transition-colors duration-100 ${
                isActive
                  ? "bg-[#0572CE] text-white font-semibold"
                  : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
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
                className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-900 hover:bg-[#0572CE] hover:text-white transition-colors duration-100 group"
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
                  <div className="flex flex-col gap-0.5 pl-4 mt-1">
                    {entries.map((entry) => (
                      <NavLink
                        key={entry.name}
                        to={`/methods/${slugify(entry.name)}`}
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
    </aside>
  );
}
