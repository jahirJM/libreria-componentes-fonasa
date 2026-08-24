import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../componentsUI/Card";

describe("Card", () => {
  it("renderiza children correctamente", () => {
    render(<Card><span>Contenido</span></Card>);
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("aplica variante default por defecto", () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.firstChild).toHaveClass("border-gray-200");
  });

  it("aplica variante elevada", () => {
    const { container } = render(<Card variante="elevada">Test</Card>);
    expect(container.firstChild).toHaveClass("shadow-md");
  });

  it("aplica variante interactiva con hover", () => {
    const { container } = render(<Card variante="interactiva">Test</Card>);
    expect(container.firstChild).toHaveClass("cursor-pointer");
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(<Card isLoading>Test</Card>);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renderiza sub-componentes correctamente", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Mi titulo</CardTitle>
        </CardHeader>
        <CardDescription>Una descripcion</CardDescription>
        <CardContent>Contenido libre</CardContent>
        <CardFooter>Pie</CardFooter>
      </Card>
    );
    expect(screen.getByText("Mi titulo")).toBeInTheDocument();
    expect(screen.getByText("Una descripcion")).toBeInTheDocument();
    expect(screen.getByText("Contenido libre")).toBeInTheDocument();
    expect(screen.getByText("Pie")).toBeInTheDocument();
  });
});
