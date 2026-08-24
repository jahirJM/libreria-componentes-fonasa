import { useState, useEffect } from "react";
import { LuDownload, LuImage, LuFileCode, LuLink, LuCheck, LuCopy, LuEye, LuCode, LuChevronDown } from "react-icons/lu";
import { logosRegistry } from "../../docs/logos-registry";
import type { LogoVariant, LogoEntry } from "../../docs/logos-registry/types";
import { FormBuilderPage } from "./FormBuilderPage";
import { IconBuilderPage } from "./IconBuilderPage";
import { Switch } from "../../componentsUI/Switch";
import { BotonPrimario, BotonOutline } from "../../componentsUI/Botones";

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS Y HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

interface FlatVariant {
  parentName: string;
  variant: LogoVariant;
  id: string;
}

type SidebarItem =
  | { type: "logo"; entry: LogoEntry }
  | { type: "template"; label: string }
  | { type: "formbuilder"; label: string }
  | { type: "iconbuilder"; label: string }
  | { type: "fonts"; label: string };

interface SidebarGroup {
  name: string;
  items: SidebarItem[];
}

function getVariantsForEntry(entry: LogoEntry): FlatVariant[] {
  return entry.variants.map((v) => ({
    parentName: entry.name,
    variant: v,
    id: `${entry.name}-${v.label}`,
  }));
}

function buildSidebarGroups(): SidebarGroup[] {
  const groups: SidebarGroup[] = [];

  // Agrupar logos por su campo group
  const logoGroups: Record<string, LogoEntry[]> = {};
  for (const entry of logosRegistry) {
    const key = entry.group || "Otros";
    if (!logoGroups[key]) logoGroups[key] = [];
    logoGroups[key].push(entry);
  }

  for (const [groupName, entries] of Object.entries(logoGroups)) {
    groups.push({
      name: groupName,
      items: entries.map((e) => ({ type: "logo", entry: e })),
    });
  }

  // Agregar grupo Templates
  groups.push({
    name: "Builders",
    items: [
      { type: "template", label: "Template Email" },
      { type: "formbuilder", label: "Form Builder" },
      { type: "iconbuilder", label: "Icon Builder" },
    ],
  });

  // Agregar grupo Fuentes
  groups.push({
    name: "Tipografía",
    items: [
      { type: "fonts", label: "Fuentes" },
    ],
  });

  return groups;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE BUILDER (embebido)
// ═══════════════════════════════════════════════════════════════════════════════

type AlertType = "success" | "error" | "warning";

interface DataRow {
  key: string;
  value: string;
}

interface TemplateParts {
  header: boolean;
  title: string;
  greeting: string;
  body: string;
  infoBox: boolean;
  infoBoxContent: string;
  alert: boolean;
  alertType: AlertType;
  alertText: string;
  dataTable: boolean;
  dataRows: DataRow[];
  ctaButton: boolean;
  ctaText: string;
  ctaUrl: string;
  image: boolean;
  imageUrl: string;
  imageAlt: string;
  separator: boolean;
  disclaimer: boolean;
  socialLinks: boolean;
}

const defaultParts: TemplateParts = {
  header: true,
  title: "Título del correo",
  greeting: "Estimado(a) usuario(a),",
  body: "Contenido del mensaje. Puede usar <strong>negritas</strong> y texto libre.",
  infoBox: false,
  infoBoxContent: "Información importante que deseas destacar al usuario.",
  alert: false,
  alertType: "success",
  alertText: "Estado: Aprobada",
  dataTable: false,
  dataRows: [
    { key: "N° Solicitud", value: "SOL-001" },
    { key: "Tipo", value: "Inscripción" },
  ],
  ctaButton: false,
  ctaText: "Ver mi solicitud",
  ctaUrl: "https://www.fonasa.cl",
  image: false,
  imageUrl: "",
  imageAlt: "Imagen",
  separator: false,
  disclaimer: true,
  socialLinks: true,
};

const alertStyles: Record<AlertType, { bg: string; border: string; color: string }> = {
  success: { bg: "#e8f5e9", border: "#2e7d32", color: "#1b5e20" },
  error: { bg: "#fbe9e7", border: "#c62828", color: "#b71c1c" },
  warning: { bg: "#fff8e1", border: "#f9a825", color: "#5d4037" },
};

function generateHtml(parts: TemplateParts): string {
  const headerHtml = parts.header
    ? `        <!-- Header -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px">
          <tr>
            <td style="background: #f0f0f0; border-radius: 8px 8px 0 0; padding: 24px 0; text-align: center">
              <a href="https://www.fonasa.cl" target="_blank" title="Fondo Nacional de Salud">
                <img src="https://manuales-acceso-publico.s3.amazonaws.com/gestor-aranceles/logofonasa.png" width="160" alt="Fonasa logo" border="0" style="font-family: sans-serif; font-size: 15px; color: #ffffff" />
              </a>
            </td>
          </tr>
        </table>`
    : "";

  const infoBoxHtml = parts.infoBox
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; background: #f8f9fa; border-left: 4px solid #0b4582; border-radius: 4px">
                <tr>
                  <td style="padding: 16px 20px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #444444">
                    <strong style="display: block; margin-bottom: 8px; color: #0b4582">Información importante:</strong>
                    ${parts.infoBoxContent}
                  </td>
                </tr>
              </table>` : "";

  const alertStyle = alertStyles[parts.alertType];
  const alertHtml = parts.alert
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; background: ${alertStyle.bg}; border-left: 4px solid ${alertStyle.border}; border-radius: 4px">
                <tr>
                  <td style="padding: 16px 20px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: ${alertStyle.color}">
                    <strong>${parts.alertText}</strong>
                  </td>
                </tr>
              </table>` : "";

  const dataTableHtml = parts.dataTable && parts.dataRows.length > 0
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; background: #f8f9fa; border-left: 4px solid #0b4582; border-radius: 4px">
                <tr>
                  <td style="padding: 16px 20px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #444444">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
${parts.dataRows.map((row) => `                      <tr>
                        <td style="padding: 4px 0; font-weight: 600; width: 140px; color: #0b4582">${row.key}:</td>
                        <td style="padding: 4px 0">${row.value}</td>
                      </tr>`).join("\n")}
                    </table>
                  </td>
                </tr>
              </table>` : "";

  const ctaHtml = parts.ctaButton
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0">
                <tr>
                  <td align="center">
                    <a href="${parts.ctaUrl}" target="_blank" style="display: inline-block; background: #0b4582; color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 6px">
                      ${parts.ctaText}
                    </a>
                  </td>
                </tr>
              </table>` : "";

  const imageHtml = parts.image && parts.imageUrl
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0">
                <tr>
                  <td align="center">
                    <img src="${parts.imageUrl}" alt="${parts.imageAlt}" width="100%" style="max-width: 520px; height: auto; border-radius: 6px; display: block" border="0" />
                  </td>
                </tr>
              </table>` : "";

  const separatorHtml = parts.separator
    ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0">
                <tr>
                  <td style="border-top: 1px solid #e0e0e0; font-size: 0; line-height: 0">&nbsp;</td>
                </tr>
              </table>` : "";

  const disclaimerHtml = parts.disclaimer
    ? `        <!-- Disclaimer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px">
          <tr>
            <td style="background: #0b4582; border-top: 1px solid #ffffff; padding: 16px 40px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; color: #ffffff; text-align: center; line-height: 1.5">
              Este correo ha sido generado de forma automática por el sistema de Fonasa.
              <strong>Por favor, no responda a este mensaje.</strong> Para consultas, ingrese al sitio web o comuníquese con los canales oficiales de atención.
            </td>
          </tr>
        </table>` : "";

  const socialHtml = parts.socialLinks
    ? `        <!-- Footer Redes Sociales -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden">
          <tr>
            <td style="background: #ffffff; border-radius: 0 0 8px 8px; padding: 16px 0; text-align: center">
              <a href="https://twitter.com/fonasa" style="text-decoration: none" target="_blank"><img src="https://pages.awscloud.com/rs/112-TZM-766/images/Twitter_GL_Social_2021.png" alt="Twitter" width="22" height="22" border="0" style="margin: 0 6px" /></a>
              <a href="https://www.facebook.com/FonasaChile/" style="text-decoration: none" target="_blank"><img src="https://pages.awscloud.com/rs/112-TZM-766/images/Facebook_GL_Social_2021.png" alt="Facebook" width="22" height="22" border="0" style="margin: 0 6px" /></a>
              <a href="https://www.youtube.com/channel/UCEb6BZnaMmGaDjoEGElnDMg" style="text-decoration: none" target="_blank"><img src="https://pages.awscloud.com/rs/112-TZM-766/images/YouTube_GL_Social_2021.png" alt="YouTube" width="22" height="22" border="0" style="margin: 0 6px" /></a>
              <a href="https://www.instagram.com/fonasachile/" style="text-decoration: none" target="_blank"><img src="https://pages.awscloud.com/rs/112-TZM-766/images/Instagram_GL_Social_2023.png" alt="Instagram" width="22" height="22" border="0" style="margin: 0 6px" /></a>
            </td>
          </tr>
        </table>` : "";

  return `<html xmlns="http://www.w3.org/1999/xhtml">
  <body width="100%" bgcolor="#F0F2F3" style="margin: 0; padding: 0">
    <center style="width: 100%; background: #ffffff; text-align: left">
      <div style="margin: auto; max-width: 600px; padding-top: 40px; padding-bottom: 40px">
${headerHtml}
        <!-- Body -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0">
          <tr>
            <td style="background-color: #ffffff; padding: 32px 40px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333">
              <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #0b4582; font-weight: 600">${parts.title}</h2>
              <p style="margin: 0 0 16px 0">${parts.greeting}</p>
              <p style="margin: 0 0 16px 0">${parts.body}</p>${infoBoxHtml}${alertHtml}${dataTableHtml}${imageHtml}${ctaHtml}${separatorHtml}
              <p style="margin: 24px 0 0 0">Atentamente,<br /><strong>Fondo Nacional de Salud</strong></p>
            </td>
          </tr>
        </table>
${disclaimerHtml}
${socialHtml}
      </div>
    </center>
  </body>
</html>`;
}

function TemplateBuilder() {
  const [parts, setParts] = useState<TemplateParts>(defaultParts);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const html = generateHtml(parts);

  function updatePart<K extends keyof TemplateParts>(key: K, value: TemplateParts[K]) {
    setParts((prev) => ({ ...prev, [key]: value }));
  }

  function addDataRow() {
    setParts((prev) => ({ ...prev, dataRows: [...prev.dataRows, { key: "", value: "" }] }));
  }

  function updateDataRow(index: number, field: "key" | "value", val: string) {
    setParts((prev) => {
      const rows = [...prev.dataRows];
      rows[index] = { ...rows[index], [field]: val };
      return { ...prev, dataRows: rows };
    });
  }

  function removeDataRow(index: number) {
    setParts((prev) => ({ ...prev, dataRows: prev.dataRows.filter((_, i) => i !== index) }));
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silently fail */ }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Config panel */}
      <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto p-5 flex flex-col gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Template Builder</h2>
          <p className="text-xs text-gray-400 mt-0.5">Configura las partes del email</p>
        </div>

        {/* Estructura */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Estructura</p>
          <ToggleRow label="Header (Logo)" checked={parts.header} onChange={(v) => updatePart("header", v)} />
          <ToggleRow label="Disclaimer" checked={parts.disclaimer} onChange={(v) => updatePart("disclaimer", v)} />
          <ToggleRow label="Redes Sociales" checked={parts.socialLinks} onChange={(v) => updatePart("socialLinks", v)} />
          <ToggleRow label="Separador" checked={parts.separator} onChange={(v) => updatePart("separator", v)} />
        </div>

        {/* Contenido */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contenido</p>
          <fieldset className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Título</label>
            <input type="text" value={parts.title} onChange={(e) => updatePart("title", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" />
          </fieldset>
          <fieldset className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Saludo</label>
            <input type="text" value={parts.greeting} onChange={(e) => updatePart("greeting", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" />
          </fieldset>
          <fieldset className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Cuerpo</label>
            <textarea value={parts.body} onChange={(e) => updatePart("body", e.target.value)} rows={3} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors resize-none" />
            <p className="text-xs text-gray-400">Soporta HTML: &lt;strong&gt;, &lt;a&gt;, etc.</p>
          </fieldset>
        </div>

        {/* Bloques opcionales */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bloques</p>

          {/* Info Box */}
          <ToggleRow label="Info Box (destacado)" checked={parts.infoBox} onChange={(v) => updatePart("infoBox", v)} />
          {parts.infoBox && (
            <textarea value={parts.infoBoxContent} onChange={(e) => updatePart("infoBoxContent", e.target.value)} rows={2} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors resize-none" placeholder="Texto del cuadro informativo..." />
          )}

          {/* Alerta */}
          <ToggleRow label="Alerta de estado" checked={parts.alert} onChange={(v) => updatePart("alert", v)} />
          {parts.alert && (
            <div className="space-y-2 pl-1">
              <div className="flex gap-1">
                {(["success", "error", "warning"] as AlertType[]).map((t) => (
                  <button key={t} onClick={() => updatePart("alertType", t)} className={`flex-1 text-xs font-medium py-1.5 rounded-md border transition-colors ${parts.alertType === t ? (t === "success" ? "bg-green-50 border-green-300 text-green-700" : t === "error" ? "bg-red-50 border-red-300 text-red-700" : "bg-yellow-50 border-yellow-300 text-yellow-700") : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                    {t === "success" ? "Éxito" : t === "error" ? "Error" : "Aviso"}
                  </button>
                ))}
              </div>
              <input type="text" value={parts.alertText} onChange={(e) => updatePart("alertText", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="Texto de la alerta..." />
            </div>
          )}

          {/* Tabla de datos */}
          <ToggleRow label="Tabla de datos" checked={parts.dataTable} onChange={(v) => updatePart("dataTable", v)} />
          {parts.dataTable && (
            <div className="space-y-2 pl-1">
              {parts.dataRows.map((row, i) => (
                <div key={i} className="flex gap-1.5 items-center">
                  <input type="text" value={row.key} onChange={(e) => updateDataRow(i, "key", e.target.value)} className="flex-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0572CE]" placeholder="Clave" />
                  <input type="text" value={row.value} onChange={(e) => updateDataRow(i, "value", e.target.value)} className="flex-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0572CE]" placeholder="Valor" />
                  <button onClick={() => removeDataRow(i)} className="text-gray-400 hover:text-red-500 text-xs px-1 transition-colors">✕</button>
                </div>
              ))}
              <button onClick={addDataRow} className="text-xs text-[#0572CE] hover:text-[#0460ad] font-medium transition-colors">+ Agregar fila</button>
            </div>
          )}

          {/* Botón CTA */}
          <ToggleRow label="Botón CTA" checked={parts.ctaButton} onChange={(v) => updatePart("ctaButton", v)} />
          {parts.ctaButton && (
            <div className="space-y-2 pl-1">
              <input type="text" value={parts.ctaText} onChange={(e) => updatePart("ctaText", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="Texto del botón" />
              <input type="text" value={parts.ctaUrl} onChange={(e) => updatePart("ctaUrl", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="https://..." />
            </div>
          )}

          {/* Imagen */}
          <ToggleRow label="Imagen" checked={parts.image} onChange={(v) => updatePart("image", v)} />
          {parts.image && (
            <div className="space-y-2 pl-1">
              <input type="text" value={parts.imageUrl} onChange={(e) => updatePart("imageUrl", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="URL de la imagen" />
              <input type="text" value={parts.imageAlt} onChange={(e) => updatePart("imageAlt", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#0572CE] focus:ring-1 focus:ring-[#0572CE]/20 transition-colors" placeholder="Texto alternativo" />
            </div>
          )}
        </div>

        {/* Copiar */}
        <BotonPrimario
          label={copied ? "Copiado" : "Copiar HTML"}
          icon={copied ? LuCheck : LuCopy}
          onClick={handleCopy}
          customClass="mt-auto w-full"
        />
      </div>

      {/* Preview panel */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        <div className="flex items-center gap-1 px-5 pt-4 pb-2">
          <button onClick={() => setView("preview")} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${view === "preview" ? "bg-[#0572CE] text-white" : "text-gray-500 hover:bg-gray-200"}`}>
            <LuEye className="size-3.5" /> Preview
          </button>
          <button onClick={() => setView("code")} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${view === "code" ? "bg-[#0572CE] text-white" : "text-gray-500 hover:bg-gray-200"}`}>
            <LuCode className="size-3.5" /> Código
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5">
          {view === "preview" ? (
            <div className="mx-auto max-w-160 rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
              <iframe srcDoc={html} title="Template Preview" className="w-full h-150 border-0" />
            </div>
          ) : (
            <pre className="mx-auto max-w-200 rounded-lg border border-gray-200 bg-white p-4 text-xs text-gray-700 overflow-auto whitespace-pre-wrap font-mono leading-relaxed">{html}</pre>
          )}
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
      <Switch checked={checked} onChange={onChange} tamano="sm" variante="primary" />
    </label>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGO VIEWER (embebido)
// ═══════════════════════════════════════════════════════════════════════════════

function LogoViewer({ entry }: { entry: LogoEntry }) {
  const variants = getVariantsForEntry(entry);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0]?.id ?? "");
  const [animKey, setAnimKey] = useState(0);
  const selected = variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  const [urlCopied, setUrlCopied] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Reset cuando cambia la organización
  useEffect(() => {
    const newVariants = getVariantsForEntry(entry);
    setSelectedVariantId(newVariants[0]?.id ?? "");
    setAnimKey((k) => k + 1);
    setImageLoading(true);
  }, [entry.name]);

  // Reset loading al cambiar variante
  useEffect(() => {
    setImageLoading(true);
  }, [selectedVariantId]);

  async function handleDownload() {
    if (!selected) return;
    setDownloading(true);
    try {
      const response = await fetch(selected.variant.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = selected.variant.src.split("/").pop() || "logo";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback al método directo
      const link = document.createElement("a");
      link.href = selected.variant.src;
      link.download = selected.variant.src.split("/").pop() || "logo";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(false);
    }
  }

  async function handleCopyUrl() {
    if (!selected?.variant.url) return;
    try {
      await navigator.clipboard.writeText(selected.variant.url);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 px-6 py-10 overflow-y-auto min-h-full">
      {/* Showcase */}
      <div className="flex flex-col items-center gap-5">
        <div key={`${entry.name}-${selectedVariantId}-${animKey}`}>
          <div
            className={`relative flex items-center justify-center w-64 h-64 lg:w-80 lg:h-80 rounded-2xl border transition-colors ${
              selected?.variant.background === "dark" ? "bg-gray-800 border-gray-700" : selected?.variant.background === "light" || !selected?.variant.background ? "bg-gray-50 border-gray-200" : "border-gray-200"
            }`}
            style={selected?.variant.background && selected.variant.background !== "dark" && selected.variant.background !== "light" ? { backgroundColor: selected.variant.background } : undefined}
          >
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-[#0572CE]"></div>
              </div>
            )}
            <img
              src={selected?.variant.src}
              alt={selected?.variant.label}
              className={`w-full h-full object-contain p-6 transition-opacity duration-200 ${imageLoading ? "opacity-0" : "opacity-100"}`}
              onLoad={() => setImageLoading(false)}
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">{selected?.variant.label}</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full">
              {selected?.variant.format === "svg" ? <LuFileCode className="size-3" /> : <LuImage className="size-3" />}
              {selected?.variant.format.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {downloading ? (
            <button
              type="button"
              disabled
              className="inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white bg-[#0572CE] opacity-70 cursor-not-allowed"
            >
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Descargando...
            </button>
          ) : (
            <BotonPrimario
              label="Descargar"
              icon={LuDownload}
              onClick={handleDownload}
            />
          )}
          {selected?.variant.url && (
            <BotonOutline
              label={urlCopied ? "Copiado" : "URL"}
              icon={urlCopied ? LuCheck : LuLink}
              onClick={handleCopyUrl}
            />
          )}
        </div>
      </div>

      {/* Grid variantes */}
      <div className="w-full lg:w-auto lg:flex-1 max-w-md">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 text-center">Variantes</p>
        <div className="grid grid-cols-2 gap-3">
          {variants.map((item) => {
            const isActive = item.id === selected?.id;
            return (
              <button
                key={item.id}
                onClick={() => { setSelectedVariantId(item.id); setAnimKey((k) => k + 1); }}
                className={`group relative flex flex-col items-center justify-center w-full p-3 rounded-xl border transition-all duration-200 ${
                  isActive ? "border-[#0572CE] bg-blue-50/50 ring-1 ring-[#0572CE]/20" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-full h-14 rounded-lg mb-2 ${item.variant.background === "dark" ? "bg-gray-700" : item.variant.background === "light" || !item.variant.background ? "bg-gray-50" : ""}`}
                  style={item.variant.background && item.variant.background !== "dark" && item.variant.background !== "light" ? { backgroundColor: item.variant.background } : undefined}
                >
                  <img src={item.variant.src} alt={item.variant.label} className="max-h-9 max-w-[85%] object-contain" />
                </div>
                <p className={`text-xs font-medium text-center leading-tight line-clamp-2 ${isActive ? "text-[#0572CE]" : "text-gray-500"}`}>
                  {item.variant.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUENTES
// ═══════════════════════════════════════════════════════════════════════════════

const robotoWeights = [
  { weight: 100, name: "Thin" },
  { weight: 300, name: "Light" },
  { weight: 400, name: "Regular" },
  { weight: 500, name: "Medium" },
  { weight: 700, name: "Bold" },
  { weight: 900, name: "Black" },
];

function FontsSection() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold text-[#0572CE] uppercase tracking-widest mb-2">Tipografía</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fuentes</h1>
        <p className="text-sm text-gray-500 mb-8">
          La plataforma utiliza <strong>Roboto</strong> como fuente principal. Se carga desde Google Fonts con todos los pesos disponibles.
        </p>

        {/* Specimen */}
        <div className="rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Roboto</h2>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            Roboto es una fuente sans-serif diseñada por Google. Ofrece un equilibrio entre forma geométrica y curvas amigables, ideal para interfaces digitales.
          </p>

          <div className="space-y-4">
            {robotoWeights.map((w) => (
              <div key={w.weight} className="flex items-baseline gap-4 border-b border-gray-100 pb-3 last:border-0">
                <span className="text-xs text-gray-400 w-20 shrink-0">{w.weight} — {w.name}</span>
                <p className="text-xl text-gray-800" style={{ fontWeight: w.weight }}>
                  El veloz murciélago hindú comía feliz cardillo y kiwi.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Escala de tamaños */}
        <div className="rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Escala de tamaños</h2>
          <div className="space-y-3">
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-xs</code>
              <span className="text-xs text-gray-800">12px — Labels, metadata, tooltips</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-sm</code>
              <span className="text-sm text-gray-800">14px — Texto de soporte, inputs</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-base</code>
              <span className="text-base text-gray-800">16px — Párrafos, contenido principal</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-lg</code>
              <span className="text-lg text-gray-800">18px — Subtítulos</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-xl</code>
              <span className="text-xl text-gray-800">20px — Títulos de sección</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-2xl</code>
              <span className="text-2xl text-gray-800">24px — Títulos secundarios</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-3xl</code>
              <span className="text-3xl text-gray-800">30px — Títulos de página</span>
            </div>
            <div className="flex items-baseline gap-4">
              <code className="text-xs text-gray-400 w-24 shrink-0">text-4xl</code>
              <span className="text-4xl text-gray-800">36px — Heroes</span>
            </div>
          </div>
        </div>

        {/* Instalación */}
        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Instalación</h2>
          <p className="text-sm text-gray-600 mb-3">
            Agregar en el <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">index.html</code> del proyecto:
          </p>
          <pre className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono overflow-x-auto whitespace-pre leading-relaxed">
{`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />`}
          </pre>
          <p className="text-sm text-gray-600 mt-4 mb-3">
            En <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">index.css</code> (Tailwind 4):
          </p>
          <pre className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono overflow-x-auto whitespace-pre leading-relaxed">
{`@theme {
  --font-sans: "Roboto", sans-serif;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PÁGINA PRINCIPAL: RECURSOS
// ═══════════════════════════════════════════════════════════════════════════════

export function RecursosPage() {
  const sidebarGroups = buildSidebarGroups();

  const [activeItem, setActiveItem] = useState<SidebarItem>(sidebarGroups[0]?.items[0] ?? { type: "template", label: "Template Email" });

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sidebarGroups.forEach((g) => (initial[g.name] = true));
    return initial;
  });

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <>
      {/* ─── Sidebar izquierdo (fixed, igual que Componentes/Métodos) ─── */}
      <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-200 bg-gray-100 p-4">
        <div className="ml-3 mt-2 border-l-2 border-gray-300 pl-3">
          <nav className="flex flex-col gap-0.5 text-sm font-medium">
            {sidebarGroups.map((group) => {
              const groupKey = group.name;
              const isOpen = openGroups[groupKey] ?? true;
              return (
                <div key={group.name} className="mt-1">
                  <button
                    type="button"
                    onClick={() => toggleGroup(groupKey)}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm text-gray-900 hover:bg-[#0572CE] hover:text-white transition-colors duration-100 group"
                  >
                    <span className="font-semibold">{group.name}</span>
                    <LuChevronDown
                      className={`text-xs transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-200 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-0.5 pl-3 mt-0.5">
                        {group.items.map((item) => {
                          const label = item.type === "logo" ? item.entry.name : item.label;
                          const isActive =
                            item.type === activeItem.type &&
                            (item.type === "logo" && activeItem.type === "logo"
                              ? item.entry.name === activeItem.entry.name
                              : (item.type === "template" && activeItem.type === "template")
                                ? item.label === activeItem.label
                                : (item.type === "formbuilder" && activeItem.type === "formbuilder")
                                  ? item.label === activeItem.label
                                  : (item.type === "iconbuilder" && activeItem.type === "iconbuilder")
                                    ? item.label === activeItem.label
                                    : (item.type === "fonts" && activeItem.type === "fonts")
                                      ? item.label === activeItem.label
                                      : false);
                          return (
                            <button
                              key={label}
                              onClick={() => setActiveItem(item)}
                              className={`w-full text-left rounded-lg px-3 py-1.5 text-sm transition-colors duration-100 ${
                                isActive
                                  ? "bg-[#0572CE] text-white font-semibold"
                                  : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ─── Contenido principal ─── */}
      <div className="flex-1 lg:ml-64 overflow-hidden min-h-[calc(100vh-3.5rem)]">
        {activeItem.type === "logo" ? (
          <LogoViewer entry={activeItem.entry} />
        ) : activeItem.type === "formbuilder" ? (
          <FormBuilderPage />
        ) : activeItem.type === "iconbuilder" ? (
          <IconBuilderPage />
        ) : activeItem.type === "fonts" ? (
          <FontsSection />
        ) : (
          <TemplateBuilder />
        )}
      </div>
    </>
  );
}
