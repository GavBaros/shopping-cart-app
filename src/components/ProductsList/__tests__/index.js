import React from "react";
import ProductsList from "../index.js";
import { Link } from "react-router";
import { shallow } from "enzyme";
import products from "../../../product.json";

const wrapper = shallow(<ProductsList />);
const firstItem = products[0];
const firstItemPathname = `/product/${firstItem.brand.slug}/${firstItem.id}`;

describe("ProductsList: ", () => {
  it("includes atleast 1 <Link/>", () => {
    expect(wrapper.find("Link").length).toBeGreaterThan(0);
  });

  it("<Link/> for first product contains pathname to /products/:brand/:id", () => {
    expect(
      wrapper
        .find("Link")
        .at(0)
        .props().to
    ).toMatchObject({ pathname: firstItemPathname });
  });

  it("<Link/> 'to' prop contains valid pathname and item details in its state", () => {
    expect(
      wrapper
        .find("Link")
        .at(0)
        .props().to
    ).toEqual({ pathname: firstItemPathname, state: firstItem });
  });
});
