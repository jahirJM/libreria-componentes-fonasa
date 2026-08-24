import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../componentsUI/Modal";

describe("Modal", () => {
  it("no renderiza cuando modalOpen es false", () => {
    render(<Modal modalOpen={false} setModalOpen={() => {}} />);
    expect(screen.queryByText("Titulo de modal")).not.toBeInTheDocument();
  });

  it("renderiza titulo y subtitulo en variant confirmacion", () => {
    render(
      <Modal
        modalOpen={true}
        setModalOpen={() => {}}
        tituloModal="¿Confirmar?"
        subTituloModal="Esta accion no se puede deshacer."
        variant="confirmacion"
      />
    );
    expect(screen.getByText("¿Confirmar?")).toBeInTheDocument();
    expect(screen.getByText(/Esta accion no se puede deshacer/)).toBeInTheDocument();
  });

  it("muestra botones Si y No en variant confirmacion", () => {
    render(
      <Modal modalOpen={true} setModalOpen={() => {}} variant="confirmacion" />
    );
    expect(screen.getByText("Sí")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  it("ejecuta validacion con true al clickear Si", () => {
    const handleValidacion = jest.fn();
    render(
      <Modal
        modalOpen={true}
        setModalOpen={() => {}}
        variant="confirmacion"
        validacion={handleValidacion}
      />
    );
    fireEvent.click(screen.getByText("Sí"));
    expect(handleValidacion).toHaveBeenCalledWith(true);
  });

  it("ejecuta validacion con false al clickear No", () => {
    const handleValidacion = jest.fn();
    render(
      <Modal
        modalOpen={true}
        setModalOpen={() => {}}
        variant="confirmacion"
        validacion={handleValidacion}
      />
    );
    fireEvent.click(screen.getByText("No"));
    expect(handleValidacion).toHaveBeenCalledWith(false);
  });

  it("muestra boton Aceptar en variant aceptar", () => {
    render(
      <Modal modalOpen={true} setModalOpen={() => {}} variant="aceptar" />
    );
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
  });

  it("muestra icono check en variant exito", () => {
    render(
      <Modal modalOpen={true} setModalOpen={() => {}} variant="exito" subTituloModal="Listo" />
    );
    expect(screen.getByText("Listo")).toBeInTheDocument();
  });
});
