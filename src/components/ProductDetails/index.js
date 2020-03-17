import React from "react";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      quantity: 0,
      stock: 0
    };
  }

  componentDidMount() {
    const { description, price, stock } = this.props.location.state.skus[0];

    this.setState({ size: description.split(" ").slice(-1)[0], price, stock });
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
      <div>
        <h2>{title}</h2>
        <div>
          <img src={image} alt={title} />
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
                    size: description.split(" ").slice(-1)[0],
                    price,
                    stock
                  })}
                >
                  {description.split(" ").slice(-1)[0]}
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

export default ProductDetails;
