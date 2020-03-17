import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem, deleteItem } from "../../actions";
import "./index.css";

export class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: 0,
      quantity: 0
    };
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.item.quantity,
      stock: this.props.item.stock
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.item.quantity !== this.props.item.quantity) {
      this.setState({
        quantity: this.props.item.quantity
      });
    }
  }

  handleQuantityChange = e => {
    this.setState(
      {
        quantity: parseInt(e.target.value)
      },
      () => this.updateItemQuantity()
    );
  };

  updateItemQuantity = () => {
    const { id, size } = this.props.item;
    const { quantity } = this.state;

    const objToEdit = { id, size, quantity };

    this.props.addItem(objToEdit);
  };

  removeItem = () => {
    const { id, size } = this.props.item;

    const objToDelete = { id, size };

    this.props.deleteItem(objToDelete);
  };

  render() {
    const { image, title, size, price } = this.props.item;

    return (
      <div className="cart-item-container">
        <img src={image} alt={title} className="cart-item-img" />
        <div>
          <h5>{title}</h5>
          <p>SIZE: {size}</p>
          <p>
            <b>£{price}</b>
          </p>

          <label>
            Quantity:
            <input
              type="number"
              min="0"
              max={this.state.stock}
              value={this.state.quantity}
              onChange={this.handleQuantityChange}
            />
          </label>

          <button onClick={this.removeItem}>Remove item</button>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  cart: PropTypes.array,
  deleteItem: PropTypes.func,
  addItem: PropTypes.func,
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })
};

const mapStateToProps = state => {
  return {
    cart: state.cartItems
  };
};

export default connect(
  mapStateToProps,
  { addItem, deleteItem }
)(CartItem);
