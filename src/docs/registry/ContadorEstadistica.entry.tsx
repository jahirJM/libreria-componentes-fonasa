import contadorCode from "../../componentsUI/ContadorEstadistica.tsx?raw";
import { ContadorEstadistica } from "../../componentsUI/ContadorEstadistica";
import type { ComponentEntry } from "./types";

// ─── Íconos SVG inline ────────────────────────────────────────────────────────

const IconoBeneficios = (
  <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.874M9 20H4v-2a4 4 0 015-3.874m6-9.126a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconoMonto = (
  <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconoTasa = (
  <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconoSucursales = (
  <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// ─── Entry ────────────────────────────────────────────────────────────────────

export const contadorEstadisticaEntry: ComponentEntry = {
  name: "Contador Estadística",
  description:
    "Tarjeta de métrica animada con patrón de composición. Cuenta desde 0 hasta el valor final al entrar en pantalla. Usa sub-componentes: Cabecera, Metrica, Contenido, Etiqueta, Descripcion y Tendencia.",
  code: contadorCode,
  colors: [
    { name: "Blanco", value: "#ffffff", usage: "Fondo de todas las variantes" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Borde variante neutral" },
    { name: "Fondo (cards)", value: "#f3f4f6", usage: "Acento variante neutral" },
    { name: "Texto (placeholder)", value: "#9ca3af", usage: "Descripción y tendencia sin cambio" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Ícono variante neutral" },
    { name: "Texto (medio)", value: "#4b5563", usage: "Texto etiqueta" },
    { name: "Fondos (overlay)", value: "#111827", usage: "Número variante neutral" },
    { name: "Fondo selecciones", value: "#dbeafe", usage: "Borde variante primario" },
    { name: "Fondo badge revisión", value: "#eff6ff", usage: "Acento variante primario" },
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Número e ícono variante primario" },
    { name: "Fondo (éxito)", value: "#dcfce7", usage: "Borde variante éxito" },
    { name: "Fondo (aprobado)", value: "#f0fdf4", usage: "Acento variante éxito" },
    { name: "Borde confirmación", value: "#16a34a", usage: "Ícono variante éxito y tendencia subida" },
    { name: "Texto (aprobado)", value: "#15803d", usage: "Número variante éxito" },
    { name: "Fondo (precaución)", value: "#fef9c3", usage: "Borde y acento variante advertencia" },
    { name: "Ícono advertencia", value: "#f59e0b", usage: "Ícono variante advertencia" },
    { name: "Botón advertencia hover", value: "#d97706", usage: "Número variante advertencia" },
    { name: "Fondo (error)", value: "#fee2e2", usage: "Borde variante peligro" },
    { name: "Fondo (rechazado)", value: "#fef2f2", usage: "Acento variante peligro" },
    { name: "Bordes error, íconos", value: "#ef4444", usage: "Ícono variante peligro y tendencia bajada" },
    { name: "Botón eliminar", value: "#dc2626", usage: "Número variante peligro" },
  ],
  propsInterface: `type VarianteContador = "neutral" | "primario" | "exito" | "advertencia" | "peligro";

// Componente raíz
interface ContadorEstadisticaProps {
  variante?: VarianteContador;
  duracion?: number;        // ms (default: 1500)
  className?: string;
  children: ReactNode;
}

// ContadorEstadistica.Metrica
interface MetricaProps {
  valor: number;
  prefijo?: string;         // ej: "$"
  sufijo?: string;          // ej: "%", " pts"
  separadorMiles?: string;  // default: "."
}

// ContadorEstadistica.Tendencia
interface TendenciaProps {
  tipo: "subida" | "bajada" | "sin-cambio";
  children: ReactNode;
}

// ContadorEstadistica.Cabecera   → children: ReactNode
// ContadorEstadistica.Contenido  → children: ReactNode
// ContadorEstadistica.Etiqueta   → children: ReactNode
// ContadorEstadistica.Descripcion → children: ReactNode`,
  variants: [
    {
      label: "Neutral",
      props: {},
      render: () => (
        <ContadorEstadistica>
          <ContadorEstadistica.Cabecera>{IconoBeneficios}</ContadorEstadistica.Cabecera>
          <ContadorEstadistica.Metrica valor={14823} />
          <ContadorEstadistica.Contenido>
            <ContadorEstadistica.Etiqueta>Beneficiarios activos</ContadorEstadistica.Etiqueta>
            <ContadorEstadistica.Descripcion>Registros actualizados hoy</ContadorEstadistica.Descripcion>
            <ContadorEstadistica.Tendencia tipo="subida">+3,2% este mes</ContadorEstadistica.Tendencia>
          </ContadorEstadistica.Contenido>
        </ContadorEstadistica>
      ),
      usageCode: `<ContadorEstadistica>
  <ContadorEstadistica.Cabecera><MiIcono /></ContadorEstadistica.Cabecera>
  <ContadorEstadistica.Metrica valor={14823} />
  <ContadorEstadistica.Contenido>
    <ContadorEstadistica.Etiqueta>Beneficiarios activos</ContadorEstadistica.Etiqueta>
    <ContadorEstadistica.Descripcion>Registros actualizados hoy</ContadorEstadistica.Descripcion>
    <ContadorEstadistica.Tendencia tipo="subida">+3,2% este mes</ContadorEstadistica.Tendencia>
  </ContadorEstadistica.Contenido>
</ContadorEstadistica>`,
    },
    {
      label: "Primario (con prefijo $)",
      props: {},
      render: () => (
        <ContadorEstadistica variante="primario">
          <ContadorEstadistica.Cabecera>{IconoMonto}</ContadorEstadistica.Cabecera>
          <ContadorEstadistica.Metrica valor={4500000} prefijo="$" />
          <ContadorEstadistica.Contenido>
            <ContadorEstadistica.Etiqueta>Monto procesado</ContadorEstadistica.Etiqueta>
            <ContadorEstadistica.Descripcion>En el período actual</ContadorEstadistica.Descripcion>
            <ContadorEstadistica.Tendencia tipo="subida">+18% vs mes anterior</ContadorEstadistica.Tendencia>
          </ContadorEstadistica.Contenido>
        </ContadorEstadistica>
      ),
      usageCode: `<ContadorEstadistica variante="primario">
  <ContadorEstadistica.Cabecera><IconoMonto /></ContadorEstadistica.Cabecera>
  <ContadorEstadistica.Metrica valor={4500000} prefijo="$" />
  <ContadorEstadistica.Contenido>
    <ContadorEstadistica.Etiqueta>Monto procesado</ContadorEstadistica.Etiqueta>
    <ContadorEstadistica.Descripcion>En el período actual</ContadorEstadistica.Descripcion>
    <ContadorEstadistica.Tendencia tipo="subida">+18% vs mes anterior</ContadorEstadistica.Tendencia>
  </ContadorEstadistica.Contenido>
</ContadorEstadistica>`,
    },
    {
      label: "Éxito (con sufijo %)",
      props: {},
      render: () => (
        <ContadorEstadistica variante="exito">
          <ContadorEstadistica.Cabecera>{IconoTasa}</ContadorEstadistica.Cabecera>
          <ContadorEstadistica.Metrica valor={98} sufijo="%" />
          <ContadorEstadistica.Contenido>
            <ContadorEstadistica.Etiqueta>Tasa de aprobación</ContadorEstadistica.Etiqueta>
            <ContadorEstadistica.Descripcion>Solicitudes procesadas</ContadorEstadistica.Descripcion>
            <ContadorEstadistica.Tendencia tipo="subida">+2 puntos</ContadorEstadistica.Tendencia>
          </ContadorEstadistica.Contenido>
        </ContadorEstadistica>
      ),
      usageCode: `<ContadorEstadistica variante="exito">
  <ContadorEstadistica.Cabecera><IconoTasa /></ContadorEstadistica.Cabecera>
  <ContadorEstadistica.Metrica valor={98} sufijo="%" />
  <ContadorEstadistica.Contenido>
    <ContadorEstadistica.Etiqueta>Tasa de aprobación</ContadorEstadistica.Etiqueta>
    <ContadorEstadistica.Tendencia tipo="subida">+2 puntos</ContadorEstadistica.Tendencia>
  </ContadorEstadistica.Contenido>
</ContadorEstadistica>`,
    },
    {
      label: "Advertencia",
      props: {},
      render: () => (
        <ContadorEstadistica variante="advertencia">
          <ContadorEstadistica.Cabecera>{IconoSucursales}</ContadorEstadistica.Cabecera>
          <ContadorEstadistica.Metrica valor={247} />
          <ContadorEstadistica.Contenido>
            <ContadorEstadistica.Etiqueta>Solicitudes pendientes</ContadorEstadistica.Etiqueta>
            <ContadorEstadistica.Descripcion>Requieren revisión</ContadorEstadistica.Descripcion>
            <ContadorEstadistica.Tendencia tipo="bajada">-5% respecto ayer</ContadorEstadistica.Tendencia>
          </ContadorEstadistica.Contenido>
        </ContadorEstadistica>
      ),
      usageCode: `<ContadorEstadistica variante="advertencia">
  <ContadorEstadistica.Metrica valor={247} />
  <ContadorEstadistica.Contenido>
    <ContadorEstadistica.Etiqueta>Solicitudes pendientes</ContadorEstadistica.Etiqueta>
    <ContadorEstadistica.Tendencia tipo="bajada">-5% respecto ayer</ContadorEstadistica.Tendencia>
  </ContadorEstadistica.Contenido>
</ContadorEstadistica>`,
    },
    {
      label: "Peligro",
      props: {},
      render: () => (
        <ContadorEstadistica variante="peligro">
          <ContadorEstadistica.Metrica valor={12} />
          <ContadorEstadistica.Contenido>
            <ContadorEstadistica.Etiqueta>Errores detectados</ContadorEstadistica.Etiqueta>
            <ContadorEstadistica.Descripcion>En las últimas 24 horas</ContadorEstadistica.Descripcion>
            <ContadorEstadistica.Tendencia tipo="subida">+4 nuevos hoy</ContadorEstadistica.Tendencia>
          </ContadorEstadistica.Contenido>
        </ContadorEstadistica>
      ),
      usageCode: `<ContadorEstadistica variante="peligro">
  <ContadorEstadistica.Metrica valor={12} />
  <ContadorEstadistica.Contenido>
    <ContadorEstadistica.Etiqueta>Errores detectados</ContadorEstadistica.Etiqueta>
    <ContadorEstadistica.Tendencia tipo="subida">+4 nuevos hoy</ContadorEstadistica.Tendencia>
  </ContadorEstadistica.Contenido>
</ContadorEstadistica>`,
    },
    {
      label: "Sin cabecera ni tendencia",
      props: {},
      render: () => (
        <ContadorEstadistica variante="primario">
          <ContadorEstadistica.Metrica valor={56} />
          <ContadorEstadistica.Contenido>
            <ContadorEstadistica.Etiqueta>Sucursales habilitadas</ContadorEstadistica.Etiqueta>
            <ContadorEstadistica.Descripcion>A nivel nacional</ContadorEstadistica.Descripcion>
          </ContadorEstadistica.Contenido>
        </ContadorEstadistica>
      ),
      usageCode: `<ContadorEstadistica variante="primario">
  <ContadorEstadistica.Metrica valor={56} />
  <ContadorEstadistica.Contenido>
    <ContadorEstadistica.Etiqueta>Sucursales habilitadas</ContadorEstadistica.Etiqueta>
    <ContadorEstadistica.Descripcion>A nivel nacional</ContadorEstadistica.Descripcion>
  </ContadorEstadistica.Contenido>
</ContadorEstadistica>`,
    },
    {
      label: "Animación lenta (3s)",
      props: {},
      render: () => (
        <ContadorEstadistica variante="exito" duracion={3000}>
          <ContadorEstadistica.Cabecera>
            <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.874M9 20H4v-2a4 4 0 015-3.874m6-9.126a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </ContadorEstadistica.Cabecera>
          <ContadorEstadistica.Metrica valor={1000000} sufijo=" pac." />
          <ContadorEstadistica.Contenido>
            <ContadorEstadistica.Etiqueta>Atenciones anuales</ContadorEstadistica.Etiqueta>
            <ContadorEstadistica.Descripcion>Pacientes atendidos en el año</ContadorEstadistica.Descripcion>
            <ContadorEstadistica.Tendencia tipo="subida">+12% vs año anterior</ContadorEstadistica.Tendencia>
          </ContadorEstadistica.Contenido>
        </ContadorEstadistica>
      ),
      usageCode: `<ContadorEstadistica variante="exito" duracion={3000}>
  <ContadorEstadistica.Cabecera>
    <MiIcono />
  </ContadorEstadistica.Cabecera>
  <ContadorEstadistica.Metrica valor={1000000} sufijo=" pac." />
  <ContadorEstadistica.Contenido>
    <ContadorEstadistica.Etiqueta>Atenciones anuales</ContadorEstadistica.Etiqueta>
    <ContadorEstadistica.Descripcion>Pacientes atendidos en el año</ContadorEstadistica.Descripcion>
    <ContadorEstadistica.Tendencia tipo="subida">+12% vs año anterior</ContadorEstadistica.Tendencia>
  </ContadorEstadistica.Contenido>
</ContadorEstadistica>`,
    },
    {
      label: "Personalizado con className",
      props: {},
      render: () => (
        <ContadorEstadistica
          variante="primario"
          className="bg-linear-to-br from-[#0353A4] via-[#0572CE] to-[#0284C7] border-[#0353A4] text-white"
        >
          {/* Cabecera con fila: ícono + título a la derecha */}
          <ContadorEstadistica.Cabecera className="bg-white/15! text-white! mb-4 size-12 rounded-2xl">
            <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </ContadorEstadistica.Cabecera>

          <ContadorEstadistica.Metrica valor={99} sufijo="%" />

          <ContadorEstadistica.Contenido>
            {/* Título y descripción con colores propios */}
            <p className="text-base font-semibold text-white">Disponibilidad del sistema</p>
            <p className="text-xs text-blue-100/80">Medido en los últimos 30 días</p>

            {/* Separador fino */}
            <div className="my-3 h-px bg-white/20" />

            {/* Fila de stats adicionales — JSX completamente libre */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-bold text-white text-sm">3</span>
                <span className="text-blue-100/70">incidentes</span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-bold text-white text-sm">12 min</span>
                <span className="text-blue-100/70">tiempo medio</span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-bold text-white text-sm">99,8%</span>
                <span className="text-blue-100/70">SLA</span>
              </div>
            </div>

            {/* Badge de estado */}
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white border border-white/20">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Todos los servicios operativos
            </span>
          </ContadorEstadistica.Contenido>
        </ContadorEstadistica>
      ),
      usageCode: `// className sobreescribe el fondo y borde del contenedor raíz.
// Cabecera.className sobreescribe el wrapper del ícono.
// Dentro de Contenido puedes poner cualquier JSX — sin restricciones.

<ContadorEstadistica
  variante="primario"
  className="bg-linear-to-br from-[#0353A4] via-[#0572CE] to-[#0284C7] border-[#0353A4]"
>
  <ContadorEstadistica.Cabecera className="bg-white/15! text-white! size-12 rounded-2xl">
    <MiIcono className="size-6" />
  </ContadorEstadistica.Cabecera>

  <ContadorEstadistica.Metrica valor={99} sufijo="%" />

  <ContadorEstadistica.Contenido>
    <p className="text-base font-semibold text-white">Disponibilidad del sistema</p>
    <p className="text-xs text-blue-100/80">Medido en los últimos 30 días</p>

    <div className="my-3 h-px bg-white/20" />

    {/* Stats secundarias — JSX libre */}
    <div className="flex items-center justify-between text-xs">
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-bold text-white text-sm">3</span>
        <span className="text-blue-100/70">incidentes</span>
      </div>
      <div className="w-px h-6 bg-white/20" />
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-bold text-white text-sm">99,8%</span>
        <span className="text-blue-100/70">SLA</span>
      </div>
    </div>

    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white border border-white/20">
      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Todos los servicios operativos
    </span>
  </ContadorEstadistica.Contenido>
</ContadorEstadistica>`,
    },
    {
      label: "Skeleton",
      props: { isLoading: true },
      render: () => (
        <ContadorEstadistica variante="primario" isLoading>{null}</ContadorEstadistica>
      ),
      usageCode: `<ContadorEstadistica variante="primario" isLoading>
  {null}
</ContadorEstadistica>`,
    },
  ],
};
