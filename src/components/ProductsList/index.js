import React from "react";
import { Link } from "react-router-dom";
import data from "../../product.json";

const ProductsList = () => {
  return (
    <main>
      <h2>Browse Products</h2>
      <div>
        {data.map(product => {
          return (
            <div key={product.id}>
              <Link
                key={product.id}
                to={{
                  pathname: `/product/${product.brand.slug}/${product.id}`,
                  state: product
                }}
              >
                <img src={product.image} alt={product.title} />
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
