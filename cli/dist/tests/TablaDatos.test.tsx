import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TablaDatos } from "../componentsUI/TablaDatos";

const mockData = [
  { id: "1", nombre: "Juan", rut: "12.345.678-9" },
  { id: "2", nombre: "María", rut: "98.765.432-1" },
];

describe("TablaDatos", () => {
  it("renderiza los headers", () => {
    render(
      <TablaDatos headers={["Nombre", "RUT"]} columns={["nombre", "rut"]} data={mockData} />
    );
    expect(screen.getAllByText("Nombre").length).toBeGreaterThan(0);
    expect(screen.getAllByText("RUT").length).toBeGreaterThan(0);
  });

  it("renderiza los datos de las filas", () => {
    render(
      <TablaDatos headers={["Nombre", "RUT"]} columns={["nombre", "rut"]} data={mockData} />
    );
    expect(screen.getAllByText("Juan").length).toBeGreaterThan(0);
    expect(screen.getAllByText("María").length).toBeGreaterThan(0);
  });

  it("ejecuta onEdit al clickear editar", () => {
    const handleEdit = jest.fn();
    render(
      <TablaDatos headers={["Nombre"]} columns={["nombre"]} data={mockData} onEdit={handleEdit} />
    );
    const editButtons = screen.getAllByRole("button");
    fireEvent.click(editButtons[0]);
    expect(handleEdit).toHaveBeenCalled();
  });

  it("ejecuta onDelete al clickear eliminar", () => {
    const handleDelete = jest.fn();
    render(
      <TablaDatos headers={["Nombre"]} columns={["nombre"]} data={mockData} onDelete={handleDelete} />
    );
    const deleteButtons = screen.getAllByRole("button");
    fireEvent.click(deleteButtons[0]);
    expect(handleDelete).toHaveBeenCalled();
  });

  it("muestra - cuando un campo no existe", () => {
    const data = [{ id: "1", nombre: "Test" }];
    render(
      <TablaDatos headers={["Nombre", "Email"]} columns={["nombre", "email"]} data={data} />
    );
    expect(screen.getAllByText("-").length).toBeGreaterThan(0);
  });
});
