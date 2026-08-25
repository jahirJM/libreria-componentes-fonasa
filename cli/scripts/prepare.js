/**
 * Script de preparación que se ejecuta después de `npm install`.
 * Copia los componentes de src/componentsUI/ a cli/dist/components/
 * y los tests de src/tests/ a cli/dist/tests/
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
const srcTests = resolve(repoRoot, "src", "tests");
const destTests = resolve(cliRoot, "dist", "tests");
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

// Copiar tests
if (existsSync(srcTests)) {
  mkdirSync(destTests, { recursive: true });
  cpSync(srcTests, destTests, { recursive: true });
  console.log("✅ Tests copiados a cli/dist/tests/");
} else {
  console.warn("⚠️  No se encontró src/tests/ — los tests no estarán disponibles en el CLI");
}

// Copiar registry.json
if (existsSync(srcRegistry)) {
  cpSync(srcRegistry, destRegistry);
  console.log("✅ registry.json copiado a cli/dist/");
} else {
  console.warn("⚠️  No se encontró registry.json. Ejecuta: node scripts/generate-registry.js");
}

// Copiar assets gráficos institucionales
const assetGroups = [
  {
    sourceDir: resolve(repoRoot, "public", "logos", "fonasa", "svg"),
    files: [
      "mesa-telefonica.svg",
      "consultas-contacto.svg",
      "fonasa-logo-full.svg",
      "fonasa-logo-icon.svg",
      "fonasa-logo-name.svg",
      "fonasa-blanco.svg",
      "twitter-icon.svg",
      "twitter-x-icon.svg",
      "facebook-icon.svg",
      "youtube-icon.svg",
      "instagram-icon.svg",
      "linkedin-icon.svg",
    ],
  },
  {
    sourceDir: resolve(repoRoot, "public", "logos", "gobierno", "svg"),
    files: ["gob-logo.svg", "gob-logo-gris.svg", "ico-clave-unica.svg"],
  },
];
const destAssets = resolve(cliRoot, "dist", "assets");

mkdirSync(destAssets, { recursive: true });
let assetsCopied = 0;
for (const group of assetGroups) {
  for (const file of group.files) {
    const src = resolve(group.sourceDir, file);
    if (existsSync(src)) {
      cpSync(src, resolve(destAssets, file));
      assetsCopied++;
    } else {
      console.warn(`⚠️  Asset no encontrado: ${file}`);
    }
  }
}
if (assetsCopied > 0) {
  console.log(`✅ ${assetsCopied} assets copiados a cli/dist/assets/`);
}
