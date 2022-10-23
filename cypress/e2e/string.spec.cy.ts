import {
  borderColor,
  changingColor,
  circleSelector,
  defaultColor,
  haveCss,
  inputSelector,
  modifiedColor,
  submitBtnSelector,
} from "../support/constants";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Spring page", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });

  it("Button is disabled when input is empty", () => {
    cy.get(inputSelector).clear();
    cy.get(submitBtnSelector).should("be.disabled");
  });
  it("String turn-round animation works correctly", () => {
    const initialInputValue = "1234";
    cy.clock();
    cy.get(inputSelector).type(initialInputValue);
    cy.get(submitBtnSelector).click();
    cy.get(circleSelector).then((letters) => {
      expect(letters).to.have.length(4);
      cy.wrap(letters)
        .eq(0)
        .should(haveCss, borderColor, changingColor)
        .contains(1);
      cy.wrap(letters)
        .eq(1)
        .should(haveCss, borderColor, defaultColor)
        .contains(2);
      cy.wrap(letters)
        .eq(2)
        .should(haveCss, borderColor, defaultColor)
        .contains(3);
      cy.wrap(letters)
        .eq(3)
        .should(haveCss, borderColor, changingColor)
        .contains(4);
      cy.tick(DELAY_IN_MS);
      cy.wrap(letters)
        .eq(0)
        .should(haveCss, borderColor, modifiedColor)
        .contains(4);
      cy.wrap(letters)
        .eq(1)
        .should(haveCss, borderColor, changingColor)
        .contains(2);
      cy.wrap(letters)
        .eq(2)
        .should(haveCss, borderColor, changingColor)
        .contains(3);
      cy.wrap(letters)
        .eq(3)
        .should(haveCss, borderColor, modifiedColor)
        .contains(1);
      cy.tick(DELAY_IN_MS);
      cy.wrap(letters)
        .eq(0)
        .should(haveCss, borderColor, modifiedColor)
        .contains(4);
      cy.wrap(letters)
        .eq(1)
        .should(haveCss, borderColor, modifiedColor)
        .contains(3);
      cy.wrap(letters)
        .eq(2)
        .should(haveCss, borderColor, modifiedColor)
        .contains(2);
      cy.wrap(letters)
        .eq(3)
        .should(haveCss, borderColor, modifiedColor)
        .contains(1);
    });
  });
});

export {};
