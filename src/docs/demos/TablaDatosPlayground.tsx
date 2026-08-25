import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import { TablaDatos } from "../../componentsUI/TablaDatos";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

type Variant = "primary" | "secondary";

interface PlaygroundColumn {
  id: string;
  header: string;
  key: string;
}

interface PlaygroundRow {
  id: string;
  [key: string]: string;
}

export function TablaDatosPlayground() {
  const [variant, setVariant] = useState<Variant>("primary");
  const [showEdit, setShowEdit] = useState(true);
  const [showDelete, setShowDelete] = useState(true);
  const [forceCompact, setForceCompact] = useState(false);
  const [columns, setColumns] = useState<PlaygroundColumn[]>([
    { id: "col-1", header: "Nombre", key: "nombre" },
    { id: "col-2", header: "RUT", key: "rut" },
    { id: "col-3", header: "Edad", key: "edad" },
  ]);
  const [rows, setRows] = useState<PlaygroundRow[]>([
    { id: "1", nombre: "Juan Pérez", rut: "12.345.678-9", edad: "35" },
    { id: "2", nombre: "María López", rut: "98.765.432-1", edad: "28" },
  ]);
  const [copied, setCopied] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);

  const colCounter = useRef(4);
  const rowCounter = useRef(3);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !previewContainerRef.current) return;
      const rect = previewContainerRef.current.getBoundingClientRect();
      const newWidth = Math.max(200, Math.min(e.clientX - rect.left, rect.width));
      setPreviewWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const addColumn = () => {
    const num = colCounter.current;
    colCounter.current++;
    const key = `campo${num}`;
    setColumns((prev) => [...prev, { id: `col-${num}`, header: `Campo ${num}`, key }]);
    setRows((prev) => prev.map((r) => ({ ...r, [key]: "-" })));
  };

  const removeColumn = (index: number) => {
    const removedKey = columns[index].key;
    setColumns((prev) => prev.filter((_, i) => i !== index));
    setRows((prev) => prev.map((r) => {
      const { [removedKey]: _, ...rest } = r;
      return rest as PlaygroundRow;
    }));
  };

  const addRow = () => {
    const id = String(rowCounter.current);
    rowCounter.current++;
    const newRow: PlaygroundRow = { id };
    columns.forEach((col) => { newRow[col.key] = "-"; });
    setRows((prev) => [...prev, newRow]);
  };

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRowField = (rowId: string, key: string, value: string) => {
    setRows((prev) => prev.map((r) => r.id === rowId ? { ...r, [key]: value } : r));
  };

  const headers = columns.map((c) => c.header);
  const columnKeys = columns.map((c) => c.key);

  const generatedCode = `<TablaDatos
  variant="${variant}"
  headers={[${headers.map((h) => `"${h}"`).join(", ")}]}
  columns={[${columnKeys.map((k) => `"${k}"`).join(", ")}]}
  data={[
${rows.map((r) => `    { id: "${r.id}", ${columns.map((c) => `${c.key}: "${r[c.key] ?? "-"}"`).join(", ")} },`).join("\n")}
  ]}${showEdit ? "\n  onEdit={(item) => handleEdit(item)}" : ""}${showDelete ? "\n  onDelete={(item) => handleDelete(item)}" : ""}${forceCompact ? "\n  forceCompact" : ""}
/>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      fonasaToast.success("Código copiado");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silently fail */ }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      {/* Left panel */}
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Variant */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Variante</p>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as Variant)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]"
          >
            <option value="primary">primary</option>
            <option value="secondary">secondary</option>
          </select>
        </div>

        {/* Props */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={showEdit} onChange={setShowEdit} tamano="sm" />
            <span className="text-xs text-gray-600">onEdit</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={showDelete} onChange={setShowDelete} tamano="sm" />
            <span className="text-xs text-gray-600">onDelete</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={forceCompact} onChange={setForceCompact} tamano="sm" />
            <span className="text-xs text-gray-600">forceCompact</span>
          </label>
        </div>

        {/* Columns editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Columnas ({columns.length})</p>
            <button
              onClick={addColumn}
              className="flex items-center gap-1 text-xs text-[#0572CE] hover:text-[#0572CE]/80 transition-colors cursor-pointer"
            >
              <FiPlus className="size-3" />
              Agregar
            </button>
          </div>
          <div className="space-y-1.5">
            {columns.map((col, index) => (
              <div key={col.id} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={col.header}
                  onChange={(e) => setColumns((prev) => prev.map((c, i) => i === index ? { ...c, header: e.target.value } : c))}
                  className="flex-1 text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
                  placeholder="Header"
                />
                <button
                  onClick={() => removeColumn(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <FiTrash2 className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Rows editor */}
        <div className="space-y-2 flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Filas ({rows.length})</p>
            <button
              onClick={addRow}
              className="flex items-center gap-1 text-xs text-[#0572CE] hover:text-[#0572CE]/80 transition-colors cursor-pointer"
            >
              <FiPlus className="size-3" />
              Agregar
            </button>
          </div>
          <div className="space-y-2 overflow-y-auto flex-1 pr-1">
            {rows.map((row) => (
              <div key={row.id} className="rounded-lg border border-gray-200 p-2 space-y-1.5 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">id: {row.id}</span>
                  <button
                    onClick={() => removeRow(row.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="size-3" />
                  </button>
                </div>
                {columns.map((col) => (
                  <input
                    key={col.key}
                    type="text"
                    value={row[col.key] ?? ""}
                    onChange={(e) => updateRowField(row.id, col.key, e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
                    placeholder={col.header}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div
            ref={previewContainerRef}
            className="h-full p-6 relative flex items-center overflow-auto bg-gray-50/30"
          >
            <div
              className="overflow-hidden border-r border-gray-200 flex items-center justify-center px-4 w-full"
              style={{ width: previewWidth ?? "100%" }}
            >
              <div className="w-full">
                <TablaDatos
                  variant={variant}
                  headers={headers}
                  columns={columnKeys}
                  data={rows}
                  onEdit={showEdit ? (item) => fonasaToast.success(`Editar: ${item.id}`) : undefined}
                  onDelete={showDelete ? (item) => fonasaToast.success(`Eliminar: ${item.id}`) : undefined}
                  forceCompact={forceCompact}
                />
              </div>
            </div>
            <div
              onMouseDown={handleMouseDown}
              className="absolute top-0 bottom-0 flex items-center cursor-col-resize z-10 group px-1"
              style={{ left: previewWidth ? `calc(${previewWidth}px + 1.5rem - 6px)` : "calc(100% - 1.5rem - 6px)" }}
            >
              <div className="w-1.5 h-10 rounded-full bg-gray-300 group-hover:bg-[#0572CE] transition-colors" />
            </div>
          </div>
        </div>

        <div className="h-48 shrink-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100 shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Código generado</p>
            <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0572CE] transition-colors cursor-pointer">
              {copied ? <><FiCheckCircle className="size-3 text-green-600" /><span className="text-green-600">Copiado</span></> : <><FiCopy className="size-3" />Copiar</>}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CodePanel code={generatedCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
