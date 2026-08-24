import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TablaBasica } from "../componentsUI/TablaBasica";

describe("TablaBasica", () => {
  it("renderiza los nombres de columnas", () => {
    render(
      <TablaBasica nombreColumnas={["Nombre", "RUT", "Estado"]}>
        <tr><td>Juan</td><td>12.345.678-9</td><td>Activo</td></tr>
      </TablaBasica>
    );
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("RUT")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
  });

  it("renderiza las filas de contenido", () => {
    render(
      <TablaBasica nombreColumnas={["Nombre"]}>
        <tr><td>María</td></tr>
        <tr><td>Pedro</td></tr>
      </TablaBasica>
    );
    expect(screen.getByText("María")).toBeInTheDocument();
    expect(screen.getByText("Pedro")).toBeInTheDocument();
  });

  it("aplica clases custom a la tabla", () => {
    const { container } = render(
      <TablaBasica nombreColumnas={["Col"]} classTable="mi-clase">
        <tr><td>Data</td></tr>
      </TablaBasica>
    );
    expect(container.querySelector("table")).toHaveClass("mi-clase");
  });
});
