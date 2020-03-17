import { combineReducers } from "redux";
import cart from "./cart";

const rootReducer = combineReducers({
  cartItems: cart
});

export default rootReducer;
