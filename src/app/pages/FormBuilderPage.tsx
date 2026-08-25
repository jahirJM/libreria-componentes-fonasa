import { useState, useCallback, type ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  LuPlus, LuTrash2, LuGripVertical, LuCopy, LuCheck, LuCode, LuEye, LuSettings,
  LuTextCursorInput, LuAlignLeft, LuChevronDown, LuSearch, LuToggleLeft,
  LuSquareCheck, LuCircleDot, LuHeading, LuType, LuMinus, LuLayoutList,
  LuCalendar, LuUpload, LuHash, LuMove,
  LuArrowUp, LuArrowDown, LuArrowLeft, LuArrowRight,
} from "react-icons/lu";

import { Input } from "../../componentsUI/Input";
import { Label } from "../../componentsUI/Label";
import { TextArea } from "../../componentsUI/TextArea";
import { Select, type SelectOption } from "../../componentsUI/Select";
import { Switch } from "../../componentsUI/Switch";
import { CheckButton } from "../../componentsUI/CheckButton";
import { UploadBox } from "../../componentsUI/UploadBox";
import { BotonPrimario, BotonCancelar } from "../../componentsUI/Botones";

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════════

type FieldType =
  | "input" | "number" | "email" | "password" | "textarea"
  | "select" | "selectBuscable" | "switch"
  | "checkbox" | "radio"
  | "date" | "file"
  | "heading" | "paragraph" | "divider" | "section";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  colSpan: 1 | 2;
  options?: string[];
  sectionName?: string;
  switchVariant?: "primary" | "success" | "error" | "warning" | "neutral";
  switchSize?: "sm" | "md" | "lg";
  switchIcons?: boolean;
  inputError?: boolean;
  inputDisabled?: boolean;
  listName?: string;
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
}

interface FieldConfig {
  type: FieldType;
  icon: ReactNode;
  label: string;
}

const fieldCatalog: FieldConfig[] = [
  { type: "input", icon: <LuTextCursorInput className="size-4" />, label: "Input" },
  { type: "number", icon: <LuHash className="size-4" />, label: "Número" },
  { type: "email", icon: <LuType className="size-4" />, label: "Email" },
  { type: "password", icon: <LuTextCursorInput className="size-4" />, label: "Password" },
  { type: "textarea", icon: <LuAlignLeft className="size-4" />, label: "TextArea" },
  { type: "select", icon: <LuChevronDown className="size-4" />, label: "Select" },
  { type: "selectBuscable", icon: <LuSearch className="size-4" />, label: "Buscable" },
  { type: "switch", icon: <LuToggleLeft className="size-4" />, label: "Switch" },
  { type: "checkbox", icon: <LuSquareCheck className="size-4" />, label: "Checkbox" },
  { type: "radio", icon: <LuCircleDot className="size-4" />, label: "Radio" },
  { type: "date", icon: <LuCalendar className="size-4" />, label: "Fecha" },
  { type: "file", icon: <LuUpload className="size-4" />, label: "Archivo" },
  { type: "heading", icon: <LuHeading className="size-4" />, label: "Título" },
  { type: "paragraph", icon: <LuType className="size-4" />, label: "Texto" },
  { type: "divider", icon: <LuMinus className="size-4" />, label: "Separador" },
  { type: "section", icon: <LuLayoutList className="size-4" />, label: "Sección" },
];

let idCounter = 0;
function genId() { return `field-${++idCounter}-${Date.now()}`; }

// ═══════════════════════════════════════════════════════════════════════════════
// SORTABLE ITEM (sidebar)
// ═══════════════════════════════════════════════════════════════════════════════

function SortableFieldItem({ field, isSelected, onSelect, onRemove, onUpdateName }: { field: FormField; isSelected: boolean; onSelect: () => void; onRemove: () => void; onUpdateName: (name: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  const typeLabel = fieldCatalog.find((f) => f.type === field.type)?.label ?? field.type;
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const displayName = field.type === "section" ? field.sectionName || "Sección" : field.listName || field.label || typeLabel;

  function startEdit(e: React.MouseEvent) { e.stopPropagation(); setEditValue(displayName); setEditing(true); }
  function finishEdit() { setEditing(false); if (editValue.trim()) onUpdateName(editValue.trim()); }

  return (
    <div ref={setNodeRef} style={style} onClick={onSelect}
      className={`group flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-pointer ${isSelected ? "border-[#0572CE] bg-blue-50/60 ring-1 ring-[#0572CE]/20" : "border-gray-200 bg-white hover:border-gray-300"}`}>
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none">
        <LuGripVertical className="size-3.5" />
      </button>
      <div className="flex-1 min-w-0">
        {editing ? (
          <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={finishEdit}
            onKeyDown={(e) => { if (e.key === "Enter") finishEdit(); if (e.key === "Escape") setEditing(false); }}
            autoFocus onClick={(e) => e.stopPropagation()}
            className="w-full text-xs font-medium text-gray-700 bg-transparent border-b border-[#0572CE] outline-none py-0" />
        ) : (
          <p className="text-xs font-medium text-gray-700 truncate hover:text-[#0572CE] cursor-text" onDoubleClick={startEdit}>{displayName}</p>
        )}
        <p className="text-xs text-gray-400">{typeLabel}{field.required ? " •" : ""}</p>
      </div>
      <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{field.colSpan === 2 ? "full" : "½"}</span>
      <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
        <LuTrash2 className="size-3.5" />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PREVIEW RENDERER
// ═══════════════════════════════════════════════════════════════════════════════

function PreviewField({ field }: { field: FormField }) {
  const [selectValue, setSelectValue] = useState("");
  const [switchValue, setSwitchValue] = useState(false);
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const selectOptions: SelectOption[] = (field.options || []).map((o) => ({ value: o, label: o }));

  switch (field.type) {
    case "input": case "email": case "password": case "number":
      return (<div className="space-y-1.5"><Label text={field.label} indicador={field.required} /><Input type={field.type === "input" ? "text" : field.type} placeholder={field.placeholder || ""} error={field.inputError} disabled={field.inputDisabled} ariaLabel={field.ariaLabel} ariaDescribedBy={field.ariaDescribedBy} ariaLabelledBy={field.ariaLabelledBy} /></div>);
    case "textarea":
      return (<div className="space-y-1.5"><Label text={field.label} indicador={field.required} /><TextArea placeholder={field.placeholder || ""} rows={3} ariaLabel={field.ariaLabel} ariaDescribedBy={field.ariaDescribedBy} /></div>);
    case "select": case "selectBuscable":
      return (<div className="space-y-1.5"><Label text={field.label} indicador={field.required} /><Select opciones={selectOptions} value={selectValue} onChange={setSelectValue} placeholder={field.placeholder || "Seleccionar..."} ariaLabel={field.ariaLabel} ariaLabelledBy={field.ariaLabelledBy} /></div>);
    case "switch":
      return (<div className="flex items-center justify-between py-1"><Label text={field.label} /><Switch checked={switchValue} onChange={setSwitchValue} variante={field.switchVariant || "primary"} tamano={field.switchSize || "md"} conIconos={field.switchIcons || false} ariaLabel={field.ariaLabel} ariaLabelledBy={field.ariaLabelledBy} /></div>);
    case "checkbox":
      return (<div className="space-y-1.5"><Label text={field.label} indicador={field.required} /><CheckButton listaOpciones={(field.options || ["Opción 1", "Opción 2"]).map((o) => ({ id: o, label: o }))} selectedItems={checkItems} onToggle={(op) => setCheckItems((prev) => prev.includes(op.id) ? prev.filter((i) => i !== op.id) : [...prev, op.id])} ariaLabel={field.ariaLabel} /></div>);
    case "radio":
      return (<div className="space-y-1.5"><Label text={field.label} indicador={field.required} /><CheckButton variant="secondary" listaOpciones={(field.options || ["Sí", "No"]).map((o) => ({ id: o, label: o }))} selectedItems={checkItems} onToggle={(op) => setCheckItems([op.id])} ariaLabel={field.ariaLabel} /></div>);
    case "date":
      return (<div className="space-y-1.5"><Label text={field.label} indicador={field.required} /><Input type="text" placeholder={field.placeholder || "dd/mm/aaaa"} ariaLabel={field.ariaLabel} ariaDescribedBy={field.ariaDescribedBy} ariaLabelledBy={field.ariaLabelledBy} /></div>);
    case "file":
      return (<div className="space-y-1.5"><Label text={field.label} indicador={field.required} /><UploadBox text="o arrastra tu archivo aquí" textStrong="Haz clic para subir" ariaLabel={field.ariaLabel} /></div>);
    case "heading":
      return <h3 className="text-lg font-semibold text-gray-800 pt-2">{field.label}</h3>;
    case "paragraph":
      return <p className="text-sm text-gray-600">{field.label}</p>;
    case "divider":
      return <hr className="border-gray-200 my-1" />;
    case "section":
      return (<div className="pt-4 pb-1"><h4 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">{field.sectionName || "Sección"}</h4></div>);
    default: return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PREVIEW SORTABLE ITEM (with position controls)
// ═══════════════════════════════════════════════════════════════════════════════

function SortablePreviewField({ field, isSelected, onSelect, index, total, columns, onMove, onResize }: {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
  total: number;
  columns: 1 | 2;
  onMove: (direction: "up" | "down") => void;
  onResize: (span: 1 | 2) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      className={`relative group rounded-lg transition-shadow ${
        field.colSpan === 2 && columns > 1 ? "col-span-2" : ""
      } ${
        isSelected
          ? "ring-2 ring-[#0572CE] ring-offset-2 bg-blue-50/30"
          : "hover:ring-1 hover:ring-gray-300 hover:ring-offset-1"
      } ${isDragging ? "shadow-xl" : ""}`}
    >
      <div className="p-2">
        <PreviewField field={field} />
      </div>

      {/* Drag handle — always visible when selected, hover otherwise */}
      <button
        {...attributes}
        {...listeners}
        className={`absolute top-1.5 right-1.5 p-1 rounded bg-white border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing text-gray-400 hover:text-[#0572CE] transition-all touch-none ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        title="Arrastra para mover"
        onClick={(e) => e.stopPropagation()}
      >
        <LuMove className="size-3.5" />
      </button>

      {/* Position controls when selected */}
      {isSelected && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white border border-gray-200 rounded-lg shadow-sm px-1 py-0.5 z-20">
          <button onClick={(e) => { e.stopPropagation(); onMove("up"); }} disabled={index === 0}
            title="Mover arriba" className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:text-[#0572CE]">
            <LuArrowUp className="size-3" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMove("down"); }} disabled={index === total - 1}
            title="Mover abajo" className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:text-[#0572CE]">
            <LuArrowDown className="size-3" />
          </button>
          {columns === 2 && (
            <>
              <div className="w-px h-4 bg-gray-200 mx-0.5" />
              <button onClick={(e) => { e.stopPropagation(); onResize(1); }} disabled={field.colSpan === 1}
                title="Mitad de ancho" className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:text-[#0572CE]">
                <LuArrowLeft className="size-3" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); onResize(2); }} disabled={field.colSpan === 2}
                title="Ancho completo" className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:text-[#0572CE]">
                <LuArrowRight className="size-3" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CODE GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════

function generateCode(fields: FormField[], columns: number): string {
  const imports = new Set<string>();
  imports.add(`import { useState } from "react";`);
  for (const f of fields) {
    if (["input","number","email","password","date"].includes(f.type)) imports.add(`import { Input } from "@/componentsUI/Input";`);
    if (f.type === "textarea") imports.add(`import { TextArea } from "@/componentsUI/TextArea";`);
    if (f.type === "select" || f.type === "selectBuscable") imports.add(`import { Select } from "@/componentsUI/Select";`);
    if (f.type === "switch") imports.add(`import { Switch } from "@/componentsUI/Switch";`);
    if (f.type === "checkbox" || f.type === "radio") imports.add(`import { CheckButton } from "@/componentsUI/CheckButton";`);
    if (f.type === "file") imports.add(`import { UploadBox } from "@/componentsUI/UploadBox";`);
    if (!["heading","paragraph","divider","section"].includes(f.type)) imports.add(`import { Label } from "@/componentsUI/Label";`);
  }
  const lines = fields.map((f) => {
    const sp = columns > 1 && f.colSpan === 2 ? " col-span-2" : "";
    const ariaProps = [
      f.ariaLabel ? `ariaLabel="${f.ariaLabel}"` : "",
      f.ariaDescribedBy ? `ariaDescribedBy="${f.ariaDescribedBy}"` : "",
      f.ariaLabelledBy ? `ariaLabelledBy="${f.ariaLabelledBy}"` : "",
    ].filter(Boolean).join(" ");
    const ariaStr = ariaProps ? ` ${ariaProps}` : "";
    switch (f.type) {
      case "input": case "email": case "password": case "number": case "date":
        return `        <div className="${sp}">\n          <Label text="${f.label}" ${f.required?'indicador ':''}/>\n          <Input type="${f.type === "input" ? "text" : f.type === "date" ? "text" : f.type}" placeholder="${f.placeholder || ""}"${ariaStr} />\n        </div>`;
      case "file":
        return `        <div className="${sp}">\n          <Label text="${f.label}" ${f.required?'indicador ':''}/>\n          <UploadBox text="o arrastra tu archivo aquí" textStrong="Haz clic para subir"${ariaStr} />\n        </div>`;
      case "textarea":
        return `        <div className="${sp}">\n          <Label text="${f.label}" ${f.required?'indicador ':''}/>\n          <TextArea placeholder="${f.placeholder || ""}" rows={3}${ariaStr} />\n        </div>`;
      case "select": case "selectBuscable":
        return `        <div className="${sp}">\n          <Label text="${f.label}" ${f.required?'indicador ':''}/>\n          <Select opciones={[${(f.options||[]).map(o=>`{value:"${o}",label:"${o}"}`).join(",")}]} value={val} onChange={setVal} placeholder="${f.placeholder||"Seleccionar..."}"${ariaStr} />\n        </div>`;
      case "switch":
        return `        <div className="flex items-center justify-between${sp}">\n          <Label text="${f.label}" />\n          <Switch checked={on} onChange={setOn} variante="${f.switchVariant||"primary"}" tamano="${f.switchSize||"md"}"${f.switchIcons?" conIconos":""}${ariaStr} />\n        </div>`;
      case "checkbox":
        return `        <div className="${sp}">\n          <Label text="${f.label}" ${f.required?'indicador ':''}/>\n          <CheckButton listaOpciones={[${(f.options||[]).map(o=>`{id:"${o}",label:"${o}"}`).join(",")}]} selectedItems={sel} onToggle={handleToggle}${ariaStr} />\n        </div>`;
      case "radio":
        return `        <div className="${sp}">\n          <Label text="${f.label}" ${f.required?'indicador ':''}/>\n          <CheckButton variant="secondary" listaOpciones={[${(f.options||[]).map(o=>`{id:"${o}",label:"${o}"}`).join(",")}]} selectedItems={sel} onToggle={handleRadio}${ariaStr} />\n        </div>`;
      case "heading": return `        <h3 className="text-lg font-semibold text-gray-800 pt-2${sp}">${f.label}</h3>`;
      case "paragraph": return `        <p className="text-sm text-gray-600${sp}">${f.label}</p>`;
      case "divider": return `        <hr className="border-gray-200${sp}" />`;
      case "section": return `        <div className="pt-4 pb-1${sp}"><h4 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">${f.sectionName||"Sección"}</h4></div>`;
      default: return "";
    }
  });
  const grid = columns === 1 ? "space-y-4" : `grid grid-cols-1 md:grid-cols-${columns} gap-4`;
  return `${[...imports].join("\n")}\n\nexport function MiFormulario() {\n  return (\n    <form className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl border border-gray-200">\n      <div className="${grid}">\n${lines.join("\n")}\n      </div>\n      <div className="mt-6 flex justify-end gap-3">\n        <button type="button" className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>\n        <button type="submit" className="px-4 py-2 rounded-lg bg-[#0572CE] text-white text-sm font-medium hover:bg-[#0460ad]">Enviar</button>\n      </div>\n    </form>\n  );\n}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROPERTIES PANEL
// ═══════════════════════════════════════════════════════════════════════════════

function PropertiesPanel({ field, onUpdate }: { field: FormField; onUpdate: (updates: Partial<FormField>) => void }) {
  return (
    <div className="w-64 border-l border-gray-200 bg-white overflow-y-auto p-4 space-y-3">
      <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100">
        <LuSettings className="size-3.5 text-gray-400" />
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Propiedades</p>
      </div>

      {field.type === "section" && (
        <fieldset className="space-y-1">
          <Label text="Nombre de sección" className="text-xs" />
          <Input value={field.sectionName || ""} onChange={(e) => onUpdate({ sectionName: e.target.value })} />
        </fieldset>
      )}

      {field.type !== "divider" && field.type !== "section" && (
        <fieldset className="space-y-1">
          <Label text="Label" className="text-xs" />
          <Input value={field.label} onChange={(e) => onUpdate({ label: e.target.value })} />
        </fieldset>
      )}

      {(["input","number","email","password","textarea","select","selectBuscable","date"].includes(field.type)) && (
        <fieldset className="space-y-1">
          <Label text="Placeholder" className="text-xs" />
          <Input value={field.placeholder || ""} onChange={(e) => onUpdate({ placeholder: e.target.value })} />
        </fieldset>
      )}

      {(["select","selectBuscable","checkbox","radio"].includes(field.type)) && (
        <fieldset className="space-y-1">
          <Label text="Opciones (una por línea)" className="text-xs" />
          <TextArea value={(field.options || []).join("\n")} onChange={(e) => onUpdate({ options: e.target.value.split("\n").filter(Boolean) })} rows={3} className="font-mono" />
        </fieldset>
      )}

      {(["input","number","email","password"].includes(field.type)) && (
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <Switch checked={field.inputError || false} onChange={(v) => onUpdate({ inputError: v })} tamano="sm" variante="error" />
            <span className="text-xs text-gray-600">Error</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <Switch checked={field.inputDisabled || false} onChange={(v) => onUpdate({ inputDisabled: v })} tamano="sm" variante="neutral" />
            <span className="text-xs text-gray-600">Disabled</span>
          </label>
        </div>
      )}

      {field.type === "switch" && (
        <>
          <fieldset className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Color</label>
            <div className="flex gap-1">
              {(["primary","success","error","warning","neutral"] as const).map((v) => (
                <button key={v} onClick={() => onUpdate({ switchVariant: v })}
                  className={`flex-1 text-xs font-medium py-1 rounded-md border transition-colors ${(field.switchVariant||"primary")===v?"border-[#0572CE] bg-blue-50 text-[#0572CE]":"border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                  {v}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tamaño</label>
            <div className="flex gap-1">
              {(["sm","md","lg"] as const).map((s) => (
                <button key={s} onClick={() => onUpdate({ switchSize: s })}
                  className={`flex-1 text-xs font-medium py-1 rounded-md border transition-colors ${(field.switchSize||"md")===s?"border-[#0572CE] bg-blue-50 text-[#0572CE]":"border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <Switch checked={field.switchIcons || false} onChange={(v) => onUpdate({ switchIcons: v })} tamano="sm" variante="primary" />
            <span className="text-xs text-gray-600">Con íconos</span>
          </label>
        </>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100 flex-wrap">
        {!["heading","paragraph","divider","section"].includes(field.type) && (
          <label className="flex items-center gap-1.5 cursor-pointer">
            <Switch checked={field.required || false} onChange={(v) => onUpdate({ required: v })} tamano="sm" variante="primary" />
            <span className="text-xs text-gray-600">Requerido</span>
          </label>
        )}
        <label className="flex items-center gap-1.5 cursor-pointer">
          <Switch checked={field.colSpan === 2} onChange={(v) => onUpdate({ colSpan: v ? 2 : 1 })} tamano="sm" variante="primary" />
          <span className="text-xs text-gray-600">Ancho completo</span>
        </label>
      </div>

      {/* Accessibility */}
      {!["heading","paragraph","divider","section"].includes(field.type) && (
        <div className="pt-2 border-t border-gray-100 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Accesibilidad</p>
          <fieldset className="space-y-1">
            <Label text="aria-label" className="text-xs! font-mono" />
            <Input
              value={field.ariaLabel || ""}
              onChange={(e) => onUpdate({ ariaLabel: e.target.value })}
              placeholder="Texto para lectores de pantalla"
            />
          </fieldset>
          <fieldset className="space-y-1">
            <Label text="aria-describedby" className="text-xs! font-mono" />
            <Input
              value={field.ariaDescribedBy || ""}
              onChange={(e) => onUpdate({ ariaDescribedBy: e.target.value })}
              placeholder="ID del elemento descriptivo"
            />
          </fieldset>
          <fieldset className="space-y-1">
            <Label text="aria-labelledby" className="text-xs! font-mono" />
            <Input
              value={field.ariaLabelledBy || ""}
              onChange={(e) => onUpdate({ ariaLabelledBy: e.target.value })}
              placeholder="ID del label externo"
            />
          </fieldset>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FORM BUILDER PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export function FormBuilderPage() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [columns, setColumns] = useState<1 | 2>(2);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [formTitle, setFormTitle] = useState("Mi Formulario");
  const [previewDraggingId, setPreviewDraggingId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const selectedField = fields.find((f) => f.id === selectedId) ?? null;

  function addField(type: FieldType) {
    const newField: FormField = {
      id: genId(), type,
      label: type === "divider" ? "" : type === "section" ? "" : type === "heading" ? "Título" : type === "paragraph" ? "Texto descriptivo" : `Campo ${fields.length + 1}`,
      placeholder: "",
      required: false,
      colSpan: ["heading","divider","textarea","section","paragraph"].includes(type) ? 2 : 1,
      options: ["select","selectBuscable"].includes(type) ? ["Opción 1","Opción 2","Opción 3"] : type === "checkbox" ? ["Opción A","Opción B","Opción C"] : type === "radio" ? ["Sí","No"] : undefined,
      sectionName: type === "section" ? "Nueva Sección" : undefined,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedId(newField.id);
  }

  function removeField(id: string) { setFields((p) => p.filter((f) => f.id !== id)); if (selectedId === id) setSelectedId(null); }
  function updateField(id: string, updates: Partial<FormField>) { setFields((p) => p.map((f) => f.id === id ? { ...f, ...updates } : f)); }

  function moveField(id: string, direction: "up" | "down") {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx < 0) return prev;
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      return arrayMove(prev, idx, targetIdx);
    });
  }

  // Sidebar DnD
  const handleSidebarDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFields((prev) => {
        const oi = prev.findIndex((f) => f.id === active.id);
        const ni = prev.findIndex((f) => f.id === over.id);
        return arrayMove(prev, oi, ni);
      });
    }
  }, []);

  // Preview DnD — uses the same field IDs directly
  const handlePreviewDragStart = useCallback((event: DragStartEvent) => {
    setPreviewDraggingId(event.active.id as string);
  }, []);

  const handlePreviewDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setPreviewDraggingId(null);
    if (over && active.id !== over.id) {
      setFields((prev) => {
        const oi = prev.findIndex((f) => f.id === active.id);
        const ni = prev.findIndex((f) => f.id === over.id);
        if (oi < 0 || ni < 0) return prev;
        return arrayMove(prev, oi, ni);
      });
    }
  }, []);

  async function handleCopy() {
    try { await navigator.clipboard.writeText(generateCode(fields, columns)); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }

  const draggingField = previewDraggingId ? fields.find((f) => f.id === previewDraggingId) : null;

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* ─── IZQUIERDA: Catálogo + Lista DnD ─── */}
      <div className="w-72 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
        <div className="p-3 border-b border-gray-200">
          <Label text="Título" className="text-xs uppercase tracking-wider" />
          <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="mt-1" />
        </div>

        <div className="p-3 border-b border-gray-200">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Campos</p>
          <div className="grid grid-cols-4 gap-1">
            {fieldCatalog.map((fc) => (
              <button key={fc.type} onClick={() => addField(fc.type)} title={fc.label}
                className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg border border-gray-200 hover:border-[#0572CE] hover:bg-blue-50/50 transition-colors text-gray-500 hover:text-[#0572CE]">
                {fc.icon}
                <span className="text-xs font-medium leading-tight truncate w-full text-center">{fc.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full"><LuPlus className="size-5 text-gray-300 mb-1" /><p className="text-xs text-gray-400">Agrega campos</p></div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSidebarDragEnd}>
              <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-1">
                  {fields.map((field) => (<SortableFieldItem key={field.id} field={field} isSelected={selectedId === field.id} onSelect={() => setSelectedId(field.id)} onRemove={() => removeField(field.id)} onUpdateName={(name) => updateField(field.id, { listName: name })} />))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      {/* ─── CENTRO: Preview / Código ─── */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-3 pb-2">
          <div className="flex items-center gap-1">
            <button onClick={() => setView("preview")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${view==="preview"?"bg-[#0572CE] text-white":"text-gray-500 hover:bg-gray-200"}`}><LuEye className="size-3.5" /> Preview</button>
            <button onClick={() => setView("code")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${view==="code"?"bg-[#0572CE] text-white":"text-gray-500 hover:bg-gray-200"}`}><LuCode className="size-3.5" /> Código</button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 border border-gray-200 rounded-lg p-0.5">
              <button onClick={() => setColumns(1)} className={`px-2 py-1 rounded-md text-xs font-medium ${columns===1?"bg-gray-800 text-white":"text-gray-500 hover:bg-gray-100"}`}>1 col</button>
              <button onClick={() => setColumns(2)} className={`px-2 py-1 rounded-md text-xs font-medium ${columns===2?"bg-gray-800 text-white":"text-gray-500 hover:bg-gray-100"}`}>2 col</button>
            </div>
            <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0572CE] hover:bg-[#0460ad] text-white text-xs font-medium transition-colors">
              {copied ? <><LuCheck className="size-3.5" /> Copiado</> : <><LuCopy className="size-3.5" /> Copiar</>}
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-5">
          {view === "preview" ? (
            <div className="mx-auto max-w-2xl p-6 bg-white rounded-xl border border-gray-200 shadow-sm" onClick={() => setSelectedId(null)}>
              <h2 className="text-xl font-semibold text-gray-800 mb-5">{formTitle}</h2>
              {fields.length === 0 ? (
                <div className="text-center py-12"><LuPlus className="size-7 text-gray-300 mx-auto mb-2" /><p className="text-sm text-gray-400">Agrega campos</p></div>
              ) : (
                <>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handlePreviewDragStart} onDragEnd={handlePreviewDragEnd}>
                    <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                      <div className={columns === 1 ? "space-y-4" : "grid grid-cols-2 gap-4 items-start"}>
                        {fields.map((f, idx) => (
                          <SortablePreviewField
                            key={f.id}
                            field={f}
                            isSelected={selectedId === f.id}
                            onSelect={() => setSelectedId(f.id)}
                            index={idx}
                            total={fields.length}
                            columns={columns}
                            onMove={(dir) => moveField(f.id, dir)}
                            onResize={(span) => updateField(f.id, { colSpan: span })}
                          />
                        ))}
                      </div>
                    </SortableContext>
                    <DragOverlay>
                      {draggingField ? (
                        <div className="rounded-lg bg-white shadow-xl border border-[#0572CE]/50 p-3 opacity-95 max-w-sm">
                          <PreviewField field={draggingField} />
                        </div>
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                  <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <BotonCancelar label="Cancelar" />
                    <BotonPrimario label="Enviar" type="submit" />
                  </div>
                </>
              )}
            </div>
          ) : (
            <pre className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-4 text-xs text-gray-700 overflow-auto whitespace-pre-wrap font-mono leading-relaxed">{fields.length===0?"// Agrega campos":generateCode(fields, columns)}</pre>
          )}
        </div>
      </div>

      {/* ─── DERECHA: Propiedades ─── */}
      {selectedField ? (
        <PropertiesPanel field={selectedField} onUpdate={(u) => updateField(selectedField.id, u)} />
      ) : (
        <div className="w-64 border-l border-gray-200 bg-white flex items-center justify-center">
          <p className="text-xs text-gray-400 text-center px-4">Selecciona un campo para ver sus propiedades</p>
        </div>
      )}
    </div>
  );
}
