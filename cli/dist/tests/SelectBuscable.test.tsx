import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SelectBuscable } from "../componentsUI/SelectBuscable";

const opciones = [
  { value: "1", label: "Santiago" },
  { value: "2", label: "Valparaíso" },
  { value: "3", label: "Concepción" },
];

describe("SelectBuscable", () => {
  it("renderiza con placeholder", () => {
    render(<SelectBuscable opciones={opciones} value="" onChange={() => {}} />);
    expect(screen.getByText("Seleccione")).toBeInTheDocument();
  });

  it("muestra la opcion seleccionada", () => {
    render(<SelectBuscable opciones={opciones} value="2" onChange={() => {}} />);
    expect(screen.getByText("Valparaíso")).toBeInTheDocument();
  });

  it("abre el dropdown al hacer click", () => {
    render(<SelectBuscable opciones={opciones} value="" onChange={() => {}} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
  });

  it("filtra opciones al buscar", () => {
    render(<SelectBuscable opciones={opciones} value="" onChange={() => {}} />);
    fireEvent.click(screen.getByRole("button"));
    const searchInput = screen.getByPlaceholderText("Buscar...");
    fireEvent.change(searchInput, { target: { value: "San" } });
    expect(screen.getByText("Santiago")).toBeInTheDocument();
    expect(screen.queryByText("Concepción")).not.toBeInTheDocument();
  });

  it("ejecuta onChange al seleccionar", () => {
    const handleChange = jest.fn();
    render(<SelectBuscable opciones={opciones} value="" onChange={handleChange} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Santiago"));
    expect(handleChange).toHaveBeenCalledWith("1");
  });

  it("muestra 'Cargando...' cuando isLoading es true", () => {
    render(<SelectBuscable opciones={opciones} value="" onChange={() => {}} isLoading />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("no abre cuando disabled", () => {
    render(<SelectBuscable opciones={opciones} value="" onChange={() => {}} disabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByPlaceholderText("Buscar...")).not.toBeInTheDocument();
  });

  it("muestra Sin resultados cuando no hay match", () => {
    render(<SelectBuscable opciones={opciones} value="" onChange={() => {}} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.change(screen.getByPlaceholderText("Buscar..."), { target: { value: "xyz" } });
    expect(screen.getByText("Sin resultados")).toBeInTheDocument();
  });
});
