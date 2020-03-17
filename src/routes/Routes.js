import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./Routes.css";
import Navbar from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";
import ProductsList from "../components/ProductsList";
import Cart from "../components/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={ProductsList} />
      <Route path="/product/:slug/:id" component={ProductDetails} />
      <Route path="/cart" exact component={Cart} />
    </BrowserRouter>
  );
};

export default Routes;
