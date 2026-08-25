import iconosCode from "../../componentsUI/IconosRRSS.tsx?raw";
import type { ComponentEntry } from "./types";

export const iconosEntry: ComponentEntry = {
  name: "iconos",
  description:
    "Recursos gráficos institucionales de Contacto, Fonasa, Gobierno de Chile, ClaveÚnica y redes sociales. Se instalan como assets SVG en app/imgs/.",
  code: iconosCode,
  colors: [
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Referencia cromática institucional para el uso de los iconos" },
  ],
  propsInterface: `export const ICON_ASSETS = {
  contact: {
    phoneDesk: "app/imgs/mesa-telefonica.svg",
    contactQuestions: "app/imgs/consultas-contacto.svg",
  },
  fonasa: {
    fullLogo: "app/imgs/fonasa-logo-full.svg",
    icon: "app/imgs/fonasa-logo-icon.svg",
    name: "app/imgs/fonasa-logo-name.svg",
    whiteLogo: "app/imgs/fonasa-blanco.svg",
  },
  government: {
    colorLogo: "app/imgs/gob-logo.svg",
    grayLogo: "app/imgs/gob-logo-gris.svg",
    claveUnica: "app/imgs/ico-clave-unica.svg",
  },
  social: {
    twitter: "app/imgs/twitter-icon.svg",
    twitterX: "app/imgs/twitter-x-icon.svg",
    facebook: "app/imgs/facebook-icon.svg",
    youtube: "app/imgs/youtube-icon.svg",
    instagram: "app/imgs/instagram-icon.svg",
    linkedIn: "app/imgs/linkedin-icon.svg",
  },
} as const;

export type IconCategory = keyof typeof ICON_ASSETS;`,
  assets: [
    "mesa-telefonica.svg",
    "consultas-contacto.svg",
    "fonasa-logo-full.svg",
    "fonasa-logo-icon.svg",
    "fonasa-logo-name.svg",
    "fonasa-blanco.svg",
    "gob-logo.svg",
    "gob-logo-gris.svg",
    "ico-clave-unica.svg",
    "twitter-icon.svg",
    "twitter-x-icon.svg",
    "facebook-icon.svg",
    "youtube-icon.svg",
    "instagram-icon.svg",
    "linkedin-icon.svg",
  ],
  assetGroups: {
    contacto: ["mesa-telefonica.svg", "consultas-contacto.svg"],
    fonasa: ["fonasa-logo-full.svg", "fonasa-logo-icon.svg", "fonasa-logo-name.svg", "fonasa-blanco.svg"],
    "gob-chile": ["gob-logo.svg", "gob-logo-gris.svg"],
    "clave-unica": ["ico-clave-unica.svg"],
    rrss: ["twitter-icon.svg", "twitter-x-icon.svg", "facebook-icon.svg", "youtube-icon.svg", "instagram-icon.svg", "linkedin-icon.svg"],
  },
  assetsDir: "app/imgs",
  variants: [
    {
      label: "Recursos gráficos institucionales",
      props: {},
      render: () => (
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <img src="/logos/fonasa/svg/fonasa-logo-icon.svg" alt="Fonasa" width="40" height="40" />
          <img src="/logos/gobierno/svg/gob-logo.svg" alt="Gobierno de Chile" width="76" height="40" />
          <img src="/logos/fonasa/svg/mesa-telefonica.svg" alt="Mesa telefónica" width="76" height="40" />
          <img src="/logos/fonasa/svg/instagram-icon.svg" alt="Instagram" width="28" height="28" />
          <img src="/logos/fonasa/svg/facebook-icon.svg" alt="Facebook" width="28" height="28" />
        </div>
      ),
      usageCode: `import { ICON_ASSETS } from "./components/IconosRRSS";

<img src={ICON_ASSETS.fonasa.fullLogo} alt="Fonasa" />
<img src={ICON_ASSETS.government.colorLogo} alt="Gobierno de Chile" />
<img src={ICON_ASSETS.social.instagram} alt="Instagram" />`,
    },
  ],
};
