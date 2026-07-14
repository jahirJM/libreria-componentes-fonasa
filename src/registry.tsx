import { useState } from "react";
import { FiSearch, FiEye } from "react-icons/fi";
import { Input } from "./componentsUI/Input";
import { Label } from "./componentsUI/Label";
import { CustomModal } from "./componentsUI/CustomModal";
import { TextArea } from "./componentsUI/TextArea";
import { Table } from "./componentsUI/Table";
import { Select } from "./componentsUI/Select";
import {
  BotonConfirmar,
  BotonCancelar,
  BotonPrimario,
  BotonSecundario,
} from "./componentsUI/Botones";
import { FonasaToaster, fonasaToast } from "./componentsUI/Toast";
import { LoadingSection, LoadingFonasa } from "./componentsUI/Loading";
import { Badge } from "./componentsUI/Badge";
import { CheckButton } from "./componentsUI/CheckButton";
import { UploadBox } from "./componentsUI/UploadBox";
import { TablaDatos } from "./componentsUI/TablaDatos";
import {
  SkeletonSolicitudCard,
  SkeletonSolicitudesList,
} from "./componentsUI/SkeletonSolicitud";
import { Paginacion } from "./componentsUI/Paginacion";
import { Stepper } from "./componentsUI/Stepper";
import { ListaPaginada } from "./componentsUI/ListaPaginada";
import { SolicitudCard } from "./componentsUI/SolicitudCard";
import {
  badgeCode,
  botonesCode,
  checkButtonCode,
  customModalCode,
  inputCode,
  labelCode,
  listaPaginadaCode,
  loadingCode,
  paginacionCode,
  selectCode,
  stepperCode,
  tablaDatosCode,
  tableCode,
  textAreaCode,
  toastCode,
  uploadBoxCode,
} from "./code";

export interface ComponentVariant {
  label: string;
  props: Record<string, unknown>;
  render: () => React.ReactNode;
  usageCode: string;
}

export interface ComponentEntry {
  name: string;
  description?: string;
  code: string;
  dependencies?: string[];
  propsInterface?: string;
  variants: ComponentVariant[];
}

function ModalDemo({
  size,
  title,
}: {
  size: "sm" | "md" | "lg";
  title: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
      >
        Abrir Modal ({size})
      </button>
      <CustomModal
        size={size}
        title={title}
        showModal={open}
        onClose={() => setOpen(false)}
      >
        <p className="text-gray-700">Contenido de ejemplo dentro del modal.</p>
      </CustomModal>
    </>
  );
}

function CheckButtonDemo({
  variant,
  opciones,
  isDisabled,
}: {
  variant?: "primary" | "secondary";
  opciones?: { id: string; label: string }[];
  isDisabled?: boolean;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const handleToggle = (opcion: { id: string; label: string }) => {
    if (variant === "secondary") {
      setSelected([opcion.id]);
    } else {
      setSelected((prev) =>
        prev.includes(opcion.id)
          ? prev.filter((i) => i !== opcion.id)
          : [...prev, opcion.id],
      );
    }
  };
  return (
    <CheckButton
      variant={variant}
      listaOpciones={opciones}
      selectedItems={selected}
      onToggle={handleToggle}
      isDisabled={isDisabled}
    />
  );
}

function PaginacionDemo({ totalPaginas }: { totalPaginas: number }) {
  const [pagina, setPagina] = useState(1);
  return (
    <Paginacion
      paginaActual={pagina}
      totalPaginas={totalPaginas}
      onCambiarPagina={setPagina}
    />
  );
}

function StepperDemo({
  pasos,
  navegable,
}: {
  pasos: { id: string; label: string }[];
  navegable?: boolean;
}) {
  const [paso, setPaso] = useState(1);
  return (
    <div>
      <Stepper
        pasos={pasos}
        pasoActual={paso}
        onCambiarPaso={setPaso}
        puedeNavegar={navegable}
      />
      <div className="flex justify-center gap-2 mt-2">
        <button
          onClick={() => setPaso((p) => Math.max(1, p - 1))}
          className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={() => setPaso((p) => Math.min(pasos.length, p + 1))}
          className="px-3 py-1 text-xs bg-[#0572CE] text-white rounded hover:bg-blue-700"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

function ListaPaginadaDemo() {
  const [pagina, setPagina] = useState(1);
  const items = [
    "Solicitud #001 - Inscripción",
    "Solicitud #002 - Actualización",
    "Solicitud #003 - Renuncia",
    "Solicitud #004 - Inscripción",
    "Solicitud #005 - Actualización",
  ];
  const itemsPorPagina = 2;
  const totalPaginas = Math.ceil(items.length / itemsPorPagina);
  const itemsPagina = items.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina,
  );

  return (
    <ListaPaginada
      titulo="Mis solicitudes"
      isLoading={false}
      totalItems={items.length}
      itemLabel="solicitud"
      paginaActual={pagina}
      totalPaginas={totalPaginas}
      itemsPorPagina={itemsPorPagina}
      onCambiarPagina={setPagina}
    >
      {itemsPagina.map((item, i) => (
        <div
          key={i}
          className="p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700"
        >
          {item}
        </div>
      ))}
    </ListaPaginada>
  );
}

export const registry: ComponentEntry[] = [
  {
    name: "Input",
    description:
      "Input con soporte para múltiples tipos, íconos, loading y copyable.",
    code: inputCode,
    dependencies: ["clsx", "react-icons"],
    propsInterface: `interface InputProps
      extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
      error?: boolean;
      value?: string;
      leftIcon?: ReactNode;
      rightIcon?: ReactNode;
      loading?: boolean;
      copyable?: boolean;
      type?: "text" | "email" | "number" | "password" | "tel" | "url" | "file";
    }`,
    variants: [
      {
        label: "Texto",
        props: { placeholder: "Ingrese texto" },
        render: () => <Input type="text" placeholder="Ingrese texto" />,
        usageCode: `<Input type="text" placeholder="Ingrese texto" />`,
      },
      {
        label: "Email",
        props: { placeholder: "tu@email.com" },
        render: () => <Input type="email" placeholder="tu@email.com" />,
        usageCode: `<Input type="email" placeholder="tu@email.com" />`,
      },
      {
        label: "Password",
        props: { placeholder: "••••••••" },
        render: () => <Input type="password" placeholder="••••••••" />,
        usageCode: `<Input type="password" placeholder="••••••••" />`,
      },
      {
        label: "Teléfono",
        props: { placeholder: "+56 9 1234 5678" },
        render: () => <Input type="tel" placeholder="+56 9 1234 5678" />,
        usageCode: `<Input type="tel" placeholder="+56 9 1234 5678" />`,
      },
      {
        label: "URL",
        props: { placeholder: "www.fonasa.cl" },
        render: () => <Input type="url" placeholder="www.fonasa.cl" />,
        usageCode: `<Input type="url" placeholder="www.fonasa.cl" />`,
      },
      {
        label: "Número",
        props: { placeholder: "0" },
        render: () => <Input type="number" placeholder="0" />,
        usageCode: `<Input type="number" placeholder="0" />`,
      },
      {
        label: "Archivo",
        props: {},
        render: () => <Input type="file" />,
        usageCode: `<Input type="file" />`,
      },
      {
        label: "Con error",
        props: { error: true },
        render: () => <Input type="text" error placeholder="Input con error" />,
        usageCode: `<Input type="text" error placeholder="Input con error" />`,
      },
      {
        label: "Con ícono izquierda",
        props: { leftIcon: "FiSearch" },
        render: () => (
          <Input type="text" placeholder="Buscar..." leftIcon={<FiSearch />} />
        ),
        usageCode: `<Input type="text" placeholder="Buscar..." leftIcon={<FiSearch />} />`,
      },
      {
        label: "Con ícono derecho",
        props: { rightIcon: "FiEye" },
        render: () => (
          <Input
            type="password"
            placeholder="••••••••"
            rightIcon={<FiEye />}
          />
        ),
        usageCode: `<Input type="password" placeholder="••••••••" rightIcon={<FiEye />} />`,
      },
      {
        label: "Loading",
        props: { loading: true },
        render: () => <Input type="text" placeholder="Cargando..." loading />,
        usageCode: `<Input type="text" placeholder="Cargando..." loading />`,
      },
      {
        label: "Copyable",
        props: { copyable: true, value: "ABC-1234-XYZ" },
        render: () => <Input type="text" value="ABC-1234-XYZ" copyable />,
        usageCode: `<Input type="text" value="ABC-1234-XYZ" copyable />`,
      },
      {
        label: "Disabled",
        props: { disabled: true },
        render: () => (
          <Input type="text" placeholder="No disponible" disabled />
        ),
        usageCode: `<Input type="text" placeholder="No disponible" disabled />`,
      },
    ],
  },
  {
    name: "Label",
    description:
      "Etiqueta de texto con asterisco de campo obligatorio y mensaje de error 'requerido' con ícono.",
    code: labelCode,
    dependencies: ["clsx", "react-icons"],
    propsInterface: `interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
      text: string;
      indicador?: boolean;
      error?: boolean;
    }`,
    variants: [
      {
        label: "Normal",
        props: { text: "Nombre" },
        render: () => <Label text="Nombre" />,
        usageCode: `<Label text="Nombre" />`,
      },
      {
        label: "Con indicador (*)",
        props: { text: "RUT Solicitante", indicador: true },
        render: () => <Label text="RUT Solicitante" indicador />,
        usageCode: `<Label text="RUT Solicitante" indicador />`,
      },
      {
        label: "Con error (requerido)",
        props: { text: "RUT Solicitante", error: true },
        render: () => <Label text="RUT Solicitante" error />,
        usageCode: `<Label text="RUT Solicitante" error />`,
      },
      {
        label: "Indicador + error",
        props: { text: "Email", indicador: true, error: true },
        render: () => <Label text="Email" indicador error />,
        usageCode: `<Label text="Email" indicador error />`,
      },
    ],
  },
  {
    name: "CustomModal",
    description:
      "Modal con animaciones de transición, tamaños configurables (sm, md, lg), header con título y botón de cierre.",
    code: customModalCode,
    dependencies: ["@headlessui/react", "react-icons"],
    propsInterface: `interface CustomModalProps {
  size: "sm" | "md" | "lg";
  title?: string;
  children: React.ReactNode;
  showModal: boolean;
  onShow?: () => void;
  onClose?: () => void;
}`,
    variants: [
      {
        label: "Small",
        props: { size: "sm", title: "Modal Pequeño" },
        render: () => <ModalDemo size="sm" title="Modal Pequeño" />,
        usageCode: `<CustomModal size="sm" title="Modal Pequeño" showModal={open} onClose={() => setOpen(false)}>\n  <p>Contenido</p>\n</CustomModal>`,
      },
      {
        label: "Medium",
        props: { size: "md", title: "Modal Mediano" },
        render: () => <ModalDemo size="md" title="Modal Mediano" />,
        usageCode: `<CustomModal size="md" title="Modal Mediano" showModal={open} onClose={() => setOpen(false)}>\n  <p>Contenido</p>\n</CustomModal>`,
      },
      {
        label: "Large",
        props: { size: "lg", title: "Modal Grande" },
        render: () => <ModalDemo size="lg" title="Modal Grande" />,
        usageCode: `<CustomModal size="lg" title="Modal Grande" showModal={open} onClose={() => setOpen(false)}>\n  <p>Contenido</p>\n</CustomModal>`,
      },
    ],
  },
  {
    name: "TextArea",
    description:
      "Campo de texto multilínea con soporte para estados de error y deshabilitado.",
    code: textAreaCode,
    propsInterface: `interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  className?: string;
}`,
    variants: [
      {
        label: "Normal",
        props: { placeholder: "Escribe aquí..." },
        render: () => <TextArea placeholder="Escribe aquí..." />,
        usageCode: `<TextArea placeholder="Escribe aquí..." />`,
      },
      {
        label: "Con error",
        props: { placeholder: "Escribe aquí...", error: true },
        render: () => <TextArea placeholder="Escribe aquí..." error />,
        usageCode: `<TextArea placeholder="Escribe aquí..." error />`,
      },
      {
        label: "Deshabilitado",
        props: { placeholder: "No disponible", disabled: true },
        render: () => <TextArea placeholder="No disponible" disabled />,
        usageCode: `<TextArea placeholder="No disponible" disabled />`,
      },
    ],
  },
  {
    name: "Table (Simple)",
    description:
      "Tabla HTML simple con header estilizado, columnas configurables y contenedor con bordes redondeados.",
    code: tableCode,
    propsInterface: `interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  classTable?: string;
  classTh?: string;
  nombreColumnas: string[];
  children: ReactNode;
}`,
    variants: [
      {
        label: "Básica",
        props: { nombreColumnas: ["Nombre", "Email", "Rol"] },
        render: () => (
          <Table nombreColumnas={["Nombre", "Email", "Rol"]}>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">Juan Pérez</td>
              <td className="px-4 py-2 text-sm">juan@email.com</td>
              <td className="px-4 py-2 text-sm">Admin</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">María López</td>
              <td className="px-4 py-2 text-sm">maria@email.com</td>
              <td className="px-4 py-2 text-sm">Usuario</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["Nombre", "Email", "Rol"]}>\n  <tr>\n    <td className="px-4 py-2 text-sm">Juan Pérez</td>\n    <td className="px-4 py-2 text-sm">juan@email.com</td>\n    <td className="px-4 py-2 text-sm">Admin</td>\n  </tr>\n</Table>`,
      },
      {
        label: "Con clases personalizadas",
        props: {
          nombreColumnas: ["ID", "Estado"],
          classTable: "text-center",
          classTh: "text-center",
        },
        render: () => (
          <Table
            nombreColumnas={["ID", "Estado"]}
            classTable="text-center"
            classTh="text-center"
          >
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">001</td>
              <td className="px-4 py-2 text-sm">Activo</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">002</td>
              <td className="px-4 py-2 text-sm">Inactivo</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["ID", "Estado"]} classTable="text-center" classTh="text-center">\n  <tr>\n    <td className="px-4 py-2 text-sm">001</td>\n    <td className="px-4 py-2 text-sm">Activo</td>\n  </tr>\n</Table>`,
      },
    ],
  },
  {
    name: "Select",
    description:
      "Select desplegable con soporte para estados de error y deshabilitado.",
    code: selectCode,
    propsInterface: `interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  className?: string;
  children: ReactNode;
}`,
    variants: [
      {
        label: "Normal",
        props: {},
        render: () => (
          <Select>
            <option value="">Seleccione una opción</option>
            <option value="1">Opción 1</option>
            <option value="2">Opción 2</option>
          </Select>
        ),
        usageCode: `<Select>\n  <option value="">Seleccione una opción</option>\n  <option value="1">Opción 1</option>\n  <option value="2">Opción 2</option>\n</Select>`,
      },
      {
        label: "Con error",
        props: { error: true },
        render: () => (
          <Select error>
            <option value="">Seleccione una opción</option>
            <option value="1">Opción 1</option>
          </Select>
        ),
        usageCode: `<Select error>\n  <option value="">Seleccione una opción</option>\n  <option value="1">Opción 1</option>\n</Select>`,
      },
      {
        label: "Deshabilitado",
        props: { disabled: true },
        render: () => (
          <Select disabled>
            <option value="">No disponible</option>
          </Select>
        ),
        usageCode: `<Select disabled>\n  <option value="">No disponible</option>\n</Select>`,
      },
    ],
  },
  {
    name: "Botones",
    description:
      "Conjunto de botones (Confirmar, Cancelar, Primario, Secundario) con soporte para íconos y estado deshabilitado.",
    code: botonesCode,
    dependencies: ["react-icons"],
    propsInterface: `interface BotonesProps {
  label: React.ReactNode;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  customClass?: string;
}`,
    variants: [
      {
        label: "BotonConfirmar",
        props: { label: "Confirmar" },
        render: () => <BotonConfirmar label="Confirmar" />,
        usageCode: `<BotonConfirmar label="Confirmar" />`,
      },
      {
        label: "BotonCancelar",
        props: { label: "Cancelar" },
        render: () => <BotonCancelar label="Cancelar" />,
        usageCode: `<BotonCancelar label="Cancelar" />`,
      },
      {
        label: "BotonPrimario",
        props: { label: "Guardar" },
        render: () => <BotonPrimario label="Guardar" />,
        usageCode: `<BotonPrimario label="Guardar" />`,
      },
      {
        label: "BotonSecundario",
        props: { label: "Volver" },
        render: () => <BotonSecundario label="Volver" />,
        usageCode: `<BotonSecundario label="Volver" />`,
      },
      {
        label: "Deshabilitado",
        props: { label: "No disponible", isDisabled: true },
        render: () => <BotonPrimario label="No disponible" isDisabled />,
        usageCode: `<BotonPrimario label="No disponible" isDisabled />`,
      },
    ],
  },
  {
    name: "Toast (Sonner)",
    description:
      "Notificaciones toast con estilos Fonasa. Incluye variantes de éxito, error, info y advertencia.",
    code: toastCode,
    dependencies: ["sonner"],
    propsInterface: `// No recibe props como componente.
// Se usa via funciones utilitarias:

fonasaToast.success(mensaje: string): void;
fonasaToast.error(mensaje: string): void;
fonasaToast.info(mensaje: string): void;
fonasaToast.warning(mensaje: string): void;

// El Toaster se coloca una vez en el layout:
<FonasaToaster />`,
    variants: [
      {
        label: "Éxito",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() =>
                fonasaToast.success("Operación realizada correctamente")
              }
              className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-sm hover:bg-cyan-500"
            >
              Mostrar Toast Éxito
            </button>
          </>
        ),
        usageCode: `fonasaToast.success("Operación realizada correctamente")`,
      },
      {
        label: "Error",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() =>
                fonasaToast.error("Ocurrió un error al procesar la solicitud")
              }
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-500"
            >
              Mostrar Toast Error
            </button>
          </>
        ),
        usageCode: `fonasaToast.error("Ocurrió un error al procesar la solicitud")`,
      },
      {
        label: "Info",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() =>
                fonasaToast.info("Se ha enviado un correo de verificación")
              }
              className="px-4 py-2 bg-[#0572CE] text-white rounded-xl text-sm hover:bg-blue-700"
            >
              Mostrar Toast Info
            </button>
          </>
        ),
        usageCode: `fonasaToast.info("Se ha enviado un correo de verificación")`,
      },
      {
        label: "Advertencia",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() =>
                fonasaToast.warning("Su sesión expirará en 5 minutos")
              }
              className="px-4 py-2 bg-amber-600 text-white rounded-xl text-sm hover:bg-amber-500"
            >
              Mostrar Toast Advertencia
            </button>
          </>
        ),
        usageCode: `fonasaToast.warning("Su sesión expirará en 5 minutos")`,
      },
    ],
  },
  {
    name: "Loading",
    description:
      "Componentes de carga: Loading (pantalla completa), LoadingSection (en sección), LoadingFonasa (con favicon de Fonasa al centro).",
    code: loadingCode,
    propsInterface: `interface FullLoadingProps {
  mensaje?: string;
}

// Loading: pantalla completa con overlay
// LoadingSection: en sección sin overlay
// LoadingFonasa: con favicon de Fonasa al centro`,
    variants: [
      {
        label: "Loading (fullscreen)",
        props: { mensaje: "Cargando datos..." },
        render: () => (
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80">
              <div className="bg-white p-3 rounded-full mb-3">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#0572CE]"></div>
              </div>
              <p className="text-white text-sm font-semibold">
                Cargando datos...
              </p>
            </div>
          </div>
        ),
        usageCode: `<Loading mensaje="Cargando datos..." />`,
      },
      {
        label: "LoadingSection",
        props: { mensaje: "Procesando..." },
        render: () => (
          <div className="py-8">
            <LoadingSection mensaje="Procesando..." />
          </div>
        ),
        usageCode: `<LoadingSection mensaje="Procesando..." />`,
      },
      {
        label: "LoadingFonasa (con favicon)",
        props: { mensaje: "Cargando..." },
        render: () => (
          <div className="py-8">
            <LoadingFonasa mensaje="Cargando..." />
          </div>
        ),
        usageCode: `<LoadingFonasa mensaje="Cargando..." />`,
      },
    ],
  },
  {
    name: "Badge",
    description:
      "Badge/pill para indicar estados, contadores y categorías. Variantes de color según contexto.",
    code: badgeCode,
    dependencies: ["clsx"],
    propsInterface: `type BadgeVariant =
  | "counter"
  | "documentos"
  | "especialidad"
  | "estado-pendiente"
  | "estado-revision"
  | "estado-aprobada"
  | "estado-rechazada"
  | "estado-default";

interface BadgeProps {
  variant: BadgeVariant;
  text: string;
  customClass?: string;
}`,
    variants: [
      {
        label: "Pendiente",
        props: { variant: "estado-pendiente", text: "Pendiente" },
        render: () => <Badge variant="estado-pendiente" text="Pendiente" />,
        usageCode: `<Badge variant="estado-pendiente" text="Pendiente" />`,
      },
      {
        label: "En revisión",
        props: { variant: "estado-revision", text: "En revisión" },
        render: () => <Badge variant="estado-revision" text="En revisión" />,
        usageCode: `<Badge variant="estado-revision" text="En revisión" />`,
      },
      {
        label: "Aprobada",
        props: { variant: "estado-aprobada", text: "Aprobada" },
        render: () => <Badge variant="estado-aprobada" text="Aprobada" />,
        usageCode: `<Badge variant="estado-aprobada" text="Aprobada" />`,
      },
      {
        label: "Rechazada",
        props: { variant: "estado-rechazada", text: "Rechazada" },
        render: () => <Badge variant="estado-rechazada" text="Rechazada" />,
        usageCode: `<Badge variant="estado-rechazada" text="Rechazada" />`,
      },
      {
        label: "Counter",
        props: { variant: "counter", text: "12" },
        render: () => <Badge variant="counter" text="12" />,
        usageCode: `<Badge variant="counter" text="12" />`,
      },
      {
        label: "Default",
        props: { variant: "estado-default", text: "Sin estado" },
        render: () => <Badge variant="estado-default" text="Sin estado" />,
        usageCode: `<Badge variant="estado-default" text="Sin estado" />`,
      },
    ],
  },
  {
    name: "CheckButton",
    description:
      "Checkbox/radio button group con variantes primary (checkbox múltiple) y secondary (radio single).",
    code: checkButtonCode,
    dependencies: ["clsx"],
    propsInterface: `interface Opcion {
  id: string;
  label: string;
}

interface CheckButtonProps {
  listaOpciones?: Opcion[];
  selectedItems?: string[];
  onToggle: (opcion: Opcion) => void;
  customClass?: string;
  customClassItem?: string;
  customClassLabel?: string;
  isDisabled?: boolean;
  variant?: "primary" | "secondary";
}`,
    variants: [
      {
        label: "Checkbox (primary)",
        props: { variant: "primary" },
        render: () => (
          <CheckButtonDemo
            variant="primary"
            opciones={[
              { id: "opcion1", label: "Opción 1" },
              { id: "opcion2", label: "Opción 2" },
              { id: "opcion3", label: "Opción 3" },
            ]}
          />
        ),
        usageCode: `<CheckButton\n  variant="primary"\n  listaOpciones={[{ id: "opcion1", label: "Opción 1" }, { id: "opcion2", label: "Opción 2" }]}\n  selectedItems={selected}\n  onToggle={handleToggle}\n/>`,
      },
      {
        label: "Radio (secondary)",
        props: { variant: "secondary" },
        render: () => <CheckButtonDemo variant="secondary" />,
        usageCode: `<CheckButton\n  variant="secondary"\n  selectedItems={selected}\n  onToggle={handleToggle}\n/>`,
      },
      {
        label: "Deshabilitado",
        props: { variant: "primary", isDisabled: true },
        render: () => (
          <CheckButtonDemo
            variant="primary"
            isDisabled
            opciones={[
              { id: "opcion1", label: "Opción 1" },
              { id: "opcion2", label: "Opción 2" },
            ]}
          />
        ),
        usageCode: `<CheckButton\n  variant="primary"\n  listaOpciones={[{ id: "opcion1", label: "Opción 1" }]}\n  selectedItems={[]}\n  onToggle={handleToggle}\n  isDisabled\n/>`,
      },
    ],
  },
  {
    name: "UploadBox",
    description:
      "Zona de carga de archivos con estados: default, confirmación y error. Estilo drag & drop.",
    code: uploadBoxCode,
    dependencies: ["clsx", "react-icons"],
    propsInterface: `interface UploadBoxProps {
  text: string;
  textStrong: string;
  customClass?: string;
  confirmacion?: boolean;
  error?: boolean;
}`,
    variants: [
      {
        label: "Default",
        props: {
          textStrong: "Arrastra tu archivo aquí",
          text: "o haz click para buscar",
        },
        render: () => (
          <UploadBox
            textStrong="Arrastra tu archivo aquí"
            text="o haz click para buscar"
          />
        ),
        usageCode: `<UploadBox textStrong="Arrastra tu archivo aquí" text="o haz click para buscar" />`,
      },
      {
        label: "Confirmación",
        props: {
          textStrong: "documento.pdf",
          text: "subido correctamente",
          confirmacion: true,
        },
        render: () => (
          <UploadBox
            textStrong="documento.pdf"
            text="subido correctamente"
            confirmacion
          />
        ),
        usageCode: `<UploadBox textStrong="documento.pdf" text="subido correctamente" confirmacion />`,
      },
      {
        label: "Error",
        props: {
          textStrong: "archivo.exe",
          text: "formato no válido",
          error: true,
        },
        render: () => (
          <UploadBox textStrong="archivo.exe" text="formato no válido" error />
        ),
        usageCode: `<UploadBox textStrong="archivo.exe" text="formato no válido" error />`,
      },
    ],
  },
  {
    name: "TablaDatos",
    description:
      "Tabla con grid dinámico, variantes de color en header, y botones de editar/eliminar por fila. Incluye su propio Skeleton loader.",
    code: tablaDatosCode,
    dependencies: ["clsx", "react-icons"],
    propsInterface: `interface TablaDatoFila {
  id: string;
  [key: string]: string | number | undefined;
}

interface TablaDatosProps {
  isDisabled?: boolean;
  customClass?: string;
  variant?: "primary" | "secondary";
  listaDatos: TablaDatoFila[];
  listaHeaders: string[];
  columnas: string[];
  botonEdit?: (item: TablaDatoFila) => void;
  botonDelete?: (item: TablaDatoFila) => void;
}`,
    variants: [
      {
        label: "Sin acciones",
        props: {},
        render: () => (
          <TablaDatos
            listaHeaders={["Nombre", "RUT", "Edad"]}
            columnas={["nombre", "rut", "edad"]}
            listaDatos={[
              {
                id: "1",
                nombre: "Juan Pérez",
                rut: "12.345.678-9",
                edad: "35",
              },
              {
                id: "2",
                nombre: "María López",
                rut: "98.765.432-1",
                edad: "28",
              },
            ]}
          />
        ),
        usageCode: `<TablaDatos\n  listaHeaders={["Nombre", "RUT", "Edad"]}\n  columnas={["nombre", "rut", "edad"]}\n  listaDatos={[{ id: "1", nombre: "Juan", rut: "12.345.678-9", edad: "35" }]}\n/>`,
      },
      {
        label: "Con acciones (editar/eliminar)",
        props: {},
        render: () => (
          <TablaDatos
            listaHeaders={["Nombre", "Email", "Acciones"]}
            columnas={["nombre", "email"]}
            listaDatos={[
              { id: "1", nombre: "Juan Pérez", email: "juan@email.com" },
              { id: "2", nombre: "María López", email: "maria@email.com" },
            ]}
            botonEdit={(item) => alert(`Editar: ${item.nombre}`)}
            botonDelete={(item) => alert(`Eliminar: ${item.nombre}`)}
          />
        ),
        usageCode: `<TablaDatos\n  listaHeaders={["Nombre", "Email", "Acciones"]}\n  columnas={["nombre", "email"]}\n  listaDatos={datos}\n  botonEdit={(item) => handleEdit(item)}\n  botonDelete={(item) => handleDelete(item)}\n/>`,
      },
      {
        label: "Variante secondary",
        props: { variant: "secondary" },
        render: () => (
          <TablaDatos
            variant="secondary"
            listaHeaders={["Código", "Descripción"]}
            columnas={["codigo", "descripcion"]}
            listaDatos={[
              { id: "1", codigo: "A01", descripcion: "Consulta general" },
              { id: "2", codigo: "B02", descripcion: "Especialidad" },
            ]}
          />
        ),
        usageCode: `<TablaDatos\n  variant="secondary"\n  listaHeaders={["Código", "Descripción"]}\n  columnas={["codigo", "descripcion"]}\n  listaDatos={datos}\n/>`,
      },
    ],
  },
  {
    name: "Stepper",
    description:
      "Stepper horizontal para formularios multi-paso. Responsive: en mobile muestra badge, en desktop muestra línea de progreso con círculos.",
    code: stepperCode,
    propsInterface: `interface Paso {
  id: string;
  label: string;
}

interface StepperProps {
  pasos: Paso[];
  pasoActual: number;
  onCambiarPaso?: (paso: number) => void;
  puedeNavegar?: boolean;
}`,
    variants: [
      {
        label: "3 pasos",
        props: { pasoActual: 1 },
        render: () => (
          <StepperDemo
            pasos={[
              { id: "1", label: "Datos personales" },
              { id: "2", label: "Documentos" },
              { id: "3", label: "Confirmación" },
            ]}
          />
        ),
        usageCode: `<Stepper\n  pasos={[{ id: "1", label: "Datos" }, { id: "2", label: "Docs" }, { id: "3", label: "Confirmar" }]}\n  pasoActual={pasoActual}\n  onCambiarPaso={setPaso}\n/>`,
      },
      {
        label: "5 pasos",
        props: { pasoActual: 1 },
        render: () => (
          <StepperDemo
            pasos={[
              { id: "1", label: "Inicio" },
              { id: "2", label: "Datos" },
              { id: "3", label: "Documentos" },
              { id: "4", label: "Revisión" },
              { id: "5", label: "Envío" },
            ]}
          />
        ),
        usageCode: `<Stepper\n  pasos={[{ id: "1", label: "Inicio" }, ...]}\n  pasoActual={pasoActual}\n  onCambiarPaso={setPaso}\n/>`,
      },
      {
        label: "Navegable (click en pasos)",
        props: { puedeNavegar: true },
        render: () => (
          <StepperDemo
            navegable
            pasos={[
              { id: "1", label: "Paso 1" },
              { id: "2", label: "Paso 2" },
              { id: "3", label: "Paso 3" },
              { id: "4", label: "Paso 4" },
            ]}
          />
        ),
        usageCode: `<Stepper\n  pasos={pasos}\n  pasoActual={pasoActual}\n  onCambiarPaso={setPaso}\n  puedeNavegar\n/>`,
      },
    ],
  },
  {
    name: "Lista de Solicitudes",
    description:
      "Utiliza: Paginación, Badge, SkeletonSolicitud. Contenedor de lista de solicitudes con skeleton de carga, manejo de error, contador de resultados y paginación integrada.",
    code: listaPaginadaCode,
    dependencies: ["react-icons"],
    propsInterface: `interface ListaPaginadaProps {
  titulo?: string;
  isLoading: boolean;
  error?: string | null;
  totalItems?: number;
  itemLabel?: string;
  paginaActual: number;
  totalPaginas: number;
  itemsPorPagina?: number;
  onCambiarPagina: (pagina: number) => void;
  children: ReactNode;
}`,
    variants: [
      {
        label: "Cargando (skeleton)",
        props: { isLoading: true },
        render: () => (
          <ListaPaginada
            titulo="Mis solicitudes"
            isLoading={true}
            totalItems={0}
            paginaActual={1}
            totalPaginas={1}
            onCambiarPagina={() => {}}
          >
            {null}
          </ListaPaginada>
        ),
        usageCode: `<ListaPaginada isLoading={true} ...>\n  {null}\n</ListaPaginada>`,
      },
      {
        label: "Con error",
        props: { error: "Error del servidor" },
        render: () => (
          <ListaPaginada
            titulo="Mis solicitudes"
            isLoading={false}
            error="Error del servidor"
            totalItems={0}
            paginaActual={1}
            totalPaginas={1}
            onCambiarPagina={() => {}}
          >
            {null}
          </ListaPaginada>
        ),
        usageCode: `<ListaPaginada isLoading={false} error="Error del servidor" ...>\n  {null}\n</ListaPaginada>`,
      },
      {
        label: "Skeleton - Card individual",
        props: {},
        render: () => <SkeletonSolicitudCard />,
        usageCode: `<SkeletonSolicitudCard />`,
      },
      {
        label: "Skeleton - Lista (3 cards)",
        props: { count: 3 },
        render: () => <SkeletonSolicitudesList count={3} />,
        usageCode: `<SkeletonSolicitudesList count={3} />`,
      },
      {
        label: "SolicitudCard - Ejemplo completo",
        props: {},
        render: () => (
          <SolicitudCard
            id={1234}
            tipo="Solicitud de Inscripción"
            estado={{ label: "Visación", variant: "estado-revision" }}
            fechaEnvio="15/06/2026"
            fechaResolucion="—"
            documentos={[
              { id: "1", nombre: "Certificado de título" },
              { id: "2", nombre: "Cédula de identidad" },
            ]}
          />
        ),
        usageCode: `<SolicitudCard\n  id={1234}\n  tipo="Solicitud de Inscripción"\n  estado={{ label: "Visación", variant: "estado-revision" }}\n  fechaEnvio="15/06/2026"\n  documentos={[{ id: "1", nombre: "Certificado" }]}\n/>`,
      },
      {
        label: "SolicitudCard - Aprobada con resolución",
        props: {},
        render: () => (
          <SolicitudCard
            id={5678}
            tipo="Solicitud de Actualización"
            estado={{ label: "Aceptado", variant: "estado-aprobada" }}
            fechaEnvio="01/03/2026"
            fechaResolucion="10/03/2026"
            motivoResolucion="Documentación completa y verificada."
            documentoRespuesta={{ nombre: "Resolución aprobatoria" }}
            documentos={[{ id: "1", nombre: "Formulario actualización" }]}
          />
        ),
        usageCode: `<SolicitudCard\n  id={5678}\n  tipo="Solicitud de Actualización"\n  estado={{ label: "Aceptado", variant: "estado-aprobada" }}\n  fechaEnvio="01/03/2026"\n  fechaResolucion="10/03/2026"\n  motivoResolucion="Documentación completa."\n  documentoRespuesta={{ nombre: "Resolución" }}\n  documentos={[...]}\n/>`,
      },
      {
        label: "SolicitudCard - Rechazada",
        props: {},
        render: () => (
          <SolicitudCard
            id={9012}
            tipo="Solicitud de Renuncia"
            estado={{ label: "Rechazado", variant: "estado-rechazada" }}
            fechaEnvio="20/05/2026"
            fechaResolucion="25/05/2026"
            motivoResolucion="Falta documento de respaldo."
            documentos={[{ id: "1", nombre: "Carta de renuncia" }]}
          />
        ),
        usageCode: `<SolicitudCard\n  id={9012}\n  tipo="Solicitud de Renuncia"\n  estado={{ label: "Rechazado", variant: "estado-rechazada" }}\n  motivoResolucion="Falta documento."\n  documentos={[...]}\n/>`,
      },
    ],
  },
  {
    name: "Paginación",
    description:
      "Paginación genérica con rango visible de hasta 5 páginas, centrada en la página actual. Flechas de navegación anterior/siguiente.",
    code: paginacionCode,
    dependencies: ["react-icons"],
    propsInterface: `interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
}`,
    variants: [
      {
        label: "Pocas páginas (3)",
        props: { totalPaginas: 3 },
        render: () => <PaginacionDemo totalPaginas={3} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={3} onCambiarPagina={setPagina} />`,
      },
      {
        label: "Muchas páginas (10)",
        props: { totalPaginas: 10 },
        render: () => <PaginacionDemo totalPaginas={10} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={10} onCambiarPagina={setPagina} />`,
      },
      {
        label: "20 páginas",
        props: { totalPaginas: 20 },
        render: () => <PaginacionDemo totalPaginas={20} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={20} onCambiarPagina={setPagina} />`,
      },
    ],
  },
];
