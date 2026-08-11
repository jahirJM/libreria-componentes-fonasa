import { useCallback, useRef, useState } from "react";
import tablaDatosCode from "../../componentsUI/TablaDatos.tsx?raw"
import { TablaDatos } from "../../componentsUI/TablaDatos";
import { SkeletonTabla } from "../../skeletons/SkeletonTabla";
import type { ComponentEntry } from "./types";

function TablaDatosResizeWrapper({ children }: { children: (forceCompact: boolean) => React.ReactNode }) {
  const [forceCompact, setForceCompact] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;

    const startX = e.clientX;
    const startWidth = containerRef.current?.offsetWidth ?? 500;

    const onMouseMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const delta = ev.clientX - startX;
      const newWidth = Math.max(200, startWidth + delta);
      setWidth(newWidth);
      setForceCompact(newWidth < 500);
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div className="relative flex">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ width: width ? `${width}px` : "100%" }}
      >
        {children(forceCompact)}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="w-2 cursor-col-resize flex items-center justify-center shrink-0 group"
        title="Arrastrar para redimensionar"
      >
        <div className="w-1 h-10 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors" />
      </div>
    </div>
  );
}

function TablaDatosResizeDemo() {
  return (
    <TablaDatosResizeWrapper>
      {(compact) => (
        <TablaDatos
          listaHeaders={["Nombre", "RUT", "Edad", "Acciones"]}
          columnas={["nombre", "rut", "edad"]}
          listaDatos={[
            { id: "1", nombre: "Juan Pérez", rut: "12.345.678-9", edad: "35" },
            { id: "2", nombre: "María López", rut: "98.765.432-1", edad: "28" },
            { id: "3", nombre: "Carlos Soto", rut: "11.222.333-4", edad: "42" },
          ]}
          botonEdit={(item) => alert(`Editar: ${item.nombre}`)}
          botonDelete={(item) => alert(`Eliminar: ${item.nombre}`)}
          forceCompact={compact}
        />
      )}
    </TablaDatosResizeWrapper>
  );
}

export const tablaDatosEntry: ComponentEntry =   {
    name: "Tabla - Básica Tipo 2",
    description:
      "Tabla con grid dinámico, variantes de color en header, y botones de editar/eliminar por fila. Incluye su propio Skeleton loader.",
    code: tablaDatosCode,
    group: "Tablas",
    dependencies: ["clsx", "react-icons"],
    colors: [
      { name: "Color primario (prestadores naturales)", value: "#008CB5", usage: "Fondo del header en variante primary" },
      { name: "Texto (párrafos)", value: "#414951", usage: "Fondo del header en variante secondary" },
      { name: "Blanco", value: "#ffffff", usage: "Texto del header y fondo de las filas" },
      { name: "Texto (placeholder)", value: "#9ca3af", usage: "Bordes de las filas" },
      { name: "Texto (medio)", value: "#4b5563", usage: "Íconos de editar/eliminar" },
      { name: "Texto (fondos claros)", value: "#374151", usage: "Texto de las celdas" },
      { name: "Botón eliminar", value: "#dc2626", usage: "Ícono de eliminar en hover" },
    ],
    propsInterface: `interface TablaDatoFila {
  id: string;
  [key: string]: string | number | undefined;
}

interface TablaDatosProps {
  isDisabled?: boolean;
  customClass?: string;
  variant?: "primary" | "secondary";
  listaDatos: TablaDatoFila[];
  listaHeaders: string[];
  columnas: string[];
  botonEdit?: (item: TablaDatoFila) => void;
  botonDelete?: (item: TablaDatoFila) => void;
}`,
    variants: [
      {
        label: "Sin acciones",
        props: {},
        render: () => (
          <TablaDatos
            listaHeaders={["Nombre", "RUT", "Edad"]}
            columnas={["nombre", "rut", "edad"]}
            listaDatos={[
              {
                id: "1",
                nombre: "Juan Pérez",
                rut: "12.345.678-9",
                edad: "35",
              },
              {
                id: "2",
                nombre: "María López",
                rut: "98.765.432-1",
                edad: "28",
              },
            ]}
          />
        ),
        usageCode: `<TablaDatos\n  listaHeaders={["Nombre", "RUT", "Edad"]}\n  columnas={["nombre", "rut", "edad"]}\n  listaDatos={[{ id: "1", nombre: "Juan", rut: "12.345.678-9", edad: "35" }]}\n/>`,
      },
      {
        label: "Con acciones (editar/eliminar)",
        props: {},
        render: () => (
          <TablaDatos
            listaHeaders={["Nombre", "Email", "Acciones"]}
            columnas={["nombre", "email"]}
            listaDatos={[
              { id: "1", nombre: "Juan Pérez", email: "juan@email.com" },
              { id: "2", nombre: "María López", email: "maria@email.com" },
            ]}
            botonEdit={(item) => alert(`Editar: ${item.nombre}`)}
            botonDelete={(item) => alert(`Eliminar: ${item.nombre}`)}
          />
        ),
        usageCode: `<TablaDatos\n  listaHeaders={["Nombre", "Email", "Acciones"]}\n  columnas={["nombre", "email"]}\n  listaDatos={datos}\n  botonEdit={(item) => handleEdit(item)}\n  botonDelete={(item) => handleDelete(item)}\n/>`,
      },
      {
        label: "Variante secondary",
        props: { variant: "secondary" },
        render: () => (
          <TablaDatos
            variant="secondary"
            listaHeaders={["Código", "Descripción"]}
            columnas={["codigo", "descripcion"]}
            listaDatos={[
              { id: "1", codigo: "A01", descripcion: "Consulta general" },
              { id: "2", codigo: "B02", descripcion: "Especialidad" },
            ]}
          />
        ),
        usageCode: `<TablaDatos\n  variant="secondary"\n  listaHeaders={["Código", "Descripción"]}\n  columnas={["codigo", "descripcion"]}\n  listaDatos={datos}\n/>`,
      },
      {
        label: "Skeleton",
        props: {},
        render: () => <SkeletonTabla columns={3} rows={4} showActions />,
        usageCode: `import { SkeletonTabla } from "@/skeletons";

// Usar como placeholder mientras se cargan los datos:
<SkeletonTabla columns={3} rows={4} showActions />`,
      },
      {
        label: "Responsive (resize)",
        props: {},
        responsive: true,
        render: () => <TablaDatosResizeDemo />,
        usageCode: `{/* En mobile (< lg) muestra tarjetas apiladas con borde lateral */}\n<TablaDatos\n  listaHeaders={["Nombre", "RUT", "Edad", "Acciones"]}\n  columnas={["nombre", "rut", "edad"]}\n  listaDatos={datos}\n  botonEdit={handleEdit}\n  botonDelete={handleDelete}\n/>`,
      },
    ],
  }