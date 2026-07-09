import { Link } from "react-router-dom";
import { registry } from "../../registry";

export function ComponentsIndex() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
        Componentes
      </p>
      <h1 className="text-4xl font-bold text-white mb-4">
        Librería de componentes
      </h1>
      <p className="text-gray-400 mb-8">
        Componentes listos para copiar y usar en tus proyectos React + Tailwind CSS.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {registry.map((entry) => (
          <Link
            key={entry.name}
            to={`/components/${entry.name.toLowerCase()}`}
            className="group rounded-lg border border-gray-800 bg-gray-900 p-5 transition-colors hover:border-gray-700 hover:bg-gray-800/50"
          >
            <h3 className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
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
