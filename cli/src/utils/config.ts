import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

export interface FonasaUIConfig {
  componentsDir: string;
  typescript: boolean;
  /** Directorio donde se copian los archivos de test (opcional) */
  testsDir?: string;
}

const CONFIG_FILE = "fonasa-ui.json";

export function loadConfig(): FonasaUIConfig | null {
  const configPath = resolve(process.cwd(), CONFIG_FILE);

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    const raw = readFileSync(configPath, "utf-8");
    return JSON.parse(raw) as FonasaUIConfig;
  } catch {
    return null;
  }
}
