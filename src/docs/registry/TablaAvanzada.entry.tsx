import tableCode from "../../componentsUI/Table.tsx?raw"
import { Table } from "../../componentsUI/Table";
import { SkeletonTabla } from "../../skeletons/SkeletonTabla";
import type { ComponentEntry } from "./types";

export const tablaAvanzadaEntry: ComponentEntry =   {
    name: "Tabla - Avanzada",
    description:
      "Utiliza: Tabla - Básica. Tabla con columnas ocultables (se contraen a '...') y redimensionables tipo Excel.",
    code: tableCode,
    group: "Tablas",
    dependencies: ["clsx"],
    colors: [
      { name: "Focus ring inputs", value: "#1e3a5f", usage: "Fondo del header" },
      { name: "Texto links", value: "#1e40af", usage: "Fondo hover del header (ocultable)" },
      { name: "Texto badge revisión", value: "#1d4ed8", usage: "Borde entre columnas contraídas" },
      { name: "Blanco", value: "#ffffff", usage: "Texto del header y fondo de la tabla" },
      { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Borde exterior de la tabla" },
      { name: "Texto (placeholder)", value: "#9ca3af", usage: "Texto de celda contraída (...)" },
      { name: "Texto (fondos claros)", value: "#374151", usage: "Texto del cuerpo" },
    ],
    propsInterface: `interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
      classTable?: string;
      classTh?: string;
      nombreColumnas: string[];
      children: ReactNode;
      ocultable?: boolean;
      redimensionable?: boolean;
    }`,
    variants: [
      {
        label: "Básica",
        props: { nombreColumnas: ["Nombre", "Email", "Rol"] },
        render: () => (
          <Table nombreColumnas={["Nombre", "Email", "Rol"]}>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">Juan Pérez</td>
              <td className="px-4 py-2 text-sm">juan@email.com</td>
              <td className="px-4 py-2 text-sm">Admin</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">María López</td>
              <td className="px-4 py-2 text-sm">maria@email.com</td>
              <td className="px-4 py-2 text-sm">Usuario</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["Nombre", "Email", "Rol"]}>\n  <tr>\n    <td className="px-4 py-2 text-sm">Juan Pérez</td>\n    <td className="px-4 py-2 text-sm">juan@email.com</td>\n    <td className="px-4 py-2 text-sm">Admin</td>\n  </tr>\n</Table>`,
      },
      {
        label: "Ocultable (click en header)",
        props: { nombreColumnas: ["Nombre", "Email", "Rol"], ocultable: true },
        render: () => (
          <Table nombreColumnas={["Nombre", "Email", "Rol"]} ocultable>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">Juan Pérez</td>
              <td className="px-4 py-2 text-sm">juan@email.com</td>
              <td className="px-4 py-2 text-sm">Admin</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">María López</td>
              <td className="px-4 py-2 text-sm">maria@email.com</td>
              <td className="px-4 py-2 text-sm">Usuario</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["Nombre", "Email", "Rol"]} ocultable>\n  {/* Click en header contrae la columna a "..." */}\n  <tr>\n    <td className="px-4 py-2 text-sm">Juan Pérez</td>\n  </tr>\n</Table>`,
      },
      {
        label: "Redimensionable",
        props: {
          nombreColumnas: ["ID", "Nombre", "Estado"],
          redimensionable: true,
        },
        render: () => (
          <Table nombreColumnas={["ID", "Nombre", "Estado"]} redimensionable>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">001</td>
              <td className="px-4 py-2 text-sm">Solicitud inscripción</td>
              <td className="px-4 py-2 text-sm">Activo</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">002</td>
              <td className="px-4 py-2 text-sm">Solicitud renuncia</td>
              <td className="px-4 py-2 text-sm">Pendiente</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["ID", "Nombre", "Estado"]} redimensionable>\n  <tr>\n    <td className="px-4 py-2 text-sm">001</td>\n    <td className="px-4 py-2 text-sm">Solicitud inscripción</td>\n    <td className="px-4 py-2 text-sm">Activo</td>\n  </tr>\n</Table>`,
      },
      {
        label: "Ocultable + Redimensionable",
        props: {
          nombreColumnas: ["Nombre", "RUT", "Email", "Rol"],
          ocultable: true,
          redimensionable: true,
        },
        render: () => (
          <Table
            nombreColumnas={["Nombre", "RUT", "Email", "Rol"]}
            ocultable
            redimensionable
          >
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">Juan Pérez</td>
              <td className="px-4 py-2 text-sm">12.345.678-9</td>
              <td className="px-4 py-2 text-sm">juan@email.com</td>
              <td className="px-4 py-2 text-sm">Admin</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["Nombre", "RUT", "Email", "Rol"]} ocultable redimensionable>\n  <tr>\n    <td className="px-4 py-2 text-sm">Juan Pérez</td>\n    <td className="px-4 py-2 text-sm">12.345.678-9</td>\n    <td className="px-4 py-2 text-sm">juan@email.com</td>\n    <td className="px-4 py-2 text-sm">Admin</td>\n  </tr>\n</Table>`,
      },
      {
        label: "Skeleton",
        props: {},
        render: () => <SkeletonTabla columns={4} rows={5} />,
        usageCode: `import { SkeletonTabla } from "@/skeletons";

// Usar como placeholder mientras se cargan los datos de la tabla:
<SkeletonTabla columns={4} rows={5} />`,
      },
    ],
  }