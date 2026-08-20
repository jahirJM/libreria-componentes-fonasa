import { Command } from "commander";
import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import chalk from "chalk";
import prompts from "prompts";
import { printBanner, printSection, printBox, printTip, brand } from "../utils/ui.js";

const CONFIG_FILE = "fonasa-ui.json";

export const initCommand = new Command("init")
  .description("Inicializa la configuración de fonasa-ui en tu proyecto")
  .action(async () => {
    printBanner();
    printSection("⚙️", "Configuración inicial");
    console.log("");

    const configPath = resolve(process.cwd(), CONFIG_FILE);

    if (existsSync(configPath)) {
      console.log(
        brand.warning("  ⚠️  Ya existe un archivo fonasa-ui.json en este proyecto.")
      );
      console.log("");
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: "¿Deseas sobrescribirlo?",
        initial: false,
      });

      if (!overwrite) {
        console.log(brand.dim("\n  Operación cancelada.\n"));
        return;
      }
    }

    const { componentsDir, typescript } = await prompts([
      {
        type: "text",
        name: "componentsDir",
        message: "¿Dónde quieres guardar los componentes?",
        initial: "src/components/ui",
      },
      {
        type: "confirm",
        name: "typescript",
        message: "¿Tu proyecto usa TypeScript?",
        initial: true,
      },
    ]);

    if (!componentsDir) {
      console.log(brand.dim("\n  Operación cancelada.\n"));
      return;
    }

    const config = {
      $schema: "https://github.com/jahirJM/libreria-componentes-fonasa/blob/main/cli/schema.json",
      componentsDir,
      typescript,
    };

    writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");

    console.log("");
    printBox("Configuración creada", [
      `${brand.muted("Archivo:")}     fonasa-ui.json`,
      `${brand.muted("Componentes:")} ${componentsDir}`,
      `${brand.muted("TypeScript:")}  ${typescript ? "sí" : "no"}`,
    ]);

    printTip("Siguiente paso → " + brand.primary("npx fonasa-ui add input"));
  });
