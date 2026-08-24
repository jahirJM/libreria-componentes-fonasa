import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Badge } from "../componentsUI/Badge";

describe("Badge", () => {
  it("renderiza el texto correctamente", () => {
    render(<Badge variant="estado-pendiente" text="Pendiente" />);
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
  });

  it("aplica estilos segun variante estado-aprobada", () => {
    render(<Badge variant="estado-aprobada" text="Aprobada" />);
    const badge = screen.getByText("Aprobada");
    expect(badge).toHaveClass("bg-green-50!");
  });

  it("aplica estilos segun variante estado-rechazada", () => {
    render(<Badge variant="estado-rechazada" text="Rechazada" />);
    const badge = screen.getByText("Rechazada");
    expect(badge).toHaveClass("bg-red-100");
  });

  it("aplica clases custom con customClass", () => {
    render(<Badge variant="counter" text="5" customClass="ml-2" />);
    const badge = screen.getByText("5");
    expect(badge).toHaveClass("ml-2");
  });

  it("muestra punto colapsado cuando forceCollapsed es true", () => {
    const { container } = render(
      <Badge variant="estado-aprobada" text="Aprobada" forceCollapsed />
    );
    const dot = container.querySelector(".rounded-full.size-3");
    expect(dot).toBeInTheDocument();
  });

  it("renderiza el badge counter correctamente", () => {
    render(<Badge variant="counter" text="12" />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });
});
