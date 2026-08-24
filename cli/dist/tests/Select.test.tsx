import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Select } from "../componentsUI/Select";

const mockOpciones = [
  { value: "1", label: "Santiago" },
  { value: "2", label: "Valparaíso" },
  { value: "3", label: "Concepción" },
  { value: "4", label: "Deshabilitada", disabled: true },
];

describe("Select", () => {
  it("renderiza con placeholder por defecto", () => {
    render(<Select opciones={mockOpciones} value="" onChange={() => {}} />);
    expect(screen.getByText("Seleccione una opción")).toBeInTheDocument();
  });

  it("renderiza con placeholder personalizado", () => {
    render(
      <Select
        opciones={mockOpciones}
        value=""
        onChange={() => {}}
        placeholder="Elige una ciudad"
      />
    );
    expect(screen.getByText("Elige una ciudad")).toBeInTheDocument();
  });

  it("muestra la opcion seleccionada", () => {
    render(<Select opciones={mockOpciones} value="2" onChange={() => {}} />);
    expect(screen.getByText("Valparaíso")).toBeInTheDocument();
  });

  it("abre el dropdown al hacer click", () => {
    render(<Select opciones={mockOpciones} value="" onChange={() => {}} />);
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);
    expect(screen.getByText("Santiago")).toBeInTheDocument();
    expect(screen.getByText("Concepción")).toBeInTheDocument();
  });

  it("ejecuta onChange al seleccionar una opcion", () => {
    const handleChange = jest.fn();
    render(<Select opciones={mockOpciones} value="" onChange={handleChange} />);
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);
    fireEvent.click(screen.getByText("Santiago"));
    expect(handleChange).toHaveBeenCalledWith("1");
  });

  it("no abre el dropdown cuando esta deshabilitado", () => {
    render(
      <Select opciones={mockOpciones} value="" onChange={() => {}} disabled />
    );
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);
    expect(screen.queryByText("Santiago")).not.toBeInTheDocument();
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(
      <Select opciones={mockOpciones} value="" onChange={() => {}} isLoading />
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("aplica borde de error cuando error es true", () => {
    render(
      <Select opciones={mockOpciones} value="" onChange={() => {}} error />
    );
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveClass("border-red-500");
  });

  it("navega con teclado (ArrowDown abre el dropdown)", () => {
    render(<Select opciones={mockOpciones} value="" onChange={() => {}} />);
    const trigger = screen.getByRole("button");
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(screen.getByText("Santiago")).toBeInTheDocument();
  });

  it("cierra con Escape", () => {
    render(<Select opciones={mockOpciones} value="" onChange={() => {}} />);
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);
    expect(screen.getByText("Santiago")).toBeInTheDocument();
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
