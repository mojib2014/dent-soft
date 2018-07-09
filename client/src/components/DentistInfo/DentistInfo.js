import React from "react";
import { Col, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import "./DentistInfo.css";

const DentistInfo = (props) => {
    return (
        props.editing ? 
            <Col  className="InfoBoxRight"> 
            <Button className="btn-md" color='primary' onClick={() => props.edit()}>Confirm</Button>
            <InputGroup>
                <InputGroupAddon addonType='prepend'>First Name</InputGroupAddon>
                <Input onChange={props.Dchange} name='DfirstName' value={props.DfirstName}></Input> 
                <InputGroupAddon addonType='prepend'>Last Name</InputGroupAddon>
                <Input onChange={props.Dchange} name='DlastName' value={props.DlastName}></Input>
            </InputGroup>

            <InputGroup>
                <InputGroupAddon addonType='prepend'>Email</InputGroupAddon>
                <Input onChange={props.Dchange} name='Demail' value={props.Demail}></Input>
            </InputGroup>

            <InputGroup>
                <InputGroupAddon addonType='prepend'>Birthday</InputGroupAddon>
                <Input onChange={props.Dchange} name='Dbirthday' type='date' value={props.Dbirthday}></Input>
            </InputGroup>

            <InputGroup className="forPadding">
                <InputGroupAddon addonType='prepend'>Phone</InputGroupAddon>
                <Input onChange={props.Dchange} name='Dphone' value={props.Dphone}></Input>
            </InputGroup>
            </Col> 

            : 

            <Col className="InfoBoxRight"> 
            <Button className="btn-md" color='primary' onClick={() => props.edit()}>Edit</Button>
            <ul>
            <li>Name: {props.DfirstName} {props.DlastName}</li>
            <li>Email: {props.Demail}</li>
            <li>Birthday: {props.Dbirthday}</li>
            <li>Phone: {props.Dphone}</li>
            </ul>
            </Col>
        )
}
export default DentistInfo;