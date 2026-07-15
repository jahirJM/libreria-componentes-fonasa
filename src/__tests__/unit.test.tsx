import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CodePanel } from "../app/projectComponents/CodePanel";
import { ComponentPreview } from "../app/projectComponents/ComponentPreview";
import { registry } from "../docs/registry";

describe("Unit Tests", () => {
  describe("Clipboard error shows message", () => {
    it("displays 'No se pudo copiar' when clipboard.writeText rejects", async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockRejectedValue(new Error("Clipboard failed")),
        },
      });

      render(<CodePanel code="const x = 1;" />);
      const copyButton = screen.getByRole("button", { name: "Copiar código" });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByText("No se pudo copiar")).toBeInTheDocument();
      });
    });
  });

  describe("Input has 4 variants", () => {
    it("registry contains Input entry with exactly 4 variants: Normal, Con Label, Error, Deshabilitado", () => {
      const inputEntry = registry.find((entry) => entry.name === "Input");
      expect(inputEntry).toBeDefined();
      expect(inputEntry!.variants).toHaveLength(4);
      expect(inputEntry!.variants[0].label).toBe("Normal");
      expect(inputEntry!.variants[1].label).toBe("Con Label");
      expect(inputEntry!.variants[2].label).toBe("Error");
      expect(inputEntry!.variants[3].label).toBe("Deshabilitado");
    });
  });

  describe("Layout: código fuente primero, variantes después", () => {
    it("source code section appears before examples section", () => {
      const entry = {
        name: "TestComponent",
        code: "const x = 1;",
        variants: [
          {
            label: "Default",
            props: {},
            render: () => <div>preview</div>,
            usageCode: `<Component />`,
          },
        ],
      };

      const { container } = render(
        <MemoryRouter>
          <ComponentPreview entry={entry} />
        </MemoryRouter>
      );
      const h3s = container.querySelectorAll("h3");
      expect(h3s.length).toBeGreaterThanOrEqual(2);
      expect(h3s[0].textContent).toBe("Código fuente");
      expect(h3s[1].textContent).toBe("Ejemplos");
    });
  });
});
