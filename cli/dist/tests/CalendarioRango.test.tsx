import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CalendarioRango } from "../componentsUI/CalendarioRango";

describe("CalendarioRango", () => {
  it("renderiza el calendario con dias de la semana", () => {
    render(<CalendarioRango />);
    expect(screen.getByText("Lu")).toBeInTheDocument();
    expect(screen.getByText("Vi")).toBeInTheDocument();
    expect(screen.getByText("Do")).toBeInTheDocument();
  });

  it("muestra la leyenda de feriados", () => {
    render(<CalendarioRango />);
    expect(screen.getByText("Feriado")).toBeInTheDocument();
    expect(screen.getByText("Hoy")).toBeInTheDocument();
  });

  it("renderiza con mes y año inicial personalizado", () => {
    render(<CalendarioRango initialMonth={0} initialYear={2025} />);
    expect(screen.getAllByText("Enero 2025").length).toBeGreaterThan(0);
  });

  it("renderiza en modo double con dos paneles", () => {
    render(<CalendarioRango mode="double" initialMonth={5} initialYear={2025} />);
    expect(screen.getByText("Fecha inicio")).toBeInTheDocument();
    expect(screen.getByText("Fecha término")).toBeInTheDocument();
  });

  it("tiene botones de navegacion de mes", () => {
    render(<CalendarioRango />);
    expect(screen.getByLabelText("Mes anterior")).toBeInTheDocument();
    expect(screen.getByLabelText("Mes siguiente")).toBeInTheDocument();
  });
});
