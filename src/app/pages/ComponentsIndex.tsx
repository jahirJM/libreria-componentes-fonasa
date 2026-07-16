import { Link } from "react-router-dom";
import { registry } from "../../docs/registry";
import { slugify } from "../../docs/registry/slugify";

export function ComponentsIndex() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
        Componentes
      </p>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Librería de componentes
      </h1>
      <p className="text-gray-500 mb-8">
        Componentes listos para copiar y usar en tus proyectos React + Tailwind CSS.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {registry.map((entry) => (
          <Link
            key={entry.name}
            to={`/components/${slugify(entry.name)}`}
            className="group rounded-lg border border-gray-200 bg-gray-50 p-5 transition-colors hover:border-[#0572CE] hover:bg-blue-50"
          >
            <h3 className="text-base font-medium text-gray-800 group-hover:text-[#0572CE] transition-colors">
              {entry.name}
            </h3>
            {entry.description && (
              <p className="mt-1 text-sm text-gray-500">{entry.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
