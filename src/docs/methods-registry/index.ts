import type { MethodEntry } from "./types";

// Auto-registro: cualquier archivo *.entry.tsx en esta carpeta se agrega solo.
const modules = import.meta.glob("./*.entry.tsx", { eager: true }) as Record<
  string,
  Record<string, MethodEntry>
>;

export const methodsRegistry: MethodEntry[] = Object.values(modules).map(
  (mod) => Object.values(mod)[0]
);
