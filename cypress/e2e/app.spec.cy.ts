describe("application and navigation is available", function () {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should be available on localhost:3000", function () {
    cy.visit("/");
  });
  it("fibonacci-page is available", () => {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });
  it("list-page is available", () => {
    cy.get('a[href*="list"]').click();
    cy.contains("Связный список");
  });
  it("queue-page is available", () => {
    cy.get('a[href*="queue"]').click();
    cy.contains("Очередь");
  });
  it("sorting-page is available", () => {
    cy.get('a[href*="sorting"]').click();
    cy.contains("Сортировка массива");
  });
  it("stack-page is available", () => {
    cy.get('a[href*="stack"]').click();
    cy.contains("Стек");
  });
  it("string-page is available", () => {
    cy.get('a[href*="recursion"]').click();
    cy.contains("Строка");
  });
});
export {};
