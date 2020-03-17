import product from "../../fixtures/product.json";

const PRODUCTS = /^Products$/;
const CART = /^Cart$/;
const TITLE = /^Unframed Col Du Glandon Art Print$/;
const BRAND = /^David Sparshott$/;
const PRICE = /^£60$/;

describe("On the '/' route, a user can: ", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("See 'Products' and 'Cart' navigation links", () => {
    cy.get("nav")
      .find("a")
      .contains(PRODUCTS);
    cy.get("nav")
      .find("a")
      .contains(CART);
  });

  it("Click on a product link, navigate to its page and see its contents", () => {
    context("Can click on link", () => {
      cy.get("main")
        .find("a")
        .eq(1)
        .click();
    });

    context("Is directed to product page with product data in URL", () => {
      cy.url().should(
        "eq",
        `${Cypress.config().baseUrl}/product/${product.brand.slug}/${
          product.id
        }`
      );
    });

    context("Product contents rendered in JSX elements", () => {
      cy.get("h2").contains(TITLE);
      cy.get("img")
        .should("have.attr", "src")
        .should("include", product.image);
      cy.get("h4")
        .eq(0)
        .contains(BRAND);
      cy.get("h4")
        .eq(1)
        .contains(PRICE);

      cy.get("select")
        .select("A4")
        .should("have.value", '{"size":"A4","price":60,"stock":10}');

      cy.get("input").should("have.value", "0");
    });
  });
});
