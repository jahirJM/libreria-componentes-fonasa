import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Alerta } from "../componentsUI/Alerta";

describe("Alerta", () => {
  it("renderiza el mensaje correctamente", () => {
    render(<Alerta mensaje="Operación exitosa" variante="success" />);
    expect(screen.getByText("Operación exitosa")).toBeInTheDocument();
  });

  it("renderiza el titulo cuando se proporciona", () => {
    render(<Alerta titulo="Atención" mensaje="Mensaje" variante="warning" />);
    expect(screen.getByText("Atención")).toBeInTheDocument();
  });

  it("muestra el boton de cerrar por defecto", () => {
    render(<Alerta mensaje="Test" />);
    expect(screen.getByLabelText("Cerrar mensaje")).toBeInTheDocument();
  });

  it("oculta el boton de cerrar cuando cerrar es false", () => {
    render(<Alerta mensaje="Test" cerrar={false} />);
    expect(screen.queryByLabelText("Cerrar mensaje")).not.toBeInTheDocument();
  });

  it("desaparece al hacer click en cerrar", () => {
    render(<Alerta mensaje="Desaparezco" />);
    fireEvent.click(screen.getByLabelText("Cerrar mensaje"));
    expect(screen.queryByText("Desaparezco")).not.toBeInTheDocument();
  });

  it("ejecuta onClose al cerrar", () => {
    const handleClose = jest.fn();
    render(<Alerta mensaje="Test" onClose={handleClose} />);
    fireEvent.click(screen.getByLabelText("Cerrar mensaje"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("renderiza children en lugar de mensaje", () => {
    render(
      <Alerta variante="info">
        <span data-testid="custom-content">Contenido custom</span>
      </Alerta>
    );
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });

  it("tiene role alert para accesibilidad", () => {
    render(<Alerta mensaje="Accesible" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renderiza la accion secundaria", () => {
    const handleAction = jest.fn();
    render(
      <Alerta mensaje="Con accion" accion={{ label: "Reintentar", onClick: handleAction }} />
    );
    fireEvent.click(screen.getByText("Reintentar"));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
