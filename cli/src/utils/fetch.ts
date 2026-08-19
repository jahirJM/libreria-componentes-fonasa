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
