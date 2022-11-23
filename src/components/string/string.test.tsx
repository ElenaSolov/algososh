import React from "react";
import { StringComponent } from "./string";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DELAY_IN_MS } from "../../constants/delays";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import { act } from "react-dom/test-utils";

describe("<StringComponent />", () => {
  window.matchMedia = useMatchMedia();

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
    act(() => {
      jest.advanceTimersByTime(DELAY_IN_MS * 3);
    });

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
