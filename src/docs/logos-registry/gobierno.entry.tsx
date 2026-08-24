import type { LogoEntry } from "./types";

export const gobiernoLogo: LogoEntry = {
  name: "Gobierno de Chile",
  description: "Logotipo oficial del Gobierno de Chile.",
  group: "Institucional",
  variants: [
    {
      label: "Color",
      src: "/logos/gobierno/svg/gob-logo.svg",
      format: "svg",
      background: "light",
    },
    {
      label: "Gris",
      src: "/logos/gobierno/svg/gob-logo-gris.svg",
      format: "svg",
      background: "light",
    },
  ],
};
