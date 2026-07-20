import drawerCode from "../../componentsUI/Drawer.tsx?raw";
import { BottomDemo, DefaultDemo, LargeDemo, LeftDemo, NoCerrarAlClickFueraDemo, SinBotonCerrarDemo, SkeletonDrawerDemo, TopDemo, WithFooterDemo } from "../demos/DrawerDemo";
import type { ComponentEntry } from "./types";

/**
 * Elemento invisible que fuerza a Tailwind a incluir en el CSS las clases
 * de transformación dinámicas que usa Drawer.tsx desde sus tablas de objetos.
 * Sin esto, el escáner JIT no las detecta y la animación de apertura no funciona.
 */


/* ------------------------------------------------------------------ */
/* Wrappers interactivos para las variantes                             */
/* ------------------------------------------------------------------ */



/* ------------------------------------------------------------------ */
/* Entry                                                               */
/* ------------------------------------------------------------------ */

export const drawerEntry: ComponentEntry = {
  name: "Drawer",
  description:
    "Panel deslizante que se abre desde cualquier borde de la pantalla con animación suave, overlay oscuro, cierre con Escape y soporte para header, footer y múltiples tamaños.",
  code: drawerCode,
  dependencies: ["clsx", "react-icons", "react-dom"],
  propsInterface: `type DrawerPosicion = "right" | "left" | "bottom" | "top";
type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  titulo?: ReactNode;
  descripcion?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  posicion?: DrawerPosicion;
  size?: DrawerSize;
  cerrarAlClickFuera?: boolean;
  mostrarBotonCerrar?: boolean;
  className?: string;
}`,
  colors: [
    { name: "Blanco", value: "#ffffff", usage: "Fondo del panel" },
    { name: "Negro/40", value: "rgba(0,0,0,0.4)", usage: "Overlay de fondo" },
    { name: "Fondo (cards)", value: "#f3f4f6", usage: "Bordes header/footer y hover botón cerrar" },
    { name: "Texto (placeholder)", value: "#9ca3af", usage: "Ícono X de cerrar" },
    { name: "Texto (medio)", value: "#4b5563", usage: "Hover ícono X" },
    { name: "Fondos (overlay)", value: "#111827", usage: "Texto del título" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Texto de la descripción" },
  ],
  variants: [
    {
      label: "Default (derecha)",
      props: { posicion: "right" },
      render: () => <DefaultDemo />,
      usageCode: `const [isOpen, setIsOpen] = useState(false);

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  titulo="Información del paciente"
  descripcion="Datos generales del beneficiario"
>
  <p>Contenido del drawer</p>
</Drawer>`,
    },
    {
      label: "Desde la izquierda",
      props: { posicion: "left" },
      render: () => <LeftDemo />,
      usageCode: `<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  titulo="Menú de navegación"
  posicion="left"
>
  <p>Contenido del drawer</p>
</Drawer>`,
    },
    {
      label: "Desde abajo",
      props: { posicion: "bottom" },
      render: () => <BottomDemo />,
      usageCode: `<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  titulo="Seleccionar tipo de atención"
  posicion="bottom"
  size="md"
>
  <p>Contenido del drawer</p>
</Drawer>`,
    },
    {
      label: "Desde arriba",
      props: { posicion: "top" },
      render: () => <TopDemo />,
      usageCode: `<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  titulo="Actualización disponible"
  posicion="top"
  size="sm"
>
  <p>Contenido del drawer</p>
</Drawer>`,
    },
    {
      label: "Con footer",
      props: { footer: true },
      render: () => <WithFooterDemo />,
      usageCode: `<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  titulo="Confirmar eliminación"
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>Cancelar</button>
      <button onClick={() => setIsOpen(false)}>Eliminar</button>
    </>
  }
>
  <p>¿Está seguro que desea continuar?</p>
</Drawer>`,
    },
    {
      label: "Tamaño grande (lg)",
      props: { size: "lg" },
      render: () => <LargeDemo />,
      usageCode: `<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  titulo="Detalle de solicitud"
  size="lg"
>
  <p>Contenido del drawer</p>
</Drawer>`,
    },
    {
      label: "Sin cerrar al click fuera",
      props: { cerrarAlClickFuera: false },
      render: () => <NoCerrarAlClickFueraDemo />,
      usageCode: `<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  titulo="Formulario obligatorio"
  cerrarAlClickFuera={false}
>
  <p>Contenido del drawer</p>
</Drawer>`,
    },
    {
      label: "Sin botón cerrar",
      props: { mostrarBotonCerrar: false },
      render: () => <SinBotonCerrarDemo />,
      usageCode: `<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  titulo="Panel de información"
  mostrarBotonCerrar={false}
>
  <p>Contenido del drawer</p>
</Drawer>`,
    },
    {
      label: "Skeleton",
      props: {},
      render: () => <SkeletonDrawerDemo />,
      usageCode: `<Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} titulo="Cargando datos...">
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-4/5" />
    <div className="h-4 bg-gray-200 rounded w-3/5" />
  </div>
</Drawer>`,
    },
  ],
};