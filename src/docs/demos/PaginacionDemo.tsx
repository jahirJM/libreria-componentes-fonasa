import { useState } from "react";
import { Paginacion } from "../../componentsUI/Paginacion";

export function PaginacionDemo({ totalPaginas }: { totalPaginas: number }) {
  const [pagina, setPagina] = useState(1);
  return (
    <Paginacion
      paginaActual={pagina}
      totalPaginas={totalPaginas}
      onCambiarPagina={setPagina}
    />
  );
}