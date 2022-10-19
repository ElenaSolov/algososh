import {
  addButtonSelector,
  changingColor,
  circleSelector,
  defaultColor,
  inputSelector,
} from "../support/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Stack page", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });

  it("Button is disabled when input is empty", () => {
    cy.get(inputSelector).clear();
    cy.get(addButtonSelector).should("be.disabled");
  });
  it("Elements are added to the stack correctly", () => {
    const arrayToAdd = [1, 2, 3];
    cy.clock();
    for (let i = 0; i < arrayToAdd.length; i++) {
      cy.get(inputSelector).type(arrayToAdd[i].toString());
      cy.get(addButtonSelector).click();
      cy.get(circleSelector).then((nums) => {
        expect(nums).length.to.have.length(i + 1);
        cy.wrap(nums)
          .eq(i)
          .should("have.css", "border-color", changingColor)
          .contains(arrayToAdd[i]);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.wrap(nums)
          .eq(i)
          .should("have.css", "border-color", defaultColor)
          .contains(arrayToAdd[i]);
        if (i > 0) {
          const prevElsCount = i - 1;
          for (let i = 0; i <= prevElsCount; i++) {
            cy.wrap(nums)
              .eq(i)
              .should("have.css", "border-color", defaultColor)
              .contains(arrayToAdd[i]);
          }
        }
      });
    }
  });
});
