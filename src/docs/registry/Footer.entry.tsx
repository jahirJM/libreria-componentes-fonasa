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
    { name: "red-500", value: "#ef4444", usage: "Ícono de corazón" },
    { name: "Fondo claro", value: "#fafdff", usage: "Fondo del footer" },
    { name: "Azul Fonasa", value: "#0572CE", usage: "Texto en variante color Fonasa" },
  ],
  propsInterface: `interface FooterProps {
  textColor?: string; // Clase Tailwind para el color del texto (default: "text-white")
}`,
  variants: [
    {
      label: "Texto blanco",
      props: { textColor: "text-white" },
      render: () => (
        <div className="bg-gray-900 rounded-xl">
          <Footer textColor="text-white" />
        </div>
      ),
      usageCode: `<Footer textColor="text-white" />`,
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
