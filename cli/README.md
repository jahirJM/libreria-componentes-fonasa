# @fonasa/ui-cli

CLI para instalar componentes UI de Fonasa directamente en tu proyecto.

## Instalación

```bash
# Instalar desde el repositorio Git privado (una sola vez)
npm install -D github:tu-org/libreria-componentes-fonasa
```

> **Nota:** Necesitas tener acceso al repositorio privado en GitHub.

## Uso

### 1. Inicializar configuración

```bash
npx fonasa-ui init
```

Esto crea un archivo `fonasa-ui.json` en la raíz de tu proyecto con la ruta donde se guardarán los componentes.

### 2. Listar componentes disponibles

```bash
npx fonasa-ui list
```

### 3. Agregar componentes

```bash
# Un componente
npx fonasa-ui add Input

# Varios componentes a la vez
npx fonasa-ui add Input Select Badge Modal

# Sobrescribir si ya existe
npx fonasa-ui add Input --overwrite

# Incluir archivos de test (Jest)
npx fonasa-ui add Input --with-tests

# Varios componentes con tests
npx fonasa-ui add Input Select --with-tests --overwrite

# Agregar SOLO los tests (componente ya instalado previamente)
npx fonasa-ui add Input Select --only-tests
```

La CLI automáticamente:
- Copia el archivo del componente a tu proyecto
- Resuelve dependencias internas (si un componente usa otro, te lo instala también)
- Te muestra las dependencias npm que necesitas instalar
- Con `--with-tests`: copia los archivos de test y te muestra las devDependencies de testing

## Configuración (fonasa-ui.json)

```json
{
  "componentsDir": "src/components/ui",
  "typescript": true,
  "testsDir": "__tests__"
}
```

- `componentsDir`: Ruta donde se copiarán los componentes (relativa a la raíz del proyecto)
- `typescript`: Si tu proyecto usa TypeScript (por ahora siempre true, los componentes son .tsx)
- `testsDir` (opcional): Ruta donde se copiarán los archivos de test al usar `--with-tests`. Por defecto `__tests__`

## Para mantenedores

### Agregar tests a un componente

1. Crea el archivo de test en `src/tests/` con la convención `NombreComponente.test.tsx`:

```bash
# Ejemplo
src/tests/Input.test.tsx
src/tests/Select.test.tsx
src/tests/Badge.test.tsx
```

2. (Opcional) Importa el test como `?raw` en el `.entry.tsx` del componente para mostrarlo en el previsualizador:

```tsx
import inputTestCode from "../../tests/Input.test.tsx?raw";

export const inputEntry: ComponentEntry = {
  // ...
  testCode: inputTestCode,
  // ...
};
```

3. Regenera el registry:

```bash
npm run generate:registry
```

El script detecta automáticamente los archivos de test por convención de nombre.

### Generar registry.json

Cada vez que se agrega o modifica un componente:

```bash
# Desde la raíz del proyecto
npm run generate:registry
```

### Compilar la CLI

```bash
# Desde la raíz del proyecto
npm run cli:build
```

O desde la carpeta cli/:

```bash
cd cli
npm install
npm run build
```
