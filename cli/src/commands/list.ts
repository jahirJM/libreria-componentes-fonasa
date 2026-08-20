import { Command } from "commander";
import chalk from "chalk";
import { loadRegistry } from "../utils/registry.js";
import { printBanner, printSection, printSeparator, printTip, brand } from "../utils/ui.js";

export const listCommand = new Command("list")
  .description("Lista todos los componentes disponibles")
  .option("--json", "Salida en formato JSON")
  .action(async (opts) => {
    const registry = await loadRegistry();

    if (!registry || registry.length === 0) {
      console.log(brand.error("\n  ✖ No se pudo cargar el registry de componentes.\n"));
      return;
    }

    if (opts.json) {
      console.log(JSON.stringify(registry, null, 2));
      return;
    }

    printBanner();
    printSection("📦", `Componentes disponibles (${registry.length})`);

    // Agrupar por grupo
    const grouped: Record<string, typeof registry> = {};
    for (const comp of registry) {
      const group = comp.group || "General";
      if (!grouped[group]) grouped[group] = [];
      grouped[group].push(comp);
    }

    for (const [group, components] of Object.entries(grouped)) {
      console.log("");
      console.log(`    ${chalk.bold.white("┌")} ${brand.accent(group)} ${brand.dim(`(${components.length})`)}`);

      components.forEach((comp, idx) => {
        const isLast = idx === components.length - 1;
        const connector = isLast ? "└" : "├";
        const deps = comp.dependencies?.length
          ? brand.dim(` [${comp.dependencies.join(", ")}]`)
          : "";
        const desc = comp.description
          ? brand.muted(` — ${comp.description.slice(0, 50)}${comp.description.length > 50 ? "…" : ""}`)
          : "";

        console.log(`    ${chalk.white(connector)}─ ${brand.primary(comp.name)}${desc}${deps}`);
      });
    }

    printSeparator();
    printTip(`Instalar → ${brand.primary("npx fonasa-ui add <nombre>")}`);
  });
