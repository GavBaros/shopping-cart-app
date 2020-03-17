import { addItem, deleteItem, deleteAll } from "../index";

describe("Actions: ", () => {
  it("addItem returns the correct type and payload", () => {
    expect(addItem()).toEqual({
      type: "ADD_ITEM",
      payload: {}
    });
  });

  it("deleteItem returns the correct type and payload", () => {
    expect(deleteItem()).toEqual({
      type: "DELETE_ITEM",
      payload: {}
    });
  });

  it("deleteAll returns the correct typed", () => {
    expect(deleteAll()).toEqual({
      type: "DELETE_ALL_ITEMS"
    });
  });
});
