<<<<<<< HEAD
# Libreria de Componentes UI - Fonasa

Libreria interna de componentes React + Tailwind CSS para proyectos Fonasa. Funciona bajo un modelo copy-paste: los componentes se copian directamente al proyecto destino via CLI, sin instalar una dependencia de libreria.

El proyecto tiene dos caras:

1. **App de documentacion** — Una aplicacion Vite + React que sirve como catalogo visual, previsualizador y referencia tecnica de cada componente.
2. **CLI (`fonasa-ui`)** — Herramienta de linea de comandos que permite instalar componentes individuales (y sus dependencias internas) en cualquier proyecto.

---

## Seccion 1: Para desarrolladores que consumen la libreria

Esta seccion es para equipos que quieran usar los componentes en sus propios proyectos.

### Requisitos previos

- Node.js 18+
- Proyecto con React 19+ y Tailwind CSS 4+
- TypeScript (recomendado)

### Uso del CLI

Todos los comandos se ejecutan con `npx`:

```bash
npx fonasa-ui <comando>
```

### Inicializar tu proyecto

Antes de agregar componentes, inicializa la configuracion:
=======
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
>>>>>>> feat/documentacion-instalacion

```bash
npx fonasa-ui init
```

<<<<<<< HEAD
Esto crea un archivo `fonasa-ui.json` en la raiz de tu proyecto con:
=======
Te preguntará:
- **¿Dónde guardar los componentes?** → Ejemplo: `src/components/ui`
- **¿Usas TypeScript?** → `true`

Esto crea un archivo `fonasa-ui.json` en la raíz de tu proyecto:
>>>>>>> feat/documentacion-instalacion

```json
{
  "componentsDir": "src/components/ui",
  "typescript": true
}
```

<<<<<<< HEAD
- `componentsDir` — Carpeta donde se copiaran los componentes.
- `typescript` — Indica si tu proyecto usa TypeScript.

### Ver componentes disponibles
=======
### 3. Ver componentes disponibles
>>>>>>> feat/documentacion-instalacion

```bash
npx fonasa-ui list
```

<<<<<<< HEAD
Muestra todos los componentes agrupados por categoria, con descripcion y dependencias npm requeridas.

Para obtener la salida en JSON (util para scripts):

```bash
npx fonasa-ui list --json
```

### Instalar componentes

```bash
npx fonasa-ui add <nombre-componente>
```

Ejemplos:

```bash
npx fonasa-ui add input
npx fonasa-ui add modal select badge
npx fonasa-ui add lista-paginada
```

Opciones:

| Flag | Descripcion |
|------|-------------|
| `-y, --yes` | Instalar sin confirmacion interactiva |
| `-o, --overwrite` | Sobrescribir archivos existentes |

### Resolucion automatica de dependencias internas

Si un componente usa otros componentes de la libreria (por ejemplo, `lista-paginada` usa `paginacion` y `badge`), el CLI los resuelve e instala automaticamente. El output indica cuales son dependencias internas vs las que pediste explicitamente.

### Dependencias npm externas

Algunos componentes requieren paquetes adicionales. Despues de instalar, el CLI muestra un aviso con el comando de instalacion:

```
Dependencias npm requeridas:
   npm install @headlessui/react react-icons
```

Los paquetes base (react, react-dom, tailwindcss) no se listan porque se asume que ya existen en tu proyecto.

### Nombres de componentes

Los nombres siguen la convencion kebab-case sin tildes:

```bash
npx fonasa-ui add tabla-basica
npx fonasa-ui add select-buscable
npx fonasa-ui add boton-clave-unica
npx fonasa-ui add paginacion
```

### Paleta de colores

Todos los componentes usan una paleta institucional fija. Si necesitas modificar colores, consulta la seccion de colores en la app de documentacion o revisa `src/app/pages/ColorsPage.tsx` como referencia de los valores permitidos.

---

## Seccion 2: Para desarrolladores que contribuyen a la libreria

Esta seccion es para quienes desarrollan nuevos componentes, mantienen el registro o modifican la app de documentacion.

### Setup del proyecto

```bash
git clone <repo-url>
cd libreria-componentes-fonasa
npm install
npm run dev
```

La app de documentacion corre en `http://localhost:5173`.
=======
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
>>>>>>> feat/documentacion-instalacion

### Estructura del proyecto

```
<<<<<<< HEAD
src/
  componentsUI/       # Codigo fuente de cada componente (.tsx)
  docs/
    registry/         # Entradas del registro (*.entry.tsx) - metadata de cada componente
    demos/            # Demos interactivas para el previsualizador
    methods-registry/ # Registro de metodos/utilidades
    logos-registry/   # Registro de logos
  app/
    pages/            # Paginas de la app (ColorsPage, ComponentPage, etc.)
    layouts/          # Layouts de la app
  methods/            # Funciones utilitarias
  skeletons/          # Componentes skeleton de carga

cli/                  # CLI (@fonasa/ui-cli)
  src/
    commands/         # Comandos: add, list, init
    utils/            # Utilidades: config, fetch, registry, resolve

scripts/
  generate-registry.js  # Genera registry.json a partir de los .entry.tsx

registry.json         # Registro generado (lo consume el CLI)
```

### Agregar un nuevo componente

1. Crear el archivo del componente en `src/componentsUI/MiComponente.tsx`
2. Crear su entrada en `src/docs/registry/MiComponente.entry.tsx`
3. Regenerar el registry: `npm run generate:registry`

### Campos obligatorios en un entry

Cada archivo `.entry.tsx` debe exportar una entrada con estos campos:

| Campo | Obligatorio | Descripcion |
|-------|:-----------:|-------------|
| `name` | Si | Nombre en kebab-case sin tildes |
| `description` | Si | Descripcion del componente. Si usa otros componentes, prefijo `"Utiliza: x, y."` |
| `code` | Si | Codigo fuente raw del componente (import con `?raw`) |
| `propsInterface` | Si | Interface TypeScript de las props como string |
| `colors` | Si | Array de colores de la paleta usados por el componente |
| `dependencies` | Condicional | Array de paquetes npm externos (solo si usa libs fuera de react/tailwind) |
| `variants` | No | Array de variantes con demos |
| `group` | No | Categoria para agrupar en el sidebar |

### Generar el registry.json

El archivo `registry.json` en la raiz es lo que el CLI consume. Se genera automaticamente:

```bash
npm run generate:registry
```

El script lee cada `*.entry.tsx`, extrae `name`, `description`, `dependencies`, `group`, `file` e `internalDeps` (parseado del patron "Utiliza: X, Y." en la description), y produce un JSON ordenado alfabeticamente.

### Compilar el CLI

```bash
npm run cli:build
```

Esto ejecuta esbuild para empaquetar el CLI en `cli/dist/index.js`.

---

## Flujo de versionamiento (Git)

### Reglas generales

- Nunca hacer push directo a `main`, `dev` ni `qa`.
- Siempre traer la ultima version desde `main` antes de empezar a trabajar.
- No usar `merge --rebase`, `rebase`, `squash` ni variantes. Solo merges normales via PR.
- No resolver conflictos en la misma rama de trabajo.

### Flujo para un cambio nuevo

```
1. git checkout main
2. git pull origin main
3. git checkout -b feat/<cambio-resumido>
4. (desarrollar, commits normales)
5. PR feat/<cambio-resumido> → dev
6. Si funciona en dev: PR feat/<cambio-resumido> → qa
7. Si funciona en qa: PR feat/<cambio-resumido> → main
```

### Resolver conflictos de version

Si al crear una PR hay conflictos entre la rama de feature y la rama destino, no resolverlos en la misma rama. En su lugar:

1. Crear una rama temporal con el formato: `feat/m-<cambio-resumido>-<rama-por-actualizar>`
2. En esa rama temporal, traer los cambios de la rama destino y resolver los conflictos ahi.
3. Hacer PR de la rama temporal hacia la rama destino.
4. Una vez mergeada, eliminar la rama temporal.

Ejemplo: si `feat/tabla-filtros` tiene conflictos con `dev`:

```
git checkout -b feat/m-tabla-filtros-dev
(resolver conflictos aqui)
PR feat/m-tabla-filtros-dev → dev
```

### Ramas del proyecto

| Rama | Proposito |
|------|-----------|
| `main` | Produccion. Codigo estable y validado. |
| `qa` | Testing de QA previo a produccion. |
| `dev` | Integracion de features en desarrollo. |
| `feat/<nombre>` | Ramas de trabajo individuales. |
| `feat/m-<nombre>-<rama>` | Ramas temporales para resolver conflictos. |

---

## Reglas de desarrollo (Kiro Steering)

El proyecto usa Kiro como asistente de desarrollo con reglas automaticas configuradas en `.kiro/steering/`. Estas reglas se aplican automaticamente durante el desarrollo asistido:

### component-naming

Nombres de componentes en el registry deben ser kebab-case, sin tildes, sin espacios, sin caracteres especiales. Los nombres se usan directamente como argumento del CLI.

Conversion: PascalCase se separa con guiones, tildes se eliminan, simbolos se eliminan.

### component-colors

Los componentes solo pueden usar colores de la paleta institucional definida en `ColorsPage.tsx`. Si un color no existe en la paleta, se sustituye por el mas cercano visualmente. No se agregan colores nuevos sin autorizacion. Cada entry debe declarar su campo `colors` con nombre, valor y uso.

### component-dependencies

Si un componente importa paquetes externos (mas alla de react, react-dom, tailwindcss), debe declarar el campo `dependencies` en su entry. Esto activa un banner de advertencia en el previsualizador con el comando de instalacion.

### component-payload

Todo componente registrado debe incluir `propsInterface` con la interface TypeScript de sus props. Esto se muestra como seccion "Payload esperado" en el previsualizador.

### component-references

Cuando un componente reutiliza otro componente del registry, se documenta con el prefijo `"Utiliza: X, Y."` en la description. El componente referenciado debe existir como entrada independiente.

### no-build-verification

No se ejecutan comandos de build/compile para verificar cambios. La verificacion se hace via diagnosticos del IDE (instantanea). Motivo: el proyecto es grande y la compilacion es lenta.

---

## Changelog - Cambios pendientes

### InputCalendario

- Renombrar la entrada del registry de `input-calendario` a `input-calendario` como nombre unificado (verificar consistencia en el registro).
- La prop de fecha debe aceptar tanto `string` como `Date`.
- Agregar validacion de formato de fecha recibida.
- Nueva variante: con labels "Fecha inicio" / "Fecha fin" y variante sin labels.

### Label

- Documentar que el componente requiere `IndicadorRequerido` como dependencia interna para la validacion visual. Actualizar la description con el prefijo `"Utiliza: indicador-requerido."`.
- Revisar otros componentes que tienen dependencias internas no documentadas (modales y similares) y aplicar el mismo patron.

### Input

- Reducir el border-radius (bordes menos redondeados).
- Unificar el color de borde con el resto de inputs de la libreria.
- Ajustar el spacing superior (margin/padding top) entre el label y el input.

### Botones

- Evaluar agregar transicion CSS `ease` de ~300ms al hover para suavizar el cambio de estado.
- Evaluar agregar una animacion sutil al evento `onClick` (feedback visual de presion).

### Testing

- Incorporar pruebas unitarias con **Vitest** (ya presente como devDependency del proyecto). Se elige Vitest sobre Jest por su integracion nativa con Vite, mayor velocidad de ejecucion, y compatibilidad directa con el ecosistema del proyecto (ESM, TypeScript, React) sin configuracion adicional.
- Cobertura inicial enfocada en componentes con logica interna (paginacion, validaciones, select buscable).
- Testing Library (`@testing-library/react`) para pruebas de comportamiento sobre el DOM.

### Seguridad

- Validar y sanitizar valores en todos los inputs y elementos susceptibles a inyeccion (Input, TextArea, Select, UploadBox).
- Prevenir XSS en componentes que rendericen contenido dinamico o acepten HTML/strings del usuario.
- Validar tipos y formatos de archivos en UploadBox antes de procesarlos.
- Revisar que ningun componente use `dangerouslySetInnerHTML` sin sanitizacion previa.

### CI/CD

- Configurar **Dependabot** para mantener las dependencias actualizadas automaticamente (npm). Definir el archivo `.github/dependabot.yml` con schedule semanal y labels apropiados para las PRs generadas.

---
=======
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
>>>>>>> feat/documentacion-instalacion
