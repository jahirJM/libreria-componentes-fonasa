import { Footer } from "../../componentsUI/Footer";
import footerCode from "../../componentsUI/Footer.tsx?raw";
import type { ComponentEntry } from "./types";

export const footerEntry: ComponentEntry = {
  name: "Footer",
  description:
    "Footer institucional de FONASA con copyright dinámico (año actual) y mensaje decorativo. Color de texto configurable.",
  code: footerCode,
  dependencies: ["react-icons"],
  colors: [
    { name: "Fondos (dark)", value: "#1f2937", usage: "Texto del footer por defecto" },
    { name: "Bordes error, íconos", value: "#ef4444", usage: "Ícono de corazón" },
    { name: "Color secundario (fondos)", value: "#fafdff", usage: "Fondo del footer" },
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Texto en variante color Fonasa" },
  ],
  propsInterface: `interface FooterProps {
  textColor?: string; // Clase Tailwind para el color del texto (default: "text-gray-800")
}`,
  variants: [
    {
      label: "Texto negro (default)",
      props: {},
      render: () => (
        <Footer />
      ),
      usageCode: `<Footer />`,
    },
    {
      label: "Texto color Fonasa",
      props: { textColor: "text-[#0572CE]" },
      render: () => (
        <Footer textColor="text-[#0572CE]" />
      ),
      usageCode: `<Footer textColor="text-[#0572CE]" />`,
    },
  ],
};
