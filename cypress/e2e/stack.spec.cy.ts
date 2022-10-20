import {
  addButtonSelector,
  changingColor,
  circleSelector,
  defaultColor,
  deleteButtonSelector,
  inputSelector,
  resetButtonSelector,
} from "../support/constants";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Stack page", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });
  const arrayToAdd = [1, 2, 3];

  it("Button is disabled when input is empty", () => {
    cy.get(inputSelector).clear();
    cy.get(addButtonSelector).should("be.disabled");
  });
  it("Elements are added to the stack correctly", () => {
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
  it("Elements are deleted from stack correctly", () => {
    for (let i = 0; i < arrayToAdd.length; i++) {
      cy.get(inputSelector).type(arrayToAdd[i].toString());
      cy.get(addButtonSelector).click();
    }
    cy.get(circleSelector).then((nums) => {
      expect(nums).length.to.have.length(arrayToAdd.length);
    });
    cy.clock();
    cy.tick(DELAY_IN_MS);
    for (let i = 0; i < arrayToAdd.length; i++) {
      cy.get(deleteButtonSelector).click();
      cy.get(circleSelector).then((nums) => {
        expect(nums).length.to.have.length(arrayToAdd.length - i);
        cy.wrap(nums)
          .eq(arrayToAdd.length - i - 1)
          .should("have.css", "border-color", changingColor);
      });
      cy.tick(DELAY_IN_MS);
      if (i < arrayToAdd.length - 1) {
        cy.get(circleSelector).then((nums) => {
          expect(nums).length.to.have.length(arrayToAdd.length - i - 1);
        });
      } else {
        cy.get(circleSelector).should("not.exist");
        cy.get(deleteButtonSelector).should("be.disabled");
      }
    }
  });
  it("Reset button deletes all the elements from the stack", () => {
    for (let i = 0; i < arrayToAdd.length; i++) {
      cy.get(inputSelector).type(arrayToAdd[i].toString());
      cy.get(addButtonSelector).click();
    }
    cy.get(circleSelector).then((nums) => {
      expect(nums).length.to.have.length(arrayToAdd.length);
    });
    cy.get(resetButtonSelector).click();
    cy.get(circleSelector).should("not.exist");
    cy.get(resetButtonSelector).should("be.disabled");
  });
});
