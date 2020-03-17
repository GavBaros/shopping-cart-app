import React from "react";
import Navbar from "../index.js";
import { Link } from "react-router";
import { shallow } from "enzyme";

describe("Navbar: ", () => {
  const wrapper = shallow(<Navbar />);

  it("contains 2 Links", () => {
    expect(wrapper.find("Link").length).toEqual(2);
  });

  it("contains 1 Link to '/' and 1 Link to '/cart'", () => {
    expect(
      wrapper
        .find("Link")
        .at(0)
        .props().to
    ).toEqual("/");

    expect(
      wrapper
        .find("Link")
        .at(1)
        .props().to
    ).toEqual("/cart");
  });
});
