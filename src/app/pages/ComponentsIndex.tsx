import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registry } from "../../docs/registry";
import { slugify } from "../../docs/registry/slugify";
import { Input } from "../../componentsUI/Input";
import { Card, CardTitle, CardContent } from "../../componentsUI/Card";
import { LuSearch } from "react-icons/lu";

export function ComponentsIndex() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = registry.filter((entry) => {
    const query = search.toLowerCase();
    return (
      entry.name.toLowerCase().includes(query) ||
      (entry.description ?? "").toLowerCase().includes(query)
    );
  });

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

      {/* Search bar */}
      <div className="mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar componentes..."
          leftIcon={<LuSearch className="size-4" />}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((entry) => (
            <Card
              key={entry.name}
              variante="interactiva"
              onClick={() => navigate(`/components/${slugify(entry.name)}`)}
            >
              <CardTitle className="group-hover:text-[#0572CE] transition-colors">
                {entry.name}
              </CardTitle>
              {entry.description && (
                <CardContent>
                  <p className="text-sm text-gray-500">{entry.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 text-center py-12">
          No se encontraron componentes para "{search}".
        </p>
      )}
    </div>
  );
}
