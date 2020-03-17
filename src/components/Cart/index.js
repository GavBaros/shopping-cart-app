import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAll } from "../../actions";
import CartItem from "../CartItem";
import { calculateTotal } from "../../utils";
import "./index.css";

export const Cart = ({ cart, deleteAll }) => {
  return (
    <div className="cart-container">
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

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  deleteAll: PropTypes.func.isRequired
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
