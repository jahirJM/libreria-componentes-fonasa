import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Table } from "../componentsUI/Table";

describe("Table", () => {
  it("renderiza nombres de columnas", () => {
    render(
      <Table nombreColumnas={["Nombre", "RUT", "Estado"]}>
        <tr><td className="px-4 py-2">Juan</td><td className="px-4 py-2">12.345.678-9</td><td className="px-4 py-2">Activo</td></tr>
      </Table>
    );
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("RUT")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
  });

  it("renderiza filas de contenido", () => {
    render(
      <Table nombreColumnas={["Nombre"]}>
        <tr><td>Pedro</td></tr>
      </Table>
    );
    expect(screen.getByText("Pedro")).toBeInTheDocument();
  });

  it("permite colapsar columnas cuando ocultable es true", () => {
    render(
      <Table nombreColumnas={["Nombre", "RUT"]} ocultable>
        <tr><td className="px-4 py-2">Juan</td><td className="px-4 py-2">12.345.678-9</td></tr>
      </Table>
    );
    // Click on header to collapse
    fireEvent.click(screen.getByText("Nombre"));
    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
  });

  it("tiene headers clickeables cuando ocultable es true", () => {
    const { container } = render(
      <Table nombreColumnas={["Col1"]} ocultable>
        <tr><td>Data</td></tr>
      </Table>
    );
    const th = container.querySelector("th");
    expect(th).toHaveClass("cursor-pointer");
  });
});
