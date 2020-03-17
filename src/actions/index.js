import { ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS } from "../utils/constants";

export const addItem = (itemObject = {}) => {
  return {
    type: ADD_ITEM,
    payload: itemObject
  };
};

export const deleteItem = (itemObject = {}) => {
  return {
    type: DELETE_ITEM,
    payload: itemObject
  };
};

export const deleteAll = () => {
  return {
    type: DELETE_ALL_ITEMS
  };
};
