# Regla: Colores utilizados en componentes

## Paleta obligatoria

Todos los componentes de la librería (`src/componentsUI/`) **DEBEN** usar exclusivamente los colores definidos en `colorSections` dentro de `src/app/pages/ColorsPage.tsx`. No se permite usar colores arbitrarios que no estén en la paleta.

### Colores permitidos (referencia rápida)

**Institucionales:**
- `#008CB5` — Color primario (prestadores naturales)
- `#0572CE` — Color primario (fonasa)
- `rgba(1,91,147,0.68)` — Color secundario (fondos)
- `#D4E8F7` — Color secundario (fondos)
- `#fafdff` — Color secundario (fondos)

**Grises:**
- `#f9fafb` (gray-50), `#f3f4f6` (gray-100), `#e5e7eb` (gray-200), `#d1d5db` (gray-300)
- `#9ca3af` (gray-400), `#6b7280` (gray-500), `#4b5563` (gray-600), `#374151` (gray-700)
- `#1f2937` (gray-800), `#111827` (gray-900), `#414951` (Secondary texto)

**Azules:**
- `#eff6ff` (blue-50), `#dbeafe` (blue-100), `#93c5fd` (blue-300)
- `#2563eb` (blue-600), `#1d4ed8` (blue-700), `#1e40af` (blue-800), `#1e3a5f` (blue-900)

**Estados (Badges):**
- `#f0fdf4` / `#15803d` — aprobado (fondo/texto)
- `#fef2f2` / `#b91c1c` — rechazado (fondo/texto)
- `#fefce8` / `#a16207` — pendiente (fondo/texto)

**Notificaciones / Respuestas:**
- `#dcfce7` / `#166534` — éxito (fondo/texto)
- `#fee2e2` / `#991b1b` — error (fondo/texto)
- `#fef9c3` / `#78350f` — precaución (fondo/texto)

**Barras de Entorno:**
- `#ca8a04` / `#713f12` — desarrollo (fondo/texto)
- `#dc2626` / `#7f1d1d` — QA (fondo/texto)

**Variantes:**
- `#22c55e` (green-500), `#16a34a` (green-600)
- `#ef4444` (red-500), `#dc2626` (red-600)
- `#ca8a04` (yellow-600)
- `#f59e0b` (amber-500), `#d97706` (amber-600)
- `#06b6d4` (cyan-500), `#0891b2` (cyan-600)

## Regla de sustitución

Si un componente usa un color que **NO está en la paleta**, se debe reemplazar por el color más cercano visualmente que SÍ exista en la paleta. Para determinar el más cercano:

1. Comparar el tono (hue) del color original con los disponibles en la paleta.
2. Dentro del mismo tono, elegir el que tenga luminosidad/saturación más similar.
3. Si no hay un tono similar, usar el gris más cercano en luminosidad.

**Ejemplo:** Si un componente usa `#3b82f6` (blue-500), reemplazar con `#2563eb` (blue-600) que es el azul más cercano disponible en la paleta.

## Registro en el registry

Cada vez que se cree o registre un nuevo componente en `src/registry.tsx`, se debe incluir el campo `colors` con los colores de la paleta que utiliza:

```tsx
{
  name: "MiComponente",
  description: "...",
  code: miComponenteCode,
  colors: [
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Botón principal" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Bordes del contenedor" },
  ],
  variants: [...]
}
```

## Reglas

1. **Solo colores de la paleta** — Si al crear o editar un componente se detecta un color fuera de la paleta, sustituirlo inmediatamente por el más cercano.
2. **Siempre agregar `colors` al registry** — Es obligatorio para todos los componentes registrados.
3. **Incluir TODOS los colores usados** — Revisar clases Tailwind (`bg-blue-600`, `text-gray-700`), hex inline (`bg-[#0572CE]`), y rgba.
4. **Usar el nombre de la paleta** — En el campo `name` usar el nombre tal como aparece en `ColorsPage.tsx`.
5. **Documentar el uso** — En el campo `usage` describir brevemente para qué se usa ese color.

## Estructura del campo

```tsx
interface ComponentColor {
  name: string;   // Nombre del color según ColorsPage.tsx
  value: string;  // Valor hex, rgb o rgba (debe coincidir con la paleta)
  usage: string;  // Descripción breve de su uso en el componente
}
```

## Visualización

El campo `colors` se muestra automáticamente en la página del componente como una sección "Colores" con swatches visuales clickeables que copian el valor.

## NO se agregan colores nuevos a la paleta

A diferencia de antes, **NO** se deben agregar colores nuevos a `ColorsPage.tsx`. Si un componente necesita un color que no existe, se sustituye por el más cercano de la paleta existente. La paleta solo se modifica con autorización explícita del usuario.
