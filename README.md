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

```bash
npx fonasa-ui init
```

Esto crea un archivo `fonasa-ui.json` en la raiz de tu proyecto con:

```json
{
  "componentsDir": "src/components/ui",
  "typescript": true
}
```

- `componentsDir` — Carpeta donde se copiaran los componentes.
- `typescript` — Indica si tu proyecto usa TypeScript.

### Ver componentes disponibles

```bash
npx fonasa-ui list
```

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

### Estructura del proyecto

```
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

---
