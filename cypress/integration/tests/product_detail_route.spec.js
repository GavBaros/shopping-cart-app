const CART = /^Cart$/;
const TITLE = /^Unframed Col Du Glandon Art Print$/;
const SECOND_SELECTED_SIZE = "A2";
const SELECTED_SIZE = "A3";
const SELECTED_PRICE = 80;
const SELECTED_QUANTITY = "3";

describe("On the '/product/:brand/:id' route: ", () => {
  beforeEach(() => {
    context("Starting from '/', click on a prodict and select size A3", () => {
      cy.clickOnProduct();
      cy.get("select").select(SELECTED_SIZE);
    });
  });

  it("'Add to cart' is disabled if no quantity chosen", () => {
    cy.get("input")
      .eq(1)
      .should("be.disabled");
  });

  it("'Add to cart' enabled if quantity chosen", () => {
    cy.get("input")
      .eq(0)
      .type(SELECTED_QUANTITY);

    cy.get("input")
      .eq(1)
      .should("not.be.disabled");
  });

  it("One product can be added to cart", () => {
    context("Select a quantity then add product to cart", () => {
      cy.addItemToCart(SELECTED_QUANTITY, SELECTED_SIZE);
    });

    context(
      "Go to '/cart' and confirm if product is present by seeing its data rendered in JSX",
      () => {
        context("Navigate to /cart", () => {
          cy.goToCart(CART);
        });

        context("Get first CartItem and confirm its data is rendered", () => {
          cy.get("li")
            .eq(0)
            .as("firstCartItem");

          cy.get("@firstCartItem")
            .get("h5")
            .contains(TITLE);

          cy.get("@firstCartItem")
            .get("p")
            .eq(0)
            .contains(SELECTED_SIZE);

          cy.get("@firstCartItem")
            .get("b")
            .contains(SELECTED_PRICE);

          cy.get("@firstCartItem")
            .get("input")
            .should("have.value", SELECTED_QUANTITY);

          cy.get("@firstCartItem")
            .get("button")
            .contains("Remove item");
        });
      }
    );
  });

  it("More than one product differing in sizes can be added to cart", () => {
    context("Adds 3 A3 sizes to cart", () => {
      cy.addItemToCart(SELECTED_QUANTITY, SELECTED_SIZE);
    });

    context("Adds 3 A2 sizes to cart", () => {
      cy.addItemToCart(SELECTED_QUANTITY, SECOND_SELECTED_SIZE);
    });

    context(
      "Go to '/cart' and confirm if products added are seen there",
      () => {
        cy.goToCart(CART);

        //Two CartItems
        cy.get("li").should("have.length", 2);

        context("Get the first CartItem", () => {
          cy.get("li")
            .eq(0)
            .find("p")
            .eq(0)
            .contains(SELECTED_SIZE);

          cy.get("li")
            .eq(0)
            .get("input")
            .should("have.value", SELECTED_QUANTITY);
        });

        context("Get the second CartItem", () => {
          cy.get("li")
            .eq(1)
            .find("p")
            .eq(0)
            .contains(SECOND_SELECTED_SIZE);

          cy.get("li")
            .eq(1)
            .get("input")
            .should("have.value", SELECTED_QUANTITY);
        });
      }
    );
  });
});
