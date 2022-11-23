import { Circle } from "./circle";
import React from "react";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

describe("Circle component rendered correctly", () => {
  it("Circle without letter rendered correctly", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle with letter rendered correctly", () => {
    const circle = renderer.create(<Circle letter={"T"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle with HEAD of type string rendered correctly", () => {
    const circle = renderer.create(<Circle head={"HEAD"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle with HEAD of type react-element rendered correctly", () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle with TAIL of type string rendered correctly", () => {
    const circle = renderer.create(<Circle tail={"TAIL"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle with TAIL of type react-element rendered correctly", () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle with INDEX rendered correctly", () => {
    const circle = renderer.create(<Circle index={0} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle with props isSmall rendered correctly", () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle in default state rendered correctly", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle with changing state rendered correctly", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle with modified state rendered correctly", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
