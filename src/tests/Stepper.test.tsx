import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Stepper } from "../componentsUI/Stepper";

const pasos = [
  { id: "1", label: "Datos" },
  { id: "2", label: "Documentos" },
  { id: "3", label: "Envío" },
];

describe("Stepper", () => {
  it("renderiza los labels de los pasos", () => {
    render(<Stepper pasos={pasos} pasoActual={1} />);
    expect(screen.getAllByText("Datos").length).toBeGreaterThan(0);
  });

  it("muestra paso actual en formato mobile", () => {
    render(<Stepper pasos={pasos} pasoActual={2} forceMobile />);
    expect(screen.getByText("2/3")).toBeInTheDocument();
    expect(screen.getByText("Documentos")).toBeInTheDocument();
  });

  it("ejecuta onCambiarPaso cuando puedeNavegar es true", () => {
    const handleChange = jest.fn();
    render(<Stepper pasos={pasos} pasoActual={1} puedeNavegar onCambiarPaso={handleChange} />);
    const circles = screen.getAllByText("2");
    fireEvent.click(circles[0]);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(<Stepper pasos={pasos} pasoActual={1} isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
