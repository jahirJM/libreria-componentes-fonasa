import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextoAnimado } from "../componentsUI/TextoAnimado";

describe("TextoAnimado", () => {
  it("renderiza el valor", () => {
    render(<TextoAnimado valor="$14.823" />);
    expect(screen.getByText("$14.823")).toBeInTheDocument();
  });

  it("renderiza la etiqueta cuando se proporciona", () => {
    render(<TextoAnimado valor="100" etiqueta="Total" />);
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("muestra 'Sin valor' cuando valor esta vacio", () => {
    render(<TextoAnimado valor="" />);
    expect(screen.getByText("Sin valor")).toBeInTheDocument();
  });

  it("aplica variante moneda", () => {
    const { container } = render(<TextoAnimado valor="$50.000" variante="moneda" />);
    expect(container.querySelector(".text-green-700")).toBeInTheDocument();
  });

  it("aplica variante codigo", () => {
    const { container } = render(<TextoAnimado valor="const x = 1" variante="codigo" />);
    expect(container.querySelector(".bg-gray-900")).toBeInTheDocument();
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(<TextoAnimado valor="Test" isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
