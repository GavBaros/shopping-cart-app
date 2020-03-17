const CART = /^Cart$/;
const CART_EMPTY = /^Cart is empty$/;
const REMOVE_ITEM = /^Remove item$/;
const SECOND_SELECTED_SIZE = "A2";
const SELECTED_SIZE = "A3";
const SELECTED_QUANTITY = "3";
const TOTAL_PRICE = "540";

describe("On the '/cart' route, a user can: ", () => {
  beforeEach(() => {
    context("From '/', click on 2nd product and select size A3", () => {
      cy.clickOnProduct();
    });
  });

  it("Delete all items from cart", () => {
    context("Add 2 items to the cart", () => {
      cy.addItemToCart(SELECTED_QUANTITY, SECOND_SELECTED_SIZE);
      cy.addItemToCart(SELECTED_QUANTITY, SELECTED_SIZE);
    });

    context("Go to /cart and delete all items in cart", () => {
      cy.goToCart(CART);
      cy.deleteAllItems();

      //Expect 'Cart is empty' to be shown
      cy.get("h2").contains(CART_EMPTY);
    });
  });

  it("Delete one item from cart", () => {
    context("Add 2 items to the cart", () => {
      cy.addItemToCart(SELECTED_QUANTITY, SECOND_SELECTED_SIZE);
      cy.addItemToCart(SELECTED_QUANTITY, SELECTED_SIZE);
    });

    cy.goToCart(CART);

    //find and click Remove item button
    cy.get("button")
      .eq(0)
      .contains(REMOVE_ITEM)
      .click();

    //One CartItem
    cy.get("li").should("have.length", 1);
  });

  it("See total price of all items in cart ", () => {
    context("Add 2 items to the cart", () => {
      cy.addItemToCart(SELECTED_QUANTITY, SECOND_SELECTED_SIZE);
      cy.addItemToCart(SELECTED_QUANTITY, SELECTED_SIZE);
    });

    cy.goToCart(CART);

    cy.get("strong").contains(TOTAL_PRICE);
  });
});
