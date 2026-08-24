import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Paginacion } from "../componentsUI/Paginacion";

describe("Paginacion", () => {
  it("no renderiza cuando totalPaginas es 1 o menos", () => {
    const { container } = render(
      <Paginacion paginaActual={1} totalPaginas={1} onCambiarPagina={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renderiza flechas de navegacion", () => {
    render(<Paginacion paginaActual={2} totalPaginas={5} onCambiarPagina={() => {}} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(2);
  });

  it("deshabilita flecha anterior en pagina 1", () => {
    render(<Paginacion paginaActual={1} totalPaginas={5} onCambiarPagina={() => {}} />);
    const prevButton = screen.getAllByRole("button")[0];
    expect(prevButton).toBeDisabled();
  });

  it("deshabilita flecha siguiente en ultima pagina", () => {
    render(<Paginacion paginaActual={5} totalPaginas={5} onCambiarPagina={() => {}} />);
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[buttons.length - 1];
    expect(nextButton).toBeDisabled();
  });

  it("ejecuta onCambiarPagina al clickear una pagina", () => {
    const handleChange = jest.fn();
    render(<Paginacion paginaActual={1} totalPaginas={5} onCambiarPagina={handleChange} />);
    const page2 = screen.getByText("2");
    fireEvent.click(page2);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(
      <Paginacion paginaActual={1} totalPaginas={5} onCambiarPagina={() => {}} isLoading />
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("marca la pagina activa con estilo destacado", () => {
    render(<Paginacion paginaActual={3} totalPaginas={5} onCambiarPagina={() => {}} />);
    const activePage = screen.getByText("3");
    expect(activePage).toHaveClass("bg-[#0572CE]");
  });
});
