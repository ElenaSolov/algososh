import {
  addButtonSelector,
  beDisabled,
  borderColor,
  changingColor,
  circleContentSelector,
  circleHeadSelector,
  circleIndexSelector,
  circleSelector,
  circleTailSelector,
  defaultColor,
  deleteButtonSelector,
  emptyString,
  haveCss,
  haveText,
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
    cy.get(addButtonSelector).should(beDisabled);
  });
  it("Elements are added to the stack correctly", () => {
    cy.clock();
    for (let i = 0; i < arrayToAdd.length; i++) {
      cy.get(inputSelector).type(arrayToAdd[i].toString());
      cy.get(addButtonSelector).click();
      cy.get(circleSelector).then((nums) => {
        cy.wrap(nums)
          .eq(i)
          .should(haveCss, borderColor, changingColor)
          .should(haveText, emptyString);
      });
      cy.tick(DELAY_IN_MS);
      cy.get(circleContentSelector).then((nums) => {
        cy.wrap(nums)
          .eq(i)
          .find(circleHeadSelector)
          .should(haveText, i === 0 ? HEAD : emptyString);
        cy.wrap(nums).eq(i).find(circleTailSelector).contains(TAIL);
        cy.wrap(nums).eq(i).find(circleIndexSelector).contains(i.toString());
      });
      cy.get(circleSelector).then((nums) => {
        cy.wrap(nums)
          .eq(i)
          .should(haveCss, borderColor, changingColor)
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
          .should(haveCss, borderColor, defaultColor)
          .should(
            haveText,
            i < arrayToAdd.length ? arrayToAdd[i].toString() : emptyString
          );
      }
      for (let i = 0; i < arrayToAdd.length; i++) {
        cy.get(deleteButtonSelector).click();
        cy.get(circleSelector).then((nums) => {
          cy.wrap(nums)
            .eq(i)
            .should(haveCss, borderColor, changingColor)
            .should(haveText, arrayToAdd[i].toString());
        });
        cy.tick(SHORT_DELAY_IN_MS);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circleSelector).then((nums) => {
          cy.wrap(nums)
            .eq(i)
            .should(haveCss, borderColor, defaultColor)
            .should(haveText, emptyString);
        });
        cy.get(circleContentSelector).then((nums) => {
          cy.wrap(nums)
            .eq(i + 1)
            .contains(HEAD);
        });
      }
      cy.get(deleteButtonSelector).should(beDisabled);
      cy.get(circleSelector).then((nums) => {
        for (let i = 0; i < maxArrayLength; i++) {
          cy.wrap(nums).eq(i).should(haveText, emptyString);
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
          .should(haveCss, borderColor, defaultColor)
          .should(
            haveText,
            i < arrayToAdd.length ? arrayToAdd[i].toString() : emptyString
          );
      }
    });
    cy.get(resetButtonSelector).click();
    cy.get(circleSelector).then((nums) => {
      for (let i = 0; i < maxArrayLength; i++) {
        cy.wrap(nums).eq(i).should(haveText, emptyString);
      }
    });
  });
});
