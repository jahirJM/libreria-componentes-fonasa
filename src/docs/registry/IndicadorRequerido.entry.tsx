import indicadorCode from "../../componentsUI/IndicadorRequerido.tsx?raw";
import indicadorRequeridoTestCode from "../../tests/IndicadorRequerido.test.tsx?raw";
import { IndicadorRequerido } from "../../componentsUI/IndicadorRequerido";
import type { ComponentEntry } from "./types";

export const indicadorRequeridoEntry: ComponentEntry = {
  name: "indicador-requerido",
  description:
    "Asterisco rojo (*) que indica campo obligatorio. Componente auxiliar usado internamente por Label.",
  code: indicadorCode,
  testCode: indicadorRequeridoTestCode,
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
