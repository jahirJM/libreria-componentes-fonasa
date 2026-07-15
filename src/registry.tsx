import { useState, useEffect, useRef } from "react";
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
import { TablaBasica } from "./componentsUI/TablaBasica";
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
  sidebarCode,
  stepperCode,
  tablaBasicaCode,
  tablaDatosCode,
  tableCode,
  textAreaCode,
  toastCode,
  uploadBoxCode,
} from "./code";
import { Sidebar } from "./componentsUI/Sidebar";
import {
  FaUserCircle,
  FaUsers,
  FaFileMedical,
  FaHospital,
} from "react-icons/fa";

export interface ComponentVariant {
  label: string;
  props: Record<string, unknown>;
  render: () => React.ReactNode;
  usageCode: string;
  /** Si true, el preview se muestra a ancho completo (útil para componentes como Sidebar) */
  responsive?: boolean;
}

export interface ComponentColor {
  name: string;
  value: string;
  usage: string;
}

export interface ComponentEntry {
  name: string;
  description?: string;
  code: string;
  dependencies?: string[];
  propsInterface?: string;
  colors?: ComponentColor[];
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
    <div className="flex flex-col items-center gap-1 w-full">
      <BotonPrimario
        label="Abrir Modal"
        onClick={() => setOpen(true)}
      />
      <span className="text-xs text-gray-500">({size})</span>
      <CustomModal
        size={size}
        title={title}
        showModal={open}
        onClose={() => setOpen(false)}
      >
        <p className="text-gray-700">Contenido de ejemplo dentro del modal.</p>
      </CustomModal>
    </div>
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
        <BotonSecundario
          label="Anterior"
          onClick={() => setPaso((p) => Math.max(1, p - 1))}
        />
        <BotonPrimario
          label="Siguiente"
          onClick={() => setPaso((p) => Math.min(pasos.length, p + 1))}
        />
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

function SidebarResponsiveWrapper({ children }: { children: (isOpen: boolean) => React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setIsOpen(width >= 200);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden">
      {children(isOpen)}
    </div>
  );
}

function SidebarDemo() {
  const [activePath, setActivePath] = useState("/item-1");

  const menuItems = [
    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
    {
      label: "Item 2",
      path: "/item-2",
      icon: FaUsers,
      subItems: [
        { label: "Subitem 1", path: "/item-2/subitem-1", icon: FaUserCircle },
        { label: "Subitem 2", path: "/item-2/subitem-2", icon: FaFileMedical },
      ],
    },
    { label: "Item 3", path: "/item-3", icon: FaFileMedical },
    { label: "Item 4", path: "/item-4", icon: FaHospital },
  ];

  return (
    <SidebarResponsiveWrapper>
      {(isOpen) => (
        <Sidebar
          isOpen={isOpen}
          userName="Juan Pérez"
          title="Gestión del Beneficiario"
          activePath={activePath}
          className="absolute top-0 left-0 z-20 w-62 h-full"
          menuItems={menuItems}
          onNavigate={(path) => setActivePath(path)}
        />
      )}
    </SidebarResponsiveWrapper>
  );
}

export const registry: ComponentEntry[] = [
  {
    name: "Input",
    description:
      "Input con soporte para múltiples tipos, íconos, loading y copyable.",
    code: inputCode,
    dependencies: ["clsx", "react-icons"],
    colors: [
      { name: "white", value: "#ffffff", usage: "Fondo del input" },
      { name: "gray-100", value: "#f3f4f6", usage: "Fondo del input deshabilitado" },
      { name: "gray-300", value: "#d1d5db", usage: "Borde del input normal" },
      { name: "gray-500", value: "#6b7280", usage: "Placeholder, íconos y texto auxiliar" },
      { name: "blue-900", value: "#1e3a8a", usage: "Borde y ring en focus" },
      { name: "red-500", value: "#ef4444", usage: "Borde, focus ring y borde en estado error" },
      { name: "black", value: "#000000", usage: "Texto del input" },
    ],
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
          <Input type="password" placeholder="••••••••" rightIcon={<FiEye />} />
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
    colors: [
      { name: "gray-600", value: "#4b5563", usage: "Texto del label" },
      { name: "red-500", value: "#ef4444", usage: "Asterisco de campo requerido (*)" },
      { name: "red-400", value: "#f87171", usage: "Texto e ícono del mensaje de error 'requerido'" },
    ],
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
      "Utiliza: Botones. Modal con animaciones de transición, tamaños configurables (sm, md, lg), header con título y botón de cierre.",
    code: customModalCode,
    dependencies: ["@headlessui/react", "react-icons"],
    colors: [
      { name: "white", value: "#ffffff", usage: "Fondo del modal" },
      { name: "gray-800/50", value: "rgba(31,41,55,0.5)", usage: "Overlay de fondo" },
      { name: "blue-900", value: "#1e3a8a", usage: "Título del modal" },
      { name: "gray-700", value: "#374151", usage: "Ícono de cierre" },
    ],
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
    dependencies: ["clsx"],
    colors: [
      { name: "white", value: "#ffffff", usage: "Fondo del textarea" },
      { name: "gray-200", value: "#e5e7eb", usage: "Fondo del textarea deshabilitado" },
      { name: "gray-300", value: "#d1d5db", usage: "Borde normal" },
      { name: "gray-600", value: "#4b5563", usage: "Texto del textarea" },
      { name: "Azul Fonasa", value: "#0572CE", usage: "Ring y borde en focus" },
      { name: "red-500", value: "#ef4444", usage: "Borde y ring en estado error" },
    ],
    propsInterface: `interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
      error?: boolean;
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
        props: { error: true },
        render: () => <TextArea placeholder="Escribe aquí..." error />,
        usageCode: `<TextArea placeholder="Escribe aquí..." error />`,
      },
      {
        label: "Deshabilitado",
        props: { disabled: true },
        render: () => <TextArea placeholder="No disponible" disabled />,
        usageCode: `<TextArea placeholder="No disponible" disabled />`,
      },
    ],
  },
  {
    name: "Tabla Básica",
    description:
      "Tabla HTML simple sin lógica, con header estilizado y columnas configurables.",
    code: tablaBasicaCode,
    dependencies: ["clsx"],
    colors: [
      { name: "blue-900", value: "#1e3a8a", usage: "Fondo del header" },
      { name: "white", value: "#ffffff", usage: "Texto del header y fondo de la tabla" },
      { name: "gray-200", value: "#e5e7eb", usage: "Borde exterior de la tabla" },
      { name: "gray-700", value: "#374151", usage: "Texto del cuerpo" },
    ],
    propsInterface: `interface TablaBasicaProps extends TableHTMLAttributes<HTMLTableElement> {
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
          <TablaBasica nombreColumnas={["Nombre", "Email", "Rol"]}>
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
          </TablaBasica>
        ),
        usageCode: `<TablaBasica nombreColumnas={["Nombre", "Email", "Rol"]}>\n  <tr className="border-b border-gray-100">\n    <td className="px-4 py-2 text-sm">Juan Pérez</td>\n    <td className="px-4 py-2 text-sm">juan@email.com</td>\n    <td className="px-4 py-2 text-sm">Admin</td>\n  </tr>\n</TablaBasica>`,
      },
      {
        label: "Con clases personalizadas",
        props: {
          nombreColumnas: ["ID", "Estado"],
          classTable: "text-center",
          classTh: "text-center",
        },
        render: () => (
          <TablaBasica
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
          </TablaBasica>
        ),
        usageCode: `<TablaBasica nombreColumnas={["ID", "Estado"]} classTable="text-center" classTh="text-center">\n  <tr className="border-b border-gray-100">\n    <td className="px-4 py-2 text-sm">001</td>\n    <td className="px-4 py-2 text-sm">Activo</td>\n  </tr>\n</TablaBasica>`,
      },
    ],
  },
  {
    name: "Table (Avanzada)",
    description:
      "Utiliza: Tabla Básica. Tabla con columnas ocultables (se contraen a '...') y redimensionables tipo Excel.",
    code: tableCode,
    dependencies: ["clsx"],
    colors: [
      { name: "blue-900", value: "#1e3a8a", usage: "Fondo del header" },
      { name: "blue-800", value: "#1e40af", usage: "Fondo hover del header (ocultable)" },
      { name: "blue-700", value: "#1d4ed8", usage: "Borde entre columnas contraídas" },
      { name: "white", value: "#ffffff", usage: "Texto del header y fondo de la tabla" },
      { name: "gray-200", value: "#e5e7eb", usage: "Borde exterior de la tabla" },
      { name: "gray-400", value: "#9ca3af", usage: "Texto de celda contraída (...)" },
      { name: "gray-700", value: "#374151", usage: "Texto del cuerpo" },
    ],
    propsInterface: `interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
      classTable?: string;
      classTh?: string;
      nombreColumnas: string[];
      children: ReactNode;
      ocultable?: boolean;
      redimensionable?: boolean;
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
        label: "Ocultable (click en header)",
        props: { nombreColumnas: ["Nombre", "Email", "Rol"], ocultable: true },
        render: () => (
          <Table nombreColumnas={["Nombre", "Email", "Rol"]} ocultable>
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
        usageCode: `<Table nombreColumnas={["Nombre", "Email", "Rol"]} ocultable>\n  {/* Click en header contrae la columna a "..." */}\n  <tr>\n    <td className="px-4 py-2 text-sm">Juan Pérez</td>\n  </tr>\n</Table>`,
      },
      {
        label: "Redimensionable",
        props: {
          nombreColumnas: ["ID", "Nombre", "Estado"],
          redimensionable: true,
        },
        render: () => (
          <Table nombreColumnas={["ID", "Nombre", "Estado"]} redimensionable>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">001</td>
              <td className="px-4 py-2 text-sm">Solicitud inscripción</td>
              <td className="px-4 py-2 text-sm">Activo</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">002</td>
              <td className="px-4 py-2 text-sm">Solicitud renuncia</td>
              <td className="px-4 py-2 text-sm">Pendiente</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["ID", "Nombre", "Estado"]} redimensionable>\n  <tr>\n    <td className="px-4 py-2 text-sm">001</td>\n    <td className="px-4 py-2 text-sm">Solicitud inscripción</td>\n    <td className="px-4 py-2 text-sm">Activo</td>\n  </tr>\n</Table>`,
      },
      {
        label: "Ocultable + Redimensionable",
        props: {
          nombreColumnas: ["Nombre", "RUT", "Email", "Rol"],
          ocultable: true,
          redimensionable: true,
        },
        render: () => (
          <Table
            nombreColumnas={["Nombre", "RUT", "Email", "Rol"]}
            ocultable
            redimensionable
          >
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">Juan Pérez</td>
              <td className="px-4 py-2 text-sm">12.345.678-9</td>
              <td className="px-4 py-2 text-sm">juan@email.com</td>
              <td className="px-4 py-2 text-sm">Admin</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["Nombre", "RUT", "Email", "Rol"]} ocultable redimensionable>\n  <tr>\n    <td className="px-4 py-2 text-sm">Juan Pérez</td>\n    <td className="px-4 py-2 text-sm">12.345.678-9</td>\n    <td className="px-4 py-2 text-sm">juan@email.com</td>\n    <td className="px-4 py-2 text-sm">Admin</td>\n  </tr>\n</Table>`,
      },
    ],
  },
  {
    name: "Select",
    description:
      "Select desplegable con soporte para estados de error y deshabilitado.",
    code: selectCode,
    colors: [
      { name: "white", value: "#ffffff", usage: "Fondo del select" },
      { name: "gray-200", value: "#e5e7eb", usage: "Fondo del select deshabilitado" },
      { name: "gray-300", value: "#d1d5db", usage: "Borde normal" },
      { name: "gray-600", value: "#4b5563", usage: "Texto del select" },
      { name: "Azul Fonasa", value: "#0572CE", usage: "Ring y borde en focus" },
      { name: "red-500", value: "#ef4444", usage: "Borde y ring en estado error" },
    ],
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
    colors: [
      { name: "cyan-600", value: "#0891b2", usage: "Fondo BotonConfirmar" },
      { name: "cyan-500", value: "#06b6d4", usage: "Fondo hover BotonConfirmar" },
      { name: "red-600", value: "#dc2626", usage: "Fondo BotonCancelar" },
      { name: "red-500", value: "#ef4444", usage: "Fondo hover BotonCancelar" },
      { name: "Azul Fonasa", value: "#0572CE", usage: "Fondo BotonPrimario" },
      { name: "blue-700", value: "#1d4ed8", usage: "Fondo hover BotonPrimario" },
      { name: "gray-400", value: "#9ca3af", usage: "Fondo BotonSecundario" },
      { name: "gray-500", value: "#6b7280", usage: "Fondo hover BotonSecundario" },
      { name: "gray-300", value: "#d1d5db", usage: "Fondo de todos los botones deshabilitados" },
      { name: "white", value: "#ffffff", usage: "Texto de todos los botones" },
    ],
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
        render: () => <div className="flex justify-center w-full"><BotonConfirmar label="Confirmar" /></div>,
        usageCode: `<BotonConfirmar label="Confirmar" />`,
      },
      {
        label: "BotonCancelar",
        props: { label: "Cancelar" },
        render: () => <div className="flex justify-center w-full"><BotonCancelar label="Cancelar" /></div>,
        usageCode: `<BotonCancelar label="Cancelar" />`,
      },
      {
        label: "BotonPrimario",
        props: { label: "Guardar" },
        render: () => <div className="flex justify-center w-full"><BotonPrimario label="Guardar" /></div>,
        usageCode: `<BotonPrimario label="Guardar" />`,
      },
      {
        label: "BotonSecundario",
        props: { label: "Volver" },
        render: () => <div className="flex justify-center w-full"><BotonSecundario label="Volver" /></div>,
        usageCode: `<BotonSecundario label="Volver" />`,
      },
      {
        label: "Deshabilitado",
        props: { label: "No disponible", isDisabled: true },
        render: () => <div className="flex justify-center w-full"><BotonPrimario label="No disponible" isDisabled /></div>,
        usageCode: `<BotonPrimario label="No disponible" isDisabled />`,
      },
    ],
  },
  {
    name: "Toast (Sonner)",
    description:
      "Utiliza: Botones. Notificaciones toast con estilos Fonasa. Incluye variantes de éxito, error, info y advertencia.",
    code: toastCode,
    dependencies: ["sonner"],
    colors: [
      { name: "green-50 (ecfdf5)", value: "#ecfdf5", usage: "Fondo toast éxito" },
      { name: "Azul Fonasa", value: "#0572CE", usage: "Borde toast éxito e info" },
      { name: "green-900 (064e3b)", value: "#064e3b", usage: "Texto toast éxito" },
      { name: "red-50 (fef2f2)", value: "#fef2f2", usage: "Fondo toast error" },
      { name: "red-600", value: "#dc2626", usage: "Borde toast error" },
      { name: "red-900 (991b1b)", value: "#991b1b", usage: "Texto toast error" },
      { name: "blue-50 (eff6ff)", value: "#eff6ff", usage: "Fondo toast info" },
      { name: "blue-900 (1e3a5f)", value: "#1e3a5f", usage: "Texto toast info" },
      { name: "amber-50 (fffbeb)", value: "#fffbeb", usage: "Fondo toast advertencia" },
      { name: "amber-600", value: "#d97706", usage: "Borde toast advertencia" },
      { name: "amber-900 (92400e)", value: "#92400e", usage: "Texto toast advertencia" },
    ],
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
          <div className="flex justify-center w-full">
            <FonasaToaster />
            <BotonConfirmar
              label="Mostrar Toast Éxito"
              onClick={() =>
                fonasaToast.success("Operación realizada correctamente")
              }
            />
          </div>
        ),
        usageCode: `fonasaToast.success("Operación realizada correctamente")`,
      },
      {
        label: "Error",
        props: {},
        render: () => (
          <div className="flex justify-center w-full">
            <FonasaToaster />
            <BotonCancelar
              label="Mostrar Toast Error"
              onClick={() =>
                fonasaToast.error("Ocurrió un error al procesar la solicitud")
              }
            />
          </div>
        ),
        usageCode: `fonasaToast.error("Ocurrió un error al procesar la solicitud")`,
      },
      {
        label: "Info",
        props: {},
        render: () => (
          <div className="flex justify-center w-full">
            <FonasaToaster />
            <BotonPrimario
              label="Mostrar Toast Info"
              onClick={() =>
                fonasaToast.info("Se ha enviado un correo de verificación")
              }
            />
          </div>
        ),
        usageCode: `fonasaToast.info("Se ha enviado un correo de verificación")`,
      },
      {
        label: "Advertencia",
        props: {},
        render: () => (
          <div className="flex justify-center w-full">
            <FonasaToaster />
            <BotonSecundario
              label="Mostrar Toast Advertencia"
              onClick={() =>
                fonasaToast.warning("Su sesión expirará en 5 minutos")
              }
            />
          </div>
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
    colors: [
      { name: "Azul Fonasa", value: "#0572CE", usage: "Borde del spinner (border-t y border-b)" },
      { name: "white", value: "#ffffff", usage: "Fondo del círculo contenedor del spinner y texto del mensaje" },
      { name: "gray-900/80", value: "rgba(17,24,39,0.8)", usage: "Overlay oscuro del loading fullscreen" },
      { name: "gray-900/70", value: "rgba(17,24,39,0.7)", usage: "Fondo de LoadingSection y LoadingFonasa" },
    ],
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
        responsive: true,
        render: () => (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 rounded-xl">
            <div className="bg-white p-3 rounded-full mb-3">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#0572CE]"></div>
            </div>
            <p className="text-white text-sm font-semibold">
              Cargando datos...
            </p>
          </div>
        ),
        usageCode: `<Loading mensaje="Cargando datos..." />`,
      },
      {
        label: "LoadingSection",
        props: { mensaje: "Procesando..." },
        render: () => (
          <LoadingSection mensaje="Procesando..." />
        ),
        usageCode: `<LoadingSection mensaje="Procesando..." />`,
      },
      {
        label: "LoadingFonasa (con favicon)",
        props: { mensaje: "Cargando..." },
        render: () => (
          <LoadingFonasa mensaje="Cargando..." />
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
    colors: [
      { name: "yellow-100", value: "#fef9c3", usage: "Fondo badge pendiente" },
      { name: "yellow-800", value: "#854d0e", usage: "Texto badge pendiente" },
      { name: "yellow-300", value: "#fde047", usage: "Borde badge pendiente" },
      { name: "blue-100", value: "#dbeafe", usage: "Fondo badge revisión" },
      { name: "blue-800", value: "#1e40af", usage: "Texto badge revisión" },
      { name: "blue-300", value: "#93c5fd", usage: "Borde badge revisión" },
      { name: "green-100", value: "#dcfce7", usage: "Fondo badge aprobada" },
      { name: "green-800", value: "#166534", usage: "Texto badge aprobada" },
      { name: "green-300", value: "#86efac", usage: "Borde badge aprobada" },
      { name: "red-200", value: "#fecaca", usage: "Fondo badge rechazada" },
      { name: "red-900", value: "#7f1d1d", usage: "Texto badge rechazada" },
      { name: "red-400", value: "#f87171", usage: "Borde badge rechazada" },
      { name: "gray-100", value: "#f3f4f6", usage: "Fondo badge counter/default" },
      { name: "gray-500", value: "#6b7280", usage: "Texto badge counter" },
      { name: "gray-700", value: "#374151", usage: "Texto badge default" },
    ],
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
    colors: [
      { name: "gray-700", value: "#374151", usage: "Texto de los labels" },
      { name: "Accent (primary-color)", value: "#0572CE", usage: "Color del checkbox/radio cuando está seleccionado (accent-color CSS)" },
    ],
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
    colors: [
      { name: "gray-200", value: "#e5e7eb", usage: "Fondo del estado default" },
      { name: "gray-300", value: "#d1d5db", usage: "Borde punteado del estado default" },
      { name: "gray-500", value: "#6b7280", usage: "Texto secundario y texto de formato" },
      { name: "gray-600", value: "#4b5563", usage: "Ícono de upload" },
      { name: "gray-700", value: "#374151", usage: "Texto principal" },
      { name: "green-500", value: "#22c55e", usage: "Ícono de confirmación" },
      { name: "red-50", value: "#fef2f2", usage: "Fondo del estado error" },
      { name: "red-300", value: "#fca5a5", usage: "Borde del estado error" },
      { name: "red-500", value: "#ef4444", usage: "Ícono y texto secundario de error" },
      { name: "red-600", value: "#dc2626", usage: "Texto principal de error" },
    ],
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
    colors: [
      { name: "Primary (Celeste/Teal)", value: "#008CB5", usage: "Fondo del header en variante primary" },
      { name: "Secondary (Gris oscuro)", value: "#414951", usage: "Fondo del header en variante secondary" },
      { name: "white", value: "#ffffff", usage: "Texto del header y fondo de las filas" },
      { name: "gray-400", value: "#9ca3af", usage: "Bordes de las filas" },
      { name: "gray-600", value: "#4b5563", usage: "Íconos de editar/eliminar" },
      { name: "gray-700", value: "#374151", usage: "Texto de las celdas" },
      { name: "red-600", value: "#dc2626", usage: "Ícono de eliminar en hover" },
    ],
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
            listaHeaders={["Nom.", "RUT", "Edad"]}
            columnas={["nombre", "rut", "edad"]}
            listaDatos={[
              {
                id: "1",
                nombre: "Juan",
                rut: "12.345.678-9",
                edad: "35",
              },
              {
                id: "2",
                nombre: "María",
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
            listaHeaders={["Nom.", "Email", ""]}
            columnas={["nombre", "email"]}
            listaDatos={[
              { id: "1", nombre: "Juan", email: "juan@mail.com" },
              { id: "2", nombre: "María", email: "maria@mail.com" },
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
            listaHeaders={["Cód.", "Desc."]}
            columnas={["codigo", "descripcion"]}
            listaDatos={[
              { id: "1", codigo: "A01", descripcion: "Consulta" },
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
      "Utiliza: Botones. Stepper horizontal para formularios multi-paso. Responsive: en mobile muestra badge, en desktop muestra línea de progreso con círculos.",
    code: stepperCode,
    colors: [
      { name: "Azul Fonasa", value: "#0572CE", usage: "Círculos activos, línea de progreso, texto del paso actual y borde del badge mobile" },
      { name: "white", value: "#ffffff", usage: "Texto dentro de los círculos" },
      { name: "gray-300", value: "#d1d5db", usage: "Círculos inactivos y línea de fondo" },
      { name: "gray-500", value: "#6b7280", usage: "Texto de labels inactivos" },
      { name: "gray-700", value: "#374151", usage: "Texto del label en vista mobile" },
    ],
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
              { id: "1", label: "Paso 1" },
              { id: "2", label: "Paso 2" },
              { id: "3", label: "Paso 3" },
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
              { id: "1", label: "Paso 1" },
              { id: "2", label: "Paso 2" },
              { id: "3", label: "Paso 3" },
              { id: "4", label: "Paso 4" },
              { id: "5", label: "Paso 5" },
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
    colors: [
      { name: "Azul Fonasa", value: "#0572CE", usage: "ID de solicitud, enlaces 'Ver', acordeón de documentos" },
      { name: "white", value: "#ffffff", usage: "Fondo del header de la card" },
      { name: "blue-50", value: "#eff6ff", usage: "Fondo del badge de ID y hover del acordeón" },
      { name: "gray-50", value: "#f9fafb", usage: "Fondo de la sección de fechas" },
      { name: "gray-100", value: "#f3f4f6", usage: "Fondo de motivo de resolución y documento respuesta" },
      { name: "gray-200", value: "#e5e7eb", usage: "Bordes de la card y separadores" },
      { name: "gray-400", value: "#9ca3af", usage: "Texto del contador de resultados" },
      { name: "gray-700", value: "#374151", usage: "Texto del tipo de solicitud y documentos" },
      { name: "gray-800", value: "#1f2937", usage: "Título de la lista y texto de documento respuesta" },
      { name: "red-500", value: "#ef4444", usage: "Borde y fondo del mensaje de error" },
      { name: "red-900", value: "#7f1d1d", usage: "Texto del mensaje de error" },
    ],
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
    name: "Sidebar",
    description:
      "Barra lateral de navegación con ítems de menú, subítems desplegables, estado activo y toggle de visibilidad.",
    code: sidebarCode,
    dependencies: ["react-icons"],
    colors: [
      { name: "Azul Fonasa", value: "#0572CE", usage: "Texto de ítems, íconos, fondo de ítem activo y hover" },
      { name: "white", value: "#ffffff", usage: "Texto e íconos del ítem activo" },
      { name: "gray-100", value: "#f3f4f6", usage: "Fondo del sidebar" },
      { name: "gray-300", value: "#d1d5db", usage: "Bordes, separadores y fondo de ítems bloqueados" },
      { name: "gray-500", value: "#6b7280", usage: "Texto del título, subtítulo y elementos deshabilitados" },
      { name: "gray-600", value: "#4b5563", usage: "Texto de subítems inactivos" },
      { name: "gray-900", value: "#111827", usage: "Texto de ítems de menú inactivos" },
    ],
    propsInterface: `interface SidebarSubItem {
  label: string;
  path: string;
  /** Ícono opcional del subítem */
  icon?: IconType;
  /** Si true, el subítem se renderiza deshabilitado */
  isBlocked?: boolean;
  /** Tooltip cuando está bloqueado */
  blockedTooltip?: string;
}

interface SidebarMenuItem {
  /** Texto visible del ítem */
  label: string;
  /** Ruta de destino */
  path: string;
  /** Ícono de react-icons */
  icon: IconType;
  /** Si true, el ítem se renderiza deshabilitado */
  isBlocked?: boolean;
  /** Tooltip cuando está bloqueado */
  blockedTooltip?: string;
  /** Subítems opcionales para menú desplegable */
  subItems?: SidebarSubItem[];
}

interface SidebarProps {
  /** Nombre del usuario conectado */
  userName?: string;
  /** Título del panel */
  title?: string;
  /** Lista de ítems de navegación */
  menuItems?: SidebarMenuItem[];
  /** Ruta activa actual */
  activePath?: string;
  /** Visibilidad del sidebar (mobile) */
  isOpen?: boolean;
  /** Estado de carga — muestra skeleton */
  loading?: boolean;
  /** Callback al navegar */
  onNavigate?: (path: string) => void;
  /** Clases CSS de posicionamiento del aside */
  className?: string;
}`,
    variants: [
      {
        label: "Skeleton (loading)",
        props: { loading: true },
        responsive: true,
        render: () => (
          <SidebarResponsiveWrapper>
            {(isOpen) => (
              <Sidebar
                loading
                isOpen={isOpen}
                className="absolute top-0 left-0 z-20 w-62 h-full"
              />
            )}
          </SidebarResponsiveWrapper>
        ),
        usageCode: `<Sidebar loading isOpen={true} />`,
      },
      {
        label: "Interactivo (con subItems e íconos)",
        props: {},
        responsive: true,
        render: () => <SidebarDemo />,
        usageCode: `<Sidebar
  isOpen={isOpen}
  userName="Juan Pérez"
  title="Gestión del Beneficiario"
  activePath={location.pathname}
  menuItems={[
    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
    {
      label: "Item 2",
      path: "/item-2",
      icon: FaUsers,
      subItems: [
        { label: "Subitem 1", path: "/item-2/subitem-1", icon: FaUserCircle },
        { label: "Subitem 2", path: "/item-2/subitem-2", icon: FaFileMedical },
      ],
    },
    { label: "Item 3", path: "/item-3", icon: FaFileMedical },
    { label: "Item 4", path: "/item-4", icon: FaHospital },
  ]}
  onNavigate={(path) => navigate(path)}
/>`,
      },
      {
        label: "Sin íconos en subItems",
        props: {},
        responsive: true,
        render: () => {
          const [activePath, setActivePath] = useState("/item-1");
          return (
            <SidebarResponsiveWrapper>
              {(isOpen) => (
                <Sidebar
                  isOpen={isOpen}
                  userName="María López"
                  title="Panel de Control"
                  activePath={activePath}
                  className="absolute top-0 left-0 z-20 w-62 h-full"
                  menuItems={[
                    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
                    {
                      label: "Item 2",
                      path: "/item-2",
                      icon: FaUsers,
                      subItems: [
                        { label: "Subitem 1", path: "/item-2/subitem-1" },
                        { label: "Subitem 2", path: "/item-2/subitem-2" },
                        { label: "Subitem 3", path: "/item-2/subitem-3" },
                      ],
                    },
                    { label: "Item 3", path: "/item-3", icon: FaFileMedical },
                  ]}
                  onNavigate={(path) => setActivePath(path)}
                />
              )}
            </SidebarResponsiveWrapper>
          );
        },
        usageCode: `<Sidebar
  isOpen={isOpen}
  userName="María López"
  title="Panel de Control"
  activePath={activePath}
  menuItems={[
    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
    {
      label: "Item 2",
      path: "/item-2",
      icon: FaUsers,
      subItems: [
        { label: "Subitem 1", path: "/item-2/subitem-1" },
        { label: "Subitem 2", path: "/item-2/subitem-2" },
        { label: "Subitem 3", path: "/item-2/subitem-3" },
      ],
    },
    { label: "Item 3", path: "/item-3", icon: FaFileMedical },
  ]}
  onNavigate={(path) => setActivePath(path)}
/>`,
      },
      {
        label: "Items y subItems bloqueados",
        props: { isBlocked: true },
        responsive: true,
        render: () => (
          <SidebarResponsiveWrapper>
            {(isOpen) => (
              <Sidebar
                isOpen={isOpen}
                userName="Admin"
                title="Administración"
                activePath="/item-1"
                className="absolute top-0 left-0 z-20 w-62 h-full"
                menuItems={[
                  { label: "Item 1", path: "/item-1", icon: FaUserCircle },
                  {
                    label: "Item 2",
                    path: "/item-2",
                    icon: FaUsers,
                    subItems: [
                      { label: "Subitem 1", path: "/item-2/subitem-1" },
                      { label: "Subitem 2", path: "/item-2/subitem-2", isBlocked: true },
                    ],
                  },
                  { label: "Item 3", path: "/item-3", icon: FaHospital, isBlocked: true },
                ]}
                onNavigate={() => {}}
              />
            )}
          </SidebarResponsiveWrapper>
        ),
        usageCode: `<Sidebar
  menuItems={[
    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
    {
      label: "Item 2",
      path: "/item-2",
      icon: FaUsers,
      subItems: [
        { label: "Subitem 1", path: "/item-2/subitem-1" },
        { label: "Subitem 2", path: "/item-2/subitem-2", isBlocked: true },
      ],
    },
    { label: "Item 3", path: "/item-3", icon: FaHospital, isBlocked: true },
  ]}
/>`,
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
    colors: [
      {
        name: "Azul Fonasa",
        value: "#0572CE",
        usage: "Texto de los números de página y fondo de la página activa",
      },
      {
        name: "white",
        value: "#ffffff",
        usage: "Texto del número de página activa",
      },
      {
        name: "blue-100",
        value: "#dbeafe",
        usage: "Fondo hover de los botones de página",
      },
    ],
    variants: [
      {
        label: "3 Páginas",
        props: { totalPaginas: 3 },
        render: () => <PaginacionDemo totalPaginas={3} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={3} onCambiarPagina={setPagina} />`,
      },
      {
        label: "10 Páginas",
        props: { totalPaginas: 10 },
        render: () => <PaginacionDemo totalPaginas={10} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={10} onCambiarPagina={setPagina} />`,
      },
      {
        label: "20 Páginas",
        props: { totalPaginas: 20 },
        render: () => <PaginacionDemo totalPaginas={20} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={20} onCambiarPagina={setPagina} />`,
      },
    ],
  },
];
