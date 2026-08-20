import indicadorCode from "../../componentsUI/IndicadorRequerido.tsx?raw";
import { IndicadorRequerido } from "../../componentsUI/IndicadorRequerido";
import type { ComponentEntry } from "./types";

export const indicadorRequeridoEntry: ComponentEntry = {
  name: "IndicadorRequerido",
  description:
    "Asterisco rojo (*) que indica campo obligatorio. Componente auxiliar usado internamente por Label.",
  code: indicadorCode,
  colors: [
    { name: "Bordes error, íconos", value: "#ef4444", usage: "Color del asterisco rojo" },
  ],
  propsInterface: `// No recibe props
interface IndicadorRequeridoProps {}`,
  variants: [
    {
      label: "Default",
      props: {},
      render: () => <IndicadorRequerido />,
      usageCode: `<IndicadorRequerido />`,
    },
  ],
};
