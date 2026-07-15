import type { ReactNode } from "react";

export interface ComponentVariant {
  label: string;
  props: Record<string, unknown>;
  render: () => ReactNode;
  usageCode: string;
  /** Si true, el preview se muestra a ancho completo (útil para componentes como Sidebar) */
  responsive?: boolean;
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
}