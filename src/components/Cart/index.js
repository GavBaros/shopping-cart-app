import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deleteAll } from "../../actions";
import CartItem from "../CartItem";
import { calculateTotal } from "../../utils";

export const Cart = ({ cart, deleteAll }) => {
  return (
    <div>
      {cart.length ? (
        <Fragment>
          <h2>Cart Summary</h2>
          <h3>
            Total: <strong>£{calculateTotal(cart)}</strong>
          </h3>

          <ul>
            {cart.map((item, i) => (
              <li key={i}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>

          <button onClick={deleteAll}>Delete all items</button>
        </Fragment>
      ) : (
        <Fragment>
          <h2>Cart is empty</h2>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cartItems
  };
};

export default connect(
  mapStateToProps,
  { deleteAll }
)(Cart);
