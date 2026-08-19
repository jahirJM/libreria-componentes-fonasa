import { Command } from "commander";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";
import { initCommand } from "./commands/init.js";

const program = new Command();

program
  .name("fonasa-ui")
  .description("CLI para instalar componentes UI de Fonasa en tu proyecto")
  .version("1.0.0");

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(initCommand);

program.parse();
