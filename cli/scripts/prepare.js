/**
 * Script de preparación que se ejecuta después de `npm install`.
 * Copia los componentes de src/componentsUI/ a cli/dist/components/
 * para que la CLI pueda leerlos sin necesitar acceso al repo.
 */

import { cpSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cliRoot = resolve(__dirname, "..");
const repoRoot = resolve(cliRoot, "..");
const srcComponents = resolve(repoRoot, "src", "componentsUI");
const destComponents = resolve(cliRoot, "dist", "components");
const srcRegistry = resolve(repoRoot, "registry.json");
const destRegistry = resolve(cliRoot, "dist", "registry.json");

// Copiar componentes
if (existsSync(srcComponents)) {
  mkdirSync(destComponents, { recursive: true });
  cpSync(srcComponents, destComponents, { recursive: true });
  console.log("✅ Componentes copiados a cli/dist/components/");
} else {
  console.warn("⚠️  No se encontró src/componentsUI/");
}

// Copiar registry.json
if (existsSync(srcRegistry)) {
  cpSync(srcRegistry, destRegistry);
  console.log("✅ registry.json copiado a cli/dist/");
} else {
  console.warn("⚠️  No se encontró registry.json. Ejecuta: node scripts/generate-registry.js");
}
