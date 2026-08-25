import carouselCode from "../../componentsUI/Carousel.tsx?raw";
import { CarouselDemo1x1, CarouselDemo3x3, CarouselDemo2x2, CarouselDemoDotsOnly, CarouselDemoInfinite, CarouselDemoAutoPlay } from "../demos/CarouselDemo";
import type { ComponentEntry } from "./types";

export const carouselEntry: ComponentEntry = {
  name: "carousel",
  description:
    "Carrusel genérico con grilla configurable (cols × rows por página). Soporta navegación con flechas, indicadores de página (dots), loop infinito, autoplay y modo controlado/no controlado.",
  code: carouselCode,
  dependencies: ["react-icons", "clsx"],
  propsInterface: `interface CarouselProps<T> {
  /** Array de items a mostrar en el carrusel. */
  items: T[];
  /** Función que renderiza cada item. Recibe el item y su índice global. */
  renderItem: (item: T, index: number) => ReactNode;
  /** Columnas por página. @default 1 */
  cols?: number;
  /** Filas por página. @default 1 */
  rows?: number;
  /** Página activa controlada (0-indexed). Si se omite, maneja estado interno. */
  page?: number;
  /** Callback al cambiar de página. */
  onPageChange?: (page: number) => void;
  /** Gap entre items (clases Tailwind). @default "gap-3" */
  gap?: string;
  /** Clases adicionales para el contenedor externo. */
  className?: string;
  /** Si true, muestra indicadores de página (dots). @default true */
  showDots?: boolean;
  /** Si true, muestra botones de navegación. @default true */
  showArrows?: boolean;
  /** Si true, al llegar al final vuelve al inicio y viceversa. @default false */
  infinite?: boolean;
  /** Intervalo en milisegundos para avance automático. Si se omite o es 0, no avanza automáticamente. */
  autoPlay?: number;
}`,
  colors: [
    {
      name: "Color primario (fonasa)",
      value: "#0572CE",
      usage: "Dot activo y hover de las flechas de navegación",
    },
    {
      name: "Bordes (dividers)",
      value: "#d1d5db",
      usage: "Dots inactivos y flechas deshabilitadas",
    },
    {
      name: "Fondo (sutil)",
      value: "#f9fafb",
      usage: "Fondo hover botones de navegación",
    },
  ],
  variants: [
    {
      label: "1×1 (default)",
      props: { cols: 1, rows: 1 },
      render: () => <CarouselDemo1x1 />,
      usageCode: `<Carousel
  items={items}
  renderItem={(item) => <div>{item.label}</div>}
/>`,
    },
    {
      label: "3×3 (9 por página)",
      props: { cols: 3, rows: 3 },
      render: () => <CarouselDemo3x3 />,
      usageCode: `<Carousel
  items={items}
  cols={3}
  rows={3}
  renderItem={(item) => <div>{item.label}</div>}
/>`,
    },
    {
      label: "2×2 (4 por página)",
      props: { cols: 2, rows: 2 },
      render: () => <CarouselDemo2x2 />,
      usageCode: `<Carousel
  items={items}
  cols={2}
  rows={2}
  gap="gap-2"
  renderItem={(item) => <div>{item.label}</div>}
/>`,
    },
    {
      label: "Solo dots (sin flechas)",
      props: { showArrows: false },
      render: () => <CarouselDemoDotsOnly />,
      usageCode: `<Carousel
  items={items}
  cols={3}
  rows={1}
  showArrows={false}
  renderItem={(item) => <div>{item.label}</div>}
/>`,
    },
    {
      label: "Infinito (loop)",
      props: { infinite: true },
      render: () => <CarouselDemoInfinite />,
      usageCode: `<Carousel
  items={items}
  infinite
  renderItem={(item) => <div>{item.label}</div>}
/>`,
    },
    {
      label: "Autoplay (3s)",
      props: { infinite: true, autoPlay: 3000 },
      render: () => <CarouselDemoAutoPlay />,
      usageCode: `<Carousel
  items={items}
  infinite
  autoPlay={3000}
  renderItem={(item) => <div>{item.label}</div>}
/>`,
    },
  ],
};
