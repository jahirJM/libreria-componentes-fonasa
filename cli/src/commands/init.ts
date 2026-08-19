import { Command } from "commander";
import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import chalk from "chalk";
import prompts from "prompts";

const CONFIG_FILE = "fonasa-ui.json";

export const initCommand = new Command("init")
  .description("Inicializa la configuración de fonasa-ui en tu proyecto")
  .action(async () => {
    const configPath = resolve(process.cwd(), CONFIG_FILE);

    if (existsSync(configPath)) {
      console.log(
        chalk.yellow("⚠️  Ya existe un archivo fonasa-ui.json en este proyecto.")
      );
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: "¿Deseas sobrescribirlo?",
        initial: false,
      });

      if (!overwrite) {
        console.log(chalk.gray("Operación cancelada."));
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
      console.log(chalk.gray("Operación cancelada."));
      return;
    }

    const config = {
      $schema: "https://github.com/tu-org/libreria-componentes-fonasa/blob/main/cli/schema.json",
      componentsDir,
      typescript,
    };

    writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");

    console.log("");
    console.log(chalk.green("✅ Configuración creada en fonasa-ui.json"));
    console.log("");
    console.log("Ahora puedes agregar componentes con:");
    console.log(chalk.cyan("  npx fonasa-ui add Input"));
    console.log(chalk.cyan("  npx fonasa-ui add Modal Select Badge"));
    console.log("");
    console.log("Para ver componentes disponibles:");
    console.log(chalk.cyan("  npx fonasa-ui list"));
  });
