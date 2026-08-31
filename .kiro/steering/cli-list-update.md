---
inclusion: always
---

# Regla: Actualizar el listado del CLI al crear o agregar componentes

Cada vez que se cree o agregue un nuevo componente a la librería (nuevo archivo en
`src/componentsUI/` y/o nueva entrada en `src/docs/registry/*.entry.tsx`), se debe
actualizar el listado que muestra el CLI (`fonasa-ui list`).

El comando `list` no lee los componentes directamente: se alimenta del `registry.json`
generado por el script de build. Por lo tanto, agregar la entrada en el registry no basta;
hay que regenerar el registry y recompilar el CLI.

## Pasos obligatorios

Tras crear o agregar un componente, ejecutar en la raíz del proyecto:

```bash
npm run generate:registry
npm run cli:build
```

- `npm run generate:registry` regenera `registry.json` a partir de las entradas del registry.
- `npm run cli:build` recompila el CLI (`cli/dist/`) para que el comando `list` y `add`
  reflejen el componente nuevo.

## Qué verificar

1. El componente aparece en la salida de `fonasa-ui list` (o `node cli/dist/index.js list`).
2. El contador de componentes disponibles se incrementó.
3. El componente quedó en el grupo correcto (campo `group` de la entrada del registry).
4. Si el componente incluye archivo de test, muestra el marcador `[test]` en el listado.
5. Si declara `dependencies`, estas aparecen entre corchetes al final de la línea.

## Nota

Si se elimina o renombra un componente, aplican los mismos pasos para mantener el listado
sincronizado con el estado real de la librería.
