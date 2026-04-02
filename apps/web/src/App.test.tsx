import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the main heading", () => {
    render(() => <App />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe("Bread Recipes");
  });
});
