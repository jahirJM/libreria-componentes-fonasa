import { Command } from "commander";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { initCommand } from "./commands/init.js";
import { printBanner, brand } from "./utils/ui.js";

const program = new Command();

program
  .name("fonasa-ui")
  .description("CLI para instalar componentes UI de Fonasa en tu proyecto")
  .version("1.0.0")
  .hook("preAction", (thisCommand) => {
    // No imprimir banner si el comando ya lo hace internamente
    const commandName = thisCommand.args?.[0];
    if (!commandName) return;
  })
  .action(() => {
    // Si se ejecuta sin comando, mostrar banner + ayuda
    printBanner();
    console.log(brand.muted("  Comandos disponibles:"));
    console.log("");
    console.log(`    ${brand.primary("init")}    Configura fonasa-ui en tu proyecto`);
    console.log(`    ${brand.primary("list")}    Muestra todos los componentes disponibles`);
    console.log(`    ${brand.primary("add")}     Agrega componentes a tu proyecto`);
    console.log("");
    console.log(brand.muted("  Ejemplo:"));
    console.log(`    ${brand.primary("npx fonasa-ui add input select badge")}`);
    console.log("");
  });

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(initCommand);

program.parse();
