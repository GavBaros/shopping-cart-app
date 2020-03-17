//selects quantity and size and clicks 'Add to cart'
Cypress.Commands.add("addItemToCart", (QUANTITY, SIZE) => {
  cy.get("select").select(SIZE);

  cy.get("input")
    .eq(0)
    .as("quantityInput");

  cy.get("@quantityInput").type(QUANTITY);

  cy.get("input")
    .eq(1)
    .click();
});

//find and click Delete All button
Cypress.Commands.add("deleteAllItems", () => {
  cy.get("button")
    .eq(2)
    .contains("Delete all items")
    .click();
});

//goes to '/cart'
Cypress.Commands.add("goToCart", CART => {
  cy.get("nav")
    .find("a")
    .contains(CART)
    .click();
});

//clicks on the 2nd product from the products list in '/'
Cypress.Commands.add("clickOnProduct", () => {
  cy.visit("/");
  cy.get("main")
    .find("a")
    .eq(1)
    .click();
});
