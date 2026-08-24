import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ListaPaginada } from "../componentsUI/ListaPaginada";

describe("ListaPaginada", () => {
  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(
      <ListaPaginada isLoading paginaActual={1} totalPaginas={3} onCambiarPagina={() => {}}>
        <div>Item</div>
      </ListaPaginada>
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("muestra error cuando se proporciona", () => {
    render(
      <ListaPaginada isLoading={false} error="Error de conexión" paginaActual={1} totalPaginas={1} onCambiarPagina={() => {}}>
        <div>Item</div>
      </ListaPaginada>
    );
    expect(screen.getByText("Error de conexión")).toBeInTheDocument();
  });

  it("muestra contenido y contador cuando no hay error ni loading", () => {
    render(
      <ListaPaginada isLoading={false} totalItems={5} paginaActual={1} totalPaginas={2} onCambiarPagina={() => {}}>
        <div>Mi item</div>
      </ListaPaginada>
    );
    expect(screen.getByText("Mi item")).toBeInTheDocument();
    expect(screen.getByText("5 solicitudes encontradas")).toBeInTheDocument();
  });

  it("muestra titulo personalizado", () => {
    render(
      <ListaPaginada isLoading={false} titulo="Mis documentos" paginaActual={1} totalPaginas={1} onCambiarPagina={() => {}}>
        <div>Doc</div>
      </ListaPaginada>
    );
    expect(screen.getByText("Mis documentos")).toBeInTheDocument();
  });

  it("maneja singular correctamente", () => {
    render(
      <ListaPaginada isLoading={false} totalItems={1} paginaActual={1} totalPaginas={1} onCambiarPagina={() => {}}>
        <div>Item</div>
      </ListaPaginada>
    );
    expect(screen.getByText("1 solicitud encontrada")).toBeInTheDocument();
  });
});
