import type { LogoEntry } from "./types";

export const fonasaLogo: LogoEntry = {
  name: "Fonasa",
  description: "Logotipo institucional del Fondo Nacional de Salud.",
  group: "Institucional",
  variants: [
    {
      label: "Horizontal Color (PNG)",
      src: "/logos/fonasa/png/fonasa-horizontal-color.png",
      format: "png",
      background: "light",
    },
    {
      label: "Vertical Color (PNG)",
      src: "/logos/fonasa/png/fonasa-vertical-color.png",
      format: "png",
      background: "light",
    },
    {
      label: "Horizontal Blanco + Gob (SVG)",
      src: "/logos/fonasa/svg/fonasa-horizontal-blanco-gob.svg",
      format: "svg",
      background: "dark",
    },
    {
      label: "Vertical Blanco (SVG)",
      src: "/logos/fonasa/svg/fonasa-vertical-blanco.svg",
      format: "svg",
      background: "dark",
    },
  ],
};
