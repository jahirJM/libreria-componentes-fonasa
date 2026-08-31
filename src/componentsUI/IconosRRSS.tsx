/**
 * Recursos gráficos institucionales disponibles mediante el CLI.
 *
 * Los SVG se copian a `public/app/imgs/` al ejecutar:
 * `npx fonasa-ui add iconos`
 */

export const ICON_ASSETS = {
  contact: {
    phoneDesk: "/app/imgs/mesa-telefonica.svg",
    contactQuestions: "/app/imgs/consultas-contacto.svg",
  },
  fonasa: {
    fullLogo: "/app/imgs/fonasa-logo-full.svg",
    icon: "/app/imgs/fonasa-logo-icon.svg",
    name: "/app/imgs/fonasa-logo-name.svg",
    whiteLogo: "/app/imgs/fonasa-blanco.svg",
  },
  government: {
    colorLogo: "/app/imgs/gob-logo.svg",
    grayLogo: "/app/imgs/gob-logo-gris.svg",
    claveUnica: "/app/imgs/ico-clave-unica.svg",
  },
  social: {
    twitter: "/app/imgs/twitter-icon.svg",
    twitterX: "/app/imgs/twitter-x-icon.svg",
    facebook: "/app/imgs/facebook-icon.svg",
    youtube: "/app/imgs/youtube-icon.svg",
    instagram: "/app/imgs/instagram-icon.svg",
    linkedIn: "/app/imgs/linkedin-icon.svg",
  },
} as const;

export const SOCIAL_ICONS = ICON_ASSETS.social;

export type IconCategory = keyof typeof ICON_ASSETS;
export type SocialNetwork = keyof typeof SOCIAL_ICONS;
