import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as fc from "fast-check";
import { CodePanel } from "../app/projectComponents/CodePanel";
import { PreviewPanel } from "../app/projectComponents/PreviewPanel";
import { ComponentPreview } from "../app/projectComponents/ComponentPreview";
import type { ComponentVariant, ComponentEntry } from "../registry";

/**
 * Feature: component-library-preview, Property 1: Code fidelity — display and copy preserve source exactly
 * Validates: Requirements 1.1, 1.3
 */
describe("Property 1: Code fidelity — display and copy preserve source exactly", () => {
  it("rendered <code> element contains the exact source string (trimmed)", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 500 }).map((s) =>
          s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, " ")
        ),
        (code) => {
          const { container, unmount } = render(<CodePanel code={code} />);
          const codeElement = container.querySelector("code");
          expect(codeElement).not.toBeNull();
          expect(codeElement!.textContent).toBe(code.trim());
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("clipboard.writeText is called with the exact source string on copy", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 500 }).map((s) =>
          s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, " ")
        ),
        async (code) => {
          const writeTextMock = vi.fn().mockResolvedValue(undefined);
          Object.assign(navigator, {
            clipboard: { writeText: writeTextMock },
          });

          const { unmount } = render(<CodePanel code={code} />);
          const copyButton = screen.getByRole("button", {
            name: "Copiar código",
          });
          fireEvent.click(copyButton);

          await waitFor(() => {
            expect(writeTextMock).toHaveBeenCalledWith(code);
          });
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: component-library-preview, Property 2: All variants are rendered
 * Validates: Requirements 2.3
 */
describe("Property 2: All variants are rendered", () => {
  it("ComponentPreview renders a section for each variant with its label", () => {
    const variantArb = fc
      .record({
        label: fc.string({ minLength: 1, maxLength: 30 }).filter(
          (s) => s.trim().length > 0
        ),
      })
      .map(
        ({ label }): ComponentVariant => ({
          label,
          props: {},
          render: () => <div data-testid={`variant-${label}`}>{label}</div>,
          usageCode: `<Component label="${label}" />`,
        })
      );

    fc.assert(
      fc.property(
        fc.array(variantArb, { minLength: 1, maxLength: 10 }).filter(
          (variants) => {
            const labels = variants.map((v) => v.label);
            return new Set(labels).size === labels.length;
          }
        ),
        (variants) => {
          const entry: ComponentEntry = {
            name: "Test",
            code: "const x = 1;",
            variants,
          };
          const { container, unmount } = render(
            <MemoryRouter>
              <ComponentPreview entry={entry} />
            </MemoryRouter>
          );
          const variantLabels = container.querySelectorAll(
            ".border-b .text-sm.font-medium"
          );
          expect(variantLabels.length).toBe(variants.length);
          variants.forEach((variant, index) => {
            expect(variantLabels[index].textContent).toBe(variant.label);
          });
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: component-library-preview, Property 3: Component name displayed as heading
 * Validates: Requirements 4.2
 */
describe("Property 3: Component name displayed as heading", () => {
  it("ComponentPreview renders an h2 with the component name", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(
          (s) => s.trim().length > 0
        ),
        (name) => {
          const entry: ComponentEntry = {
            name,
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
          const { container, unmount } = render(
            <MemoryRouter>
              <ComponentPreview entry={entry} />
            </MemoryRouter>
          );
          const h2 = container.querySelector("h2");
          expect(h2).not.toBeNull();
          expect(h2!.textContent).toBe(name);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
