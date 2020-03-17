import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "1rem" }}>
    <Link to={"/"}>Products</Link>

    <Link to={"/cart"} style={{ marginLeft: 10 }}>
      Cart
    </Link>
  </nav>
);

export default Navbar;
