import React from "react";
import { StringComponent } from "./string";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DELAY_IN_MS } from "../../constants/delays";

describe("<StringComponent />", () => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addEventListener: function () {},
        removeEventListener: function () {},
      };
    };
  const testString = (value: string, result: string) => {
    jest.useFakeTimers();
    const { container } = render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Развернуть");
    fireEvent.change(input, { target: { value } });
    fireEvent.click(button);
    jest.advanceTimersByTime(DELAY_IN_MS * 3);

    const letters = Array.from(container.querySelectorAll(".text_type_circle"))
      .map((letter) => letter.textContent)
      .join("");
    expect(letters).toBe(result);
  };
  it("StringComponent converts string with even number of letters correctly", () => {
    testString("1234", "4321");
  });
  it("StringComponent converts string with odd number of letters correctly", () => {
    testString("123", "321");
  });
  it("StringComponent converts string with one letter correctly", () => {
    testString("1", "1");
  });
  it("StringComponent converts string with odd number of letters correctly", () => {
    testString("", "");
  });
});
