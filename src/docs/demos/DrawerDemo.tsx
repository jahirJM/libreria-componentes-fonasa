import { useState } from "react";
import { Drawer } from "../../componentsUI/Drawer";

export function DrawerTailwindSafelist() {
  return (
    <span
      aria-hidden
      className="hidden translate-x-full -translate-x-full translate-y-full -translate-y-full translate-x-0 translate-y-0"
    />
  );
}

export function DefaultDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <DrawerTailwindSafelist />
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-[#0572CE] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        Abrir Drawer →
      </button>
      <span className="text-xs text-gray-400">Se abre desde la derecha</span>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titulo="Información del paciente"
        descripcion="Datos generales del beneficiario"
      >
        <div className="space-y-3 text-sm text-gray-600">
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-800 block mb-1">Nombre</span>
            Juan Pérez González
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-800 block mb-1">RUT</span>
            12.345.678-9
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-800 block mb-1">Previsión</span>
            FONASA - Tramo B
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export function LeftDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-[#0572CE] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        ← Abrir desde la izquierda
      </button>
      <span className="text-xs text-gray-400">posicion=&quot;left&quot;</span>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titulo="Menú de navegación"
        posicion="left"
      >
        <ul className="space-y-1 text-sm text-gray-700">
          {["Inicio", "Beneficiarios", "Solicitudes", "Reportes", "Configuración"].map(
            (item) => (
              <li
                key={item}
                className="p-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                {item}
              </li>
            ),
          )}
        </ul>
      </Drawer>
    </div>
  );
}

export function BottomDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-[#0572CE] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        ↑ Abrir desde abajo
      </button>
      <span className="text-xs text-gray-400">posicion=&quot;bottom&quot;</span>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titulo="Seleccionar tipo de atención"
        descripcion="Escoja una modalidad para continuar"
        posicion="bottom"
        size="md"
      >
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: "Consulta general", desc: "Médico de cabecera" },
            { label: "Especialista", desc: "Derivación con orden médica" },
            { label: "Urgencia", desc: "Atención inmediata" },
          ].map((op) => (
            <button
              key={op.label}
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-start p-4 text-left border border-gray-200 rounded-xl hover:border-[#0572CE] hover:bg-blue-50 transition-all"
            >
              <span className="text-sm font-medium text-gray-800">{op.label}</span>
              <span className="text-xs text-gray-500 mt-0.5">{op.desc}</span>
            </button>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export function TopDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-[#0572CE] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        ↓ Abrir desde arriba
      </button>
      <span className="text-xs text-gray-400">posicion=&quot;top&quot;</span>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titulo="Actualización disponible"
        posicion="top"
        size="sm"
      >
        <p className="text-sm text-gray-600">
          Se ha detectado una nueva versión del sistema. Por favor guarde su
          trabajo antes de actualizar.
        </p>
      </Drawer>
    </div>
  );
}

export function WithFooterDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-[#0572CE] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        Abrir con footer
      </button>
      <span className="text-xs text-gray-400">Con botones de acción</span>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titulo="Confirmar eliminación"
        descripcion="Esta acción no se puede deshacer"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          ¿Está seguro que desea eliminar el registro del beneficiario{" "}
          <strong>Juan Pérez González</strong>? Esta operación es irreversible.
        </p>
      </Drawer>
    </div>
  );
}

export function LargeDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-[#0572CE] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        Abrir grande (lg)
      </button>
      <span className="text-xs text-gray-400">size=&quot;lg&quot; — 560px</span>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titulo="Detalle de solicitud"
        descripcion="Solicitud N° 2026-00123"
        size="lg"
        footer={
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm text-white bg-[#0572CE] rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cerrar
          </button>
        }
      >
        <div className="space-y-3 text-sm text-gray-600">
          {[
            { label: "Beneficiario", value: "Juan Pérez González" },
            { label: "RUT", value: "12.345.678-9" },
            { label: "Estado", value: "En revisión" },
            { label: "Fecha", value: "15/07/2026" },
            { label: "Prestador", value: "Hospital Barros Luco" },
          ].map((row) => (
            <div key={row.label} className="p-3 bg-gray-50 rounded-lg flex justify-between">
              <span className="font-medium text-gray-700">{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export function NoCerrarAlClickFueraDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-[#0572CE] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        Sin cerrar al click fuera
      </button>
      <span className="text-xs text-gray-400">cerrarAlClickFuera=false</span>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titulo="Formulario obligatorio"
        descripcion="Complete todos los campos para continuar"
        cerrarAlClickFuera={false}
        footer={
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm text-white bg-[#0572CE] rounded-lg hover:bg-blue-700 transition-colors"
          >
            Finalizar
          </button>
        }
      >
        <p className="text-sm text-gray-600">
          Hacer click fuera <strong>no cerrará</strong> este drawer. Use el
          botón &quot;Finalizar&quot; o la tecla Escape.
        </p>
      </Drawer>
    </div>
  );
}

export function SinBotonCerrarDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-[#0572CE] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        Sin ícono X de cierre
      </button>
      <span className="text-xs text-gray-400">mostrarBotonCerrar=false</span>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titulo="Panel de información"
        mostrarBotonCerrar={false}
        footer={
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm text-white bg-[#0572CE] rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cerrar panel
          </button>
        }
      >
        <p className="text-sm text-gray-600">
          El header no muestra el ícono X. El cierre se controla desde el
          footer o con la tecla Escape.
        </p>
      </Drawer>
    </div>
  );
}