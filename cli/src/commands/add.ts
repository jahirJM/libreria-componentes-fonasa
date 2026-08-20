import { Command } from "commander";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, join } from "path";
import ora from "ora";
import { loadRegistry, type RegistryEntry } from "../utils/registry.js";
import { loadConfig } from "../utils/config.js";
import { resolveInternalDeps } from "../utils/resolve.js";
import { fetchComponentSource } from "../utils/fetch.js";
import {
  printBanner,
  printSection,
  printBox,
  printSuccessItem,
  printSkippedItem,
  printErrorItem,
  printTip,
  printSeparator,
  brand,
} from "../utils/ui.js";

export const addCommand = new Command("add")
  .description("Agrega uno o más componentes a tu proyecto")
  .argument("<componentes...>", "Nombres de los componentes a instalar")
  .option("-y, --yes", "Instalar sin confirmación", false)
  .option("-o, --overwrite", "Sobrescribir archivos existentes", false)
  .action(async (componentes: string[], opts) => {
    printBanner();

    // 1. Cargar configuración del proyecto
    const config = loadConfig();
    if (!config) {
      printBox("Error", [
        "No se encontró fonasa-ui.json",
        "",
        `Ejecuta primero: ${brand.primary("npx fonasa-ui init")}`,
      ]);
      console.log("");
      return;
    }

    // 2. Cargar registry
    const spinner = ora({
      text: brand.muted("Cargando registro de componentes..."),
      spinner: "dots12",
    }).start();

    const registry = await loadRegistry();
    if (!registry) {
      spinner.fail("No se pudo cargar el registry.");
      return;
    }
    spinner.succeed(brand.muted("Registry sincronizado"));

    // 3. Resolver componentes solicitados
    const notFound: string[] = [];
    const toInstall: RegistryEntry[] = [];

    for (const name of componentes) {
      const entry = registry.find(
        (r) =>
          r.name.toLowerCase() === name.toLowerCase() ||
          r.file.toLowerCase() === name.toLowerCase() + ".tsx"
      );
      if (!entry) {
        notFound.push(name);
      } else {
        toInstall.push(entry);
      }
    }

    if (notFound.length > 0) {
      console.log("");
      for (const name of notFound) {
        printErrorItem(`"${name}" no encontrado`);
      }
      printTip(`Ver disponibles → ${brand.primary("npx fonasa-ui list")}`);
      if (toInstall.length === 0) return;
    }

    // 4. Resolver dependencias internas
    const allComponents = resolveInternalDeps(toInstall, registry);

    // Mostrar plan de instalación
    printSection("📋", "Plan de instalación");
    console.log("");
    console.log(`    ${brand.muted("Destino:")} ${brand.primary(config.componentsDir)}`);
    console.log("");

    for (const comp of allComponents) {
      const isExplicit = toInstall.some((t) => t.name === comp.name);
      if (isExplicit) {
        console.log(`    ${brand.primary("◆")} ${comp.file}`);
      } else {
        console.log(`    ${brand.dim("◇")} ${comp.file} ${brand.dim("(dependencia)")}`);
      }
    }

    // 5. Obtener dependencias npm externas
    const allExternalDeps = new Set<string>();
    for (const comp of allComponents) {
      if (comp.dependencies) {
        for (const dep of comp.dependencies) {
          allExternalDeps.add(dep);
        }
      }
    }

    // 6. Crear directorio destino
    const destDir = resolve(process.cwd(), config.componentsDir);
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    // 7. Copiar componentes
    printSection("⬇️", "Instalando");
    console.log("");

    let installed = 0;
    let skipped = 0;

    for (const comp of allComponents) {
      const destFile = join(destDir, comp.file);

      if (existsSync(destFile) && !opts.overwrite) {
        printSkippedItem(`${comp.file} ya existe`);
        skipped++;
        continue;
      }

      try {
        const source = await fetchComponentSource(comp.file);
        if (!source) {
          printErrorItem(`No se pudo obtener ${comp.file}`);
          continue;
        }

        writeFileSync(destFile, source, "utf-8");
        printSuccessItem(comp.file);
        installed++;
      } catch (error) {
        printErrorItem(`${comp.file} — ${(error as Error).message}`);
      }
    }

    // 8. Resumen
    printSeparator();
    console.log("");
    console.log(
      `    ${brand.success("●")} ${installed} instalado${installed !== 1 ? "s" : ""}` +
        (skipped > 0 ? `  ${brand.warning("○")} ${skipped} omitido${skipped !== 1 ? "s" : ""}` : "")
    );

    // 9. Dependencias npm
    if (allExternalDeps.size > 0) {
      const depsArray = Array.from(allExternalDeps);
      console.log("");
      printBox("Dependencias requeridas", [
        "",
        `  ${brand.primary(`npm install ${depsArray.join(" ")}`)}`,
        "",
      ]);
    }

    // 10. Tip final
    if (skipped > 0) {
      printTip(`Usa ${brand.primary("--overwrite")} para reemplazar archivos existentes`);
    } else {
      printTip("¡Componentes listos para usar! Impórtalos en tu código.");
    }
  });
