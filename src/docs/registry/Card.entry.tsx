import cardCode from "../../componentsUI/Card.tsx?raw";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../../componentsUI/Card";
import { BotonPrimario, BotonCancelar, BotonOutline, BotonLink } from "../../componentsUI/Botones";
import type { ComponentEntry } from "./types";

export const cardEntry: ComponentEntry = {
  name: "Card",
  description:
    "Utiliza: Botones. Contenedor card composable con Header (título, descripción, acción), Content y Footer. 4 variantes: default, elevada, outline e interactiva.",
  code: cardCode,
  dependencies: ["clsx"],
  colors: [
    { name: "white", value: "#ffffff", usage: "Fondo de la card" },
    { name: "gray-200", value: "#e5e7eb", usage: "Borde variante default e interactiva" },
    { name: "gray-300", value: "#d1d5db", usage: "Borde variante outline" },
    { name: "gray-900", value: "#111827", usage: "Texto título" },
    { name: "gray-500", value: "#6b7280", usage: "Texto descripción" },
  ],
  propsInterface: `type VarianteCard = "default" | "elevada" | "outline" | "interactiva";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variante?: VarianteCard;
  children?: ReactNode;
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

interface CardActionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}`,
  variants: [
    {
      label: "Default",
      props: { variante: "default" },
      render: () => (
        <Card variante="default" className="max-w-sm">
          <CardHeader>
            <CardTitle>Solicitud de Reembolso</CardTitle>
            <CardDescription>
              Complete los datos para solicitar el reembolso de su prestación médica.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Recuerde adjuntar la boleta o factura original y el bono de atención.
            </p>
          </CardContent>
          <CardFooter>
            <BotonPrimario label="Iniciar solicitud" />
          </CardFooter>
        </Card>
      ),
      usageCode: `<Card variante="default">
  <CardHeader>
    <CardTitle>Solicitud de Reembolso</CardTitle>
    <CardDescription>
      Complete los datos para solicitar el reembolso.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Recuerde adjuntar la boleta y el bono de atención.</p>
  </CardContent>
  <CardFooter>
    <BotonPrimario label="Iniciar solicitud" />
  </CardFooter>
</Card>`,
    },
    {
      label: "Elevada",
      props: { variante: "elevada" },
      render: () => (
        <Card variante="elevada" className="max-w-sm">
          <CardHeader>
            <CardTitle>Bono de Atención</CardTitle>
            <CardDescription>Su bono fue generado exitosamente.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3">
              <p className="text-sm font-medium text-emerald-700">N° 12345678</p>
              <p className="text-xs text-emerald-600 mt-0.5">Válido hasta 30/07/2026</p>
            </div>
          </CardContent>
          <CardFooter>
            <BotonPrimario label="Descargar PDF" />
            <BotonOutline label="Compartir" />
          </CardFooter>
        </Card>
      ),
      usageCode: `<Card variante="elevada">
  <CardHeader>
    <CardTitle>Bono de Atención</CardTitle>
    <CardDescription>Su bono fue generado exitosamente.</CardDescription>
  </CardHeader>
  <CardContent>
    <div>
      <p>N° 12345678</p>
      <p>Válido hasta 30/07/2026</p>
    </div>
  </CardContent>
  <CardFooter>
    <BotonPrimario label="Descargar PDF" />
    <BotonOutline label="Compartir" />
  </CardFooter>
</Card>`,
    },
    {
      label: "Outline",
      props: { variante: "outline" },
      render: () => (
        <Card variante="outline" className="max-w-sm">
          <CardHeader>
            <CardTitle>Información del Tramo</CardTitle>
            <CardDescription>Datos de su tramo actual en Fonasa.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Tramo</dt>
                <dd className="font-medium text-gray-800">C</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Cotización</dt>
                <dd className="font-medium text-gray-800">7% sobre $850.000</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Vigencia</dt>
                <dd className="font-medium text-gray-800">Ene – Dic 2026</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      ),
      usageCode: `<Card variante="outline">
  <CardHeader>
    <CardTitle>Información del Tramo</CardTitle>
    <CardDescription>Datos de su tramo actual.</CardDescription>
  </CardHeader>
  <CardContent>
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt>Tramo</dt>
        <dd>C</dd>
      </div>
      ...
    </dl>
  </CardContent>
</Card>`,
    },
    {
      label: "Interactiva",
      props: { variante: "interactiva" },
      render: () => (
        <Card variante="interactiva" className="max-w-sm">
          <CardHeader>
            <CardTitle>Consulta de Prestadores</CardTitle>
            <CardDescription>
              Busque prestadores en convenio cerca de su ubicación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Filtros por especialidad, comuna y modalidad de atención.
            </p>
          </CardContent>
          <CardFooter>
            <BotonLink label="Ir al buscador →" />
          </CardFooter>
        </Card>
      ),
      usageCode: `<Card variante="interactiva" onClick={() => navigate("/prestadores")}>
  <CardHeader>
    <CardTitle>Consulta de Prestadores</CardTitle>
    <CardDescription>Busque prestadores en convenio.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Filtros por especialidad, comuna y modalidad.</p>
  </CardContent>
  <CardFooter>
    <BotonLink label="Ir al buscador →" />
  </CardFooter>
</Card>`,
    },
    {
      label: "Con CardAction",
      props: {},
      render: () => (
        <Card className="max-w-sm">
          <CardHeader>
            <div className="flex-1 min-w-0">
              <CardTitle>Estado de Solicitud</CardTitle>
              <CardDescription>Solicitud N° 9876543</CardDescription>
            </div>
            <CardAction>
              <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700 border border-yellow-200">
                En revisión
              </span>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Su solicitud está siendo revisada. Tiempo estimado: 5 días hábiles.
            </p>
          </CardContent>
          <CardFooter>
            <BotonLink label="Ver detalle →" />
          </CardFooter>
        </Card>
      ),
      usageCode: `<Card>
  <CardHeader>
    <div className="flex-1 min-w-0">
      <CardTitle>Estado de Solicitud</CardTitle>
      <CardDescription>Solicitud N° 9876543</CardDescription>
    </div>
    <CardAction>
      <Badge variant="pendiente" text="En revisión" />
    </CardAction>
  </CardHeader>
  <CardContent>
    <p>Su solicitud está siendo revisada...</p>
  </CardContent>
  <CardFooter>
    <BotonLink label="Ver detalle →" />
  </CardFooter>
</Card>`,
    },
    {
      label: "Solo contenido",
      props: {},
      render: () => (
        <Card className="max-w-sm">
          <CardContent>
            <p className="text-sm text-gray-600">
              Card sin header ni footer. Útil para bloques simples de información.
            </p>
          </CardContent>
        </Card>
      ),
      usageCode: `<Card>
  <CardContent>
    <p>Contenido libre sin header ni footer.</p>
  </CardContent>
</Card>`,
    },
    {
      label: "Footer con acciones de confirmación",
      props: {},
      render: () => (
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Confirmar Operación</CardTitle>
            <CardDescription>
              ¿Está seguro de que desea cancelar su solicitud?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Esta acción no se puede deshacer. La solicitud quedará en estado "Cancelada".
            </p>
          </CardContent>
          <CardFooter className="justify-end">
            <BotonOutline label="Volver" />
            <BotonCancelar label="Cancelar solicitud" />
          </CardFooter>
        </Card>
      ),
      usageCode: `<Card>
  <CardHeader>
    <CardTitle>Confirmar Operación</CardTitle>
    <CardDescription>¿Está seguro de cancelar?</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Esta acción no se puede deshacer.</p>
  </CardContent>
  <CardFooter className="justify-end">
    <BotonOutline label="Volver" />
    <BotonCancelar label="Cancelar solicitud" />
  </CardFooter>
</Card>`,
    },
    {
      label: "Con formulario",
      props: {},
      render: () => (
        <Card variante="elevada" className="max-w-sm">
          <CardHeader>
            <CardTitle>Actualizar Datos</CardTitle>
            <CardDescription>Modifique su información de contacto.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="correo@ejemplo.cl"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-[#0572CE] focus:outline-none focus:ring-1 focus:ring-[#0572CE]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Teléfono</label>
                <input
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-[#0572CE] focus:outline-none focus:ring-1 focus:ring-[#0572CE]"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <BotonPrimario label="Guardar cambios" />
          </CardFooter>
        </Card>
      ),
      usageCode: `<Card variante="elevada">
  <CardHeader>
    <CardTitle>Actualizar Datos</CardTitle>
    <CardDescription>Modifique su información de contacto.</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-3">
      <Input label="Correo electrónico" type="email" />
      <Input label="Teléfono" type="tel" />
    </div>
  </CardContent>
  <CardFooter className="justify-end">
    <BotonPrimario label="Guardar cambios" />
  </CardFooter>
</Card>`,
    },
    {
      label: "Skeleton",
      props: { isLoading: true },
      render: () => (
        <Card className="max-w-sm" isLoading />
      ),
      usageCode: `<Card isLoading />`,
    },
  ],
};
