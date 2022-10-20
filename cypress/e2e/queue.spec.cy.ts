import {
  addButtonSelector,
  changingColor,
  circleContentSelector,
  circleHeadSelector,
  circleIndexSelector,
  circleSelector,
  circleTailSelector,
  inputSelector,
} from "../support/constants";
import { DELAY_IN_MS } from "../../src/constants/delays";
import { HEAD, TAIL } from "../../src/constants/element-captions";

describe("Queue page", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });
  const arrayToAdd = [1, 2, 3];

  it("Add button is disabled when input is empty", () => {
    cy.get(inputSelector).clear();
    cy.get(addButtonSelector).should("be.disabled");
  });
  it("Elements are added to the stack correctly", () => {
    cy.clock();
    for (let i = 0; i < arrayToAdd.length; i++) {
      cy.get(inputSelector).type(arrayToAdd[i].toString());
      cy.get(addButtonSelector).click();
      cy.get(circleSelector).then((nums) => {
        cy.wrap(nums)
          .eq(i)
          .should("have.css", "border-color", changingColor)
          .should("have.text", "");
      });
      cy.tick(DELAY_IN_MS);
      cy.get(circleContentSelector).then((nums) => {
        cy.wrap(nums)
          .eq(i)
          .find(circleHeadSelector)
          .should("have.text", i === 0 ? HEAD : "");
        cy.wrap(nums).eq(i).find(circleTailSelector).contains(TAIL);
        cy.wrap(nums).eq(i).find(circleIndexSelector).contains(i.toString());
      });
      cy.get(circleSelector).then((nums) => {
        cy.wrap(nums)
          .eq(i)
          .should("have.css", "border-color", changingColor)
          .contains(arrayToAdd[i].toString());
      });
      cy.tick(DELAY_IN_MS);
    }
  });
});
