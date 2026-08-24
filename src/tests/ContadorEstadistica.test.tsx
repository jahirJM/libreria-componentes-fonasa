import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ContadorEstadistica } from "../componentsUI/ContadorEstadistica";

describe("ContadorEstadistica", () => {
  it("renderiza sin errores", () => {
    const { container } = render(
      <ContadorEstadistica variante="primario">
        <ContadorEstadistica.Cabecera>📊</ContadorEstadistica.Cabecera>
        <ContadorEstadistica.Metrica valor={100} />
        <ContadorEstadistica.Contenido>
          <ContadorEstadistica.Etiqueta>Total</ContadorEstadistica.Etiqueta>
        </ContadorEstadistica.Contenido>
      </ContadorEstadistica>
    );
    expect(container).toBeInTheDocument();
  });

  it("renderiza la etiqueta", () => {
    render(
      <ContadorEstadistica>
        <ContadorEstadistica.Metrica valor={50} />
        <ContadorEstadistica.Contenido>
          <ContadorEstadistica.Etiqueta>Beneficiarios</ContadorEstadistica.Etiqueta>
        </ContadorEstadistica.Contenido>
      </ContadorEstadistica>
    );
    expect(screen.getByText("Beneficiarios")).toBeInTheDocument();
  });

  it("renderiza la descripcion", () => {
    render(
      <ContadorEstadistica>
        <ContadorEstadistica.Metrica valor={10} />
        <ContadorEstadistica.Contenido>
          <ContadorEstadistica.Descripcion>Actualizado hoy</ContadorEstadistica.Descripcion>
        </ContadorEstadistica.Contenido>
      </ContadorEstadistica>
    );
    expect(screen.getByText("Actualizado hoy")).toBeInTheDocument();
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(
      <ContadorEstadistica isLoading>
        <ContadorEstadistica.Metrica valor={0} />
      </ContadorEstadistica>
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
