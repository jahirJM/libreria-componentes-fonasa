# Librería de Componentes UI — Fonasa

Librería interna de componentes React + TypeScript + Tailwind CSS. Los componentes se instalan individualmente mediante una CLI propia (estilo shadcn/ui), sin necesidad de descargar toda la librería.

---

## 📦 Instalación y Uso (Para Consumidores)

### Requisitos previos

- Node.js 18+
- Acceso al repositorio privado de GitHub (debes ser **colaborador** del repo o pertenecer a la organización)

> **⚠️ Importante:** Si no tienes acceso al repositorio, solicítalo al equipo mantenedor. Sin acceso, la CLI no podrá descargar los componentes.

### 1. Instalar la CLI

Desde la raíz de tu proyecto, ejecuta:

```bash
npm install -D github:jahirJM/libreria-componentes-fonasa
```

Esto agrega la CLI `fonasa-ui` como dependencia de desarrollo.

### 2. Inicializar configuración

```bash
npx fonasa-ui init
```

Te preguntará:
- **¿Dónde guardar los componentes?** → Ejemplo: `src/components/ui`
- **¿Usas TypeScript?** → `true`

Esto crea un archivo `fonasa-ui.json` en la raíz de tu proyecto:

```json
{
  "componentsDir": "src/components/ui",
  "typescript": true
}
```

### 3. Ver componentes disponibles

```bash
npx fonasa-ui list
```

Muestra todos los componentes con su descripción y dependencias npm requeridas.

### 4. Agregar componentes

```bash
# Un componente
npx fonasa-ui add Input

# Varios a la vez
npx fonasa-ui add Input Select Badge Drawer

# Con nombre compuesto (usar comillas)
npx fonasa-ui add "Lista de Solicitudes"
npx fonasa-ui add "Input Calendario"
```

La CLI automáticamente:
- Copia el archivo `.tsx` a la carpeta que configuraste
- Resuelve dependencias internas (si un componente usa otro, lo descarga también)
- Te indica qué dependencias npm instalar

### 5. Instalar dependencias npm indicadas

Después de agregar componentes, la CLI te muestra algo como:

```
⚠️  Dependencias npm requeridas:
   npm install clsx react-icons
```

Ejecuta ese comando para instalar las librerías externas necesarias.

### 6. Actualizar un componente

Si el equipo publicó una mejora, actualiza primero la CLI:

```bash
npm install -D github:jahirJM/libreria-componentes-fonasa
```

Y luego reinstala el componente con `--overwrite`:

```bash
npx fonasa-ui add Input --overwrite
```

### 7. Usar el componente

Los componentes se copian tal cual a tu proyecto. Impórtalos normalmente:

```tsx
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";

function MiFormulario() {
  return (
    <div>
      <Label text="Nombre" indicador />
      <Input type="text" placeholder="Ingrese su nombre" />
      <Badge variant="estado-pendiente" text="Pendiente" />
    </div>
  );
}
```

> **Nota:** El código es tuyo. Puedes editarlo y adaptarlo a las necesidades de tu proyecto.

---

## 🔐 Acceso al Repositorio

Para usar la CLI, cada usuario necesita **acceso de lectura** al repositorio de GitHub. Esto se logra de dos formas:

| Opción | Cómo |
|--------|------|
| **Colaborador directo** | El mantenedor agrega al usuario como colaborador en Settings → Collaborators |
| **Miembro de organización** | Si el repo está en una org de GitHub, basta con pertenecer a la org |

Sin acceso, el `npm install` desde GitHub fallará con error de autenticación.

### Configurar autenticación Git

Los usuarios deben tener Git configurado para autenticarse con GitHub. Opciones:

```bash
# Opción 1: HTTPS con credential manager (recomendado en Windows)
git config --global credential.helper manager

# Opción 2: SSH (si ya tienen clave SSH configurada)
# El install sería:
npm install -D git+ssh://git@github.com/jahirJM/libreria-componentes-fonasa.git
```

---

## 🛠️ Guía para Colaboradores (Agregar o Modificar Componentes)

### Estructura del proyecto

```
libreria-componentes-fonasa/
├── src/
│   ├── componentsUI/              ← Código fuente de los componentes
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── ...
│   ├── docs/
│   │   ├── registry/             ← Metadata y documentación de cada componente
│   │   │   ├── input.entry.tsx
│   │   │   ├── Badge.entry.tsx
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   └── demos/                ← Demos interactivas (para el sitio de docs)
│   └── app/                      ← Sitio de documentación visual
├── cli/                          ← CLI para consumidores
├── scripts/
│   └── generate-registry.js      ← Genera registry.json
├── registry.json                 ← Metadata generada (NO editar manualmente)
└── package.json
```

### Crear un nuevo componente

#### Paso 1: Crear el componente en `src/componentsUI/`

Crea un archivo `.tsx` en `src/componentsUI/`. Ejemplo: `MiComponente.tsx`

```tsx
import clsx from "clsx";

interface MiComponenteProps {
  titulo: string;
  variante?: "primary" | "secondary";
  disabled?: boolean;
}

export function MiComponente({ titulo, variante = "primary", disabled = false }: MiComponenteProps) {
  return (
    <div className={clsx(
      "p-4 rounded-lg border",
      variante === "primary" && "bg-[#eff6ff] border-[#2563eb] text-[#1e3a5f]",
      variante === "secondary" && "bg-[#f9fafb] border-[#e5e7eb] text-[#374151]",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      {titulo}
    </div>
  );
}
```

**Reglas del componente:**
- Usar solo colores de la paleta definida (ver `src/app/pages/ColorsPage.tsx`)
- Usar Tailwind CSS para estilos
- Exportar el componente con `export function` o `export const`
- Tipar las props con una interface

#### Paso 2: Crear el entry en `src/docs/registry/`

Crea un archivo `MiComponente.entry.tsx` en `src/docs/registry/`:

```tsx
import miComponenteCode from "../../componentsUI/MiComponente.tsx?raw";
import { MiComponente } from "../../componentsUI/MiComponente";
import type { ComponentEntry } from "./types";

export const miComponenteEntry: ComponentEntry = {
  name: "MiComponente",
  description: "Descripción breve de qué hace el componente.",
  code: miComponenteCode,
  dependencies: ["clsx"],  // Solo si usa librerías externas (no react/tailwind)
  colors: [
    { name: "Fondo badge revisión", value: "#eff6ff", usage: "Fondo variante primary" },
    { name: "Color primario (blue-600)", value: "#2563eb", usage: "Borde variante primary" },
    { name: "Focus ring inputs", value: "#1e3a5f", usage: "Texto variante primary" },
    { name: "Fondo (sutil)", value: "#f9fafb", usage: "Fondo variante secondary" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Borde variante secondary" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Texto variante secondary" },
  ],
  propsInterface: `interface MiComponenteProps {
  titulo: string;
  variante?: "primary" | "secondary";
  disabled?: boolean;
}`,
  variants: [
    {
      label: "Primary",
      props: { titulo: "Hola mundo", variante: "primary" },
      render: () => <MiComponente titulo="Hola mundo" variante="primary" />,
      usageCode: `<MiComponente titulo="Hola mundo" variante="primary" />`,
    },
    {
      label: "Secondary",
      props: { titulo: "Hola mundo", variante: "secondary" },
      render: () => <MiComponente titulo="Hola mundo" variante="secondary" />,
      usageCode: `<MiComponente titulo="Hola mundo" variante="secondary" />`,
    },
    {
      label: "Disabled",
      props: { titulo: "No disponible", disabled: true },
      render: () => <MiComponente titulo="No disponible" disabled />,
      usageCode: `<MiComponente titulo="No disponible" disabled />`,
    },
  ],
};
```

**Campos obligatorios del entry:**

| Campo | Descripción |
|-------|-------------|
| `name` | Nombre del componente (como aparece en la CLI y docs) |
| `description` | Descripción breve. Si usa otros componentes internos, iniciar con `"Utiliza: X, Y."` |
| `code` | Import del código raw (`?raw`) |
| `colors` | Array de colores usados (de la paleta oficial) |
| `propsInterface` | Interface TypeScript de las props |
| `variants` | Array de variantes para preview visual |

**Campos opcionales:**

| Campo | Descripción |
|-------|-------------|
| `dependencies` | Array de paquetes npm externos requeridos (no incluir react/tailwind) |
| `group` | Grupo para organizar en el sidebar (ej: "Modales", "Tablas", "Calendario") |

#### Paso 3: Si tu componente usa otro componente interno

Si `MiComponente` importa otro componente de la librería (ej: `Badge`):

1. Agrega `"Utiliza: Badge."` al inicio de la `description`
2. Asegúrate que el componente dependiente ya tenga su propio entry

```tsx
description: "Utiliza: Badge, Paginación. Mi componente con estados y paginación.",
```

### Publicar los cambios

Después de crear o modificar un componente, ejecuta estos comandos:

```bash
# 1. Regenerar el registry.json
npm run generate:registry

# 2. Recompilar la CLI (incluye componentes nuevos)
npm run cli:build

# 3. Verificar que aparece en la lista
node cli/dist/index.js list

# 4. Commit y push
git add .
git commit -m "feat: agregar componente MiComponente"
git push
```

> **⚠️ Importante:** Siempre ejecutar `generate:registry` y `cli:build` antes de hacer push. Sin esto, el componente nuevo no estará disponible para los consumidores.

### Modificar un componente existente

1. Edita el archivo en `src/componentsUI/NombreComponente.tsx`
2. Si cambian las props, actualiza el entry en `src/docs/registry/`
3. Ejecuta los mismos 4 pasos de publicación

### Checklist antes de hacer push

- [ ] El componente usa solo colores de la paleta oficial
- [ ] El entry tiene todos los campos obligatorios (`name`, `description`, `code`, `colors`, `propsInterface`, `variants`)
- [ ] Si usa dependencias npm externas, están en el campo `dependencies`
- [ ] Si usa otros componentes internos, está declarado con `"Utiliza: X."` en la description
- [ ] Ejecuté `npm run generate:registry`
- [ ] Ejecuté `npm run cli:build`
- [ ] El componente aparece en `node cli/dist/index.js list`

---

## 🏃 Desarrollo local (Sitio de documentación)

Para levantar el sitio de docs y previsualizar componentes:

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` para ver la documentación interactiva con previews de todos los componentes.

---

## 📋 Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Levantar sitio de docs en desarrollo |
| `npm run generate:registry` | Regenerar `registry.json` desde las entries |
| `npm run cli:build` | Compilar la CLI + copiar componentes |
| `node cli/dist/index.js list` | Ver lista de componentes desde la CLI local |
| `npm run lint` | Ejecutar ESLint |
| `npm run test` | Ejecutar tests |
