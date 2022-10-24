import {
  borderColor,
  circleSelector,
  defaultColor,
  haveCss,
  inputSelector,
  submitBtnSelector,
} from "../support/constants";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Spring page", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  it("Button is disabled when input is empty", () => {
    cy.get(inputSelector).clear();
    cy.get(submitBtnSelector).should("be.disabled");
  });
  it("Fibonacci numbers are generated correctly", () => {
    const initialInputValue = "4";
    const fibonacciOrder = [1, 1, 2, 3, 5];
    cy.clock();
    cy.get(inputSelector).type(initialInputValue);
    cy.get(submitBtnSelector).click();

    for (let i = 0; i <= +initialInputValue; i++) {
      cy.get(circleSelector).then((nums) => {
        expect(nums).to.have.length(i + 1);
        cy.wrap(nums)
          .eq(i)
          .should(haveCss, borderColor, defaultColor)
          .contains(fibonacciOrder[i]);
      });
      cy.tick(DELAY_IN_MS);
    }
  });
});
