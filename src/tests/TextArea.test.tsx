import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextArea } from "../componentsUI/TextArea";

describe("TextArea", () => {
  it("renderiza con placeholder", () => {
    render(<TextArea placeholder="Escriba aquí" />);
    expect(screen.getByPlaceholderText("Escriba aquí")).toBeInTheDocument();
  });

  it("aplica borde de error cuando error es true", () => {
    render(<TextArea error placeholder="Error" />);
    const textarea = screen.getByPlaceholderText("Error");
    expect(textarea).toHaveClass("border-red-500");
  });

  it("se deshabilita cuando disabled es true", () => {
    render(<TextArea disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("ejecuta onChange al escribir", () => {
    const handleChange = jest.fn();
    render(<TextArea onChange={handleChange} placeholder="Texto" />);
    fireEvent.change(screen.getByPlaceholderText("Texto"), { target: { value: "Hola" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(<TextArea isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("pasa atributos HTML extra como rows", () => {
    render(<TextArea rows={6} placeholder="Rows" />);
    expect(screen.getByPlaceholderText("Rows")).toHaveAttribute("rows", "6");
  });
});
