import React from "react";
import "./Nav.css";
import LoginState from "../Login_state"
import { Navbar } from "reactstrap";

const Nav = (props) => (
  <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      Dentsoft
    </a>
    <LoginState>
      {props.status}
    </LoginState>
  </Navbar>
);

export default Nav;
