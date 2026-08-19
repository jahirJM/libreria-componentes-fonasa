import { Command } from "commander";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, join } from "path";
import chalk from "chalk";
import ora from "ora";
import { loadRegistry, type RegistryEntry } from "../utils/registry.js";
import { loadConfig } from "../utils/config.js";
import { resolveInternalDeps } from "../utils/resolve.js";
import { fetchComponentSource } from "../utils/fetch.js";

export const addCommand = new Command("add")
  .description("Agrega uno o más componentes a tu proyecto")
  .argument("<componentes...>", "Nombres de los componentes a instalar")
  .option("-y, --yes", "Instalar sin confirmación", false)
  .option("-o, --overwrite", "Sobrescribir archivos existentes", false)
  .action(async (componentes: string[], opts) => {
    // 1. Cargar configuración del proyecto
    const config = loadConfig();
    if (!config) {
      console.log(
        chalk.red(
          "❌ No se encontró fonasa-ui.json. Ejecuta primero: fonasa-ui init"
        )
      );
      return;
    }

    // 2. Cargar registry
    const spinner = ora("Cargando registro de componentes...").start();
    const registry = await loadRegistry();
    if (!registry) {
      spinner.fail("No se pudo cargar el registry.");
      return;
    }
    spinner.succeed("Registry cargado.");

    // 3. Resolver componentes solicitados
    const notFound: string[] = [];
    const toInstall: RegistryEntry[] = [];

    for (const name of componentes) {
      const entry = registry.find(
        (r) => r.name.toLowerCase() === name.toLowerCase() ||
               r.file.toLowerCase() === name.toLowerCase() + ".tsx"
      );
      if (!entry) {
        notFound.push(name);
      } else {
        toInstall.push(entry);
      }
    }

    if (notFound.length > 0) {
      console.log(
        chalk.red(`\n❌ Componentes no encontrados: ${notFound.join(", ")}`)
      );
      console.log(chalk.gray("  Usa 'fonasa-ui list' para ver los disponibles.\n"));
      if (toInstall.length === 0) return;
    }

    // 4. Resolver dependencias internas (sub-componentes)
    const allComponents = resolveInternalDeps(toInstall, registry);

    // Mostrar resumen
    console.log("");
    console.log(chalk.bold("📋 Componentes a instalar:"));
    for (const comp of allComponents) {
      const isExplicit = toInstall.some((t) => t.name === comp.name);
      const tag = isExplicit ? "" : chalk.gray(" (dependencia interna)");
      console.log(`   ${chalk.cyan(comp.file)}${tag}`);
    }

    // 5. Obtener las dependencias npm externas
    const allExternalDeps = new Set<string>();
    for (const comp of allComponents) {
      if (comp.dependencies) {
        for (const dep of comp.dependencies) {
          allExternalDeps.add(dep);
        }
      }
    }

    // 6. Crear directorio destino si no existe
    const destDir = resolve(process.cwd(), config.componentsDir);
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    // 7. Copiar cada componente
    console.log("");
    for (const comp of allComponents) {
      const destFile = join(destDir, comp.file);

      if (existsSync(destFile) && !opts.overwrite) {
        console.log(
          chalk.yellow(`  ⏭️  ${comp.file} ya existe (usa --overwrite para reemplazar)`)
        );
        continue;
      }

      const installSpinner = ora(`Instalando ${comp.file}...`).start();

      try {
        const source = await fetchComponentSource(comp.file);
        if (!source) {
          installSpinner.fail(`No se pudo obtener ${comp.file}`);
          continue;
        }

        writeFileSync(destFile, source, "utf-8");
        installSpinner.succeed(`${comp.file} instalado`);
      } catch (error) {
        installSpinner.fail(`Error instalando ${comp.file}`);
        console.log(chalk.red(`     ${(error as Error).message}`));
      }
    }

    // 8. Mostrar dependencias npm a instalar
    if (allExternalDeps.size > 0) {
      console.log("");
      console.log(chalk.yellow("⚠️  Dependencias npm requeridas:"));
      const depsArray = Array.from(allExternalDeps);
      console.log(chalk.cyan(`   npm install ${depsArray.join(" ")}`));
      console.log("");
    }

    console.log(chalk.green("\n✅ ¡Listo! Componentes instalados.\n"));
  });
