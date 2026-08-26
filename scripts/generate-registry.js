/**
 * Script para generar registry.json a partir de los archivos .entry.tsx
 * 
 * Uso: node scripts/generate-registry.js
 * 
 * Lee cada archivo en src/docs/registry/*.entry.tsx y extrae:
 * - name
 * - description
 * - dependencies
 * - group
 * - internalDeps (extraído del patrón "Utiliza: X, Y." en la description)
 * - file (nombre del archivo .tsx del componente)
 * - testFile (nombre del archivo .test.tsx si existe en src/tests/)
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");

const registryDir = resolve(rootDir, "src/docs/registry");
const componentsDir = resolve(rootDir, "src/componentsUI");
const testsDir = resolve(rootDir, "src/tests");
const outputPath = resolve(rootDir, "registry.json");

// Obtener todos los archivos de componentes disponibles
const componentFiles = readdirSync(componentsDir).filter((f) =>
  f.endsWith(".tsx")
);

// Obtener todos los archivos de test disponibles
let testFiles = [];
try {
  testFiles = readdirSync(testsDir).filter((f) =>
    f.endsWith(".test.tsx") || f.endsWith(".test.ts")
  );
} catch {
  // Si no existe la carpeta de tests, no pasa nada
}

// Obtener todos los entry files
const entryFiles = readdirSync(registryDir).filter((f) =>
  f.endsWith(".entry.tsx")
);

const registry = [];

for (const entryFile of entryFiles) {
  const content = readFileSync(resolve(registryDir, entryFile), "utf-8");

  // Extraer el nombre
  const nameMatch = content.match(/name:\s*["'`]([^"'`]+)["'`]/);
  if (!nameMatch) continue;
  const name = nameMatch[1];

  // Extraer description
  const descMatch = content.match(/description:\s*\n?\s*["'`]([^"'`]+)["'`]/s) ||
                    content.match(/description:\s*["'`]([^"'`]+)["'`]/);
  const description = descMatch ? descMatch[1].replace(/\s+/g, " ").trim() : undefined;

  // Extraer group
  const groupMatch = content.match(/group:\s*["'`]([^"'`]+)["'`]/);
  const group = groupMatch ? groupMatch[1] : undefined;

  // Extraer dependencies
  const depsMatch = content.match(/dependencies:\s*\[([^\]]*)\]/);
  let dependencies = undefined;
  if (depsMatch) {
    dependencies = depsMatch[1]
      .match(/["'`]([^"'`]+)["'`]/g)
      ?.map((d) => d.replace(/["'`]/g, ""));
  }

  // Extraer archivo del componente (del import ?raw o import normal)
  const rawImportMatch = content.match(
    /from\s+["'`]\.\.\/\.\.\/componentsUI\/([^"'`?]+)(?:\?raw)?["'`]/
  );

  let file = undefined;
  if (rawImportMatch) {
    file = rawImportMatch[1];
    // Asegurar que tenga extensión .tsx
    if (!file.endsWith(".tsx")) {
      file = file + ".tsx";
    }
  }

  // Si no se encontró por import, intentar mapear por nombre
  if (!file) {
    const possibleFile = componentFiles.find(
      (f) => f.toLowerCase() === name.toLowerCase() + ".tsx"
    );
    if (possibleFile) {
      file = possibleFile;
    }
  }

  if (!file) {
    console.warn(`⚠️  No se encontró archivo de componente para: ${name} (${entryFile})`);
    continue;
  }

  // Extraer dependencias internas del patrón "Utiliza: X, Y."
  let internalDeps = undefined;
  if (description) {
    const utilizaMatch = description.match(/^Utiliza:\s*([^.]+)\./);
    if (utilizaMatch) {
      internalDeps = utilizaMatch[1].split(",").map((s) => s.trim());
    }
  }

  // Buscar archivo de test correspondiente
  // Convención: ComponentName.test.tsx (ej: Input.test.tsx, Select.test.tsx)
  const baseName = file.replace(/\.tsx$/, "");
  const testFile = testFiles.find(
    (t) => t === `${baseName}.test.tsx` || t === `${baseName}.test.ts`
  );

  // Extraer assets (archivos estáticos como SVGs)
  const assetsMatch = content.match(/assets:\s*\[([^\]]*)\]/s);
  let assets = undefined;
  if (assetsMatch) {
    assets = assetsMatch[1]
      .match(/["'`]([^"'`]+)["'`]/g)
      ?.map((d) => d.replace(/["'`]/g, ""));
  }

  // Extraer assetsDir
  const assetsDirMatch = content.match(/assetsDir:\s*["'`]([^"'`]+)["'`]/);
  const assetsDir = assetsDirMatch ? assetsDirMatch[1] : undefined;

  // Extraer assetGroups
  const assetGroupsMatch = content.match(/assetGroups:\s*\{([\s\S]*?)\n\s*\}/);
  let assetGroups = undefined;
  if (assetGroupsMatch) {
    try {
      // Parse each group key: [array] pair
      const groupsBlock = assetGroupsMatch[1];
      const groupEntries = [...groupsBlock.matchAll(/["']?([^"':\s]+)["']?\s*:\s*\[([^\]]*)\]/g)];
      if (groupEntries.length > 0) {
        assetGroups = {};
        for (const [, key, values] of groupEntries) {
          const files = values.match(/["'`]([^"'`]+)["'`]/g)?.map((d) => d.replace(/["'`]/g, ""));
          if (files && files.length > 0) {
            assetGroups[key] = files;
          }
        }
      }
    } catch {
      // Silently skip if parsing fails
    }
  }

  registry.push({
    name,
    file,
    description: description
      ? description.replace(/^Utiliza:\s*[^.]+\.\s*/, "").trim()
      : undefined,
    ...(dependencies && dependencies.length > 0 && { dependencies }),
    ...(internalDeps && internalDeps.length > 0 && { internalDeps }),
    ...(group && { group }),
    ...(testFile && { testFile }),
    ...(assets && assets.length > 0 && { assets }),
    ...(assetGroups && Object.keys(assetGroups).length > 0 && { assetGroups }),
    ...(assetsDir && { assetsDir }),
  });
}

// Ordenar alfabéticamente
registry.sort((a, b) => a.name.localeCompare(b.name));

writeFileSync(outputPath, JSON.stringify(registry, null, 2) + "\n");

console.log(`✅ registry.json generado con ${registry.length} componentes.`);
console.log(`   Tests detectados: ${registry.filter(r => r.testFile).length}`);
console.log(`   Ruta: ${outputPath}`);
