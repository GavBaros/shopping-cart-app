import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import data from "../../product.json";

const ProductsList = () => {
  return (
    <main className="product-list-container">
      <h2>Browse Products</h2>
      <div>
        {data.map(product => {
          return (
            <div className="product-list-card" key={product.id}>
              <Link
                key={product.id}
                to={{
                  pathname: `/product/${product.brand.slug}/${product.id}`,
                  state: product
                }}
              >
                <img
                  src={product.image}
                  className="product-list-image"
                  alt={product.title}
                />
                <h4>{product.brand.name}</h4>
                <h6>{product.title}</h6>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ProductsList;
