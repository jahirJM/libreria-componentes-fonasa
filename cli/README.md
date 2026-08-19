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
```

La CLI automáticamente:
- Copia el archivo del componente a tu proyecto
- Resuelve dependencias internas (si un componente usa otro, te lo instala también)
- Te muestra las dependencias npm que necesitas instalar

## Configuración (fonasa-ui.json)

```json
{
  "componentsDir": "src/components/ui",
  "typescript": true
}
```

- `componentsDir`: Ruta donde se copiarán los componentes (relativa a la raíz del proyecto)
- `typescript`: Si tu proyecto usa TypeScript (por ahora siempre true, los componentes son .tsx)

## Para mantenedores

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
