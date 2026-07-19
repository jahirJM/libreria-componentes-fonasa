/**
 * Constructor de filtros de input en tiempo real.
 * Permite combinar tipos de caracteres, rangos de longitud y validaciones especiales.
 */

export type TipoFiltro =
  | "numeros"
  | "letras"
  | "mayusculas"
  | "minusculas"
  | "especiales"
  | "sinAcentos"
  | "alfanumerico";

/** Validaciones especiales mutuamente excluyentes con los filtros de caracteres */
export type ValidacionEspecial = "email" | "celular" | "telefonoFijo";

export interface ConfigFiltro {
  tipos: TipoFiltro[];
  validacion?: ValidacionEspecial;
  minimo?: number;
  maximo?: number;
}

export interface ResultadoValidacion {
  valido: boolean;
  mensaje?: string;
}

// ─── Internos ──────────────────────────────────────────────────────────────────

const CARACTERES_PERMITIDOS: Partial<Record<TipoFiltro, string>> = {
  numeros:       "0-9",
  letras:        "a-zA-ZáéíóúÁÉÍÓÚüÜñÑ",
  sinAcentos:    "a-zA-ZñÑ",
  especiales:    "!@#$%^&*()_+\\-=\\[\\]{}|;':\",./<>?",
  alfanumerico:  "a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ",
};

const TRANSFORMACIONES: Partial<Record<TipoFiltro, (v: string) => string>> = {
  mayusculas: (v) => v.toUpperCase(),
  minusculas: (v) => v.toLowerCase(),
};

// ─── Construcción del filtro ───────────────────────────────────────────────────

export function construirFiltro(config: ConfigFiltro): (valor: string) => string {
  if (config.validacion === "email") {
    return (valor: string) => {
      if (config.maximo !== undefined) return valor.slice(0, config.maximo);
      return valor;
    };
  }

  // Celular chileno: siempre inicia con +, luego solo dígitos, máximo +569XXXXXXXX (12 chars)
  if (config.validacion === "celular") {
    return (valor: string) => {
      // Extraer solo dígitos del valor (ignorar el + inicial que se fuerza)
      const soloDigitos = valor.replace(/[^0-9]/g, "");
      // Siempre anteponer el + y limitar a 11 dígitos (+56912345678)
      return "+" + soloDigitos.slice(0, 11);
    };
  }

  // Teléfono fijo chileno: dígitos y + al inicio
  if (config.validacion === "telefonoFijo") {
    return (valor: string) => {
      let limpio = valor.replace(/[^0-9+]/g, "");
      if (limpio.startsWith("+")) {
        limpio = "+" + limpio.slice(1).replace(/[^0-9]/g, "");
      }
      return limpio.slice(0, 12);
    };
  }

  const { tipos, maximo } = config;

  if (tipos.length === 0) {
    return (valor: string) => {
      if (maximo !== undefined) return valor.slice(0, maximo);
      return valor;
    };
  }

  const tiposFiltro = tipos.filter((t) => CARACTERES_PERMITIDOS[t] !== undefined);
  const tiposTransform = tipos.filter((t) => TRANSFORMACIONES[t] !== undefined);

  let filtrarCaracteres: (v: string) => string = (v) => v;

  if (tiposFiltro.length > 0 || tiposTransform.length > 0) {
    const necesitaLetras =
      tiposTransform.length > 0 &&
      !tiposFiltro.some((t) => ["letras", "sinAcentos", "alfanumerico"].includes(t));
    const patronBase = tiposFiltro.map((t) => CARACTERES_PERMITIDOS[t]).join("");
    const patronExtra = necesitaLetras ? "a-zA-ZáéíóúÁÉÍÓÚüÜñÑ" : "";
    const patron = patronBase + patronExtra;
    if (patron) {
      const regex = new RegExp(`[^${patron}]`, "g");
      filtrarCaracteres = (v) => v.replace(regex, "");
    }
  }

  const transformar = tiposTransform.reduce<(v: string) => string>(
    (fn, tipo) => {
      const t = TRANSFORMACIONES[tipo]!;
      return (v) => t(fn(v));
    },
    (v) => v,
  );

  return (valor: string) => {
    let resultado = transformar(filtrarCaracteres(valor));
    if (maximo !== undefined) resultado = resultado.slice(0, maximo);
    return resultado;
  };
}

// ─── Validación ───────────────────────────────────────────────────────────────

export function validarValor(valor: string, config: ConfigFiltro): ResultadoValidacion {
  const len = valor.length;

  if (config.validacion === "email") {
    if (len === 0) return { valido: false, mensaje: "El correo es requerido" };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!regex.test(valor)) return { valido: false, mensaje: "Correo electrónico inválido" };
    return { valido: true };
  }

  if (config.validacion === "celular") {
    if (len === 0) return { valido: false, mensaje: "El celular es requerido" };
    // Acepta: 9XXXXXXXX (9 dígitos) o +569XXXXXXXX
    const soloDigitos = valor.replace(/[^0-9]/g, "");
    const esValido =
      /^9\d{8}$/.test(soloDigitos) ||        // 9XXXXXXXX
      /^569\d{8}$/.test(soloDigitos) ||       // 569XXXXXXXX (sin +)
      /^\+569\d{8}$/.test(valor);             // +569XXXXXXXX
    if (!esValido)
      return { valido: false, mensaje: "Formato inválido. Ej: +56912345678 o 912345678" };
    return { valido: true };
  }

  if (config.validacion === "telefonoFijo") {
    if (len === 0) return { valido: false, mensaje: "El teléfono es requerido" };
    const soloDigitos = valor.replace(/[^0-9]/g, "");
    // Acepta: 2XXXXXXX (8 dígitos, Santiago) o +562XXXXXXX o códigos regionales
    const esValido =
      /^\d{8,9}$/.test(soloDigitos) ||       // 8-9 dígitos sin código país
      /^56\d{8,9}$/.test(soloDigitos) ||     // Con 56 sin +
      /^\+56\d{8,9}$/.test(valor);           // +56XXXXXXXXX
    if (!esValido)
      return { valido: false, mensaje: "Formato inválido. Ej: +5622123456 o 22123456" };
    return { valido: true };
  }

  if (config.minimo !== undefined && len > 0 && len < config.minimo) {
    return {
      valido: false,
      mensaje: `Mínimo ${config.minimo} caracter${config.minimo !== 1 ? "es" : ""}`,
    };
  }

  if (config.maximo !== undefined && len > config.maximo) {
    return {
      valido: false,
      mensaje: `Máximo ${config.maximo} caracter${config.maximo !== 1 ? "es" : ""}`,
    };
  }

  return { valido: true };
}

// ─── Generación de código ─────────────────────────────────────────────────────

const ETIQUETAS: Record<TipoFiltro, string> = {
  numeros:      "números",
  letras:       "letras",
  mayusculas:   "mayúsculas",
  minusculas:   "minúsculas",
  especiales:   "especiales",
  sinAcentos:   "sin acentos",
  alfanumerico: "alfanumérico",
};

export function generarCodigoUso(config: ConfigFiltro): string {
  const { tipos, validacion, minimo, maximo } = config;
  const lineas: string[] = [];

  // ── Email ──
  if (validacion === "email") {
    lineas.push(`// Validación: correo electrónico`);
    if (maximo) lineas.push(`// Máximo ${maximo} caracteres`);
    lineas.push(`function validarEmail(valor: string): string | null {`);
    lineas.push(`  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/;`);
    lineas.push(`  return regex.test(valor) ? null : "Correo electrónico inválido";`);
    lineas.push(`}`);
    lineas.push(``);
    lineas.push(`function MiComponente() {`);
    lineas.push(`  const [valor, setValor] = useState("");`);
    lineas.push(`  const [error, setError] = useState<string | null>(null);`);
    lineas.push(``);
    lineas.push(`  function validar() {`);
    lineas.push(`    setError(validarEmail(valor));`);
    lineas.push(`  }`);
    lineas.push(``);
    lineas.push(`  return (`);
    lineas.push(`    <>`);
    lineas.push(`      <Input`);
    lineas.push(`        type="email"`);
    lineas.push(`        value={valor}`);
    if (maximo) {
      lineas.push(`        onChange={(e) => setValor(e.target.value.slice(0, ${maximo}))}`);
    } else {
      lineas.push(`        onChange={(e) => setValor(e.target.value)}`);
    }
    lineas.push(`        onBlur={validar}`);
    lineas.push(`        error={!!error}`);
    lineas.push(`        placeholder="correo@ejemplo.cl"`);
    lineas.push(`      />`);
    lineas.push(`      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}`);
    lineas.push(`    </>`);
    lineas.push(`  );`);
    lineas.push(`}`);
    return lineas.join("\n");
  }

  // ── Celular chileno ──
  if (validacion === "celular") {
    lineas.push(`// Validación: teléfono celular chileno`);
    lineas.push(`// Formatos aceptados: 912345678 o +56912345678`);
    lineas.push(`function filtrarCelular(valor: string): string {`);
    lineas.push(`  let limpio = valor.replace(/[^0-9+]/g, "");`);
    lineas.push(`  if (limpio.startsWith("+")) {`);
    lineas.push(`    limpio = "+" + limpio.slice(1).replace(/[^0-9]/g, "");`);
    lineas.push(`  }`);
    lineas.push(`  return limpio.slice(0, 12);`);
    lineas.push(`}`);
    lineas.push(``);
    lineas.push(`function validarCelular(valor: string): string | null {`);
    lineas.push(`  const soloDigitos = valor.replace(/[^0-9]/g, "");`);
    lineas.push(`  const esValido =`);
    lineas.push(`    /^9\\d{8}$/.test(soloDigitos) ||`);
    lineas.push(`    /^569\\d{8}$/.test(soloDigitos) ||`);
    lineas.push(`    /^\\+569\\d{8}$/.test(valor);`);
    lineas.push(`  return esValido ? null : "Formato inválido. Ej: +56912345678 o 912345678";`);
    lineas.push(`}`);
    lineas.push(``);
    lineas.push(`function MiComponente() {`);
    lineas.push(`  const [valor, setValor] = useState("");`);
    lineas.push(`  const [error, setError] = useState<string | null>(null);`);
    lineas.push(``);
    lineas.push(`  return (`);
    lineas.push(`    <>`);
    lineas.push(`      <Input`);
    lineas.push(`        type="tel"`);
    lineas.push(`        value={valor}`);
    lineas.push(`        onChange={(e) => setValor(filtrarCelular(e.target.value))}`);
    lineas.push(`        onBlur={() => setError(validarCelular(valor))}`);
    lineas.push(`        error={!!error}`);
    lineas.push(`        placeholder="+56912345678"`);
    lineas.push(`      />`);
    lineas.push(`      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}`);
    lineas.push(`    </>`);
    lineas.push(`  );`);
    lineas.push(`}`);
    return lineas.join("\n");
  }

  // ── Teléfono fijo chileno ──
  if (validacion === "telefonoFijo") {
    lineas.push(`// Validación: teléfono fijo chileno`);
    lineas.push(`// Formatos aceptados: 22123456 o +5622123456`);
    lineas.push(`function filtrarTelefonoFijo(valor: string): string {`);
    lineas.push(`  let limpio = valor.replace(/[^0-9+]/g, "");`);
    lineas.push(`  if (limpio.startsWith("+")) {`);
    lineas.push(`    limpio = "+" + limpio.slice(1).replace(/[^0-9]/g, "");`);
    lineas.push(`  }`);
    lineas.push(`  return limpio.slice(0, 12);`);
    lineas.push(`}`);
    lineas.push(``);
    lineas.push(`function validarTelefonoFijo(valor: string): string | null {`);
    lineas.push(`  const soloDigitos = valor.replace(/[^0-9]/g, "");`);
    lineas.push(`  const esValido =`);
    lineas.push(`    /^\\d{8,9}$/.test(soloDigitos) ||`);
    lineas.push(`    /^56\\d{8,9}$/.test(soloDigitos) ||`);
    lineas.push(`    /^\\+56\\d{8,9}$/.test(valor);`);
    lineas.push(`  return esValido ? null : "Formato inválido. Ej: +5622123456 o 22123456";`);
    lineas.push(`}`);
    lineas.push(``);
    lineas.push(`function MiComponente() {`);
    lineas.push(`  const [valor, setValor] = useState("");`);
    lineas.push(`  const [error, setError] = useState<string | null>(null);`);
    lineas.push(``);
    lineas.push(`  return (`);
    lineas.push(`    <>`);
    lineas.push(`      <Input`);
    lineas.push(`        type="tel"`);
    lineas.push(`        value={valor}`);
    lineas.push(`        onChange={(e) => setValor(filtrarTelefonoFijo(e.target.value))}`);
    lineas.push(`        onBlur={() => setError(validarTelefonoFijo(valor))}`);
    lineas.push(`        error={!!error}`);
    lineas.push(`        placeholder="+5622123456"`);
    lineas.push(`      />`);
    lineas.push(`      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}`);
    lineas.push(`    </>`);
    lineas.push(`  );`);
    lineas.push(`}`);
    return lineas.join("\n");
  }

  // ── Sin configuración ──
  if (tipos.length === 0 && !minimo && !maximo) {
    return [
      `function MiComponente() {`,
      `  const [valor, setValor] = useState("");`,
      `  return (`,
      `    <Input`,
      `      value={valor}`,
      `      onChange={(e) => setValor(e.target.value)}`,
      `      placeholder="Sin restricciones"`,
      `    />`,
      `  );`,
      `}`,
    ].join("\n");
  }

  // ── Filtro de caracteres ──
  const tiposFiltro = tipos.filter((t) => CARACTERES_PERMITIDOS[t] !== undefined);
  const tiposTransform = tipos.filter((t) => TRANSFORMACIONES[t] !== undefined);
  const necesitaLetras =
    tiposTransform.length > 0 &&
    !tiposFiltro.some((t) => ["letras", "sinAcentos", "alfanumerico"].includes(t));
  const patronBase = tiposFiltro.map((t) => CARACTERES_PERMITIDOS[t]).join("");
  const patronExtra = necesitaLetras ? "a-zA-ZáéíóúÁÉÍÓÚüÜñÑ" : "";
  const patron = patronBase + patronExtra;

  const comentarios: string[] = [];
  if (tipos.length > 0) comentarios.push(`Filtro: ${tipos.map((t) => ETIQUETAS[t]).join(" + ")}`);
  if (minimo) comentarios.push(`mínimo ${minimo} chars`);
  if (maximo) comentarios.push(`máximo ${maximo} chars`);
  if (comentarios.length) lineas.push(`// ${comentarios.join(" | ")}`);

  lineas.push(`function filtrarInput(valor: string): string {`);
  if (patron) {
    lineas.push(`  let resultado = valor.replace(/[^${patron}]/g, "");`);
  } else {
    lineas.push(`  let resultado = valor;`);
  }
  if (tiposTransform.includes("mayusculas")) lineas.push(`  resultado = resultado.toUpperCase();`);
  if (tiposTransform.includes("minusculas")) lineas.push(`  resultado = resultado.toLowerCase();`);
  if (maximo) lineas.push(`  return resultado.slice(0, ${maximo});`);
  else lineas.push(`  return resultado;`);
  lineas.push(`}`);
  lineas.push(``);

  if (minimo) {
    lineas.push(`function validarLongitud(valor: string): string | null {`);
    lineas.push(`  return valor.length >= ${minimo} ? null : "Mínimo ${minimo} caracteres";`);
    lineas.push(`}`);
    lineas.push(``);
  }

  lineas.push(`function MiComponente() {`);
  lineas.push(`  const [valor, setValor] = useState("");`);
  if (minimo) lineas.push(`  const [error, setError] = useState<string | null>(null);`);
  lineas.push(``);
  if (minimo) {
    lineas.push(`  function validar() {`);
    lineas.push(`    setError(validarLongitud(valor));`);
    lineas.push(`  }`);
    lineas.push(``);
  }
  lineas.push(`  return (`);
  lineas.push(`    <Input`);
  lineas.push(`      value={valor}`);
  lineas.push(`      onChange={(e) => setValor(filtrarInput(e.target.value))}`);
  if (minimo) lineas.push(`      onBlur={validar}`);
  if (minimo) lineas.push(`      error={!!error}`);
  if (maximo) lineas.push(`      maxLength={${maximo}}`);
  lineas.push(`      placeholder="Escribe aquí..."`);
  lineas.push(`    />`);
  lineas.push(`  );`);
  lineas.push(`}`);

  return lineas.join("\n");
}
