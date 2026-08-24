import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Acordeon, ItemAcordeon, DisparadorAcordeon, ContenidoAcordeon } from "../componentsUI/Acordeon";

describe("Acordeon", () => {
  it("renderiza los disparadores correctamente", () => {
    render(
      <Acordeon>
        <ItemAcordeon value="item-1">
          <DisparadorAcordeon>Pregunta 1</DisparadorAcordeon>
          <ContenidoAcordeon>Respuesta 1</ContenidoAcordeon>
        </ItemAcordeon>
      </Acordeon>
    );
    expect(screen.getByText("Pregunta 1")).toBeInTheDocument();
  });

  it("abre un item al hacer click en el disparador", () => {
    render(
      <Acordeon>
        <ItemAcordeon value="item-1">
          <DisparadorAcordeon>Pregunta 1</DisparadorAcordeon>
          <ContenidoAcordeon>Respuesta 1</ContenidoAcordeon>
        </ItemAcordeon>
      </Acordeon>
    );
    fireEvent.click(screen.getByText("Pregunta 1"));
    expect(screen.getByText("Respuesta 1")).toBeInTheDocument();
  });

  it("soporta defaultValue para items abiertos inicialmente", () => {
    render(
      <Acordeon defaultValue={["item-1"]}>
        <ItemAcordeon value="item-1">
          <DisparadorAcordeon>Pregunta 1</DisparadorAcordeon>
          <ContenidoAcordeon>Respuesta 1</ContenidoAcordeon>
        </ItemAcordeon>
      </Acordeon>
    );
    expect(screen.getByText("Respuesta 1")).toBeInTheDocument();
  });

  it("en modo multiple permite abrir varios items", () => {
    render(
      <Acordeon multiple>
        <ItemAcordeon value="item-1">
          <DisparadorAcordeon>Pregunta 1</DisparadorAcordeon>
          <ContenidoAcordeon>Respuesta 1</ContenidoAcordeon>
        </ItemAcordeon>
        <ItemAcordeon value="item-2">
          <DisparadorAcordeon>Pregunta 2</DisparadorAcordeon>
          <ContenidoAcordeon>Respuesta 2</ContenidoAcordeon>
        </ItemAcordeon>
      </Acordeon>
    );
    fireEvent.click(screen.getByText("Pregunta 1"));
    fireEvent.click(screen.getByText("Pregunta 2"));
    expect(screen.getByText("Respuesta 1")).toBeInTheDocument();
    expect(screen.getByText("Respuesta 2")).toBeInTheDocument();
  });

  it("no abre items deshabilitados", () => {
    render(
      <Acordeon>
        <ItemAcordeon value="item-1" disabled>
          <DisparadorAcordeon>Pregunta 1</DisparadorAcordeon>
          <ContenidoAcordeon>Respuesta 1</ContenidoAcordeon>
        </ItemAcordeon>
      </Acordeon>
    );
    const button = screen.getByText("Pregunta 1");
    expect(button.closest("button")).toBeDisabled();
  });

  it("aplica borde cuando bordered es true", () => {
    const { container } = render(
      <Acordeon bordered>
        <ItemAcordeon value="item-1">
          <DisparadorAcordeon>Pregunta</DisparadorAcordeon>
          <ContenidoAcordeon>Contenido</ContenidoAcordeon>
        </ItemAcordeon>
      </Acordeon>
    );
    expect(container.firstChild).toHaveClass("rounded-lg");
  });
});
