import {
  addByIndexButtonSelector,
  addToHeadButtonSelector,
  addToTailButtonSelector,
  borderColor,
  changingColor,
  circleContentSelector,
  circleHeadSelector,
  circleIndexSelector,
  circleSelector,
  circleTailSelector,
  defaultColor,
  deleteByIndexButtonSelector,
  deleteFromHeadButtonSelector,
  deleteFromTailButtonSelector,
  emptyString,
  haveCss,
  haveText,
  indexInputSelector,
  listElementSelector,
  modifiedColor,
  notBeEmpty,
  notHaveText,
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
        cy.wrap(nums).eq(i).find(".text_type_circle").should(notBeEmpty);
        cy.wrap(nums)
          .eq(i)
          .find(circleHeadSelector)
          .should(haveText, i === 0 ? HEAD : emptyString);
        cy.wrap(nums)
          .eq(i)
          .find(circleTailSelector)
          .should(haveText, i === defaultListLength - 1 ? TAIL : emptyString);
        cy.wrap(nums).eq(i).find(circleIndexSelector).contains(i.toString());
      }
    });
    cy.get(circleSelector).then((nums) => {
      for (let i = 0; i < defaultListLength; i++) {
        cy.wrap(nums).eq(i).should(haveCss, borderColor, defaultColor);
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
        .should(haveCss, borderColor, changingColor);
      cy.wrap(nums)
        .eq(0)
        .find(circleHeadSelector)
        .find(circleSelector)
        .should(haveCss, borderColor, changingColor)
        .contains(arrayToAdd[0].toString());
      for (let i = 2; i <= defaultListLength; i++) {
        cy.wrap(nums)
          .eq(i)
          .find(circleSelector)
          .should(haveCss, borderColor, defaultColor);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleContentSelector).then((nums) => {
      cy.wrap(nums)
        .eq(0)
        .find(circleSelector)
        .should(haveCss, borderColor, modifiedColor)
        .contains(arrayToAdd[0].toString());
      cy.wrap(nums).eq(0).find(circleHeadSelector).contains(HEAD);
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength + 1);
      for (let i = 0; i <= defaultListLength; i++) {
        cy.wrap(nums).eq(i).should(haveCss, borderColor, defaultColor);
      }
    });
  });
  it("addToTail button adds element correctly", () => {
    cy.clock();
    cy.get(valueInputSelector).type(arrayToAdd[0].toString());
    cy.get(addToTailButtonSelector).click();
    cy.get(circleContentSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength + 1);
      cy.wrap(nums)
        .eq(defaultListLength - 1)
        .find(circleSelector)
        .should(haveCss, borderColor, changingColor);
      cy.wrap(nums)
        .eq(defaultListLength - 1)
        .find(circleHeadSelector)
        .find(circleSelector)
        .should(haveCss, borderColor, changingColor)
        .contains(arrayToAdd[0].toString());
      for (let i = 0; i < defaultListLength - 1; i++) {
        cy.wrap(nums)
          .eq(i)
          .find(circleSelector)
          .should(haveCss, borderColor, defaultColor);
      }
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleContentSelector).then((nums) => {
      cy.wrap(nums)
        .eq(defaultListLength)
        .find(circleSelector)
        .should(haveCss, borderColor, modifiedColor)
        .contains(arrayToAdd[0].toString());
      cy.wrap(nums)
        .eq(defaultListLength)
        .find(circleTailSelector)
        .contains(TAIL);
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength + 1);
      for (let i = 0; i <= defaultListLength; i++) {
        cy.wrap(nums).eq(i).should(haveCss, borderColor, defaultColor);
      }
    });
  });
  it("AddByIndex button adds value correctly", () => {
    const value = "1";
    const index = 1;

    cy.clock();

    cy.get(valueInputSelector).type(value);
    cy.get(indexInputSelector).type(index.toString());
    cy.get(addByIndexButtonSelector).click();
    cy.get(listElementSelector).then((nums) => {
      for (let i = 0; i <= index; i++) {
        cy.wrap(nums)
          .eq(i)
          .find(circleSelector)
          .should(haveCss, borderColor, changingColor);
        cy.wrap(nums)
          .eq(i)
          .find(circleHeadSelector)
          .find(circleSelector)
          .should(haveCss, borderColor, changingColor)
          .contains(value);
        cy.tick(SHORT_DELAY_IN_MS);
      }
    });
    cy.get(listElementSelector).then((nums) => {
      expect(nums).have.length(defaultListLength + 1);
      cy.wrap(nums)
        .eq(index)
        .find(circleSelector)
        .should(haveCss, borderColor, modifiedColor)
        .contains(value);
      cy.wrap(nums)
        .eq(index)
        .find(circleIndexSelector)
        .should(haveText, index.toString());
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(listElementSelector).then((nums) => {
      expect(nums).have.length(defaultListLength + 1);
      for (let i = 0; i <= defaultListLength; i++) {
        cy.wrap(nums)
          .eq(i)
          .find(circleSelector)
          .should(haveCss, borderColor, defaultColor);
      }
    });
  });
  it("DeleteFromHead button works correctly", () => {
    cy.clock();
    cy.get(deleteFromHeadButtonSelector).click();
    cy.get(listElementSelector).then((nums) => {
      cy.wrap(nums)
        .eq(0)
        .find(circleTailSelector)
        .find(circleSelector)
        .should(haveCss, borderColor, changingColor)
        .should(notBeEmpty);
      cy.wrap(nums)
        .eq(0)
        .find(circleSelector)
        .eq(0)
        .should(haveText, emptyString)
        .should(haveCss, borderColor, defaultColor);
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(listElementSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength - 1);
      cy.wrap(nums).eq(0).find(circleHeadSelector).should(haveText, HEAD);
      cy.wrap(nums).eq(0).find(circleSelector).should(notHaveText, emptyString);
      cy.wrap(nums).eq(0).find(circleIndexSelector).should(haveText, "0");
    });
  });
  it("DeleteFromTail button works correctly", () => {
    cy.clock();
    cy.get(listElementSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength);
    });
    cy.get(deleteFromTailButtonSelector).click();
    cy.get(listElementSelector).then((nums) => {
      cy.wrap(nums)
        .eq(defaultListLength - 1)
        .find(circleTailSelector)
        .find(circleSelector)
        .should(haveCss, borderColor, changingColor)
        .should(notBeEmpty);
      cy.wrap(nums)
        .eq(defaultListLength - 1)
        .find(circleSelector)
        .eq(0)
        .should(haveText, emptyString)
        .should(haveCss, borderColor, defaultColor);
    });
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(listElementSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength - 1);
      cy.wrap(nums)
        .eq(defaultListLength - 2)
        .find(circleTailSelector)
        .should(haveText, TAIL);
      cy.wrap(nums)
        .eq(defaultListLength - 2)
        .find(circleSelector)
        .should(notHaveText, emptyString);
      cy.wrap(nums)
        .eq(defaultListLength - 2)
        .find(circleIndexSelector)
        .should(haveText, defaultListLength - 2);
    });
  });
  it("DeleteByIndex button works correctly", () => {
    const index = 1;
    cy.clock();
    cy.get(indexInputSelector).type(index.toString());
    cy.get(deleteByIndexButtonSelector).click();
    for (let i = 0; i <= index; i++) {
      cy.get(circleSelector).then((nums) => {
        cy.wrap(nums)
          .eq(i)
          .should(haveCss, borderColor, changingColor)
          .should(notBeEmpty);
        cy.wrap(nums)
          .eq(i + 1)
          .should(haveCss, borderColor, defaultColor)
          .should(notBeEmpty);
        cy.tick(SHORT_DELAY_IN_MS);
      });
    }
    cy.get(listElementSelector)
      .eq(index)
      .find(circleSelector)
      .should(notHaveText, emptyString);
    cy.get(listElementSelector)
      .eq(index)
      .find(circleIndexSelector)
      .should(haveText, index);
    cy.get(listElementSelector)
      .eq(index)
      .find(circleTailSelector)
      .find(circleSelector)
      .should(haveCss, borderColor, changingColor)
      .should(notBeEmpty);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circleSelector).then((nums) => {
      expect(nums).to.have.length(defaultListLength - 1);
      cy.wrap(nums).each((num) => {
        cy.wrap(num)
          .should(haveCss, borderColor, defaultColor)
          .should(notBeEmpty);
      });
    });
  });
});
