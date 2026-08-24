import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Drawer } from "../componentsUI/Drawer";

describe("Drawer", () => {
  it("no renderiza cuando isOpen es false", () => {
    render(
      <Drawer isOpen={false} onClose={() => {}}>
        <p>Contenido</p>
      </Drawer>
    );
    expect(screen.queryByText("Contenido")).not.toBeInTheDocument();
  });

  it("renderiza el titulo y contenido cuando isOpen es true", () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} titulo="Filtros">
        <p>Contenido drawer</p>
      </Drawer>
    );
    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Contenido drawer")).toBeInTheDocument();
  });

  it("renderiza la descripcion", () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} titulo="T" descripcion="Desc">
        <p>Body</p>
      </Drawer>
    );
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("renderiza el footer cuando se proporciona", () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} footer={<button>Aplicar</button>}>
        <p>Body</p>
      </Drawer>
    );
    expect(screen.getByText("Aplicar")).toBeInTheDocument();
  });

  it("tiene role dialog", () => {
    render(
      <Drawer isOpen={true} onClose={() => {}}>
        <p>Test</p>
      </Drawer>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("ejecuta onClose al hacer click en el boton X", () => {
    const handleClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} titulo="Test">
        <p>Body</p>
      </Drawer>
    );
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
