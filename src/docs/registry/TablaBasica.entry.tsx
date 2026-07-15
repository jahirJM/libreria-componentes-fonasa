import tablaBasicaCode from "../../componentsUI/TablaBasica.tsx?raw"
import { TablaBasica } from "../../componentsUI/TablaBasica";
import type { ComponentEntry } from "./types";

export const tablaBasicaEntry: ComponentEntry =   {
    name: "Tabla Básica",
    description:
      "Tabla HTML simple sin lógica, con header estilizado y columnas configurables.",
    code: tablaBasicaCode,
    dependencies: ["clsx"],
    propsInterface: `interface TablaBasicaProps extends TableHTMLAttributes<HTMLTableElement> {
  classTable?: string;
  classTh?: string;
  nombreColumnas: string[];
  children: ReactNode;
}`,
    variants: [
      {
        label: "Básica",
        props: { nombreColumnas: ["Nombre", "Email", "Rol"] },
        render: () => (
          <TablaBasica nombreColumnas={["Nombre", "Email", "Rol"]}>
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
          </TablaBasica>
        ),
        usageCode: `<TablaBasica nombreColumnas={["Nombre", "Email", "Rol"]}>\n  <tr className="border-b border-gray-100">\n    <td className="px-4 py-2 text-sm">Juan Pérez</td>\n    <td className="px-4 py-2 text-sm">juan@email.com</td>\n    <td className="px-4 py-2 text-sm">Admin</td>\n  </tr>\n</TablaBasica>`,
      },
      {
        label: "Con clases personalizadas",
        props: {
          nombreColumnas: ["ID", "Estado"],
          classTable: "text-center",
          classTh: "text-center",
        },
        render: () => (
          <TablaBasica
            nombreColumnas={["ID", "Estado"]}
            classTable="text-center"
            classTh="text-center"
          >
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">001</td>
              <td className="px-4 py-2 text-sm">Activo</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">002</td>
              <td className="px-4 py-2 text-sm">Inactivo</td>
            </tr>
          </TablaBasica>
        ),
        usageCode: `<TablaBasica nombreColumnas={["ID", "Estado"]} classTable="text-center" classTh="text-center">\n  <tr className="border-b border-gray-100">\n    <td className="px-4 py-2 text-sm">001</td>\n    <td className="px-4 py-2 text-sm">Activo</td>\n  </tr>\n</TablaBasica>`,
      },
    ],
  }