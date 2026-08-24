import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UploadBox } from "../componentsUI/UploadBox";

describe("UploadBox", () => {
  it("renderiza texto normal y strong", () => {
    render(<UploadBox textStrong="Arrastra" text="o haz click" />);
    expect(screen.getByText("Arrastra")).toBeInTheDocument();
    expect(screen.getByText("o haz click")).toBeInTheDocument();
  });

  it("muestra formatos permitidos", () => {
    render(<UploadBox textStrong="T" text="t" allowedFormats=".pdf,.jpg" />);
    expect(screen.getByText(".pdf,.jpg")).toBeInTheDocument();
  });

  it("muestra tamaño maximo", () => {
    render(<UploadBox textStrong="T" text="t" maxSize="5MB" />);
    expect(screen.getAllByText(/5MB/).length).toBeGreaterThan(0);
  });

  it("muestra estado de confirmacion", () => {
    const { container } = render(<UploadBox textStrong="T" text="t" confirmacion />);
    expect(container.querySelector(".fill-green-500")).toBeInTheDocument();
  });

  it("muestra estado de error", () => {
    const { container } = render(<UploadBox textStrong="Error" text="archivo invalido" error />);
    expect(container.querySelector(".fill-red-500")).toBeInTheDocument();
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(<UploadBox textStrong="T" text="t" isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
