import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IndicadorRequerido } from "../componentsUI/IndicadorRequerido";

describe("IndicadorRequerido", () => {
  it("renderiza un asterisco rojo", () => {
    render(<IndicadorRequerido />);
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-red-500");
  });
});
