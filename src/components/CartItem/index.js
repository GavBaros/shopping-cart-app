import React from "react";
import { connect } from "react-redux";
import { addItem, deleteItem } from "../../actions";

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
      <div>
        <img src={image} alt={title} />
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

const mapStateToProps = state => {
  return {
    cart: state.cartItems
  };
};

export default connect(
  mapStateToProps,
  { addItem, deleteItem }
)(CartItem);
