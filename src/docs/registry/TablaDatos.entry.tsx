import { useCallback, useRef, useState } from "react";
import tablaDatosCode from "../../componentsUI/TablaDatos.tsx?raw";
import tablaDatosTestCode from "../../tests/TablaDatos.test.tsx?raw";
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
          headers={["Nombre", "RUT", "Edad", "Acciones"]}
          columns={["nombre", "rut", "edad"]}
          data={[
            { id: "1", nombre: "Juan Pérez", rut: "12.345.678-9", edad: "35" },
            { id: "2", nombre: "María López", rut: "98.765.432-1", edad: "28" },
            { id: "3", nombre: "Carlos Soto", rut: "11.222.333-4", edad: "42" },
          ]}
          onEdit={(item) => alert(`Editar: ${item.nombre}`)}
          onDelete={(item) => alert(`Eliminar: ${item.nombre}`)}
          forceCompact={compact}
        />
      )}
    </TablaDatosResizeWrapper>
  );
}

export const tablaDatosEntry: ComponentEntry = {
  name: "tabla-datos",
  description:
    "Tabla con grid dinamico, variantes de color en header, y botones de editar/eliminar por fila. Incluye su propio Skeleton loader.",
  code: tablaDatosCode,
  testCode: tablaDatosTestCode,
  group: "Tablas",
  dependencies: ["react-icons"],
  colors: [
    { name: "Color primario (prestadores naturales)", value: "#008CB5", usage: "Fondo del header en variante primary" },
    { name: "Texto (parrafos)", value: "#414951", usage: "Fondo del header en variante secondary" },
    { name: "Blanco", value: "#ffffff", usage: "Texto del header y fondo de las filas" },
    { name: "Texto (placeholder)", value: "#9ca3af", usage: "Bordes de las filas" },
    { name: "Texto (medio)", value: "#4b5563", usage: "Iconos de editar/eliminar" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Texto de las celdas" },
    { name: "Boton eliminar", value: "#dc2626", usage: "Icono de eliminar en hover" },
  ],
  propsInterface: `interface DataTableRow {
  id: string;
  [key: string]: string | number | undefined;
}

interface DataTableProps {
  customClass?: string;
  variant?: "primary" | "secondary";
  data: DataTableRow[];
  headers: string[];
  columns: string[];
  onEdit?: (item: DataTableRow) => void;
  onDelete?: (item: DataTableRow) => void;
  forceCompact?: boolean;
}`,
  variants: [
    {
      label: "Sin acciones",
      props: {},
      render: () => (
        <TablaDatos
          headers={["Nombre", "RUT", "Edad"]}
          columns={["nombre", "rut", "edad"]}
          data={[
            { id: "1", nombre: "Juan Pérez", rut: "12.345.678-9", edad: "35" },
            { id: "2", nombre: "María López", rut: "98.765.432-1", edad: "28" },
          ]}
        />
      ),
      usageCode: `<TablaDatos\n  headers={["Nombre", "RUT", "Edad"]}\n  columns={["nombre", "rut", "edad"]}\n  data={[{ id: "1", nombre: "Juan", rut: "12.345.678-9", edad: "35" }]}\n/>`,
    },
    {
      label: "Con acciones (editar/eliminar)",
      props: {},
      render: () => (
        <TablaDatos
          headers={["Nombre", "Email", "Acciones"]}
          columns={["nombre", "email"]}
          data={[
            { id: "1", nombre: "Juan Pérez", email: "juan@email.com" },
            { id: "2", nombre: "María López", email: "maria@email.com" },
          ]}
          onEdit={(item) => alert(`Editar: ${item.nombre}`)}
          onDelete={(item) => alert(`Eliminar: ${item.nombre}`)}
        />
      ),
      usageCode: `<TablaDatos\n  headers={["Nombre", "Email", "Acciones"]}\n  columns={["nombre", "email"]}\n  data={datos}\n  onEdit={(item) => handleEdit(item)}\n  onDelete={(item) => handleDelete(item)}\n/>`,
    },
    {
      label: "Variante secondary",
      props: { variant: "secondary" },
      render: () => (
        <TablaDatos
          variant="secondary"
          headers={["Codigo", "Descripcion"]}
          columns={["codigo", "descripcion"]}
          data={[
            { id: "1", codigo: "A01", descripcion: "Consulta general" },
            { id: "2", codigo: "B02", descripcion: "Especialidad" },
          ]}
        />
      ),
      usageCode: `<TablaDatos\n  variant="secondary"\n  headers={["Codigo", "Descripcion"]}\n  columns={["codigo", "descripcion"]}\n  data={datos}\n/>`,
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
      usageCode: `{/* En mobile (< lg) muestra tarjetas apiladas con borde lateral */}\n<TablaDatos\n  headers={["Nombre", "RUT", "Edad", "Acciones"]}\n  columns={["nombre", "rut", "edad"]}\n  data={datos}\n  onEdit={handleEdit}\n  onDelete={handleDelete}\n/>`,
    },
  ],
};
