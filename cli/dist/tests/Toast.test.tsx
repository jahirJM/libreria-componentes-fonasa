import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FonasaToaster, fonasaToast } from "../componentsUI/Toast";

describe("Toast", () => {
  it("renderiza el Toaster sin errores", () => {
    const { container } = render(<FonasaToaster />);
    expect(container).toBeInTheDocument();
  });

  it("fonasaToast tiene metodos success, error, info, warning", () => {
    expect(typeof fonasaToast.success).toBe("function");
    expect(typeof fonasaToast.error).toBe("function");
    expect(typeof fonasaToast.info).toBe("function");
    expect(typeof fonasaToast.warning).toBe("function");
  });
});
