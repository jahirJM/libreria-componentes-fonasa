import { useState } from "react";
import { ListaPaginada } from "../../componentsUI/ListaPaginada";

export function ListaPaginadaDemo() {
  const [pagina, setPagina] = useState(1);
  const items = [
    "Solicitud #001 - Inscripción",
    "Solicitud #002 - Actualización",
    "Solicitud #003 - Renuncia",
    "Solicitud #004 - Inscripción",
    "Solicitud #005 - Actualización",
  ];
  const itemsPorPagina = 2;
  const totalPaginas = Math.ceil(items.length / itemsPorPagina);
  const itemsPagina = items.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina,
  );

  return (
    <ListaPaginada
      titulo="Mis solicitudes"
      isLoading={false}
      totalItems={items.length}
      itemLabel="solicitud"
      paginaActual={pagina}
      totalPaginas={totalPaginas}
      itemsPorPagina={itemsPorPagina}
      onCambiarPagina={setPagina}
    >
      {itemsPagina.map((item, i) => (
        <div
          key={i}
          className="p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700"
        >
          {item}
        </div>
      ))}
    </ListaPaginada>
  );
}