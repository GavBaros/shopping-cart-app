import React from "react";
import { shallow, mount, render } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Cart } from "../index.js";
import { CartItem } from "../../CartItem";

const item = {
  quantity: 2,
  id: "1234",
  size: "A1",
  stock: 10,
  image: "",
  title: "Dummy",
  price: 50
};

const cart = [
  { ...item, id: "1" },
  { ...item, id: "12" },
  { ...item, id: "123" }
];

const mockStore = configureStore();
const initialState = { cart: cart };
const store = mockStore(initialState);
const deleteAll = jest.fn();

const connectedCart = mount(
  <Provider store={store}>
    <Cart cart={cart} deleteAll={deleteAll} />
  </Provider>
);

const emptyArray = [];
const emptyCart = shallow(<Cart cart={emptyArray} deleteAll={deleteAll} />);

const populatedCart = shallow(
  <Cart cart={[{}, {}, {}]} deleteAll={deleteAll} />
);

describe("Cart: ", () => {
  it("renders 3 <CartItem/> if there are 3 items in cart", () => {
    expect(connectedCart.find("CartItem").length).toEqual(3);
  });

  it("displays <h2>Cart is empty</h2> if there are no items in cart", () => {
    expect(emptyCart.find("h2").length).toEqual(1);
    expect(emptyCart.find("h2").text()).toEqual("Cart is empty");
  });

  it("executes deleteAll if button clicked", () => {
    expect(populatedCart.find("button").length).toEqual(1);
    expect(
      populatedCart
        .find("button")
        .props()
        .onClick()
    );
    expect(deleteAll).toHaveBeenCalledTimes(1);
  });
});
