import React from "react";
import { shallow } from "enzyme";
import { ProductDetails } from "../index.js";
import products from "../../../product.json";

const props = { state: { ...products[0] } };

const wrapper = shallow(<ProductDetails location={props} />);

describe("ProductDetails: ", () => {
  it("has 'state' contained within 'location' prop passed to it", () => {
    expect(wrapper.instance().props.location).toEqual(props);
  });

  it("has received 'image', 'name', 'title', 'skus' from 'state' within 'location' prop", () => {
    expect(wrapper.instance().props.location.state.image).toBeTruthy();
    expect(wrapper.instance().props.location.state.brand.name).toBeTruthy();
    expect(wrapper.instance().props.location.state.title).toBeTruthy();
    expect(wrapper.instance().props.location.state.skus).toBeTruthy();
  });

  it("sets 'price', 'stock', 'size' props in state as it mounts", async () => {
    await wrapper.instance().componentDidMount();

    expect(wrapper.state("size")).toEqual("A4");
    expect(wrapper.state("price")).toEqual(30);
    expect(wrapper.state("stock")).toEqual(10);
  });
});
