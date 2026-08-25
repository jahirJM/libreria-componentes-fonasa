import type { ReactNode } from "react";

export interface ComponentVariant {
  label: string;
  props: Record<string, unknown>;
  render: () => ReactNode;
  usageCode: string;
  /** Si true, el preview se muestra a ancho completo (útil para componentes como Sidebar) */
  responsive?: boolean;
  /** Si true, oculta el footer con label y acciones en el preview */
  noLabel?: boolean;
}

export interface ComponentColor {
  name: string;
  value: string;
  usage: string;
}

export interface ComponentEntry {
  name: string;
  description?: string;
  code: string;
  dependencies?: string[];
  propsInterface?: string;
  colors?: ComponentColor[];
  variants: ComponentVariant[];
  /** Grupo/subsección para agrupar componentes en el sidebar */
  group?: string;
  /** Código fuente del archivo de test (Jest) del componente */
  testCode?: string;
  /** Archivos de assets estáticos (SVGs, imágenes) incluidos con este componente */
  assets?: string[];
  /** Agrupación de assets por categoría (para instalación selectiva vía CLI) */
  assetGroups?: Record<string, string[]>;
  /** Directorio destino para los assets (relativo al proyecto del usuario) */
  assetsDir?: string;
}