import React from "react";
import { Col, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import "./DentistInfo.css";

const DentistInfo = (props) => {
    return (
        props.editing ? 
            <Col  className="InfoBoxRight"> 
            <h2>Profile Information</h2> <Button color='primary' onClick={() => props.edit()}>Confirm</Button>
            <InputGroup>
                <InputGroupAddon addonType='prepend'>First Name</InputGroupAddon>
                <Input type='text' onChange={props.change} name='firstName' value={props.DfirstName}>First Name: </Input> 
                <InputGroupAddon addonType='prepend'>Last Name</InputGroupAddon>
                <Input onChange={props.change} name='lastName' value={props.DlastName}>Last Name: </Input>
            </InputGroup>

            <InputGroup>
                <InputGroupAddon addonType='prepend'>Email</InputGroupAddon>
                <Input onChange={props.change} name='email' value={props.Demail}>Email: </Input>
            </InputGroup>

            <InputGroup>
                <InputGroupAddon addonType='prepend'>Birthday</InputGroupAddon>
                <Input onChange={props.change} name='birthday' type='date' value={props.Dbirthday}>Birthday: </Input>
            </InputGroup>

            <InputGroup className="forPadding">
                <InputGroupAddon addonType='prepend'>Phone</InputGroupAddon>
                <Input onChange={props.change} name='phone' value={props.Dphone}>Phone: </Input>
            </InputGroup>
            </Col> 

            : 

            <Col className="InfoBoxRight"> 
            <h2>William!You're the hottest dentist in the world!</h2> <Button color='primary' onClick={() => props.edit()}>Edit</Button>
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