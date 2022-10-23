import { Button } from "./button";
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";
import { Direction } from "../../../types/direction";

describe("Button rendered correctly", () => {
  it("Button without text rendered correctly", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Button with text rendered correctly", () => {
    const button = renderer.create(<Button text="Test" />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Disabled Button is disabled", () => {
    const button = renderer
      .create(<Button text="Test" disabled={true} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Loader rendered correctly and button with loader is disabled", () => {
    const button = renderer
      .create(<Button text="Test" isLoader={true} />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Ascending sorting icon rendered correctly", () => {
    const button = renderer
      .create(
        <Button sorting={Direction.Ascending} />
      )
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Descending sorting icon rendered correctly", () => {
    const button = renderer
      .create(
        <Button sorting={Direction.Descending} />
      )
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Button without sorting icon rendered correctly", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Button click fires callback", () => {
    const onClick = jest.fn();
    render(<Button text="Test" onClick={onClick} />);
    const button = screen.getByText("Test");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
