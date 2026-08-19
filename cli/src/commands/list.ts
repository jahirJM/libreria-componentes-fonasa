import { Command } from "commander";
import chalk from "chalk";
import { loadRegistry } from "../utils/registry.js";

export const listCommand = new Command("list")
  .description("Lista todos los componentes disponibles")
  .option("--json", "Salida en formato JSON")
  .action(async (opts) => {
    const registry = await loadRegistry();

    if (!registry || registry.length === 0) {
      console.log(chalk.red("❌ No se pudo cargar el registry de componentes."));
      return;
    }

    if (opts.json) {
      console.log(JSON.stringify(registry, null, 2));
      return;
    }

    console.log("");
    console.log(chalk.bold("📦 Componentes disponibles:"));
    console.log("");

    // Agrupar por grupo si existe
    const grouped: Record<string, typeof registry> = {};
    for (const comp of registry) {
      const group = comp.group || "General";
      if (!grouped[group]) grouped[group] = [];
      grouped[group].push(comp);
    }

    for (const [group, components] of Object.entries(grouped)) {
      console.log(chalk.bold.underline(`  ${group}`));
      for (const comp of components) {
        const deps = comp.dependencies?.length
          ? chalk.gray(` (deps: ${comp.dependencies.join(", ")})`)
          : "";
        const desc = comp.description
          ? chalk.gray(` — ${comp.description.slice(0, 60)}${comp.description.length > 60 ? "..." : ""}`)
          : "";
        console.log(`    ${chalk.cyan(comp.name)}${desc}${deps}`);
      }
      console.log("");
    }

    console.log(
      chalk.gray(`  Total: ${registry.length} componentes disponibles`)
    );
    console.log("");
    console.log(`  Usa ${chalk.cyan("fonasa-ui add <nombre>")} para instalar.`);
    console.log("");
  });
