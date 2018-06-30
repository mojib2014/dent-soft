import React from "react";
import "./Nav.css";
import { Navbar } from "reactstrap";

const Nav = ({children}) => (
  <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
    {children}
  </Navbar>
);

export default Nav;
