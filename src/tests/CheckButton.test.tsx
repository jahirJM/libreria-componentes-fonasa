import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CheckButton } from "../componentsUI/CheckButton";

const opciones = [
  { id: "1", label: "Opción A" },
  { id: "2", label: "Opción B" },
  { id: "3", label: "Opción C" },
];

describe("CheckButton", () => {
  it("renderiza todas las opciones", () => {
    render(<CheckButton listaOpciones={opciones} onToggle={() => {}} />);
    expect(screen.getByText("Opción A")).toBeInTheDocument();
    expect(screen.getByText("Opción B")).toBeInTheDocument();
    expect(screen.getByText("Opción C")).toBeInTheDocument();
  });

  it("marca las opciones seleccionadas", () => {
    render(<CheckButton listaOpciones={opciones} selectedItems={["1"]} onToggle={() => {}} />);
    const checkbox = screen.getByRole("checkbox", { name: "Opción A" });
    expect(checkbox).toBeChecked();
  });

  it("ejecuta onToggle al hacer click", () => {
    const handleToggle = jest.fn();
    render(<CheckButton listaOpciones={opciones} onToggle={handleToggle} />);
    fireEvent.click(screen.getByRole("checkbox", { name: "Opción B" }));
    expect(handleToggle).toHaveBeenCalledWith({ id: "2", label: "Opción B" });
  });

  it("renderiza radios en variant secondary", () => {
    render(<CheckButton variant="secondary" onToggle={() => {}} />);
    expect(screen.getByText("Sí")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("deshabilita todas las opciones cuando isDisabled es true", () => {
    render(<CheckButton listaOpciones={opciones} isDisabled onToggle={() => {}} />);
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((cb) => expect(cb).toBeDisabled());
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(<CheckButton listaOpciones={opciones} isLoading onToggle={() => {}} />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
