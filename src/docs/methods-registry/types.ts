import type { ReactNode } from "react";

export interface MethodEntry {
  /** Nombre del método visible en el sidebar y título */
  name: string;
  /** Descripción breve del método */
  description: string;
  /** Código fuente completo (importado con ?raw) */
  code: string;
  /** Firma(s) de las funciones exportadas */
  signature: string;
  /** Componente de demostración interactiva */
  demo: () => ReactNode;
  /** Código de uso/ejemplo como string */
  usageCode: string;
  /** Grupo/categoría para el sidebar */
  group?: string;
}
