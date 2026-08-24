import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "../componentsUI/Input";

describe("Input", () => {
  it("renderiza correctamente con placeholder", () => {
    render(<Input placeholder="Ingrese texto" />);
    expect(screen.getByPlaceholderText("Ingrese texto")).toBeInTheDocument();
  });

  it("muestra el valor controlado", () => {
    render(<Input value="Hola mundo" onChange={() => {}} />);
    expect(screen.getByDisplayValue("Hola mundo")).toBeInTheDocument();
  });

  it("aplica borde rojo cuando error es true", () => {
    render(<Input error placeholder="Con error" />);
    const input = screen.getByPlaceholderText("Con error");
    expect(input).toHaveClass("border-red-500");
  });

  it("se deshabilita cuando disabled es true", () => {
    render(<Input disabled placeholder="Deshabilitado" />);
    const input = screen.getByPlaceholderText("Deshabilitado");
    expect(input).toBeDisabled();
  });

  it("se deshabilita cuando loading es true", () => {
    render(<Input loading placeholder="Cargando" />);
    const input = screen.getByPlaceholderText("Cargando");
    expect(input).toBeDisabled();
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(<Input isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("ejecuta onChange al escribir", () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} placeholder="Escribir" />);
    const input = screen.getByPlaceholderText("Escribir");
    fireEvent.change(input, { target: { value: "nuevo" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renderiza icono izquierdo", () => {
    render(
      <Input leftIcon={<span data-testid="left-icon">🔍</span>} placeholder="Buscar" />
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renderiza icono derecho", () => {
    render(
      <Input rightIcon={<span data-testid="right-icon">✓</span>} placeholder="Ok" />
    );
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("renderiza boton de copiar cuando copyable es true", () => {
    const { container } = render(<Input copyable value="Copiar" onChange={() => {}} />);
    const copyButton = container.querySelector("button");
    expect(copyButton).toBeInTheDocument();
  });
});
