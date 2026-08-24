import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomModal } from "../componentsUI/CustomModal";

describe("CustomModal", () => {
  it("no renderiza contenido cuando showModal es false", () => {
    render(
      <CustomModal size="md" title="Test" showModal={false}>
        <p>Contenido</p>
      </CustomModal>
    );
    expect(screen.queryByText("Contenido")).not.toBeInTheDocument();
  });

  it("renderiza titulo y contenido cuando showModal es true", () => {
    render(
      <CustomModal size="md" title="Mi Modal" showModal={true}>
        <p>Contenido del modal</p>
      </CustomModal>
    );
    expect(screen.getByText("Mi Modal")).toBeInTheDocument();
    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
  });

  it("ejecuta onClose al hacer click en el boton cerrar", () => {
    const handleClose = jest.fn();
    render(
      <CustomModal size="sm" title="Cerrar" showModal={true} onClose={handleClose}>
        <p>Test</p>
      </CustomModal>
    );
    const closeButton = screen.getByRole("button");
    closeButton.click();
    expect(handleClose).toHaveBeenCalled();
  });
});
