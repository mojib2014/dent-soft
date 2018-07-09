import React from "react";
import "./DropDown.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  
  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Appoint Time
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
