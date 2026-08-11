export interface LogoVariant {
  /** Nombre descriptivo de la variante (ej: "Horizontal Color") */
  label: string;
  /** Ruta pública del archivo (relativa a /public) */
  src: string;
  /** Formato del archivo */
  format: "svg" | "png";
  /** Fondo recomendado para previsualizar (ej: "white", "dark") */
  background?: "light" | "dark";
  /** URL externa asociada al recurso (ej: link de descarga oficial) */
  url?: string;
}

export interface LogoEntry {
  /** Nombre del logo / institución */
  name: string;
  /** Descripción breve */
  description: string;
  /** Variantes disponibles del logo */
  variants: LogoVariant[];
  /** Grupo/categoría para el sidebar */
  group?: string;
}
