import { Loading, LoadingFonasa } from "../../componentsUI/Loading";
import loadingCode from "../../componentsUI/Loading.tsx?raw"
import type { ComponentEntry } from "./types";

export const loadingEntry: ComponentEntry = {
  name: "Loading",
  description:
    "Componentes de carga: Loading (spinner básico) y LoadingFonasa (con favicon de Fonasa al centro del spinner).",
  code: loadingCode,
  colors: [
    { name: "Azul Fonasa", value: "#0572CE", usage: "Borde del spinner (border-t y border-b)" },
    { name: "white", value: "#ffffff", usage: "Fondo del círculo contenedor del spinner y texto del mensaje" },
    { name: "gray-900/70", value: "rgba(17,24,39,0.7)", usage: "Fondo oscuro del contenedor" },
  ],
  propsInterface: `interface LoadingProps {
  mensaje?: string;
}

// Loading: spinner básico con mensaje opcional
// LoadingFonasa: favicon de Fonasa al centro con spinner girando alrededor`,
  variants: [
    {
      label: "Loading",
      props: { mensaje: "Cargando datos..." },
      render: () => (
        <div className="py-8">
          <Loading mensaje="Cargando datos..." />
        </div>
      ),
      usageCode: `<Loading mensaje="Cargando datos..." />`,
    },
    {
      label: "LoadingFonasa",
      props: { mensaje: "Cargando..." },
      render: () => (
        <div className="py-8">
          <LoadingFonasa mensaje="Cargando..." />
        </div>
      ),
      usageCode: `<LoadingFonasa mensaje="Cargando..." />`,
    },
  ],
}
