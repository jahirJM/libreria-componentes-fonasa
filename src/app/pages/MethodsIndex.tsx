import { useState } from "react";
import { Link } from "react-router-dom";
import { methodsRegistry } from "../../docs/methods-registry";
import { slugify } from "../../docs/registry/slugify";

export function MethodsIndex() {
  const [search, setSearch] = useState("");

  const filtered = methodsRegistry.filter((entry) => {
    const query = search.toLowerCase();
    return (
      entry.name.toLowerCase().includes(query) ||
      entry.description.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
        Métodos
      </p>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Utilidades & Helpers
      </h1>
      <p className="text-gray-500 mb-8">
        Funciones utilitarias listas para copiar. Formateo, validación y transformación de datos.
      </p>

      {/* Search bar */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar métodos..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:border-[#0572CE] focus:ring-2 focus:ring-[#0572CE]/20"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((entry) => (
            <Link
              key={entry.name}
              to={`/methods/${slugify(entry.name)}`}
              className="group rounded-lg border border-gray-200 bg-gray-50 p-5 transition-colors hover:border-[#0572CE] hover:bg-blue-50"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-medium text-gray-800 group-hover:text-[#0572CE] transition-colors">
                  {entry.name}
                </h3>
                {entry.group && (
                  <span className="text-[10px] uppercase tracking-wider font-medium text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                    {entry.group}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">{entry.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 text-center py-12">
          No se encontraron métodos para "{search}".
        </p>
      )}
    </div>
  );
}
