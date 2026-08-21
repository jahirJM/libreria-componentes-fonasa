import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { methodsRegistry } from "../../docs/methods-registry";
import { slugify } from "../../docs/registry/slugify";
import { Input } from "../../componentsUI/Input";
import { Card, CardTitle, CardContent, CardHeader, CardAction } from "../../componentsUI/Card";
import { Badge } from "../../componentsUI/Badge";
import { LuSearch } from "react-icons/lu";

export function MethodsIndex() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
      <div className="mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar métodos..."
          leftIcon={<LuSearch className="size-4" />}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((entry) => (
            <Card
              key={entry.name}
              variante="interactiva"
              onClick={() => navigate(`/methods/${slugify(entry.name)}`)}
            >
              <CardHeader>
                <CardTitle>{entry.name}</CardTitle>
                {entry.group && (
                  <CardAction>
                    <Badge variant="estado-default" text={entry.group} />
                  </CardAction>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{entry.description}</p>
              </CardContent>
            </Card>
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
