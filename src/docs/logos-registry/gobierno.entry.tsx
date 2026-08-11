import type { LogoEntry } from "./types";

export const gobiernoLogo: LogoEntry = {
  name: "Gobierno de Chile",
  description: "Logotipo oficial del Gobierno de Chile.",
  group: "Institucional",
  variants: [
    {
      label: "Color (PNG)",
      src: "/logos/gobierno/png/gob-color.png",
      format: "png",
      background: "light",
    },
    {
      label: "Color (SVG)",
      src: "/logos/gobierno/svg/gob-color.svg",
      format: "svg",
      background: "light",
    },
    {
      label: "Blanco (SVG)",
      src: "/logos/gobierno/svg/gob-blanco.svg",
      format: "svg",
      background: "dark",
    },
  ],
};
