import { existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

export interface RegistryEntry {
  name: string;
  file: string;
  description?: string;
  dependencies?: string[];
  internalDeps?: string[];
  group?: string;
  /** Nombre del archivo de test (ej: "Input.test.tsx") */
  testFile?: string;
  /** Archivos de assets estáticos (SVGs, imágenes) que se copian al proyecto */
  assets?: string[];
  /** Agrupación de assets por categoría (para instalación selectiva) */
  assetGroups?: Record<string, string[]>;
  /** Directorio destino para los assets (relativo al proyecto del usuario) */
  assetsDir?: string;
}

/**
 * Carga el registry.json. Busca en este orden:
 * 1. registry.json junto al ejecutable compilado (dist/registry.json)
 * 2. registry.json en la raíz del repositorio (../../registry.json desde dist/)
 * 3. registry.json en la raíz del proyecto actual (para desarrollo local)
 */
export async function loadRegistry(): Promise<RegistryEntry[] | null> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const candidates = [
    // 1. Junto al bundle compilado (dist/registry.json)
    resolve(__dirname, "registry.json"),
    // 2. En la raíz del repo (cuando se ejecuta desde cli/dist/)
    resolve(__dirname, "..", "..", "registry.json"),
    // 3. En el cwd (desarrollo local)
    resolve(process.cwd(), "registry.json"),
  ];

  let registryPath: string | null = null;
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      registryPath = candidate;
      break;
    }
  }

  if (!registryPath) {
    return null;
  }

  try {
    const raw = readFileSync(registryPath, "utf-8");
    return JSON.parse(raw) as RegistryEntry[];
  } catch {
    return null;
  }
}
