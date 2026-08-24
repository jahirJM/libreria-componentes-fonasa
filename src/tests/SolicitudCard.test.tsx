import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SolicitudCard } from "../componentsUI/SolicitudCard";

describe("SolicitudCard", () => {
  it("renderiza el id y tipo de solicitud", () => {
    render(
      <SolicitudCard
        id={1234}
        tipo="Bonificación"
        estado={{ label: "Pendiente", variant: "estado-pendiente" }}
      />
    );
    expect(screen.getByText("#1234")).toBeInTheDocument();
    expect(screen.getByText("Bonificación")).toBeInTheDocument();
  });

  it("renderiza el badge de estado", () => {
    render(
      <SolicitudCard
        id={1}
        tipo="Test"
        estado={{ label: "Aprobada", variant: "estado-aprobada" }}
      />
    );
    expect(screen.getByText("Aprobada")).toBeInTheDocument();
  });

  it("muestra fechas de envio y resolucion", () => {
    render(
      <SolicitudCard
        id={1}
        tipo="Test"
        estado={{ label: "Pendiente", variant: "estado-pendiente" }}
        fechaEnvio="15/03/2025"
        fechaResolucion="20/03/2025"
      />
    );
    expect(screen.getByText("15/03/2025")).toBeInTheDocument();
    expect(screen.getByText("20/03/2025")).toBeInTheDocument();
  });

  it("muestra acordeon de documentos cuando hay documentos", () => {
    render(
      <SolicitudCard
        id={1}
        tipo="Test"
        estado={{ label: "Pendiente", variant: "estado-pendiente" }}
        documentos={[{ id: "1", nombre: "Certificado.pdf" }]}
      />
    );
    expect(screen.getByText("1 documento")).toBeInTheDocument();
  });

  it("expande documentos al hacer click", () => {
    render(
      <SolicitudCard
        id={1}
        tipo="Test"
        estado={{ label: "Pendiente", variant: "estado-pendiente" }}
        documentos={[{ id: "1", nombre: "Certificado.pdf" }]}
      />
    );
    fireEvent.click(screen.getByText("1 documento"));
    expect(screen.getByText("Certificado.pdf")).toBeInTheDocument();
  });
});
