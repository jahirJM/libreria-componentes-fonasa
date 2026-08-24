import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputCalendario } from "../componentsUI/InputCalendario";

describe("InputCalendario", () => {
  it("renderiza con labels por defecto en modo rango", () => {
    render(<InputCalendario />);
    expect(screen.getByText("Fecha inicio")).toBeInTheDocument();
    expect(screen.getByText("Fecha fin")).toBeInTheDocument();
  });

  it("renderiza con label 'Fecha' en modo fecha", () => {
    render(<InputCalendario tipo="fecha" />);
    expect(screen.getByText("Fecha")).toBeInTheDocument();
  });

  it("abre el calendario al hacer click", () => {
    render(<InputCalendario />);
    const container = screen.getByText("Fecha inicio").closest("div[class*='flex items-center']");
    if (container) fireEvent.click(container);
    expect(screen.getByText("Lu")).toBeInTheDocument();
  });

  it("no abre cuando disabled", () => {
    render(<InputCalendario disabled />);
    const container = screen.getByText("Fecha inicio").closest("div[class*='flex items-center']");
    if (container) fireEvent.click(container);
    expect(screen.queryByText("Lu")).not.toBeInTheDocument();
  });

  it("muestra placeholder personalizado", () => {
    render(<InputCalendario placeholderInicio="Seleccionar" />);
    expect(screen.getByPlaceholderText("Seleccionar")).toBeInTheDocument();
  });

  it("oculta labels cuando noLabel es true", () => {
    render(<InputCalendario noLabel />);
    expect(screen.queryByText("Fecha inicio")).not.toBeInTheDocument();
  });
});
