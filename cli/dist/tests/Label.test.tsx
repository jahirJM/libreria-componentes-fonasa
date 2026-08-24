import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Label } from "../componentsUI/Label";

describe("Label", () => {
  it("renderiza el texto del label", () => {
    render(<Label text="Nombre" />);
    expect(screen.getByText("Nombre")).toBeInTheDocument();
  });

  it("muestra indicador requerido cuando indicador es true", () => {
    render(<Label text="RUT" indicador />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("no muestra indicador cuando indicador es false", () => {
    render(<Label text="Opcional" />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("muestra mensaje de error cuando error es true", () => {
    render(<Label text="Campo" error />);
    expect(screen.getByText("requerido")).toBeInTheDocument();
  });

  it("no muestra error cuando error es false", () => {
    render(<Label text="Campo" />);
    expect(screen.queryByText("requerido")).not.toBeInTheDocument();
  });

  it("aplica htmlFor correctamente", () => {
    render(<Label text="Email" htmlFor="email-input" />);
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-input");
  });
});
