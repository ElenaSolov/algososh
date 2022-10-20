import {
  addButtonSelector,
  changingColor,
  circleContentSelector,
  circleHeadSelector,
  circleIndexSelector,
  circleSelector,
  circleTailSelector,
  defaultColor,
  deleteButtonSelector,
  inputSelector,
  resetButtonSelector,
} from "../support/constants";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { HEAD, TAIL } from "../../src/constants/element-captions";
import { maxArrayLength } from "../../src/constants/initialValues";

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
  it("Elements are deleted from the stack correctly", () => {
    cy.clock();
    for (let i = 0; i < arrayToAdd.length; i++) {
      cy.get(inputSelector).type(arrayToAdd[i].toString());
      cy.get(addButtonSelector).click();
      cy.tick(DELAY_IN_MS);
      cy.tick(DELAY_IN_MS);
    }
    cy.get(circleSelector).then((nums) => {
      expect(nums).to.have.length(maxArrayLength);
      for (let i = 0; i < maxArrayLength; i++) {
        cy.wrap(nums)
          .eq(i)
          .should("have.css", "border-color", defaultColor)
          .should(
            "have.text",
            i < arrayToAdd.length ? arrayToAdd[i].toString() : ""
          );
      }
      for (let i = 0; i < arrayToAdd.length; i++) {
        cy.get(deleteButtonSelector).click();
        cy.get(circleSelector).then((nums) => {
          cy.wrap(nums)
            .eq(i)
            .should("have.css", "border-color", changingColor)
            .should("have.text", arrayToAdd[i].toString());
        });
        cy.tick(SHORT_DELAY_IN_MS);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circleSelector).then((nums) => {
          cy.wrap(nums)
            .eq(i)
            .should("have.css", "border-color", defaultColor)
            .should("have.text", "");
        });
        cy.get(circleContentSelector).then((nums) => {
          cy.wrap(nums)
            .eq(i + 1)
            .contains(HEAD);
        });
      }
      cy.get(deleteButtonSelector).should("be.disabled");
      cy.get(circleSelector).then((nums) => {
        for (let i = 0; i < maxArrayLength; i++) {
          cy.wrap(nums).eq(i).should("have.text", "");
        }
      });
    });
  });
  it("Reset button deletes all the elements of the queue", () => {
    cy.clock();
    for (let i = 0; i < arrayToAdd.length; i++) {
      cy.get(inputSelector).type(arrayToAdd[i].toString());
      cy.get(addButtonSelector).click();
      cy.tick(DELAY_IN_MS);
      cy.tick(DELAY_IN_MS);
    }
    cy.get(circleSelector).then((nums) => {
      expect(nums).to.have.length(maxArrayLength);
      for (let i = 0; i < maxArrayLength; i++) {
        cy.wrap(nums)
          .eq(i)
          .should("have.css", "border-color", defaultColor)
          .should(
            "have.text",
            i < arrayToAdd.length ? arrayToAdd[i].toString() : ""
          );
      }
    });
    cy.get(resetButtonSelector).click();
    cy.get(circleSelector).then((nums) => {
      for (let i = 0; i < maxArrayLength; i++) {
        cy.wrap(nums).eq(i).should("have.text", "");
      }
    });
  });
});
