import { useState, useEffect, useCallback } from "react";
import { LuDownload, LuRotateCcw, LuPalette, LuImage, LuLayers } from "react-icons/lu";
import { FiCode } from "react-icons/fi";
import { BotonPrimario, BotonOutline } from "../../componentsUI/Botones";
import { CustomModal } from "../../componentsUI/CustomModal";
import { Carousel } from "../../componentsUI/Carousel";
import { SelectBuscable } from "../../componentsUI/SelectBuscable";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../projectComponents/CodePanel";
import { colorSections } from "./ColorsPage";

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════════

interface SvgVariant {
  label: string;
  file: string;
  content: string;
  colorReplace?: { from: string; to: string };
}

interface SvgIcon {
  name: string;
  path: string;
  originalContent: string;
  modifiedContent: string;
  colors: string[];
  groups: string[];
  designEnabled: boolean;
  layoutEnabled: boolean;
  colorsEnabled: boolean;
  variants: SvgVariant[];
}

type LayoutMode = "horizontal" | "vertical";
type BarPosition = "top" | "bottom";

interface ColorMapping {
  original: string;
  current: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

const SVG_SOURCES = [
  { folder: "/logos/fonasa/svg", files: ["facebook-icon.svg", "instagram-icon.svg", "linkedin-icon.svg", "twitter-icon.svg", "twitter-x-icon.svg", "youtube-icon.svg"], designEnabled: false, layoutEnabled: false, colorsEnabled: true, variants: null, recalcViewBox: false },
  { folder: "/logos/fonasa/svg", files: ["fonasa-logo-full.svg"], designEnabled: true, layoutEnabled: false, colorsEnabled: true, variants: null, recalcViewBox: false },
  { folder: "/logos/fonasa/svg", files: ["fonasa-blanco.svg"], designEnabled: true, layoutEnabled: true, colorsEnabled: true, variants: null, recalcViewBox: false },
  { folder: "/logos/gobierno/svg", files: ["gob-logo.svg"], designEnabled: false, layoutEnabled: false, colorsEnabled: false, recalcViewBox: true, variants: [
    { label: "Color", file: "gob-logo.svg" },
    { label: "Blanco", file: "gob-logo-gris.svg", colorReplace: { from: "#4c4c4c", to: "#ffffff" } },
    { label: "Gris", file: "gob-logo-gris.svg" },
  ]},
];

/** Extract all colors from SVG content (fill, stroke, style attributes) */
function extractColors(svgContent: string): string[] {
  const colors = new Set<string>();

  // Match hex colors: #000, #000000, #fff, #ffffff
  const hexRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;
  let match: RegExpExecArray | null;
  while ((match = hexRegex.exec(svgContent)) !== null) {
    colors.add(match[0].toLowerCase());
  }

  // Match rgb/rgba colors
  const rgbRegex = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)/g;
  while ((match = rgbRegex.exec(svgContent)) !== null) {
    colors.add(match[0]);
  }

  // Filter out "none" and very common non-color values
  colors.delete("none");

  return Array.from(colors);
}

/** Replace a specific color throughout SVG content */
function replaceColor(svgContent: string, oldColor: string, newColor: string): string {
  // Escape special regex chars in the color string
  const escaped = oldColor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "gi");
  return svgContent.replace(regex, newColor);
}

/** Friendly labels for known group IDs */
const GROUP_LABELS: Record<string, string> = {
  icon: "Icono",
  text: "Texto",
  bar: "Barra",
};

/** Extract all <g id="..."> group IDs from SVG content */
function extractGroups(svgContent: string): string[] {
  const groups: string[] = [];
  const regex = /<g\s+id="([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(svgContent)) !== null) {
    groups.push(match[1]);
  }
  return groups;
}

/** Hide specific groups by removing them and recalculating viewBox */
function applyHiddenGroups(svgContent: string, hiddenGroups: Set<string>): string {
  if (hiddenGroups.size === 0) return svgContent;

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg) return svgContent;

  // Remove hidden groups
  for (const groupId of hiddenGroups) {
    const group = doc.getElementById(groupId);
    if (group) group.remove();
  }

  // Recalculate viewBox using a temporary in-document SVG
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "absolute";
  tempContainer.style.visibility = "hidden";
  tempContainer.style.width = "0";
  tempContainer.style.height = "0";
  tempContainer.style.overflow = "hidden";
  document.body.appendChild(tempContainer);

  const tempSvg = svg.cloneNode(true) as SVGSVGElement;
  tempSvg.removeAttribute("viewBox");
  tempSvg.setAttribute("width", "1000");
  tempSvg.setAttribute("height", "1000");
  tempContainer.appendChild(tempSvg);

  try {
    const bbox = tempSvg.getBBox();
    if (bbox.width > 0 && bbox.height > 0) {
      const padding = 1;
      svg.setAttribute(
        "viewBox",
        `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`
      );
    }
  } catch {
    // If getBBox fails, keep original viewBox
  } finally {
    document.body.removeChild(tempContainer);
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg);
}

/** Apply layout: reposition icon+text (horizontal/vertical) and bar (top/bottom) */
function applyLayout(svgContent: string, contentLayout: LayoutMode, barPos: BarPosition): string {
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "absolute";
  tempContainer.style.visibility = "hidden";
  tempContainer.style.width = "0";
  tempContainer.style.height = "0";
  tempContainer.style.overflow = "hidden";
  document.body.appendChild(tempContainer);

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg) { document.body.removeChild(tempContainer); return svgContent; }

  const tempSvg = svg.cloneNode(true) as SVGSVGElement;
  tempSvg.removeAttribute("viewBox");
  tempSvg.setAttribute("width", "1000");
  tempSvg.setAttribute("height", "1000");
  tempContainer.appendChild(tempSvg);

  try {
    const iconEl = tempSvg.querySelector("#icon") as SVGGElement | null;
    const textEl = tempSvg.querySelector("#text") as SVGGElement | null;
    const barEl = tempSvg.querySelector("#bar") as SVGGElement | null;

    const iconBox = iconEl ? iconEl.getBBox() : null;
    const textBox = textEl ? textEl.getBBox() : null;
    const barBox = barEl ? barEl.getBBox() : null;

    const gap = 5;
    let contentWidth = 0;
    let contentHeight = 0;
    let iconTx = 0, iconTy = 0;
    let textTx = 0, textTy = 0;

    if (contentLayout === "horizontal" && iconBox && textBox) {
      // Side by side: icon left, text right
      contentWidth = iconBox.width + gap + textBox.width;
      contentHeight = Math.max(iconBox.height, textBox.height);
      iconTx = -iconBox.x;
      iconTy = -iconBox.y + (contentHeight - iconBox.height) / 2;
      textTx = iconBox.width + gap - textBox.x;
      textTy = -textBox.y + (contentHeight - textBox.height) / 2;
    } else if (contentLayout === "vertical" && iconBox && textBox) {
      // Stacked: icon on top, text below
      contentWidth = Math.max(iconBox.width, textBox.width);
      contentHeight = iconBox.height + gap + textBox.height;
      iconTx = (contentWidth - iconBox.width) / 2 - iconBox.x;
      iconTy = -iconBox.y;
      textTx = (contentWidth - textBox.width) / 2 - textBox.x;
      textTy = iconBox.height + gap - textBox.y;
    } else if (iconBox && !textBox) {
      contentWidth = iconBox.width;
      contentHeight = iconBox.height;
      iconTx = -iconBox.x;
      iconTy = -iconBox.y;
    } else if (textBox && !iconBox) {
      contentWidth = textBox.width;
      contentHeight = textBox.height;
      textTx = -textBox.x;
      textTy = -textBox.y;
    }

    // Calculate bar dimensions
    let barWidth = 0, barHeight = 0;
    if (barBox) {
      barWidth = barBox.width;
      barHeight = barBox.height;
    }

    // Total dimensions
    const totalWidth = Math.max(contentWidth, barWidth);
    const totalHeight = contentHeight + (barBox ? gap + barHeight : 0);

    // Position content and bar
    const contentOffsetX = (totalWidth - contentWidth) / 2;
    let contentOffsetY = 0;
    let barTx = 0, barTy = 0;

    if (barPos === "top" && barBox) {
      // Bar on top, content below
      barTx = (totalWidth - barWidth) / 2 - barBox.x;
      barTy = -barBox.y;
      contentOffsetY = barHeight + gap;
    } else if (barPos === "bottom" && barBox) {
      // Content on top, bar below
      contentOffsetY = 0;
      barTx = (totalWidth - barWidth) / 2 - barBox.x;
      barTy = contentHeight + gap - barBox.y;
    }

    // Apply transforms to actual SVG groups
    const realIcon = svg.querySelector("#icon") as SVGGElement | null;
    const realText = svg.querySelector("#text") as SVGGElement | null;
    const realBar = svg.querySelector("#bar") as SVGGElement | null;

    if (realIcon) {
      realIcon.setAttribute("transform", `translate(${contentOffsetX + iconTx}, ${contentOffsetY + iconTy})`);
    }
    if (realText) {
      realText.setAttribute("transform", `translate(${contentOffsetX + textTx}, ${contentOffsetY + textTy})`);
    }
    if (realBar) {
      realBar.setAttribute("transform", `translate(${barTx}, ${barTy})`);
    }

    // Update viewBox
    const padding = 2;
    svg.setAttribute("viewBox", `${-padding} ${-padding} ${totalWidth + padding * 2} ${totalHeight + padding * 2}`);

  } catch {
    // Fallback: return as-is
  } finally {
    document.body.removeChild(tempContainer);
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg);
}

/** Remove fixed width/height and optionally recalculate viewBox to fit content */
function normalizeSvg(svgContent: string, recalcViewBox = false): string {
  // Remove fixed width/height
  let result = svgContent.replace(/(<svg[^>]*)\s+width="[^"]*"/i, "$1");
  result = result.replace(/(<svg[^>]*)\s+height="[^"]*"/i, "$1");

  if (!recalcViewBox) return result;

  // Recalculate viewBox to fit actual content
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "absolute";
  tempContainer.style.visibility = "hidden";
  tempContainer.style.width = "0";
  tempContainer.style.height = "0";
  tempContainer.style.overflow = "hidden";
  document.body.appendChild(tempContainer);

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) return result;

    const tempSvg = svg.cloneNode(true) as SVGSVGElement;
    tempSvg.setAttribute("width", "2000");
    tempSvg.setAttribute("height", "2000");
    tempContainer.appendChild(tempSvg);

    const bbox = tempSvg.getBBox();
    if (bbox.width > 0 && bbox.height > 0) {
      const padding = 2;
      svg.setAttribute("viewBox", `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`);
      const serializer = new XMLSerializer();
      result = serializer.serializeToString(svg);
    }
  } catch {
    // Fallback: return as-is
  } finally {
    document.body.removeChild(tempContainer);
  }

  return result;
}

/** Get all palette colors (only hex) from colorSections for the picker */
function getPaletteColors(): { name: string; value: string }[] {
  const colors: { name: string; value: string }[] = [
    { name: "Blanco", value: "#ffffff" },
    { name: "Negro", value: "#000000" },
  ];
  for (const section of colorSections) {
    for (const color of section.colors) {
      // Only include hex colors (skip rgba)
      if (color.value.startsWith("#")) {
        const normalized = color.value.toLowerCase();
        // Avoid duplicates with the base colors
        if (normalized !== "#ffffff" && normalized !== "#000000") {
          colors.push({ name: color.name, value: normalized });
        }
      }
    }
  }
  return colors;
}

/** Display name overrides for specific files */
const DISPLAY_NAMES: Record<string, string> = {
  "fonasa-logo-full": "fonasa-logo",
  "fonasa-blanco": "fonasa-blanco",
  "gob-logo": "gob-chile",
};

const PALETTE_COLORS = getPaletteColors();

/** Options for the searchable select */
const PALETTE_OPTIONS = PALETTE_COLORS.map((c) => ({
  value: c.value,
  label: `${c.value} — ${c.name}`,
}));

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

export function IconBuilderPage() {
  const [icons, setIcons] = useState<SvgIcon[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<SvgIcon | null>(null);
  const [colorMappings, setColorMappings] = useState<ColorMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [colorPickerIndex, setColorPickerIndex] = useState<number | null>(null);
  const [hiddenGroups, setHiddenGroups] = useState<Set<string>>(new Set());
  const [layout, setLayout] = useState<LayoutMode>("horizontal");
  const [barPosition, setBarPosition] = useState<BarPosition>("top");
  const [activeVariant, setActiveVariant] = useState<number>(0);

  // Fetch all SVGs on mount
  useEffect(() => {
    async function loadIcons() {
      const loaded: SvgIcon[] = [];

      for (const source of SVG_SOURCES) {
        for (const file of source.files) {
          try {
            const response = await fetch(`${source.folder}/${file}?v=${Date.now()}`);
            if (!response.ok) continue;
            let content = await response.text();

            // Skip base64/raster-embedded SVGs (like ico-clave-unica)
            if (content.includes("data:image/png;base64")) continue;

            // Remove fixed width/height and optionally recalculate viewBox
            content = normalizeSvg(content, source.recalcViewBox);

            const colors = source.colorsEnabled ? extractColors(content) : [];
            const groups = source.designEnabled ? extractGroups(content) : [];
            const baseName = file.replace(".svg", "");

            // Load variants if defined
            const loadedVariants: SvgVariant[] = [];
            if (source.variants) {
              for (const v of source.variants) {
                try {
                  const vRes = await fetch(`${source.folder}/${v.file}?v=${Date.now()}`);
                  if (vRes.ok) {
                    let vContent = await vRes.text();
                    // Normalize SVG
                    vContent = normalizeSvg(vContent, source.recalcViewBox);
                    const colorReplace = (v as { colorReplace?: { from: string; to: string } }).colorReplace;
                    if (colorReplace) {
                      vContent = replaceColor(vContent, colorReplace.from, colorReplace.to);
                    }
                    loadedVariants.push({ label: v.label, file: v.file, content: vContent, colorReplace });
                  }
                } catch { /* skip */ }
              }
            }

            loaded.push({
              name: DISPLAY_NAMES[baseName] || baseName,
              path: `${source.folder}/${file}`,
              originalContent: content,
              modifiedContent: content,
              colors,
              groups,
              designEnabled: source.designEnabled,
              layoutEnabled: source.layoutEnabled,
              colorsEnabled: source.colorsEnabled,
              variants: loadedVariants,
            });
          } catch {
            // Silently skip failures
          }
        }
      }

      setIcons(loaded);
      if (loaded.length > 0) {
        setSelectedIcon(loaded[0]);
        setColorMappings(loaded[0].colors.map((c) => ({ original: c, current: c })));
      }
      setLoading(false);
    }

    loadIcons();
  }, []);

  // Select an icon
  const handleSelectIcon = useCallback((icon: SvgIcon) => {
    setSelectedIcon(icon);
    setColorMappings(icon.colors.map((c) => ({ original: c, current: c })));
    setHiddenGroups(new Set());
    setLayout("horizontal");
    setBarPosition("top");
    setActiveVariant(0);
  }, []);

  // Change a color
  const handleColorChange = useCallback((index: number, newColor: string) => {
    setColorMappings((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], current: newColor };
      return updated;
    });
  }, []);

  // Apply color changes, hidden groups, and layout to selected icon
  useEffect(() => {
    if (!selectedIcon) return;

    // If variants exist, use variant content as base
    let baseContent = selectedIcon.originalContent;
    if (selectedIcon.variants.length > 0 && activeVariant < selectedIcon.variants.length) {
      baseContent = selectedIcon.variants[activeVariant].content;
    }

    let content = baseContent;
    if (selectedIcon.colorsEnabled) {
      for (const mapping of colorMappings) {
        if (mapping.original !== mapping.current) {
          content = replaceColor(content, mapping.original, mapping.current);
        }
      }
    }
    content = applyHiddenGroups(content, hiddenGroups);

    // Apply layout if enabled
    if (selectedIcon.layoutEnabled) {
      content = applyLayout(content, layout, barPosition);
    }

    setSelectedIcon((prev) => prev ? { ...prev, modifiedContent: content } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMappings, hiddenGroups, layout, barPosition, activeVariant]);

  // Reset colors and design
  const handleReset = useCallback(() => {
    if (!selectedIcon) return;
    setColorMappings(selectedIcon.colors.map((c) => ({ original: c, current: c })));
    setHiddenGroups(new Set());
    setLayout("horizontal");
    setBarPosition("top");
    setActiveVariant(0);
  }, [selectedIcon]);

  // Download modified SVG
  const handleDownload = useCallback(() => {
    if (!selectedIcon) return;
    const blob = new Blob([selectedIcon.modifiedContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedIcon.name}-modified.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [selectedIcon]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-2 border-[#0572CE] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Cargando iconos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* ─── Panel izquierdo: Lista de iconos ─── */}
      <div className="w-64 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
        <div className="px-3 border-b border-gray-200 h-[52px] flex items-center">
          <div>
            <div className="flex items-center gap-2">
              <LuImage className="size-4 text-[#0572CE]" />
              <p className="text-sm font-semibold text-gray-700">Iconos disponibles</p>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{icons.length} iconos editables</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <div className="flex flex-col gap-1">
            {icons.map((icon) => (
              <button
                key={icon.path}
                onClick={() => handleSelectIcon(icon)}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-100 ${
                  selectedIcon?.path === icon.path
                    ? "bg-blue-50 border border-[#0572CE] text-[#0572CE]"
                    : "hover:bg-gray-50 text-gray-700 border border-transparent"
                }`}
              >
                <div
                  className="size-8 flex-shrink-0 rounded bg-gray-100 border border-gray-200 flex items-center justify-center p-1"
                  dangerouslySetInnerHTML={{ __html: icon.originalContent }}
                />
                <span className="text-xs font-medium truncate">{icon.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Panel central: Preview ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedIcon ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 border-b border-gray-200 bg-white h-[52px]">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{selectedIcon.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCodeModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:border-[#0572CE] hover:text-[#0572CE] hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  title="Ver código SVG"
                >
                  <FiCode className="size-3.5" />
                  Código
                </button>
                <BotonOutline onClick={handleReset} icon={LuRotateCcw} label="Restaurar" />
                <BotonPrimario onClick={handleDownload} icon={LuDownload} label="Descargar SVG" />
              </div>
            </div>

            {/* Preview area */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[#f9fafb] overflow-auto">
              <div className="flex flex-col items-center gap-4">
                {/* Light background preview */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 flex items-center justify-center">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: "240px", height: "240px" }}
                    dangerouslySetInnerHTML={{ __html: selectedIcon.modifiedContent }}
                  />
                </div>

                {/* Dark background preview */}
                <div className="rounded-xl border border-gray-700 bg-gray-900 shadow-sm p-6 flex items-center justify-center">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: "240px", height: "240px" }}
                    dangerouslySetInnerHTML={{ __html: selectedIcon.modifiedContent }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p className="text-sm">Selecciona un icono para editar</p>
          </div>
        )}
      </div>

      {/* ─── Panel derecho: Editor de colores ─── */}
      <div className="w-72 border-l border-gray-200 bg-white flex flex-col overflow-hidden">
        <div className="px-3 border-b border-gray-200 h-[52px] flex items-center">
          <div>
            <div className="flex items-center gap-2">
              <LuPalette className="size-4 text-[#0572CE]" />
              <p className="text-sm font-semibold text-gray-700">Colores</p>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {selectedIcon && selectedIcon.colorsEnabled
                ? `${colorMappings.length} ${colorMappings.length === 1 ? "color detectado" : "colores detectados"}`
                : "Sin colores editables"}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* ─── Variantes (para iconos con variantes de archivo) ─── */}
          {selectedIcon && selectedIcon.variants.length > 0 && (
            <div className="border-b border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <LuPalette className="size-4 text-[#0572CE]" />
                  <p className="text-sm font-semibold text-gray-700">Variante</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Selecciona la versión del logo
                </p>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {selectedIcon.variants.map((v, idx) => (
                  <button
                    key={v.file}
                    onClick={() => setActiveVariant(idx)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                      activeVariant === idx
                        ? "bg-[#0572CE] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Colores ─── */}
          {selectedIcon && selectedIcon.colorsEnabled && (
            <>
              <div className="p-4">
            {selectedIcon && colorMappings.length > 0 ? (
              <div className="flex flex-col gap-3">
                {colorMappings.map((mapping, index) => (
                  <div
                    key={`${selectedIcon.path}-${mapping.original}-${index}`}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    {/* Color swatch - opens picker */}
                    <button
                      onClick={() => { setColorPickerIndex(index); }}
                      className="size-8 rounded-md border-2 border-gray-300 shadow-sm cursor-pointer flex-shrink-0 hover:border-[#0572CE] transition-colors"
                      style={{ backgroundColor: mapping.current }}
                      title="Cambiar color"
                    />

                    {/* Color info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-gray-700 truncate">
                        {mapping.current}
                      </p>
                      {mapping.original !== mapping.current && (
                        <p className="text-xs text-gray-400 line-through truncate">
                          {mapping.original}
                        </p>
                      )}
                    </div>

                    {/* Reset individual color */}
                    {mapping.original !== mapping.current && (
                      <button
                        onClick={() => handleColorChange(index, mapping.original)}
                        className="text-gray-400 hover:text-[#0572CE] transition-colors"
                        title="Restaurar color original"
                      >
                        <LuRotateCcw className="size-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <LuPalette className="size-8 mb-2 opacity-50" />
                <p className="text-xs text-center">
                  {selectedIcon ? "No se detectaron colores editables" : "Selecciona un icono"}
                </p>
              </div>
            )}
          </div>
          </>
          )}

          {/* ─── Sección Diseño: toggle de grupos ─── */}
          {selectedIcon && selectedIcon.designEnabled && selectedIcon.groups.length > 0 && (
            <div className="border-t border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <LuLayers className="size-4 text-[#0572CE]" />
                  <p className="text-sm font-semibold text-gray-700">Diseño</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Mostrar/ocultar partes del icono
                </p>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {selectedIcon.groups.map((groupId) => (
                  <div
                    key={groupId}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <span className="text-xs font-medium text-gray-700">
                      {GROUP_LABELS[groupId] || groupId}
                    </span>
                    <Switch
                      checked={!hiddenGroups.has(groupId)}
                      onChange={(visible) => {
                        setHiddenGroups((prev) => {
                          const next = new Set(prev);
                          if (visible) {
                            next.delete(groupId);
                          } else {
                            next.add(groupId);
                          }
                          return next;
                        });
                      }}
                      tamano="sm"
                      variante="primary"
                    />
                  </div>
                ))}

                {/* Layout toggle */}
                {selectedIcon.layoutEnabled && (
                  <div className="mt-2 pt-3 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-2">Icono + Texto</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLayout("horizontal")}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          layout === "horizontal"
                            ? "bg-[#0572CE] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Horizontal
                      </button>
                      <button
                        onClick={() => setLayout("vertical")}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          layout === "vertical"
                            ? "bg-[#0572CE] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Vertical
                      </button>
                    </div>

                    <p className="text-xs font-medium text-gray-500 mb-2 mt-3">Barra</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setBarPosition("top")}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          barPosition === "top"
                            ? "bg-[#0572CE] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Arriba
                      </button>
                      <button
                        onClick={() => setBarPosition("bottom")}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          barPosition === "bottom"
                            ? "bg-[#0572CE] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Abajo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Color count summary */}
        {selectedIcon && colorMappings.some((m) => m.original !== m.current) && (
          <div className="p-3 border-t border-gray-200 bg-blue-50">
            <p className="text-xs text-[#0572CE] font-medium">
              {colorMappings.filter((m) => m.original !== m.current).length} color(es) modificado(s)
            </p>
          </div>
        )}
      </div>

      {/* ─── Modal de código SVG ─── */}
      {selectedIcon && showCodeModal && (
        <CustomModal
          size="md"
          title={`Código — ${selectedIcon.name}`}
          showModal={true}
          onClose={() => setShowCodeModal(false)}
        >
          <div className="max-h-[60vh] overflow-y-auto">
            <CodePanel code={selectedIcon.modifiedContent} language="markup" />
          </div>
        </CustomModal>
      )}

      {/* ─── Modal picker de colores ─── */}
      {colorPickerIndex !== null && (
        <CustomModal
          size="sm"
          title="Seleccionar color"
          showModal={true}
          onClose={() => setColorPickerIndex(null)}
        >
          <p className="text-xs text-gray-500 mb-3">
            Color actual: <span className="font-mono font-medium text-gray-700">{colorMappings[colorPickerIndex]?.current}</span>
          </p>

          {/* Select buscable por hex */}
          <div className="mb-4">
            <SelectBuscable
              opciones={PALETTE_OPTIONS}
              value={colorMappings[colorPickerIndex]?.current ?? ""}
              onChange={(val) => {
                handleColorChange(colorPickerIndex, val);
                setColorPickerIndex(null);
              }}
              placeholder="Buscar color por hex o nombre..."
              size="sm"
            />
          </div>

          {/* Carrusel 3x3 */}
          <Carousel
            items={PALETTE_COLORS}
            cols={3}
            rows={3}
            gap="gap-2"
            renderItem={(color) => {
              const isSelected = colorMappings[colorPickerIndex]?.current === color.value;
              return (
                <button
                  onClick={() => {
                    handleColorChange(colorPickerIndex, color.value);
                    setColorPickerIndex(null);
                  }}
                  className={`w-full flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-colors cursor-pointer ${
                    isSelected
                      ? "border-[#0572CE] bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  title={`${color.name} (${color.value})`}
                >
                  <div
                    className="w-full h-10 rounded-md border border-gray-200"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs font-mono text-gray-600 truncate w-full text-center">
                    {color.value}
                  </span>
                </button>
              );
            }}
          />
        </CustomModal>
      )}
    </div>
  );
}
