import paginacionCode from "../../componentsUI/Paginacion.tsx?raw";
import paginacionTestCode from "../../tests/Paginacion.test.tsx?raw";
import { PaginacionDemo, PaginacionResizeDemo } from "../demos/PaginacionDemo";
import { PaginacionPlayground } from "../demos/PaginacionPlayground";
import { Paginacion } from "../../componentsUI/Paginacion";
import type { ComponentEntry } from "./types";

export const paginacionEntry: ComponentEntry =  {
    name: "paginacion",
    group: "Otros",
    description:
      "Paginación genérica con rango visible de hasta 5 páginas, centrada en la página actual. Flechas de navegación anterior/siguiente.",
    code: paginacionCode,
    testCode: paginacionTestCode,
    dependencies: ["react-icons"],
    playground: () => <PaginacionPlayground />,
    propsInterface: `interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
}`,
    colors: [
      {
        name: "Color primario (fonasa)",
        value: "#0572CE",
        usage: "Texto de los números de página y fondo de la página activa",
      },
      {
        name: "Blanco",
        value: "#ffffff",
        usage: "Texto del número de página activa",
      },
      {
        name: "Fondo selecciones",
        value: "#dbeafe",
        usage: "Fondo hover de los botones de página",
      },
    ],
    variants: [
      {
        label: "Pocas páginas (3)",
        props: { totalPaginas: 3 },
        render: () => <PaginacionDemo totalPaginas={3} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={3} onCambiarPagina={setPagina} />`,
      },
      {
        label: "Muchas páginas (10)",
        props: { totalPaginas: 10 },
        render: () => <PaginacionDemo totalPaginas={10} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={10} onCambiarPagina={setPagina} />`,
      },
      {
        label: "20 páginas",
        props: { totalPaginas: 20 },
        render: () => <PaginacionDemo totalPaginas={20} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={20} onCambiarPagina={setPagina} />`,
      },
      {
        label: "Skeleton",
        props: { isLoading: true },
        render: () => <Paginacion paginaActual={1} totalPaginas={5} onCambiarPagina={() => {}} isLoading />,
        usageCode: `<Paginacion paginaActual={1} totalPaginas={5} onCambiarPagina={() => {}} isLoading />`,
      },
      {
        label: "Responsive (resize)",
        props: {},
        render: () => <PaginacionResizeDemo />,
        usageCode: `{/* Bajo sm muestra: 1 2 3 ... 18 19 20 */}\n<Paginacion\n  paginaActual={pagina}\n  totalPaginas={20}\n  onCambiarPagina={setPagina}\n/>`,
      },
    ],
  }