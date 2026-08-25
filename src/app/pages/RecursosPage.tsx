import { useState, useEffect, useRef, useCallback } from "react";
import { IoMdHome } from "react-icons/io";
import { LuDownload, LuImage, LuFileCode, LuLink, LuCheck, LuCopy, LuEye, LuCode, LuChevronDown, LuImageDown, LuHammer, LuType } from "react-icons/lu";
import { logosRegistry } from "../../docs/logos-registry";
import type { LogoVariant, LogoEntry } from "../../docs/logos-registry/types";
import { FormBuilderPage } from "./FormBuilderPage";
import { IconBuilderPage } from "./IconBuilderPage";
import { Switch } from "../../componentsUI/Switch";
import { BotonPrimario, BotonOutline } from "../../componentsUI/Botones";
import { fonasaToast } from "../../componentsUI/Toast";
import { CustomModal } from "../../componentsUI/CustomModal";
import twitterIcon from "/logos/fonasa/svg/twitter-icon.svg";
import facebookIcon from "/logos/fonasa/svg/facebook-icon.svg";
import youtubeIcon from "/logos/fonasa/svg/youtube-icon.svg";
import instagramIcon from "/logos/fonasa/svg/instagram-icon.svg";
import fonasaLogoFull from "/logos/fonasa/svg/fonasa-logo-full.svg";
import { FiTerminal } from "react-icons/fi";

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS Y HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

interface FlatVariant {
  parentName: string;
  variant: LogoVariant;
  id: string;
}

type SidebarItem =
  | { type: "home" }
  | { type: "logo"; entry: LogoEntry }
  | { type: "template"; label: string }
  | { type: "formbuilder"; label: string }
  | { type: "iconbuilder"; label: string }
  | { type: "fonts"; label: string };

interface SidebarGroup {
  name: string;
  items: SidebarItem[];
}

function getVariantsForEntry(entry: LogoEntry): FlatVariant[] {
  return entry.variants.map((v) => ({
    parentName: entry.name,
    variant: v,
    id: `${entry.name}-${v.label}`,
  }));
}

function buildSidebarGroups(): SidebarGroup[] {
  const groups: SidebarGroup[] = [];

  // All logos go under a single "Iconos" group, sorted alphabetically by name
  const allLogoItems: SidebarItem[] = logosRegistry
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => ({ type: "logo" as const, entry }));

  groups.push({
    name: "Iconos",
    items: allLogoItems,
  });

  // Builders group
  groups.push({
    name: "Builders",
    items: [
      { type: "template", label: "Template Email" },
      { type: "formbuilder", label: "Form Builder" },
      { type: "iconbuilder", label: "Icon Builder" },
    ],
  });

  // Tipografia group
  groups.push({
    name: "Tipografía",
    items: [
      { type: "fonts", label: "Fuentes" },
    ],
  });

  return groups;
}

function getItemLabel(item: SidebarItem): string {
  if (item.type === "home") return "Inicio";
  if (item.type === "logo") return item.entry.name;
  return item.label;
}

function isSameItem(a: SidebarItem, b: SidebarItem): boolean {
  if (a.type !== b.type) return false;
  if (a.type === "home") return true;
  if (a.type === "logo" && b.type === "logo") return a.entry.name === b.entry.name;
  if (a.type === "template" && b.type === "template") return true;
  if (a.type === "formbuilder" && b.type === "formbuilder") return true;
  if (a.type === "iconbuilder" && b.type === "iconbuilder") return true;
  if (a.type === "fonts" && b.type === "fonts") return true;
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE BUILDER (embebido)
// ═══════════════════════════════════════════════════════════════════════════════

type AlertType = "success" | "error" | "warning";

interface DataRow {
  key: string;
  value: string;
}

interface TemplateParts {
  header: boolean;
  title: string;
  greeting: string;
  body: string;
  infoBox: boolean;
  infoBoxContent: string;
  alert: boolean;
  alertType: AlertType;
  alertText: string;
  dataTable: boolean;
  dataRows: DataRow[];
  ctaButton: boolean;
  ctaText: string;
  ctaUrl: string;
  image: boolean;
  imageUrl: string;
  imageAlt: string;
  separator: boolean;
  disclaimer: boolean;
  socialLinks: boolean;
  includeSvg: boolean;
}

const defaultParts: TemplateParts = {
  header: true,
  title: "Título del correo",
  greeting: "Estimado(a) usuario(a),",
  body: "Contenido del mensaje. Puede usar <strong>negritas</strong> y texto libre.",
  infoBox: false,
  infoBoxContent: "Información importante que deseas destacar al usuario.",
  alert: false,
  alertType: "success",
  alertText: "Estado: Aprobada",
  dataTable: false,
  dataRows: [
    { key: "N° Solicitud", value: "SOL-001" },
    { key: "Tipo", value: "Inscripción" },
  ],
  ctaButton: false,
  ctaText: "Ver mi solicitud",
  ctaUrl: "https://www.fonasa.cl",
  image: false,
  imageUrl: "",
  imageAlt: "Imagen",
  separator: false,
  disclaimer: true,
  socialLinks: true,
  includeSvg: true,
};

const alertStyles: Record<AlertType, { bg: string; border: string; color: string }> = {
  success: { bg: "#e8f5e9", border: "#2e7d32", color: "#1b5e20" },
  error: { bg: "#fbe9e7", border: "#c62828", color: "#b71c1c" },
  warning: { bg: "#fff8e1", border: "#f9a825", color: "#5d4037" },
};

// SVG markup inline for code output when "Incluir SVG" is enabled
const inlineSvgFonasaLogo = `<svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" data-name="Capa 1" viewBox="0 0 175.12 59.82" width="160"><g id="icon"><path d="M38.37 46.65s-6.78-1.99-10.02-8.1c0 0 3.45 4.12 9.02 4.9 5.58.78 7.71.07 9.38 0 .92-.04 2.68-.23 4.49.18 1.63-4.47.79-9.4-2.57-12.56-4.68-4.4-12.47-3.71-17.4 1.54-4.94 5.25-5.15 13.07-.47 17.47s12.47 3.71 17.4-1.54c.24-.26.47-.52.69-.79-2.89.27-6.54.15-10.52-1.1m-7.68-11.04c1.12-.69 2.38-.83 3.71-.53 1.31.3 2.34.94 3.07 1.93.82 1.12.93 2.71-.2 3.76-.78.72-1.79 1.01-2.93 1-2.23 0-4.28-1.46-4.78-3.13-.33-1.12.13-2.42 1.13-3.04Z" style="stroke-width:0;fill:none"/><path d="M23.25 15.97c3.66-.93 6.82-4.77 6.77-8.94 0-2.14-.65-4.03-2.26-5.48-2.34-2.11-5.83-1.91-8.29-.37-2.16 1.36-3.56 3.29-4.19 5.75-.63 2.48-.31 4.84 1.24 6.93 1.39 1.88 4.28 2.73 6.73 2.11m9.99 11.91c-.78-2.39-4.17-11.04-12.41-11.04-9.57 0-19.23 10.23-20.56 19.23s2.46 18 4.83 19.89c0 0-3.6-11.93.66-20.55 1.23-2.49 3.14-4.76 5.39-6.46.03-.34.08-.69.17-1.04.39-1.53 1.26-2.73 2.61-3.58 1.53-.96 3.7-1.08 5.16.23.45.4.78.86 1 1.36 3.28.23 6.45 2.06 8.85 6.23q1.68-2.445 4.29-4.26Zm1.09 13.9c1.14.02 2.15-.27 2.93-1 1.13-1.05 1.02-2.64.2-3.76-.73-.99-1.76-1.63-3.07-1.93-1.33-.3-2.59-.17-3.71.53-1 .62-1.46 1.93-1.13 3.04.5 1.67 2.55 3.13 4.78 3.13Z" style="fill:#29abe3;stroke-width:0"/><path d="M20.1 25.91a4.2 4.2 0 0 0-1-1.36c-1.46-1.31-3.63-1.19-5.16-.23-1.35.85-2.21 2.05-2.61 3.58-.09.35-.15.7-.17 1.04-.09 1.16.2 2.26.95 3.27.87 1.17 2.66 1.7 4.19 1.31 2.28-.58 4.25-2.97 4.21-5.56 0-.74-.12-1.43-.41-2.05m5.63 10.49c-10.03-5.21-15.77.45-15.77.45C3 42.6 7.9 51.41 7.9 51.41c.5-17.9 17.83-15.01 17.83-15.01" style="stroke-width:0;fill:#3d62ab"/><path d="M39.64 24.21c2.54.66 4.73-.94 5.59-3.14.76-1.95.74-4.01-.03-6.17-.78-2.18-2.13-3.86-4.15-4.84-1.81-.87-4.11-.34-5.41 1.15-1.94 2.24-2.16 6.5-.12 9.7 1.02 1.66 2.37 2.84 4.12 3.3" style="stroke-width:0;fill:#a7c943"/><path d="M50.22 27.69c-4.42-3.71-11.03-3.37-15.67-.65-.46.27-.89.55-1.31.84q-2.61 1.815-4.29 4.26c-1.03 1.5-1.81 3.18-2.31 5.02-1.2 4.37-.58 8.52 2.35 12.21 2.63 3.31 8.09 4.82 12.72 3.72 3.38-.8 6.54-2.83 8.87-5.55-.52.08-1.08.15-1.67.21-.22.27-.45.53-.69.79-4.94 5.25-12.73 5.94-17.4 1.54-4.68-4.4-4.47-12.22.47-17.47s12.73-5.94 17.4-1.54c3.36 3.16 4.2 8.09 2.57 12.56.53.12 1.07.29 1.59.53 1.08-2.11 1.69-4.43 1.66-6.82.02-3.77-1.24-7.1-4.28-9.66Z" style="stroke-width:0;fill:#a7c943"/><path d="M52.84 44.17c-.52-.24-1.06-.41-1.59-.53-1.81-.41-3.57-.22-4.49-.18-1.67.07-3.8.78-9.38 0s-9.02-4.9-9.02-4.9c3.23 6.11 10.02 8.1 10.02 8.1 3.98 1.24 7.63 1.37 10.52 1.1.59-.06 1.15-.13 1.67-.21 2.99-.47 4.82-1.28 4.82-1.28-.72-1-1.61-1.66-2.55-2.09Z" style="fill:#29abe3;stroke-width:0"/></g><g id="text"><path d="M88.76 36.05c-3.46.04-6.54 2.83-7.32 6.62-.73 3.58 1.3 6.11 4.92 6.15.41-.05.83-.05 1.22-.15 3.44-.85 5.45-3.14 6.21-6.49.83-3.7-1.27-6.17-5.04-6.13Zm46.71.22c-2.25-.35-4.45-.12-6.49.93-3.2 1.64-5.25 4.13-5.51 7.21-.01 3.13 1.28 4.42 3.76 4.37 2.15-.04 3.77-1.18 5.19-2.67 2.46-2.6 2.72-6.06 3.57-9.29.04-.14-.32-.52-.53-.55Zm31.07-.03c-3.91.66-7.25 3.87-8.02 7.71-.64 3.23 1.45 5.32 4.66 4.64 1.68-.35 3.01-1.29 4.17-2.51 2.58-2.7 2.79-6.29 3.76-9.73-1.63-.45-3.1-.36-4.58-.11Z" style="stroke-width:0;fill:none"/><path d="M172.58 34.2c-3.39-.38-6.74-.31-9.94 1.04-3.84 1.62-6.62 4.23-7.61 8.43-.85 3.61 1.07 6.67 4.45 7.08 3.63.44 6.63-.73 8.95-3.59.2-.24.42-.46.63-.69.04.61-.08 1.1-.23 1.57-.56 1.82.57 3 2.53 2.59.06-.52.07-1.07.19-1.58 1.01-4.26 2.03-8.51 3.07-12.77.12-.51.34-1 .51-1.5v-.19c-.85-.13-1.69-.29-2.54-.38Zm-5.22 11.88c-1.16 1.22-2.49 2.16-4.17 2.51-3.21.68-5.31-1.41-4.66-4.64.77-3.84 4.11-7.06 8.02-7.71 1.48-.25 2.95-.34 4.58.11-.98 3.44-1.19 7.03-3.76 9.73ZM139.4 34.52c-3.9-.65-7.79-.77-11.54.73-3.9 1.56-6.75 4.17-7.78 8.39-.88 3.59.74 6.49 3.99 7.11 3.57.68 6.58-.37 9.01-3.08.33-.37.65-.75.97-1.12.07.03.14.07.21.1-.14.47-.27.94-.42 1.4-.5 1.51.07 2.42 1.65 2.7.6.11.84-.12.97-.71.66-3.07 1.33-6.13 2.03-9.19.47-2.03 1.01-4.05 1.52-6.09-.26-.1-.43-.2-.61-.23Zm-6.98 11.59c-1.41 1.49-3.03 2.63-5.19 2.67-2.48.05-3.77-1.25-3.76-4.37.25-3.08 2.31-5.56 5.51-7.21 2.04-1.05 4.23-1.28 6.49-.93.21.03.57.42.53.55-.85 3.23-1.11 6.69-3.57 9.29Zm-62.07-15.6c2.32-.01 4.64 0 6.97 0 1.29 0 1.84-.6 1.84-1.97-.12-.02-.24-.06-.36-.06-4.1 0-8.21-.03-12.31.01-1.51.01-2.46.92-2.85 2.47-.99 4-1.99 8-2.99 11.99-.94 3.75-1.89 7.5-2.82 11.26-.24.97.24 1.8 1.17 2.05 1.22.33 1.79.03 2.07-1.11.96-3.88 1.93-7.75 2.86-11.64.18-.73.47-1.02 1.28-1.01 2.64.06 5.28.02 7.92.02 1.56 0 2.18-.59 2.34-2.35H64.8c.59-2.35 1.13-4.53 1.7-6.7.53-2 1.78-2.96 3.86-2.97Zm21.59 3.79c-1.72-.29-3.58-.31-5.29.02-4.19.82-7.25 3.19-8.56 7.39-1.3 4.16.63 7.63 4.82 8.76.97.26 2 .31 3 .45 0-.03 0-.05.01-.08.54-.02 1.08-.04 1.62-.07 4.22-.25 8.3-3.34 9.64-7.31 1.51-4.44-.66-8.37-5.25-9.15Zm1.85 7.88c-.76 3.36-2.77 5.64-6.21 6.49-.4.1-.81.1-1.22.15-3.62-.04-5.66-2.57-4.92-6.15.78-3.79 3.86-6.58 7.32-6.62 3.77-.05 5.87 2.43 5.04 6.13Zm20.2-7.93c-3.36-.58-6.27.38-8.78 2.65-.21.19-.43.37-.64.56-.05-.04-.11-.08-.16-.13.18-1.05.35-2.1.56-3.33-.78 0-1.47.05-2.15-.01-.73-.06-.97.26-1.12.93-.88 3.83-1.8 7.65-2.7 11.48-.33 1.41-.66 2.81-1.03 4.37 1 0 1.85-.02 2.7 0 .54.02.78-.2.9-.73.54-2.35 1.12-4.69 1.71-7.02.83-3.3 2.79-5.62 6.11-6.58 3.36-.97 5.28.85 4.54 4.25-.54 2.48-1.18 4.93-1.77 7.4-.41 1.68.41 2.73 2.14 2.65.27-.01.71-.33.77-.59.89-3.6 1.81-7.19 2.55-10.83.54-2.66-.92-4.61-3.6-5.08Zm33.54-.06c-1.7.26-3.26.87-4.43 2.2-1.43 1.61-1.37 3.67.25 5.08.71.61 1.6 1.02 2.41 1.51.78.47 1.67.83 2.34 1.43 1.16 1.02 1.02 2.61-.22 3.54-1.04.79-2.27 1.03-3.52.88-1.4-.16-2.78-.49-4.23-.76-.27.54-.55 1.12-.86 1.73.31.15.5.27.71.34 2.25.74 4.54.86 6.87.5 1.67-.26 3.21-.82 4.41-2.07 1.77-1.86 1.62-4.35-.44-5.88-.81-.6-1.75-1.01-2.64-1.51-.58-.33-1.21-.59-1.73-1-1.21-.93-1.21-2.46.07-3.28.69-.44 1.58-.79 2.38-.8 1.37-.03 2.75.23 4.27.38.2-.41.49-1 .84-1.72-2.21-.85-4.34-.88-6.49-.56Z" style="stroke-width:0;fill:#2c7bc0"/></g><g id="bar"><path d="M78.54 56.39h41.76v3.44H78.54z" style="stroke-width:0;fill:#2c7bc0"/><path d="M120.3 56.39h50.82v3.44H120.3z" style="stroke-width:0;fill:#e84146"/></g></svg>`;

const inlineSvgTwitter = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 -2 20 20"><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g fill="#000" transform="translate(-60 -7521)"><g transform="translate(56 160)"><path d="M10.29 7377c7.547 0 11.675-6.156 11.675-11.495 0-.175 0-.349-.012-.522A8.3 8.3 0 0 0 24 7362.89a8.3 8.3 0 0 1-2.356.637 4.07 4.07 0 0 0 1.804-2.235 8.3 8.3 0 0 1-2.606.98 4.153 4.153 0 0 0-5.806-.175 4 4 0 0 0-1.187 3.86 11.72 11.72 0 0 1-8.457-4.22 4.005 4.005 0 0 0 1.271 5.392 4.1 4.1 0 0 1-1.863-.505v.051c.001 1.923 1.378 3.579 3.292 3.96a4.14 4.14 0 0 1-1.852.069c.537 1.646 2.078 2.773 3.833 2.806A8.32 8.32 0 0 1 4 7375.185a11.75 11.75 0 0 0 6.29 1.812"/></g></g></g></svg>`;

const inlineSvgFacebook = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-5 0 20 20"><g><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g fill="#000" transform="translate(-385 -7399)"><g transform="translate(56 160)"><path d="M335.821 7259v-9h2.733l.446-4h-3.179v-1.948c0-1.03.027-2.052 1.466-2.052h1.458v-2.86c0-.043-1.253-.14-2.52-.14-2.645 0-4.302 1.657-4.302 4.7v2.3H329v4h2.923v9z"/></g></g></g></g></svg>`;

const inlineSvgYoutube = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 -3 20 20"><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g fill="#000" transform="translate(-300 -7442)"><g transform="translate(56 160)"><path d="M251.988 7291.586v-5.612c1.993.938 3.536 1.843 5.36 2.82-1.505.834-3.367 1.77-5.36 2.792m11.103-8.403c-.344-.453-.93-.805-1.553-.922-1.833-.348-13.267-.349-15.099 0q-.752.142-1.328.673c-1.611 1.495-1.106 9.518-.718 10.817.164.562.375.968.64 1.235.343.352.812.594 1.351.703 1.51.312 9.284.486 15.122.047a2.6 2.6 0 0 0 1.39-.712c1.49-1.49 1.388-9.962.195-11.841"/></g></g></g></svg>`;

const inlineSvgInstagram = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g fill="#000" transform="translate(-340 -7439)"><g transform="translate(56 160)"><path d="M289.87 7279.123c-1.628.073-3.04.471-4.179 1.606-1.143 1.14-1.536 2.557-1.61 4.168-.045 1.005-.313 8.601.463 10.593a5.04 5.04 0 0 0 2.91 2.903c.634.246 1.356.412 2.416.461 8.86.401 12.145.183 13.53-3.364.246-.631.415-1.353.462-2.41.405-8.883-.066-10.809-1.61-12.351-1.225-1.222-2.666-2.054-12.382-1.606m.081 17.944c-.97-.043-1.496-.205-1.848-.341a3.26 3.26 0 0 1-1.888-1.883c-.591-1.514-.395-8.703-.342-9.866.051-1.14.282-2.18 1.086-2.985.995-.992 2.28-1.479 11.034-1.084 1.142.052 2.186.282 2.992 1.084.995.993 1.489 2.288 1.087 11.008-.044.968-.206 1.493-.342 1.843-.901 2.308-2.973 2.628-11.779 2.224m8.139-13.377c0 .657.534 1.19 1.194 1.19s1.195-.533 1.195-1.19a1.194 1.194 0 0 0-2.39 0m-9.226 5.298a5.103 5.103 0 0 0 5.11 5.097 5.103 5.103 0 0 0 5.109-5.097 5.1 5.1 0 0 0-5.11-5.096 5.1 5.1 0 0 0-5.11 5.096m1.794 0a3.313 3.313 0 0 1 3.316-3.308 3.313 3.313 0 0 1 3.317 3.308 3.313 3.313 0 0 1-3.317 3.31 3.313 3.313 0 0 1-3.316-3.31"/></g></g></g></svg>`;

function generateHtml(parts: TemplateParts, forPreview = false): string {
  const headerHtml = parts.header
    ? `        <!-- Header -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px">
          <tr>
            <td style="background: #f0f0f0; border-radius: 8px 8px 0 0; padding: 24px 0; text-align: center">
              <a href="https://www.fonasa.cl" target="_blank" title="Fondo Nacional de Salud">
                ${forPreview
      ? `<img src="${fonasaLogoFull}" width="160" alt="Fonasa logo" border="0" style="font-family: sans-serif; font-size: 15px; color: #ffffff" />`
      : (parts.includeSvg
        ? inlineSvgFonasaLogo
        : `<img src="assets/imgs/fonasa-logo-full.svg" width="160" alt="Fonasa logo" border="0" style="font-family: sans-serif; font-size: 15px; color: #ffffff" />`)}
              </a>
            </td>
          </tr>
        </table>`
    : "";

  const infoBoxHtml = parts.infoBox
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; background: #f8f9fa; border-left: 4px solid #0b4582; border-radius: 4px">
                <tr>
                  <td style="padding: 16px 20px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #444444">
                    <strong style="display: block; margin-bottom: 8px; color: #0b4582">Información importante:</strong>
                    ${parts.infoBoxContent}
                  </td>
                </tr>
              </table>` : "";

  const alertStyle = alertStyles[parts.alertType];
  const alertHtml = parts.alert
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; background: ${alertStyle.bg}; border-left: 4px solid ${alertStyle.border}; border-radius: 4px">
                <tr>
                  <td style="padding: 16px 20px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: ${alertStyle.color}">
                    <strong>${parts.alertText}</strong>
                  </td>
                </tr>
              </table>` : "";

  const dataTableHtml = parts.dataTable && parts.dataRows.length > 0
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; background: #f8f9fa; border-left: 4px solid #0b4582; border-radius: 4px">
                <tr>
                  <td style="padding: 16px 20px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #444444">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
${parts.dataRows.map((row) => `                      <tr>
                        <td style="padding: 4px 0; font-weight: 600; width: 140px; color: #0b4582">${row.key}:</td>
                        <td style="padding: 4px 0">${row.value}</td>
                      </tr>`).join("\n")}
                    </table>
                  </td>
                </tr>
              </table>` : "";

  const ctaHtml = parts.ctaButton
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0">
                <tr>
                  <td align="center">
                    <a href="${parts.ctaUrl}" target="_blank" style="display: inline-block; background: #0b4582; color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 6px">
                      ${parts.ctaText}
                    </a>
                  </td>
                </tr>
              </table>` : "";

  const imageHtml = parts.image && parts.imageUrl
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0">
                <tr>
                  <td align="center">
                    <img src="${parts.imageUrl}" alt="${parts.imageAlt}" width="100%" style="max-width: 520px; height: auto; border-radius: 6px; display: block" border="0" />
                  </td>
                </tr>
              </table>` : "";

  const separatorHtml = parts.separator
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0">
                <tr>
                  <td style="border-top: 1px solid #e0e0e0; font-size: 0; line-height: 0">&nbsp;</td>
                </tr>
              </table>` : "";

  const disclaimerHtml = parts.disclaimer
    ? `        <!-- Disclaimer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px">
          <tr>
            <td style="background: #0b4582; border-top: 1px solid #ffffff; padding: 16px 40px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; color: #ffffff; text-align: center; line-height: 1.5">
              Este correo ha sido generado de forma automática por el sistema de Fonasa.
              <strong>Por favor, no responda a este mensaje.</strong> Para consultas, ingrese al sitio web o comuníquese con los canales oficiales de atención.
            </td>
          </tr>
        </table>` : "";

  const socialIconStyle = "margin: 0 6px; filter: invert(18%) sepia(82%) saturate(1500%) hue-rotate(196deg) brightness(30%)";

  const socialHtml = parts.socialLinks
    ? (forPreview
      ? `        <!-- Footer Redes Sociales -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden">
          <tr>
            <td style="background: #ffffff; border-radius: 0 0 8px 8px; padding: 16px 0; text-align: center">
              <a href="https://twitter.com/fonasa" style="text-decoration: none" target="_blank"><img src="${twitterIcon}" alt="Twitter" width="22" height="22" border="0" style="${socialIconStyle}" /></a>
              <a href="https://www.facebook.com/FonasaChile/" style="text-decoration: none" target="_blank"><img src="${facebookIcon}" alt="Facebook" width="22" height="22" border="0" style="${socialIconStyle}" /></a>
              <a href="https://www.youtube.com/channel/UCEb6BZnaMmGaDjoEGElnDMg" style="text-decoration: none" target="_blank"><img src="${youtubeIcon}" alt="YouTube" width="22" height="22" border="0" style="${socialIconStyle}" /></a>
              <a href="https://www.instagram.com/fonasachile/" style="text-decoration: none" target="_blank"><img src="${instagramIcon}" alt="Instagram" width="22" height="22" border="0" style="${socialIconStyle}" /></a>
            </td>
          </tr>
        </table>`
      : (parts.includeSvg
        ? `        <!-- Footer Redes Sociales -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden">
          <tr>
            <td style="background: #ffffff; border-radius: 0 0 8px 8px; padding: 16px 0; text-align: center">
              <a href="https://twitter.com/fonasa" style="text-decoration: none; ${socialIconStyle}" target="_blank">${inlineSvgTwitter}</a>
              <a href="https://www.facebook.com/FonasaChile/" style="text-decoration: none; ${socialIconStyle}" target="_blank">${inlineSvgFacebook}</a>
              <a href="https://www.youtube.com/channel/UCEb6BZnaMmGaDjoEGElnDMg" style="text-decoration: none; ${socialIconStyle}" target="_blank">${inlineSvgYoutube}</a>
              <a href="https://www.instagram.com/fonasachile/" style="text-decoration: none; ${socialIconStyle}" target="_blank">${inlineSvgInstagram}</a>
            </td>
          </tr>
        </table>`
        : `        <!-- Footer Redes Sociales -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden">
          <tr>
            <td style="background: #ffffff; border-radius: 0 0 8px 8px; padding: 16px 0; text-align: center">
              <a href="https://twitter.com/fonasa" style="text-decoration: none" target="_blank"><img src="assets/imgs/twitter-icon.svg" alt="Twitter" width="22" height="22" border="0" style="${socialIconStyle}" /></a>
              <a href="https://www.facebook.com/FonasaChile/" style="text-decoration: none" target="_blank"><img src="assets/imgs/facebook-icon.svg" alt="Facebook" width="22" height="22" border="0" style="${socialIconStyle}" /></a>
              <a href="https://www.youtube.com/channel/UCEb6BZnaMmGaDjoEGElnDMg" style="text-decoration: none" target="_blank"><img src="assets/imgs/youtube-icon.svg" alt="YouTube" width="22" height="22" border="0" style="${socialIconStyle}" /></a>
              <a href="https://www.instagram.com/fonasachile/" style="text-decoration: none" target="_blank"><img src="assets/imgs/instagram-icon.svg" alt="Instagram" width="22" height="22" border="0" style="${socialIconStyle}" /></a>
            </td>
          </tr>
        </table>`)) : "";

  return `<html xmlns="http://www.w3.org/1999/xhtml">
  <body width="100%" bgcolor="#F0F2F3" style="margin: 0; padding: 0">
    <center style="width: 100%; background: #ffffff; text-align: left">
      <div style="margin: auto; max-width: 600px; padding-top: 40px; padding-bottom: 40px">
${headerHtml}
        <!-- Body -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0">
          <tr>
            <td style="background-color: #ffffff; padding: 32px 40px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333">
              <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #0b4582; font-weight: 600">${parts.title}</h2>
              <p style="margin: 0 0 16px 0">${parts.greeting}</p>
              <p style="margin: 0 0 16px 0">${parts.body}</p>${infoBoxHtml}${alertHtml}${dataTableHtml}${imageHtml}${ctaHtml}${separatorHtml}
              <p style="margin: 24px 0 0 0">Atentamente,<br /><strong>Fondo Nacional de Salud</strong></p>
            </td>
          </tr>
        </table>
${disclaimerHtml}
${socialHtml}
      </div>
    </center>
  </body>
</html>`;
}

function TemplateBuilder({ onNavigateToIconos, onGoHome }: { onNavigateToIconos: () => void; onGoHome: () => void }) {
  const [parts, setParts] = useState<TemplateParts>(defaultParts);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [showSvgModal, setShowSvgModal] = useState(false);
  const svgModalShownRef = useRef(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const previewHtml = generateHtml(parts, true);
  const codeHtml = generateHtml(parts, false);

  function updatePart<K extends keyof TemplateParts>(key: K, value: TemplateParts[K]) {
    setParts((prev) => ({ ...prev, [key]: value }));
  }

  function addDataRow() {
    setParts((prev) => ({ ...prev, dataRows: [...prev.dataRows, { key: "", value: "" }] }));
  }

  function updateDataRow(index: number, field: "key" | "value", val: string) {
    setParts((prev) => {
      const rows = [...prev.dataRows];
      rows[index] = { ...rows[index], [field]: val };
      return { ...prev, dataRows: rows };
    });
  }

  function removeDataRow(index: number) {
    setParts((prev) => ({ ...prev, dataRows: prev.dataRows.filter((_, i) => i !== index) }));
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codeHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silently fail */ }
  }

  return (
    <>
      <CustomModal size="sm" title="Incluir SVG inline" showModal={showSvgModal} onClose={() => setShowSvgModal(false)}>
        <div className="space-y-3">
          <p className="text-sm text-gray-700">
            Esta opción incrusta el código SVG de los iconos directamente en el HTML generado.
          </p>
          <p className="text-sm text-gray-700">
            Esto permite crear templates de email sin dependencias adicionales ni necesidad de instalar paquetes de iconos, aunque el código resultante es más extenso y difícil de leer.
          </p>
          <p className="text-sm text-gray-500">
            Si prefieres usar rutas a archivos, desactiva esta opción e instala el paquete de iconos con <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">npx fonasa-ui add iconos</code>.
          </p>
        </div>
      </CustomModal>
      <div className="flex flex-1 overflow-hidden">
        {/* Config panel */}
        <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto p-5 flex flex-col gap-4">
          <div>
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0572CE] transition-colors mb-2"
              title="Volver al inicio"
            >
              <IoMdHome className="size-4" />
              <span className="font-medium">Inicio</span>
            </button>
            <h2 className="text-base font-semibold text-gray-800">Template Builder</h2>
            <p className="text-xs text-gray-400 mt-0.5">Configura las partes del email</p>
          </div>

          {/* Estructura */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Estructura</p>
            <ToggleRow label="Header (Logo)" checked={parts.header} onChange={(v) => updatePart("header", v)} />
            <ToggleRow label="Disclaimer" checked={parts.disclaimer} onChange={(v) => updatePart("disclaimer", v)} />
            <ToggleRow label="Redes Sociales" checked={parts.socialLinks} onChange={(v) => updatePart("socialLinks", v)} />
            <ToggleRow label="Separador" checked={parts.separator} onChange={(v) => updatePart("separator", v)} />
            <ToggleRow label="Incluir SVG" checked={parts.includeSvg} onChange={(v) => {
              updatePart("includeSvg", v);
              if (v && !svgModalShownRef.current) {
                svgModalShownRef.current = true;
                setShowSvgModal(true);
              }
            }} />
            {!parts.includeSvg && (
              <p className="text-xs text-gray-400">
                Deberá instalar el paquete de iconos.{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToIconos(); }} className="text-[#0572CE] hover:underline">Ver iconos disponibles</a>
              </p>
            )}
          </div>

          {/* Contenido */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contenido</p>
            <fieldset className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Título</label>
              <input type="text" value={parts.title} onChange={(e) => updatePart("title", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" />
            </fieldset>
            <fieldset className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Saludo</label>
              <input type="text" value={parts.greeting} onChange={(e) => updatePart("greeting", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" />
            </fieldset>
            <fieldset className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Cuerpo</label>
              <textarea value={parts.body} onChange={(e) => updatePart("body", e.target.value)} rows={3} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors resize-none" />
              <p className="text-xs text-gray-400">Soporta HTML: &lt;strong&gt;, &lt;a&gt;, etc.</p>
            </fieldset>
          </div>

          {/* Bloques opcionales */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bloques</p>

            {/* Info Box */}
            <ToggleRow label="Info Box (destacado)" checked={parts.infoBox} onChange={(v) => updatePart("infoBox", v)} />
            {parts.infoBox && (
              <textarea value={parts.infoBoxContent} onChange={(e) => updatePart("infoBoxContent", e.target.value)} rows={2} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors resize-none" placeholder="Texto del cuadro informativo..." />
            )}

            {/* Alerta */}
            <ToggleRow label="Alerta de estado" checked={parts.alert} onChange={(v) => updatePart("alert", v)} />
            {parts.alert && (
              <div className="space-y-2 pl-1">
                <div className="flex gap-1">
                  {(["success", "error", "warning"] as AlertType[]).map((t) => (
                    <button key={t} onClick={() => updatePart("alertType", t)} className={`flex-1 text-xs font-medium py-1.5 rounded-md border transition-colors ${parts.alertType === t ? (t === "success" ? "bg-green-50 border-green-300 text-green-700" : t === "error" ? "bg-red-50 border-red-300 text-red-700" : "bg-yellow-50 border-yellow-300 text-yellow-700") : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                      {t === "success" ? "Éxito" : t === "error" ? "Error" : "Aviso"}
                    </button>
                  ))}
                </div>
                <input type="text" value={parts.alertText} onChange={(e) => updatePart("alertText", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="Texto de la alerta..." />
              </div>
            )}

            {/* Tabla de datos */}
            <ToggleRow label="Tabla de datos" checked={parts.dataTable} onChange={(v) => updatePart("dataTable", v)} />
            {parts.dataTable && (
              <div className="space-y-2 pl-1">
                {parts.dataRows.map((row, i) => (
                  <div key={i} className="flex gap-1.5 items-center">
                    <input type="text" value={row.key} onChange={(e) => updateDataRow(i, "key", e.target.value)} className="flex-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0572CE]" placeholder="Clave" />
                    <input type="text" value={row.value} onChange={(e) => updateDataRow(i, "value", e.target.value)} className="flex-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0572CE]" placeholder="Valor" />
                    <button onClick={() => removeDataRow(i)} className="text-gray-400 hover:text-red-500 text-xs px-1 transition-colors">✕</button>
                  </div>
                ))}
                <button onClick={addDataRow} className="text-xs text-[#0572CE] hover:text-[#0460ad] font-medium transition-colors">+ Agregar fila</button>
              </div>
            )}

            {/* Botón CTA */}
            <ToggleRow label="Botón CTA" checked={parts.ctaButton} onChange={(v) => updatePart("ctaButton", v)} />
            {parts.ctaButton && (
              <div className="space-y-2 pl-1">
                <input type="text" value={parts.ctaText} onChange={(e) => updatePart("ctaText", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="Texto del botón" />
                <input type="text" value={parts.ctaUrl} onChange={(e) => updatePart("ctaUrl", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="https://..." />
              </div>
            )}

            {/* Imagen */}
            <ToggleRow label="Imagen" checked={parts.image} onChange={(v) => updatePart("image", v)} />
            {parts.image && (
              <div className="space-y-2 pl-1">
                <input type="text" value={parts.imageUrl} onChange={(e) => updatePart("imageUrl", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="URL de la imagen" />
                <input type="text" value={parts.imageAlt} onChange={(e) => updatePart("imageAlt", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="Texto alternativo" />
              </div>
            )}
          </div>

          {/* Copiar */}
          <BotonPrimario
            label={copied ? "Copiado" : "Copiar HTML"}
            icon={copied ? LuCheck : LuCopy}
            onClick={handleCopy}
            customClass="mt-auto w-full"
          />
        </div>

        {/* Preview panel */}
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
          <div className="flex items-center gap-1 px-5 pt-4 pb-2">
            <button onClick={() => setView("preview")} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${view === "preview" ? "bg-[#0572CE] text-white" : "text-gray-500 hover:bg-gray-200"}`}>
              <LuEye className="size-3.5" /> Preview
            </button>
            <button onClick={() => setView("code")} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${view === "code" ? "bg-[#0572CE] text-white" : "text-gray-500 hover:bg-gray-200"}`}>
              <LuCode className="size-3.5" /> Código
            </button>
          </div>
          <div className="flex-1 overflow-auto p-5">
            {view === "preview" ? (
              <div className="mx-auto max-w-160 rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white relative">
                {iframeLoading && (
                  <div className="absolute inset-0 bg-white p-6 animate-pulse z-10">
                    {/* Header skeleton */}
                    <div className="flex justify-center mb-6">
                      <div className="h-10 w-40 bg-gray-200 rounded" />
                    </div>
                    {/* Title skeleton */}
                    <div className="h-5 w-48 bg-gray-200 rounded mb-4" />
                    {/* Greeting skeleton */}
                    <div className="h-4 w-36 bg-gray-200 rounded mb-3" />
                    {/* Body lines skeleton */}
                    <div className="space-y-2 mb-6">
                      <div className="h-3 w-full bg-gray-200 rounded" />
                      <div className="h-3 w-5/6 bg-gray-200 rounded" />
                      <div className="h-3 w-4/6 bg-gray-200 rounded" />
                    </div>
                    {/* Signature skeleton */}
                    <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-40 bg-gray-200 rounded mb-8" />
                    {/* Footer skeleton */}
                    <div className="h-12 w-full bg-gray-100 rounded mb-3" />
                    {/* Social icons skeleton */}
                    <div className="flex justify-center gap-3">
                      <div className="h-6 w-6 bg-gray-200 rounded-full" />
                      <div className="h-6 w-6 bg-gray-200 rounded-full" />
                      <div className="h-6 w-6 bg-gray-200 rounded-full" />
                      <div className="h-6 w-6 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                )}
                <iframe
                  srcDoc={previewHtml}
                  title="Template Preview"
                  className={`w-full h-150 border-0 transition-opacity duration-300 ${iframeLoading ? "opacity-0" : "opacity-100"}`}
                  onLoad={() => setIframeLoading(false)}
                />
              </div>
            ) : (
              <pre className="mx-auto max-w-200 rounded-lg border border-gray-200 bg-white p-4 text-xs text-gray-700 overflow-auto whitespace-pre-wrap font-mono leading-relaxed">{codeHtml}</pre>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
      <Switch checked={checked} onChange={onChange} tamano="sm" variante="primary" />
    </label>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGO VIEWER (embebido)
// ═══════════════════════════════════════════════════════════════════════════════

function LogoViewer({ entry, onGoHome }: { entry: LogoEntry; onGoHome: () => void }) {
  const variants = getVariantsForEntry(entry);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0]?.id ?? "");
  const [animKey, setAnimKey] = useState(0);
  const selected = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const [urlCopied, setUrlCopied] = useState(false);
  const [installCommandCopied, setInstallCommandCopied] = useState(false);
  const [groupCommandCopied, setGroupCommandCopied] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const installCommand = "npx fonasa-ui add iconos";

  // Map entry group/name to CLI flag
  const groupFlagMap: Record<string, string> = {
    "Contacto": "--contacto",
    "Fonasa": "--fonasa",
    "Gob Chile": "--gob-chile",
    "ClaveÚnica": "--clave-unica",
    "Redes Sociales": "--rrss",
  };
  const groupFlag = groupFlagMap[entry.group || entry.name] || null;
  const groupInstallCommand = groupFlag ? `npx fonasa-ui add iconos ${groupFlag}` : null;

  // Reset cuando cambia la organización
  useEffect(() => {
    const newVariants = getVariantsForEntry(entry);
    setSelectedVariantId(newVariants[0]?.id ?? "");
    setAnimKey((k) => k + 1);
    setImageLoading(true);
  }, [entry.name]);

  // Reset loading al cambiar variante
  useEffect(() => {
    setImageLoading(true);
  }, [selectedVariantId]);

  async function handleDownload() {
    if (!selected) return;
    setDownloading(true);
    try {
      const response = await fetch(selected.variant.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = selected.variant.src.split("/").pop() || "logo";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback al método directo
      const link = document.createElement("a");
      link.href = selected.variant.src;
      link.download = selected.variant.src.split("/").pop() || "logo";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(false);
    }
  }

  async function handleCopyUrl() {
    if (!selected?.variant.url) return;
    try {
      await navigator.clipboard.writeText(selected.variant.url);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    } catch {
      // silently fail
    }
  }

  async function handleCopyInstallCommand() {
    try {
      await navigator.clipboard.writeText(installCommand);
      fonasaToast.success("Comando copiado");
      setInstallCommandCopied(true);
      setTimeout(() => setInstallCommandCopied(false), 2000);
    } catch {
      // silently fail
    }
  }

  async function handleCopyGroupCommand() {
    if (!groupInstallCommand) return;
    try {
      await navigator.clipboard.writeText(groupInstallCommand);
      fonasaToast.success("Comando copiado");
      setGroupCommandCopied(true);
      setTimeout(() => setGroupCommandCopied(false), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 lg:px-8 min-h-full">
      <div className="max-w-5xl">
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0572CE] transition-colors mb-3"
          title="Volver al inicio"
        >
          <IoMdHome className="size-4" />
          <span className="font-medium">Inicio</span>
        </button>
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
          Iconos
        </p>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-[#e2e8f0] mb-2">
          {entry.name}
        </h1>
        <p className="text-gray-500 dark:text-[#94a3b8] mb-5">
          {entry.description}
        </p>
        {entry.detail &&
          <p className="text-gray-500 text-xs! text-gray-400! mb-5">
            {entry.detail}
          </p>
        }
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FiTerminal className="size-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700 dark:text-[#e2e8f0]">
              Instalación
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-[#94a3b8] mb-3">
            Instala el paquete completo de iconos institucionales.
          </p>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-[#1e3044] bg-gray-50 dark:bg-[#111d2a] px-3 py-2">
            <code className="text-sm text-gray-700 dark:text-[#e2e8f0] font-mono flex-1 truncate">
              {installCommand}
            </code>
            <button
              type="button"
              onClick={handleCopyInstallCommand}
              className="shrink-0 p-1.5 rounded-md text-gray-400 hover:text-[#0572CE] hover:bg-gray-100 transition-colors"
              title="Copiar comando"
              aria-label="Copiar comando de instalación"
            >
              {installCommandCopied ? (
                <LuCheck className="size-4 text-green-600" />
              ) : (
                <LuCopy className="size-4" />
              )}
            </button>
          </div>
          {groupInstallCommand && (
            <>
              <p className="text-sm text-gray-500 dark:text-[#94a3b8] mt-4 mb-3">
                O solo los iconos de <span className="font-medium text-gray-700">{entry.name}</span>:
              </p>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-[#1e3044] bg-gray-50 dark:bg-[#111d2a] px-3 py-2">
                <code className="text-sm text-gray-700 dark:text-[#e2e8f0] font-mono flex-1 truncate">
                  {groupInstallCommand}
                </code>
                <button
                  type="button"
                  onClick={handleCopyGroupCommand}
                  className="shrink-0 p-1.5 rounded-md text-gray-400 hover:text-[#0572CE] hover:bg-gray-100 transition-colors"
                  title="Copiar comando"
                  aria-label="Copiar comando de instalación por grupo"
                >
                  {groupCommandCopied ? (
                    <LuCheck className="size-4 text-green-600" />
                  ) : (
                    <LuCopy className="size-4" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          {/* Showcase */}
          <div className="flex flex-col items-center gap-5">
            <div key={`${entry.name}-${selectedVariantId}-${animKey}`}>
              <div
                className={`relative flex items-center justify-center w-64 h-64 lg:w-80 lg:h-80 rounded-2xl border transition-colors ${selected?.variant.background === "dark" ? "bg-gray-800 border-gray-700" : selected?.variant.background === "light" || !selected?.variant.background ? "bg-gray-50 border-gray-200" : "border-gray-200"
                  }`}
                style={selected?.variant.background && selected.variant.background !== "dark" && selected.variant.background !== "light" ? { backgroundColor: selected.variant.background } : undefined}
              >
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-[#0572CE]"></div>
                  </div>
                )}
                <img
                  src={selected?.variant.src}
                  alt={selected?.variant.label}
                  className={`w-full h-full object-contain p-6 transition-opacity duration-200 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                  onLoad={() => setImageLoading(false)}
                />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">{selected?.variant.label}</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full">
                  {selected?.variant.format === "svg" ? <LuFileCode className="size-3" /> : <LuImage className="size-3" />}
                  {selected?.variant.format.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {downloading ? (
                <button
                  type="button"
                  disabled
                  className="inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white bg-[#0572CE] opacity-70 cursor-not-allowed"
                >
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Descargando...
                </button>
              ) : (
                <BotonPrimario
                  label="Descargar"
                  icon={LuDownload}
                  onClick={handleDownload}
                />
              )}
              {selected?.variant.url && (
                <BotonOutline
                  label={urlCopied ? "Copiado" : "URL"}
                  icon={urlCopied ? LuCheck : LuLink}
                  onClick={handleCopyUrl}
                />
              )}
            </div>
          </div>

          {/* Grid variantes */}
          <div className="w-full lg:w-auto lg:flex-1 max-w-md">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 text-center">Variantes</p>
            <div className="grid grid-cols-2 gap-3">
              {variants.map((item) => {
                const isActive = item.id === selected?.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedVariantId(item.id); setAnimKey((k) => k + 1); }}
                    className={`group relative flex flex-col items-center justify-center w-full p-3 rounded-xl border transition-all duration-200 ${isActive ? "border-[#0572CE] bg-blue-50/50 ring-1 ring-[#0572CE]/20" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                  >
                    <div
                      className={`flex items-center justify-center w-full h-14 rounded-lg mb-2 ${item.variant.background === "dark" ? "bg-gray-700" : item.variant.background === "light" || !item.variant.background ? "bg-gray-50" : ""}`}
                      style={item.variant.background && item.variant.background !== "dark" && item.variant.background !== "light" ? { backgroundColor: item.variant.background } : undefined}
                    >
                      <img src={item.variant.src} alt={item.variant.label} className="max-h-9 max-w-[85%] object-contain" />
                    </div>
                    <p className={`text-xs font-medium text-center leading-tight line-clamp-2 ${isActive ? "text-[#0572CE]" : "text-gray-500"}`}>
                      {item.variant.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUENTES
// ═══════════════════════════════════════════════════════════════════════════════

const robotoWeights = [
  { weight: 100, name: "Thin" },
  { weight: 300, name: "Light" },
  { weight: 400, name: "Regular" },
  { weight: 500, name: "Medium" },
  { weight: 700, name: "Bold" },
  { weight: 900, name: "Black" },
];

function FontsSection({ onGoHome }: { onGoHome: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto p-8 lg:px-8">
      <div className="max-w-3xl">
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0572CE] transition-colors mb-3"
          title="Volver al inicio"
        >
          <IoMdHome className="size-4" />
          <span className="font-medium">Inicio</span>
        </button>
        <p className="text-xs font-semibold text-[#0572CE] uppercase tracking-widest mb-2">Tipografía</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fuentes</h1>
        <p className="text-sm text-gray-500 mb-8">
          La plataforma utiliza <strong>Roboto</strong> como fuente principal. Se carga desde Google Fonts con todos los pesos disponibles.
        </p>

        {/* Specimen */}
        <div className="rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Roboto</h2>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            Roboto es una fuente sans-serif diseñada por Google. Ofrece un equilibrio entre forma geométrica y curvas amigables, ideal para interfaces digitales.
          </p>

          <div className="space-y-4">
            {robotoWeights.map((w) => (
              <div key={w.weight} className="flex items-baseline gap-4 border-b border-gray-100 pb-3 last:border-0">
                <span className="text-xs text-gray-400 w-20 shrink-0">{w.weight} — {w.name}</span>
                <p className="text-xl text-gray-800" style={{ fontWeight: w.weight }}>
                  El veloz murciélago hindú comía feliz cardillo y kiwi.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Escala de tamaños */}
        <div className="rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Escala de tamaños</h2>
          <div className="space-y-3">
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-xs</code>
              <span className="text-xs text-gray-800">12px — Labels, metadata, tooltips</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-sm</code>
              <span className="text-sm text-gray-800">14px — Texto de soporte, inputs</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-base</code>
              <span className="text-base text-gray-800">16px — Párrafos, contenido principal</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-lg</code>
              <span className="text-lg text-gray-800">18px — Subtítulos</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-xl</code>
              <span className="text-xl text-gray-800">20px — Títulos de sección</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-2xl</code>
              <span className="text-2xl text-gray-800">24px — Títulos secundarios</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-3xl</code>
              <span className="text-3xl text-gray-800">30px — Títulos de página</span>
            </div>
            <div className="flex items-baseline gap-4">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-4xl</code>
              <span className="text-4xl text-gray-800">36px — Heroes</span>
            </div>
          </div>
        </div>

        {/* Instalación */}
        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Instalación</h2>
          <p className="text-sm text-gray-600 mb-3">
            Agregar en el <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">index.html</code> del proyecto:
          </p>
          <pre className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono overflow-x-auto whitespace-pre leading-relaxed">
            {`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />`}
          </pre>
          <p className="text-sm text-gray-600 mt-4 mb-3">
            En <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">index.css</code> (Tailwind 4):
          </p>
          <pre className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono overflow-x-auto whitespace-pre leading-relaxed">
            {`@theme {
  --font-sans: "Roboto", sans-serif;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME / LANDING DE RECURSOS
// ═══════════════════════════════════════════════════════════════════════════════

interface ResourceSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  items?: string[];
  installCommand?: string;
}

function ResourcesHome({ onNavigate }: { onNavigate: (item: SidebarItem) => void }) {
  const sections: ResourceSection[] = [
    {
      title: "Iconos",
      description: "Logotipos institucionales, iconos de contacto, gobierno y redes sociales en formato SVG y PNG listos para usar.",
      icon: <LuImageDown className="size-6 text-[#0572CE]" />,
    },
    {
      title: "Builders",
      description: "Herramientas visuales para construir templates de email, formularios e iconos personalizados.",
      icon: <LuHammer className="size-6 text-[#0572CE]" />,
    },
    {
      title: "Tipografía",
      description: "Fuente institucional Roboto con todos sus pesos y la escala de tamaños estandarizada del sistema de diseño.",
      icon: <LuType className="size-6 text-[#0572CE]" />,
    },
  ];

  const handleSectionClick = (sectionTitle: string) => {
    if (sectionTitle === "Iconos") {
      const firstEntry = logosRegistry[0];
      if (firstEntry) onNavigate({ type: "logo", entry: firstEntry });
    } else if (sectionTitle === "Builders") {
      onNavigate({ type: "template", label: "Template Email" });
    } else if (sectionTitle === "Tipografía") {
      onNavigate({ type: "fonts", label: "Fuentes" });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:px-8">
      <div className="max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
          Recursos
        </p>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Recursos de diseño
        </h1>
        <p className="text-gray-500 mb-8">
          Iconos, herramientas y tipografía para usar en tus proyectos institucionales.
        </p>

        {/* Section cards */}
        <div className="grid grid-cols-1 gap-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-gray-200 p-6 hover:border-[#0572CE]/30 hover:shadow-sm transition-all cursor-pointer group"
              onClick={() => handleSectionClick(section.title)}
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 shrink-0 group-hover:bg-blue-100 transition-colors">
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-[#0572CE] transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">{section.description}</p>


                  {section.installCommand && (
                    <div className="rounded-lg bg-gray-900 px-4 py-2.5">
                      <code className="text-xs text-green-400 font-mono">{section.installCommand}</code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PÁGINA PRINCIPAL: RECURSOS
// ═══════════════════════════════════════════════════════════════════════════════

export function RecursosPage() {
  const sidebarGroups = buildSidebarGroups();

  const [activeItem, setActiveItem] = useState<SidebarItem>({ type: "home" });
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<{ top: number; height: number; opacity: number }>({ top: 0, height: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLElement>("[data-active='true']");
    if (activeEl) {
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      setIndicator({
        top: elRect.top - navRect.top,
        height: elRect.height,
        opacity: 1,
      });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timer);
  }, [activeItem, updateIndicator]);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sidebarGroups.forEach((g) => (initial[g.name] = true));
    return initial;
  });

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
    setTimeout(updateIndicator, 220);
  };

  return (
    <>
      {/* ─── Sidebar izquierdo ─── */}
      <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-200 dark:border-[#1e3044] bg-gray-100 dark:bg-[#061018] p-4 transition-colors duration-200">
        <div className="ml-3 mt-2 border-l-2 border-gray-300 dark:border-[#1e3044] pl-3">
          <nav ref={navRef} className="relative flex flex-col gap-0.5 text-sm font-medium">
            {/* Sliding indicator */}
            <div
              className="absolute left-0 right-0 rounded-lg bg-[#0572CE] pointer-events-none z-0 transition-all duration-250 ease-in-out"
              style={{
                top: indicator.top,
                height: indicator.height,
                opacity: indicator.opacity,
              }}
            />
            {/* Groups */}
            {sidebarGroups.map((group) => {
              const groupKey = group.name;
              const isOpen = openGroups[groupKey] ?? true;
              return (
                <div key={group.name} className="mt-1">
                  <button
                    type="button"
                    onClick={() => toggleGroup(groupKey)}
                    className="relative z-10 w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm text-gray-900 dark:text-[#e2e8f0] hover:bg-[#0572CE]/10 transition-colors duration-100 group"
                  >
                    <span className="font-semibold">{group.name}</span>
                    <LuChevronDown
                      className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-200 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-0.5 pl-3 mt-0.5">
                        {/* Render items */}
                        {group.items.map((item) => {
                          const label = getItemLabel(item);
                          const isActive = isSameItem(item, activeItem);
                          return (
                            <button
                              key={label}
                              data-active={isActive}
                              onClick={() => setActiveItem(item)}
                              className={`relative z-10 w-full text-left rounded-lg px-3 py-1.5 text-sm transition-colors duration-100 ${isActive
                                ? "text-white font-semibold"
                                : "text-[#0572CE] hover:bg-[#0572CE]/10"
                                }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ─── Contenido principal ─── */}
      <div className="flex-1 lg:ml-64 overflow-hidden min-h-[calc(100vh-3.5rem)] flex flex-col">
        {activeItem.type === "home" ? (
          <ResourcesHome onNavigate={setActiveItem} />
        ) : activeItem.type === "logo" ? (
          <LogoViewer entry={activeItem.entry} onGoHome={() => setActiveItem({ type: "home" })} />
        ) : activeItem.type === "formbuilder" ? (
          <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="px-6 pt-6">
              <button
                type="button"
                onClick={() => setActiveItem({ type: "home" })}
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0572CE] transition-colors mb-3"
                title="Volver al inicio"
              >
                <IoMdHome className="size-4" />
                <span className="font-medium">Inicio</span>
              </button>
            </div>
            <FormBuilderPage />
          </div>
        ) : activeItem.type === "iconbuilder" ? (
          <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="px-6 pt-6">
              <button
                type="button"
                onClick={() => setActiveItem({ type: "home" })}
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0572CE] transition-colors mb-3"
                title="Volver al inicio"
              >
                <IoMdHome className="size-4" />
                <span className="font-medium">Inicio</span>
              </button>
            </div>
            <IconBuilderPage />
          </div>
        ) : activeItem.type === "fonts" ? (
          <FontsSection onGoHome={() => setActiveItem({ type: "home" })} />
        ) : (
          <TemplateBuilder onGoHome={() => setActiveItem({ type: "home" })} onNavigateToIconos={() => {
            const rrssEntry = logosRegistry.find((e) => e.name === "Redes Sociales");
            if (rrssEntry) setActiveItem({ type: "logo", entry: rrssEntry });
          }} />
        )}
      </div>
    </>
  );
}
