import React from "react";
import { shallow } from "enzyme";
import { CartItem } from "../index.js";
import { addItem, deleteItem } from "../../../actions";

let item = {
  quantity: 2,
  id: "1234",
  title: "Cart Item",
  image: "url",
  stock: 4,
  price: 30,
  size: "A3"
};

const wrapper = shallow(
  <CartItem item={item} addItem={jest.fn()} deleteItem={jest.fn()} />
);

describe("CartItem:", () => {
  it("should have quantity, id, title, image, stock, price, size from props", () => {
    expect(wrapper.instance().props.item.quantity).toBeTruthy();
    expect(wrapper.instance().props.item.id).toBeTruthy();
    expect(wrapper.instance().props.item.title).toBeTruthy();
    expect(wrapper.instance().props.item.image).toBeTruthy();
    expect(wrapper.instance().props.item.stock).toBeTruthy();
    expect(wrapper.instance().props.item.price).toBeTruthy();
    expect(wrapper.instance().props.item.size).toBeTruthy();
  });

  it("updates 'quantity' state with handleQuantityChange", () => {
    wrapper.find("input").simulate("change", { target: { value: 2 } });
    expect(wrapper.state("quantity")).toBe(2);
  });

  it("updates item quantity in store on handleQuantityChange", async () => {
    const NEW_QUANTITY = 9;

    wrapper
      .find("input")
      .simulate("change", { target: { value: NEW_QUANTITY } });

    let itemToUpdate = {
      id: item.id,
      size: item.size,
      quantity: NEW_QUANTITY
    };

    item = {
      ...itemToUpdate,
      title: "Cart Item",
      image: "url",
      stock: 4,
      price: 30
    };

    expect(wrapper.instance().props.addItem).toHaveBeenCalledWith(itemToUpdate);
    await wrapper.setProps({ item: item });
    expect(wrapper.instance().props.item.quantity).toBe(NEW_QUANTITY);
  });

  it("calls deleteItem with item id + size on button click", () => {
    wrapper.find("button").simulate("click");

    let itemToDelete = {
      id: item.id,
      size: item.size
    };

    expect(wrapper.instance().props.deleteItem).toHaveBeenCalledWith(
      itemToDelete
    );
  });
});
