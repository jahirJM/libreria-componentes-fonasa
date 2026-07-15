import { LoadingFonasa, LoadingSection } from "../../componentsUI/Loading";
import loadingCode from "../../componentsUI/Loading.tsx?raw"
import type { ComponentEntry } from "./types";

export const loadingEntry: ComponentEntry =   {
    name: "Loading",
    description:
      "Componentes de carga: Loading (pantalla completa), LoadingSection (en sección), LoadingFonasa (con favicon de Fonasa al centro).",
    code: loadingCode,
    colors: [
      { name: "Azul Fonasa", value: "#0572CE", usage: "Borde del spinner (border-t y border-b)" },
      { name: "white", value: "#ffffff", usage: "Fondo del círculo contenedor del spinner y texto del mensaje" },
      { name: "gray-900/80", value: "rgba(17,24,39,0.8)", usage: "Overlay oscuro del loading fullscreen" },
      { name: "gray-900/70", value: "rgba(17,24,39,0.7)", usage: "Fondo de LoadingSection y LoadingFonasa" },
    ],
    propsInterface: `interface FullLoadingProps {
  mensaje?: string;
}

// Loading: pantalla completa con overlay
// LoadingSection: en sección sin overlay
// LoadingFonasa: con favicon de Fonasa al centro`,
    variants: [
      {
        label: "Loading (fullscreen)",
        props: { mensaje: "Cargando datos..." },
        responsive: true,
        render: () => (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 rounded-xl">
            <div className="bg-white p-3 rounded-full mb-3">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#0572CE]"></div>
            </div>
            <p className="text-white text-sm font-semibold">
              Cargando datos...
            </p>
          </div>
        ),
        usageCode: `<Loading mensaje="Cargando datos..." />`,
      },
      {
        label: "LoadingSection",
        props: { mensaje: "Procesando..." },
        render: () => (
          <div className="py-8">
            <LoadingSection mensaje="Procesando..." />
          </div>
        ),
        usageCode: `<LoadingSection mensaje="Procesando..." />`,
      },
      {
        label: "LoadingFonasa (con favicon)",
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