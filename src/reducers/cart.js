import { criteria, equalObjects, itemExists } from "../utils";
import { ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS } from "../utils/constants";

export default (state = [], { payload, type }) => {
  const stateCopy = [...state];

  switch (type) {
    case ADD_ITEM:
      const item = stateCopy.find(obj => criteria(obj, payload));
      const index = stateCopy.findIndex(obj => criteria(obj, payload));

      if (stateCopy.length) {
        if (itemExists(item, index) && item.quantity !== payload.quantity) {
          stateCopy[index].quantity = payload.quantity;

          return stateCopy;
        } else if (itemExists(item, index) && equalObjects(item, payload)) {
          return stateCopy;
        } else {
          return [...stateCopy, payload];
        }
      } else {
        return [payload];
      }

    case DELETE_ITEM:
      const indexToDelete = stateCopy.findIndex(obj => criteria(obj, payload));
      const updatedArray = stateCopy.filter((obj, i) => i !== indexToDelete);

      return updatedArray;

    case DELETE_ALL_ITEMS:
      return [];

    default:
      return state;
  }
};
