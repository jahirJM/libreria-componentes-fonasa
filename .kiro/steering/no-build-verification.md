# Regla: No compilar para verificar

**NUNCA** ejecutar comandos de build, compile o type-check para verificar cambios. Esto incluye:

- `npx tsc --noEmit`
- `npx vite build`
- `npm run build`
- `tsc`
- Cualquier variante de compilación o verificación de tipos via terminal

## Motivo

El proyecto es grande y la compilación toma demasiado tiempo. La verificación de errores se hace exclusivamente mediante la herramienta de diagnósticos del IDE (`get_diagnostics`), que es instantánea y suficiente.

## Qué usar en su lugar

- Usar `get_diagnostics` sobre los archivos modificados para verificar errores de tipos o sintaxis.
- Confiar en que si `get_diagnostics` no reporta problemas, el código está correcto.
- NO ejecutar builds, compilaciones ni type-checks como paso de verificación.
