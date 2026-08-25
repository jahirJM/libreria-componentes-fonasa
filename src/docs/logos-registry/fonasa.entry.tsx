import type { LogoEntry } from "./types";

export const fonasaLogo: LogoEntry = {
  name: "Fonasa",
  description: "Logotipo institucional del Fondo Nacional de Salud.",
  group: "Fonasa",
  variants: [
    {
      label: "Logo+Nombre",
      src: "/logos/fonasa/svg/fonasa-logo-full.svg",
      format: "svg",
      background: "light",
    },
    {
      label: "Solo Logo",
      src: "/logos/fonasa/svg/fonasa-logo-icon.svg",
      format: "svg",
      background: "light",
    },
    {
      label: "Solo Nombre",
      src: "/logos/fonasa/svg/fonasa-logo-name.svg",
      format: "svg",
      background: "light",
    },
    {
      label: "Logo+Nombre Blanco",
      src: "/logos/fonasa/svg/fonasa-blanco.svg",
      format: "svg",
      background: "dark",
    },
  ],
};
