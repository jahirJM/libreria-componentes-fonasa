import type { RegistryEntry } from "./registry.js";

/**
 * Dado un listado de componentes solicitados, resuelve las dependencias
 * internas (sub-componentes que usa cada uno) y devuelve la lista completa
 * sin duplicados en orden correcto (dependencias primero).
 */
export function resolveInternalDeps(
  requested: RegistryEntry[],
  allComponents: RegistryEntry[]
): RegistryEntry[] {
  const resolved = new Map<string, RegistryEntry>();

  function resolve(entry: RegistryEntry) {
    if (resolved.has(entry.name)) return;

    // Primero resolver las dependencias internas
    if (entry.internalDeps && entry.internalDeps.length > 0) {
      for (const depName of entry.internalDeps) {
        const dep = allComponents.find(
          (c) => c.file.toLowerCase() === depName.toLowerCase() + ".tsx" ||
                 c.name.toLowerCase() === depName.toLowerCase()
        );
        if (dep) {
          resolve(dep);
        }
      }
    }

    resolved.set(entry.name, entry);
  }

  for (const entry of requested) {
    resolve(entry);
  }

  return Array.from(resolved.values());
}
