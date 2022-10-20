import {
  addByIndexButtonSelector,
  addToHeadButtonSelector,
  addToTailButtonSelector,
  changingColor,
  circleContentSelector,
  circleHeadSelector,
  circleIndexSelector,
  circleSelector,
  circleTailSelector,
  defaultColor,
  deleteByIndexButtonSelector,
  deleteFromHeadButtonSelector,
  indexInputSelector,
  listElementSelector,
  modifiedColor,
  valueInputSelector,
} from "../support/constants";
import { defaultListLength } from "../../src/constants/initialValues";
import { HEAD, TAIL } from "../../src/constants/element-captions";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Queue page", () => {
  beforeEach(() => {
    cy.visit("/list");
  });
  const arrayToAdd = [1, 2, 3];

  it("Add buttons are disabled when value input is empty", () => {
    cy.get(valueInputSelector).clear();
    cy.get(addToTailButtonSelector).should("be.disabled");
    cy.get(addToHeadButtonSelector).should("be.disabled");
    cy.get(addByIndexButtonSelector).should("be.disabled");
  });
  it("Add and delete by index buttons are disabled when index input is empty", () => {
    cy.get(valueInputSelector).type("2");
    cy.get(indexInputSelector).clear();
    cy.get(deleteByIndexButtonSelector).should("be.disabled");
    cy.get(addByIndexButtonSelector).should("be.disabled");
  });
  it("Default list rendered correctly", () => {
    cy.get(circleContentSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength);
      for (let i = 0; i < defaultListLength; i++) {
        cy.wrap(nums).eq(i).find(".text_type_circle").should("not.be.empty");
        cy.wrap(nums)
          .eq(i)
          .find(circleHeadSelector)
          .should("have.text", i === 0 ? HEAD : "");
        cy.wrap(nums)
          .eq(i)
          .find(circleTailSelector)
          .should("have.text", i === defaultListLength - 1 ? TAIL : "");
        cy.wrap(nums).eq(i).find(circleIndexSelector).contains(i.toString());
      }
    });
    cy.get(circleSelector).then((nums) => {
      for (let i = 0; i < defaultListLength; i++) {
        cy.wrap(nums).eq(i).should("have.css", "border-color", defaultColor);
      }
    });
  });
  it("addToHead button adds element correctly", () => {
    cy.clock();
    cy.get(valueInputSelector).type(arrayToAdd[0].toString());
    cy.get(addToHeadButtonSelector).click();
    cy.get(circleContentSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength + 1);
      cy.wrap(nums)
        .eq(0)
        .find(circleSelector)
        .should("have.css", "border-color", changingColor);
      cy.wrap(nums)
        .eq(0)
        .find(circleHeadSelector)
        .find(circleSelector)
        .should("have.css", "border-color", changingColor)
        .contains(arrayToAdd[0].toString());
      for (let i = 2; i <= defaultListLength; i++) {
        cy.wrap(nums)
          .eq(i)
          .find(circleSelector)
          .should("have.css", "border-color", defaultColor);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleContentSelector).then((nums) => {
      cy.wrap(nums)
        .eq(0)
        .find(circleSelector)
        .should("have.css", "border-color", modifiedColor)
        .contains(arrayToAdd[0].toString());
      cy.wrap(nums).eq(0).find(circleHeadSelector).contains(HEAD);
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength + 1);
      for (let i = 0; i <= defaultListLength; i++) {
        cy.wrap(nums).eq(i).should("have.css", "border-color", defaultColor);
      }
    });
  });
  // it("addToTail button adds element correctly", () => {
  //   cy.clock();
  //   cy.get(valueInputSelector).type(arrayToAdd[0].toString());
  //   cy.get(addToTailButtonSelector).click();
  //   cy.get(circleContentSelector).then((nums) => {
  //     expect(nums).to.have.length(defaultListLength + 1);
  //     cy.wrap(nums)
  //       .eq(defaultListLength - 1)
  //       .find(circleSelector)
  //       .should("have.css", "border-color", changingColor);
  //     cy.wrap(nums)
  //       .eq(defaultListLength - 1)
  //       .find(circleHeadSelector)
  //       .find(circleSelector)
  //       .should("have.css", "border-color", changingColor)
  //       .contains(arrayToAdd[0].toString());
  //     for (let i = 0; i < defaultListLength - 1; i++) {
  //       cy.wrap(nums)
  //         .eq(i)
  //         .find(circleSelector)
  //         .should("have.css", "border-color", defaultColor);
  //     }
  //   });
  //   cy.tick(SHORT_DELAY_IN_MS);
  //   cy.get(circleContentSelector).then((nums) => {
  //     cy.wrap(nums)
  //       .eq(defaultListLength)
  //       .find(circleSelector)
  //       .should("have.css", "border-color", modifiedColor)
  //       .contains(arrayToAdd[0].toString());
  //     cy.wrap(nums)
  //       .eq(defaultListLength)
  //       .find(circleTailSelector)
  //       .contains(TAIL);
  //   });
  //   cy.tick(SHORT_DELAY_IN_MS);
  //   cy.get(circleSelector).then((nums) => {
  //     expect(nums).to.have.length(defaultListLength + 1);
  //     for (let i = 0; i <= defaultListLength; i++) {
  //       cy.wrap(nums).eq(i).should("have.css", "border-color", defaultColor);
  //     }
  //   });
  // });
  // it("AddByIndex button adds value correctly", () => {
  //   const value = "1";
  //   const index = 1;
  //
  //   cy.clock();
  //
  //   cy.get(valueInputSelector).type(value);
  //   cy.get(indexInputSelector).type(index.toString());
  //   cy.get(addByIndexButtonSelector).click();
  //   cy.get(listElementSelector).then((nums) => {
  //     for (let i = 0; i <= index; i++) {
  //       cy.wrap(nums)
  //         .eq(i)
  //         .find(circleSelector)
  //         .should("have.css", "border-color", changingColor);
  //       cy.wrap(nums)
  //         .eq(i)
  //         .find(circleHeadSelector)
  //         .find(circleSelector)
  //         .should("have.css", "border-color", changingColor)
  //         .contains(value);
  //       cy.tick(SHORT_DELAY_IN_MS);
  //     }
  //   });
  //   cy.get(listElementSelector).then((nums) => {
  //     expect(nums).have.length(defaultListLength + 1);
  //     cy.wrap(nums)
  //       .eq(index)
  //       .find(circleSelector)
  //       .should("have.css", "border-color", modifiedColor)
  //       .contains(value);
  //     cy.wrap(nums)
  //       .eq(index)
  //       .find(circleIndexSelector)
  //       .should("have.text", index.toString());
  //   });
  //   cy.tick(SHORT_DELAY_IN_MS);
  //   cy.get(listElementSelector).then((nums) => {
  //     expect(nums).have.length(defaultListLength + 1);
  //     for (let i = 0; i <= defaultListLength; i++) {
  //       cy.wrap(nums)
  //         .eq(i)
  //         .find(circleSelector)
  //         .should("have.css", "border-color", defaultColor);
  //     }
  //   });
  // });
  it("DeleteFromHead button works correctly", () => {
    cy.clock();
    cy.get(deleteFromHeadButtonSelector).click();
    cy.get(listElementSelector).then((nums) => {
      cy.wrap(nums)
        .eq(0)
        .find(circleTailSelector)
        .find(circleSelector)
        .should("have.css", "border-color", changingColor)
        .should("not.be.empty");
      cy.wrap(nums)
        .eq(0)
        .find(circleSelector)
        .eq(0)
        .should("have.text", "")
        .should("have.css", "border-color", defaultColor);
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(listElementSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength - 1);
      cy.wrap(nums).eq(0).find(circleHeadSelector).should("have.text", HEAD);
      cy.wrap(nums).eq(0).find(circleSelector).should("not.have.text", "");
      cy.wrap(nums).eq(0).find(circleIndexSelector).should("have.text", "0");
    });
  });
});
