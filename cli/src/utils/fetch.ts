import { existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Obtiene el código fuente de un componente.
 * 
 * Estrategia de resolución:
 * 1. Busca el archivo en la carpeta `components/` incluida junto al CLI
 *    (cuando se instala el paquete desde Git, los componentes vienen copiados).
 * 2. Si no lo encuentra, busca en `src/componentsUI/` del repo
 *    (modo desarrollo local).
 */
export async function fetchComponentSource(
  fileName: string
): Promise<string | null> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const candidates = [
    // 1. Componentes empaquetados junto al bundle (dist/components/)
    resolve(__dirname, "components", fileName),
    // 2. Desde la raíz del repo (cli/dist/ → ../../src/componentsUI/)
    resolve(__dirname, "..", "..", "src", "componentsUI", fileName),
    // 3. Modo desarrollo (cwd es la raíz del repo)
    resolve(process.cwd(), "src", "componentsUI", fileName),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return readFileSync(candidate, "utf-8");
    }
  }

  return null;
}

/**
 * Obtiene el código fuente del archivo de test de un componente.
 * 
 * Estrategia de resolución:
 * 1. Busca en la carpeta `tests/` incluida junto al CLI (dist/tests/)
 * 2. Si no lo encuentra, busca en `src/tests/` del repo
 * 3. Modo desarrollo (cwd es la raíz del repo)
 */
export async function fetchTestSource(
  testFileName: string
): Promise<string | null> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const candidates = [
    // 1. Tests empaquetados junto al bundle (dist/tests/)
    resolve(__dirname, "tests", testFileName),
    // 2. Desde la raíz del repo (cli/dist/ → ../../src/tests/)
    resolve(__dirname, "..", "..", "src", "tests", testFileName),
    // 3. Modo desarrollo (cwd es la raíz del repo)
    resolve(process.cwd(), "src", "tests", testFileName),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return readFileSync(candidate, "utf-8");
    }
  }

  return null;
}
