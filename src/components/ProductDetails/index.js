import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem } from "../../actions";
import { getLastWord } from "../../utils";

export class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: undefined,
      price: 0,
      quantity: 0,
      stock: 0
    };
  }
  componentDidMount() {
    const { description, price, stock } = this.props.location.state.skus[0];

    this.setState({ size: getLastWord(description), price, stock });
  }

  handleSelectChange = e => {
    const { size, price, stock } = JSON.parse(e.target.value);

    this.setState({ size, price, stock, quantity: 0 });
  };

  handleQuantityChange = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { id, image, title } = this.props.location.state;
    const { size, price, quantity, stock } = this.state;

    const selectedProduct = {
      id,
      image,
      title,
      size,
      price,
      quantity,
      stock
    };

    this.props.addItem(selectedProduct);
  };

  render() {
    const { quantity, price } = this.state;
    const {
      location: {
        state: {
          image,
          brand: { name },
          title,
          skus
        }
      }
    } = this.props;

    return (
      <div style={{ padding: "1rem" }}>
        <h2>{title}</h2>
        <div>
          <img
            style={{ width: "400px", height: "400px" }}
            src={image}
            alt={title}
          />
        </div>
        <h4>{name}</h4>
        <h4>£{price}</h4>

        <form onSubmit={this.handleSubmit}>
          <label>
            Select a size:
            <select onChange={this.handleSelectChange}>
              {skus.map(({ description, price, stock }) => (
                <option
                  key={description}
                  value={JSON.stringify({
                    size: getLastWord(description),
                    price,
                    stock
                  })}
                >
                  {getLastWord(description)}
                </option>
              ))}
            </select>
          </label>

          <div>
            <label>
              Quantity:
              <input
                type="number"
                min="0"
                max={this.state.stock}
                value={quantity}
                onChange={this.handleQuantityChange}
              />
            </label>

            <input
              type="submit"
              value="Add to cart"
              disabled={quantity === 0}
            />
          </div>
        </form>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  state: PropTypes.shape({
    image: PropTypes.string.isRequired,
    brand: PropTypes.shape({ name: PropTypes.string.isRequired }),
    title: PropTypes.string.isRequired,
    skus: PropTypes.array.isRequired
  })
};

export default connect(
  null,
  {
    addItem
  }
)(ProductDetails);
