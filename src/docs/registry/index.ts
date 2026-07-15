import type { ComponentEntry } from "./types";

// Auto-registro: cualquier archivo *.entry.tsx en esta carpeta se agrega solo.
const modules = import.meta.glob("./*.entry.tsx", { eager: true }) as Record<
  string,
  Record<string, ComponentEntry>
>;

export const registry: ComponentEntry[] = Object.values(modules).map(
  (mod) => Object.values(mod)[0]
);