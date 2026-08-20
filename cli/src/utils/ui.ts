import chalk from "chalk";

// Colores de marca Fonasa
export const brand = {
  primary: chalk.hex("#0572CE"),
  secondary: chalk.hex("#008CB5"),
  success: chalk.hex("#16a34a"),
  warning: chalk.hex("#ca8a04"),
  error: chalk.hex("#dc2626"),
  muted: chalk.hex("#6b7280"),
  dim: chalk.hex("#9ca3af"),
  accent: chalk.hex("#1e3a5f"),
};

// Banner ASCII art — Logo FONASA UI
const BANNER = `
${brand.primary("  █████  ███  █   █  ███   ████  ███     █   █ ███")}
${brand.primary("  █     █   █ ██  █ █   █ █     █   █    █   █  █")}
${brand.secondary("  ████  █   █ █ █ █ █████  ███  █████    █   █  █")}
${brand.secondary("  █     █   █ █  ██ █   █     █ █   █    █   █  █")}
${brand.accent("  █      ███  █   █ █   █ ████  █   █     ███  ███")}

  ${brand.muted("Librería de Componentes UI")} ${brand.dim("v1.0.0")}
`;

export function printBanner() {
  console.log(BANNER);
}

// Separador visual
export function printSeparator() {
  console.log(brand.dim("  ─────────────────────────────────────────────────"));
}

// Box para mensajes importantes
export function printBox(title: string, lines: string[]) {
  const maxLen = Math.max(title.length, ...lines.map((l) => stripAnsi(l).length));
  const width = Math.max(maxLen + 4, 50);
  const border = "─".repeat(width - 2);

  console.log(brand.primary(`  ┌${border}┐`));
  console.log(brand.primary(`  │`) + ` ${brand.accent(title)}${" ".repeat(width - 3 - title.length)}` + brand.primary("│"));
  console.log(brand.primary(`  ├${border}┤`));
  for (const line of lines) {
    const cleanLen = stripAnsi(line).length;
    console.log(brand.primary(`  │`) + ` ${line}${" ".repeat(width - 3 - cleanLen)}` + brand.primary("│"));
  }
  console.log(brand.primary(`  └${border}┘`));
}

// Sección con ícono
export function printSection(icon: string, title: string) {
  console.log("");
  console.log(`  ${icon} ${chalk.bold(title)}`);
  console.log(brand.dim(`  ${"─".repeat(title.length + 3)}`));
}

// Tabla simple
export function printTable(rows: [string, string][]) {
  const maxKey = Math.max(...rows.map(([k]) => k.length));
  for (const [key, value] of rows) {
    console.log(`    ${brand.primary(key.padEnd(maxKey))}  ${brand.muted(value)}`);
  }
}

// Resultado exitoso con animación de barra
export function printSuccessItem(text: string) {
  console.log(`    ${brand.success("●")} ${text}`);
}

export function printSkippedItem(text: string) {
  console.log(`    ${brand.warning("○")} ${brand.dim(text)}`);
}

export function printErrorItem(text: string) {
  console.log(`    ${brand.error("✖")} ${text}`);
}

// Footer con tip
export function printTip(text: string) {
  console.log("");
  console.log(`  ${brand.secondary("💡")} ${brand.dim(text)}`);
  console.log("");
}

// Quitar códigos ANSI para calcular longitud visual
function stripAnsi(str: string): string {
  return str.replace(
    // eslint-disable-next-line no-control-regex
    /\x1B\[[0-9;]*[a-zA-Z]/g,
    ""
  );
}
