import type { LogoEntry } from "./types";

// Auto-registro: cualquier archivo *.entry.tsx en esta carpeta se agrega solo.
const modules = import.meta.glob("./*.entry.tsx", { eager: true }) as Record<
  string,
  Record<string, LogoEntry>
>;

export const logosRegistry: LogoEntry[] = Object.values(modules).map(
  (mod) => Object.values(mod)[0]
);
