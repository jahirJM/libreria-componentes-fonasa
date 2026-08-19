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
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");

const registryDir = resolve(rootDir, "src/docs/registry");
const componentsDir = resolve(rootDir, "src/componentsUI");
const outputPath = resolve(rootDir, "registry.json");

// Obtener todos los archivos de componentes disponibles
const componentFiles = readdirSync(componentsDir).filter((f) =>
  f.endsWith(".tsx")
);

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

  registry.push({
    name,
    file,
    description: description
      ? description.replace(/^Utiliza:\s*[^.]+\.\s*/, "").trim()
      : undefined,
    ...(dependencies && dependencies.length > 0 && { dependencies }),
    ...(internalDeps && internalDeps.length > 0 && { internalDeps }),
    ...(group && { group }),
  });
}

// Ordenar alfabéticamente
registry.sort((a, b) => a.name.localeCompare(b.name));

writeFileSync(outputPath, JSON.stringify(registry, null, 2) + "\n");

console.log(`✅ registry.json generado con ${registry.length} componentes.`);
console.log(`   Ruta: ${outputPath}`);
