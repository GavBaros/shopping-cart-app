import cartReducer from "../cart";
import { ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS } from "../../utils/constants";

describe("cart reducer ADD_ITEM: ", () => {
  it("has initial state equal to an empty array", () => {
    const action = { type: "dummy_action" };
    const initialState = [];

    expect(cartReducer(undefined, action)).toEqual(initialState);
  });

  it("adds 1 item to an empty array if no items exist", () => {
    const payload = { id: "1234", size: "A3" };
    const action = { type: ADD_ITEM, payload };
    const initialState = [];
    const expectedState = [payload];

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it("updates the quantity of an item if that item exists in array", () => {
    const existingItem = { id: "1234", size: "A3", quantity: 2 };
    const initialState = [existingItem];
    const payload = { id: "1234", size: "A3", quantity: 5 };
    const action = { type: ADD_ITEM, payload };
    const expectedState = [payload];

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it("leaves state as it is if payload is exactly the same as item", () => {
    const existingItem = { id: "1234", size: "A3", quantity: 2 };
    const initialState = [existingItem];
    const payload = { ...existingItem };
    const action = { type: ADD_ITEM, payload };
    const expectedState = [existingItem];

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it("adds 1 item if it does not already exist in populated array", () => {
    const initialState = [{}, {}, {}];
    const payload = { id: "1234", size: "A3", quantity: 5 };
    const action = { type: ADD_ITEM, payload };
    const expectedState = [...initialState, payload];

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });
});

describe("cart reducer DELETE_ITEM: ", () => {
  it("deletes an item from array given its id and size", () => {
    const payload = { id: "1234", size: "A3", quantity: 5 };
    const action = { type: DELETE_ITEM, payload };
    const existingItem = { ...payload };

    const initialState = [
      { ...payload, id: "123" },
      { ...payload, id: "12" },
      existingItem
    ];
    const expectedState = [{ ...payload, id: "123" }, { ...payload, id: "12" }];

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });
});

describe("cart reducer DELETE_ALL_ITEMS: ", () => {
  it("deletes all items from array", () => {
    const action = { type: DELETE_ALL_ITEMS };
    const initialState = [{}, {}, {}, {}];
    const expectedState = [];
    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });
});
