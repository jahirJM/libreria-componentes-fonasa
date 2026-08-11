import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LuPlus, LuTrash2, LuGripVertical, LuCopy, LuCheck, LuCode, LuEye, LuSettings } from "react-icons/lu";

// Importar componentes UI reales
import { Input } from "../../componentsUI/Input";
import { Label } from "../../componentsUI/Label";
import { TextArea } from "../../componentsUI/TextArea";
import { Select, type SelectOption } from "../../componentsUI/Select";
import { Switch } from "../../componentsUI/Switch";
import { CheckButton } from "../../componentsUI/CheckButton";

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════════

type FieldType =
  | "input"
  | "textarea"
  | "select"
  | "selectBuscable"
  | "switch"
  | "checkbox"
  | "radio"
  | "heading"
  | "paragraph"
  | "divider"
  | "section";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  colSpan: 1 | 2;
  options?: string[];
  // Para section
  sectionName?: string;
  // Variantes de componentes
  inputType?: "text" | "email" | "number" | "password" | "tel" | "url";
  switchVariant?: "primary" | "success" | "error" | "warning" | "neutral";
  switchSize?: "sm" | "md" | "lg";
  switchIcons?: boolean;
  inputError?: boolean;
  inputDisabled?: boolean;
}

interface FieldConfig {
  type: FieldType;
  icon: string;
  label: string;
}

const fieldCatalog: FieldConfig[] = [
  { type: "input", icon: "⎯", label: "Input" },
  { type: "textarea", icon: "☰", label: "TextArea" },
  { type: "select", icon: "▾", label: "Select" },
  { type: "selectBuscable", icon: "🔍", label: "Select Buscable" },
  { type: "switch", icon: "◑", label: "Switch" },
  { type: "checkbox", icon: "☑", label: "Checkbox" },
  { type: "radio", icon: "◉", label: "Radio" },
  { type: "heading", icon: "H", label: "Título" },
  { type: "paragraph", icon: "¶", label: "Texto" },
  { type: "divider", icon: "—", label: "Separador" },
  { type: "section", icon: "▤", label: "Sección" },
];

let idCounter = 0;
function genId() {
  return `field-${++idCounter}-${Date.now()}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SORTABLE FIELD ITEM
// ═══════════════════════════════════════════════════════════════════════════════

function SortableFieldItem({
  field,
  isSelected,
  onSelect,
  onRemove,
}: {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const typeLabel = fieldCatalog.find((f) => f.type === field.type)?.label ?? field.type;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? "border-[#0572CE] bg-blue-50/60 ring-1 ring-[#0572CE]/20"
          : field.type === "section"
            ? "border-gray-300 bg-gray-50 hover:border-gray-400"
            : "border-gray-200 bg-white hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none">
        <LuGripVertical className="size-4" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700 truncate">
          {field.type === "section" ? `📁 ${field.sectionName || "Sección"}` : field.label || typeLabel}
        </p>
        <p className="text-[10px] text-gray-400">{typeLabel}{field.required ? " • requerido" : ""}</p>
      </div>
      <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
        {field.colSpan === 2 ? "full" : "½"}
      </span>
      <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
        <LuTrash2 className="size-3.5" />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PREVIEW FIELD RENDERER (usando componentes UI reales)
// ═══════════════════════════════════════════════════════════════════════════════

function PreviewField({ field }: { field: FormField }) {
  const [selectValue, setSelectValue] = useState("");
  const [switchValue, setSwitchValue] = useState(false);
  const [checkItems, setCheckItems] = useState<string[]>([]);

  const selectOptions: SelectOption[] = (field.options || []).map((o) => ({ value: o, label: o }));

  switch (field.type) {
    case "input":
      return (
        <div className="space-y-1.5">
          <Label text={field.label} indicador={field.required} />
          <Input
            type={field.inputType || "text"}
            placeholder={field.placeholder || ""}
            error={field.inputError}
            disabled={field.inputDisabled}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="space-y-1.5">
          <Label text={field.label} indicador={field.required} />
          <TextArea placeholder={field.placeholder || ""} rows={3} />
        </div>
      );
    case "select":
      return (
        <div className="space-y-1.5">
          <Label text={field.label} indicador={field.required} />
          <Select
            opciones={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            placeholder={field.placeholder || "Seleccionar..."}
          />
        </div>
      );
    case "selectBuscable":
      return (
        <div className="space-y-1.5">
          <Label text={field.label} indicador={field.required} />
          <Select
            opciones={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            placeholder={field.placeholder || "Buscar..."}
          />
        </div>
      );
    case "switch":
      return (
        <div className="flex items-center justify-between py-1">
          <Label text={field.label} />
          <Switch
            checked={switchValue}
            onChange={setSwitchValue}
            variante={field.switchVariant || "primary"}
            tamano={field.switchSize || "md"}
            conIconos={field.switchIcons || false}
          />
        </div>
      );
    case "checkbox":
      return (
        <div className="space-y-1.5">
          <Label text={field.label} indicador={field.required} />
          <CheckButton
            listaOpciones={(field.options || ["Opción 1", "Opción 2"]).map((o) => ({ id: o, label: o }))}
            selectedItems={checkItems}
            onToggle={(op) => setCheckItems((prev) => prev.includes(op.id) ? prev.filter((i) => i !== op.id) : [...prev, op.id])}
          />
        </div>
      );
    case "radio":
      return (
        <div className="space-y-1.5">
          <Label text={field.label} indicador={field.required} />
          <CheckButton
            variant="secondary"
            listaOpciones={(field.options || ["Sí", "No"]).map((o) => ({ id: o, label: o }))}
            selectedItems={checkItems}
            onToggle={(op) => setCheckItems([op.id])}
          />
        </div>
      );
    case "heading":
      return <h3 className="text-lg font-semibold text-gray-800 pt-2">{field.label}</h3>;
    case "paragraph":
      return <p className="text-sm text-gray-600">{field.label}</p>;
    case "divider":
      return <hr className="border-gray-200 my-1" />;
    case "section":
      return (
        <div className="pt-4 pb-1">
          <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">
            {field.sectionName || "Sección"}
          </h4>
        </div>
      );
    default:
      return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CODE GENERATOR (genera imports de componentes UI reales)
// ═══════════════════════════════════════════════════════════════════════════════

function generateCode(fields: FormField[], columns: number): string {
  const imports = new Set<string>();
  imports.add(`import { useState } from "react";`);

  for (const f of fields) {
    if (f.type === "input") imports.add(`import { Input } from "@/componentsUI/Input";`);
    if (f.type === "textarea") imports.add(`import { TextArea } from "@/componentsUI/TextArea";`);
    if (f.type === "select" || f.type === "selectBuscable") imports.add(`import { Select } from "@/componentsUI/Select";`);
    if (f.type === "switch") imports.add(`import { Switch } from "@/componentsUI/Switch";`);
    if (f.type === "checkbox" || f.type === "radio") imports.add(`import { CheckButton } from "@/componentsUI/CheckButton";`);
    if (["input", "textarea", "select", "selectBuscable", "checkbox", "radio", "switch"].includes(f.type)) {
      imports.add(`import { Label } from "@/componentsUI/Label";`);
    }
  }

  const fieldLines = fields.map((f) => {
    const spanClass = columns > 1 && f.colSpan === 2 ? " col-span-2" : "";

    switch (f.type) {
      case "input":
        return `        <div className="${spanClass}">
          <Label text="${f.label}" ${f.required ? 'indicador' : ''} />
          <Input type="${f.inputType || "text"}" placeholder="${f.placeholder || ""}" />
        </div>`;
      case "textarea":
        return `        <div className="${spanClass}">
          <Label text="${f.label}" ${f.required ? 'indicador' : ''} />
          <TextArea placeholder="${f.placeholder || ""}" rows={3} />
        </div>`;
      case "select":
      case "selectBuscable":
        return `        <div className="${spanClass}">
          <Label text="${f.label}" ${f.required ? 'indicador' : ''} />
          <Select
            opciones={[${(f.options || []).map((o) => `{ value: "${o}", label: "${o}" }`).join(", ")}]}
            value={value}
            onChange={setValue}
            placeholder="${f.placeholder || "Seleccionar..."}"
          />
        </div>`;
      case "switch":
        return `        <div className="flex items-center justify-between${spanClass}">
          <Label text="${f.label}" />
          <Switch checked={checked} onChange={setChecked} variante="${f.switchVariant || "primary"}" tamano="${f.switchSize || "md"}"${f.switchIcons ? " conIconos" : ""} />
        </div>`;
      case "checkbox":
        return `        <div className="${spanClass}">
          <Label text="${f.label}" ${f.required ? 'indicador' : ''} />
          <CheckButton
            listaOpciones={[${(f.options || []).map((o) => `{ id: "${o}", label: "${o}" }`).join(", ")}]}
            selectedItems={selectedItems}
            onToggle={(op) => handleToggle(op)}
          />
        </div>`;
      case "radio":
        return `        <div className="${spanClass}">
          <Label text="${f.label}" ${f.required ? 'indicador' : ''} />
          <CheckButton
            variant="secondary"
            listaOpciones={[${(f.options || []).map((o) => `{ id: "${o}", label: "${o}" }`).join(", ")}]}
            selectedItems={selectedItems}
            onToggle={(op) => handleRadio(op)}
          />
        </div>`;
      case "heading":
        return `        <h3 className="text-lg font-semibold text-gray-800 pt-2${spanClass}">${f.label}</h3>`;
      case "paragraph":
        return `        <p className="text-sm text-gray-600${spanClass}">${f.label}</p>`;
      case "divider":
        return `        <hr className="border-gray-200${spanClass}" />`;
      case "section":
        return `        <div className="pt-4 pb-1${spanClass}">
          <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">${f.sectionName || "Sección"}</h4>
        </div>`;
      default:
        return "";
    }
  });

  const gridClass = columns === 1 ? "space-y-4" : `grid grid-cols-1 md:grid-cols-${columns} gap-4`;

  return `${Array.from(imports).join("\n")}

export function MiFormulario() {
  return (
    <form className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl border border-gray-200">
      <div className="${gridClass}">
${fieldLines.join("\n")}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button type="button" className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-[#0572CE] text-white text-sm font-medium hover:bg-[#0460ad] transition-colors">
          Enviar
        </button>
      </div>
    </form>
  );
}`;
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

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const selectedField = fields.find((f) => f.id === selectedId) ?? null;

  function addField(type: FieldType) {
    const defaults: Partial<FormField> = {
      colSpan: (type === "heading" || type === "divider" || type === "textarea" || type === "section" || type === "paragraph") ? 2 : 1,
      options: (type === "select" || type === "selectBuscable") ? ["Opción 1", "Opción 2", "Opción 3"] :
               (type === "checkbox") ? ["Opción A", "Opción B", "Opción C"] :
               (type === "radio") ? ["Sí", "No"] : undefined,
      sectionName: type === "section" ? "Nueva Sección" : undefined,
    };
    const newField: FormField = {
      id: genId(),
      type,
      label: type === "divider" ? "" : type === "heading" ? "Título de sección" : type === "section" ? "" : type === "paragraph" ? "Texto descriptivo aquí" : `Campo ${fields.length + 1}`,
      placeholder: "",
      required: false,
      ...defaults,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedId(newField.id);
  }

  function removeField(id: string) {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function updateField(id: string, updates: Partial<FormField>) {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  }

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFields((prev) => {
        const oldIndex = prev.findIndex((f) => f.id === active.id);
        const newIndex = prev.findIndex((f) => f.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, []);

  async function handleCopy() {
    const code = generateCode(fields, columns);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* */ }
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* ─── Panel izquierdo: Campos + Config ─── */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
        {/* Título del formulario */}
        <div className="p-4 border-b border-gray-200">
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Título del formulario</label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full mt-1 rounded-md border border-gray-200 px-2.5 py-1.5 text-sm font-medium text-gray-800 outline-none focus:border-[#0572CE]"
          />
        </div>

        {/* Catálogo de campos */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">Agregar campo</h2>
          <div className="grid grid-cols-4 gap-1.5">
            {fieldCatalog.map((fc) => (
              <button
                key={fc.type}
                onClick={() => addField(fc.type)}
                className="flex flex-col items-center gap-0.5 p-2 rounded-lg border border-gray-200 hover:border-[#0572CE] hover:bg-blue-50/50 transition-colors text-gray-600 hover:text-[#0572CE]"
                title={fc.label}
              >
                <span className="text-sm leading-none">{fc.icon}</span>
                <span className="text-[8px] font-medium leading-tight">{fc.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lista de campos (DnD) */}
        <div className="flex-1 overflow-y-auto p-3">
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <LuPlus className="size-6 text-gray-300 mb-2" />
              <p className="text-xs text-gray-400">Agrega campos para armar tu formulario</p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-1.5">
                  {fields.map((field) => (
                    <SortableFieldItem
                      key={field.id}
                      field={field}
                      isSelected={selectedId === field.id}
                      onSelect={() => setSelectedId(field.id)}
                      onRemove={() => removeField(field.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Config del campo seleccionado */}
        {selectedField && (
          <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50 max-h-72 overflow-y-auto">
            <div className="flex items-center gap-1.5">
              <LuSettings className="size-3.5 text-gray-400" />
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Propiedades</p>
            </div>

            {/* Section name */}
            {selectedField.type === "section" && (
              <fieldset className="space-y-1">
                <label className="text-[11px] font-medium text-gray-600">Nombre de sección</label>
                <input
                  type="text"
                  value={selectedField.sectionName || ""}
                  onChange={(e) => updateField(selectedField.id, { sectionName: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0572CE]"
                />
              </fieldset>
            )}

            {/* Label */}
            {selectedField.type !== "divider" && selectedField.type !== "section" && (
              <fieldset className="space-y-1">
                <label className="text-[11px] font-medium text-gray-600">Label</label>
                <input
                  type="text"
                  value={selectedField.label}
                  onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0572CE]"
                />
              </fieldset>
            )}

            {/* Placeholder */}
            {(selectedField.type === "input" || selectedField.type === "textarea" || selectedField.type === "select" || selectedField.type === "selectBuscable") && (
              <fieldset className="space-y-1">
                <label className="text-[11px] font-medium text-gray-600">Placeholder</label>
                <input
                  type="text"
                  value={selectedField.placeholder || ""}
                  onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0572CE]"
                />
              </fieldset>
            )}

            {/* Options */}
            {(selectedField.type === "select" || selectedField.type === "selectBuscable" || selectedField.type === "checkbox" || selectedField.type === "radio") && (
              <fieldset className="space-y-1">
                <label className="text-[11px] font-medium text-gray-600">Opciones (una por línea)</label>
                <textarea
                  value={(selectedField.options || []).join("\n")}
                  onChange={(e) => updateField(selectedField.id, { options: e.target.value.split("\n").filter(Boolean) })}
                  rows={3}
                  className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0572CE] resize-none font-mono"
                />
              </fieldset>
            )}

            {/* Variantes de Input */}
            {selectedField.type === "input" && (
              <>
                <fieldset className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-600">Tipo de input</label>
                  <select
                    value={selectedField.inputType || "text"}
                    onChange={(e) => updateField(selectedField.id, { inputType: e.target.value as FormField["inputType"] })}
                    className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0572CE]"
                  >
                    <option value="text">Texto</option>
                    <option value="email">Email</option>
                    <option value="number">Número</option>
                    <option value="password">Password</option>
                    <option value="tel">Teléfono</option>
                    <option value="url">URL</option>
                  </select>
                </fieldset>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedField.inputError || false}
                      onChange={(e) => updateField(selectedField.id, { inputError: e.target.checked })}
                      className="rounded border-gray-300 text-[#0572CE] focus:ring-[#0572CE]/20"
                    />
                    <span className="text-[11px] text-gray-600">Error</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedField.inputDisabled || false}
                      onChange={(e) => updateField(selectedField.id, { inputDisabled: e.target.checked })}
                      className="rounded border-gray-300 text-[#0572CE] focus:ring-[#0572CE]/20"
                    />
                    <span className="text-[11px] text-gray-600">Disabled</span>
                  </label>
                </div>
              </>
            )}

            {/* Variantes de Switch */}
            {selectedField.type === "switch" && (
              <>
                <fieldset className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-600">Color</label>
                  <div className="flex gap-1">
                    {(["primary", "success", "error", "warning", "neutral"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => updateField(selectedField.id, { switchVariant: v })}
                        className={`flex-1 text-[9px] font-medium py-1 rounded-md border transition-colors ${
                          (selectedField.switchVariant || "primary") === v
                            ? "border-[#0572CE] bg-blue-50 text-[#0572CE]"
                            : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-600">Tamaño</label>
                  <div className="flex gap-1">
                    {(["sm", "md", "lg"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateField(selectedField.id, { switchSize: s })}
                        className={`flex-1 text-[10px] font-medium py-1 rounded-md border transition-colors ${
                          (selectedField.switchSize || "md") === s
                            ? "border-[#0572CE] bg-blue-50 text-[#0572CE]"
                            : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedField.switchIcons || false}
                    onChange={(e) => updateField(selectedField.id, { switchIcons: e.target.checked })}
                    className="rounded border-gray-300 text-[#0572CE] focus:ring-[#0572CE]/20"
                  />
                  <span className="text-[11px] text-gray-600">Con íconos</span>
                </label>
              </>
            )}

            {/* Checkboxes: requerido + ancho */}
            <div className="flex items-center gap-4 flex-wrap">
              {(selectedField.type === "input" || selectedField.type === "textarea" || selectedField.type === "select" || selectedField.type === "selectBuscable" || selectedField.type === "checkbox" || selectedField.type === "radio") && (
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedField.required || false}
                    onChange={(e) => updateField(selectedField.id, { required: e.target.checked })}
                    className="rounded border-gray-300 text-[#0572CE] focus:ring-[#0572CE]/20"
                  />
                  <span className="text-[11px] text-gray-600">Requerido</span>
                </label>
              )}

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedField.colSpan === 2}
                  onChange={(e) => updateField(selectedField.id, { colSpan: e.target.checked ? 2 : 1 })}
                  className="rounded border-gray-300 text-[#0572CE] focus:ring-[#0572CE]/20"
                />
                <span className="text-[11px] text-gray-600">Ancho completo</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* ─── Panel derecho: Preview / Código ─── */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${view === "preview" ? "bg-[#0572CE] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <LuEye className="size-3.5" /> Preview
            </button>
            <button
              onClick={() => setView("code")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${view === "code" ? "bg-[#0572CE] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <LuCode className="size-3.5" /> Código
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
              <button onClick={() => setColumns(1)} className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors ${columns === 1 ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                1 col
              </button>
              <button onClick={() => setColumns(2)} className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors ${columns === 2 ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                2 col
              </button>
            </div>

            <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0572CE] hover:bg-[#0460ad] text-white text-xs font-medium transition-colors">
              {copied ? <><LuCheck className="size-3.5" /> Copiado</> : <><LuCopy className="size-3.5" /> Copiar JSX</>}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {view === "preview" ? (
            <div className="mx-auto max-w-2xl p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              {/* Título editable */}
              <h2 className="text-xl font-semibold text-gray-800 mb-5">{formTitle}</h2>

              {fields.length === 0 ? (
                <div className="text-center py-16">
                  <LuPlus className="size-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Agrega campos para ver la preview</p>
                </div>
              ) : (
                <>
                  <div className={columns === 1 ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4 items-start"}>
                    {fields.map((field) => (
                      <div key={field.id} className={field.colSpan === 2 && columns > 1 ? "col-span-2" : ""}>
                        <PreviewField field={field} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button type="button" className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Cancelar
                    </button>
                    <button type="button" className="px-4 py-2 rounded-lg bg-[#0572CE] text-white text-sm font-medium hover:bg-[#0460ad] transition-colors">
                      Enviar
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <pre className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-4 text-[11px] text-gray-700 overflow-auto whitespace-pre-wrap font-mono leading-relaxed">
              {fields.length === 0 ? "// Agrega campos para generar código" : generateCode(fields, columns)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
