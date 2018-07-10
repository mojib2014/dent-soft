import React from "react";
import { Col, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";

const Profile = (props) => {
    return (
        props.editing ? 
            <Col md="7" className="InfoBoxRight rounded"> 
            <h2>Profile Information</h2> <Button color='primary' onClick={() => props.edit()}>Confirm</Button>
            <InputGroup>
                <InputGroupAddon addonType='prepend'>First Name</InputGroupAddon>
                <Input onChange={props.change} name='firstName' value={props.firstName}></Input> 
                <InputGroupAddon addonType='prepend'>Last Name</InputGroupAddon>
                <Input onChange={props.change} name='lastName' value={props.lastName}></Input>
            </InputGroup>
            <InputGroup>
            <InputGroupAddon addonType='prepend'>Email</InputGroupAddon>
            <Input onChange={props.change} name='email' value={props.email}></Input>
            </InputGroup>
            <InputGroup>
            <InputGroupAddon addonType='prepend'>Birthday</InputGroupAddon>
            <Input onChange={props.change} name='birthday' type='date' value={props.birthday}></Input>
            </InputGroup>
            <InputGroup>
            <InputGroupAddon addonType='prepend'>Phone</InputGroupAddon>
            <Input onChange={props.change} name='phone' value={props.phone}></Input>
            </InputGroup>
            </Col> 
            : 
            <Col md="7" className="InfoBoxRight rounded"> 
            <h2>Profile Information</h2> <Button color='primary' onClick={() => props.edit()}>Edit</Button>
            <ul>
            <li>Name: {props.firstName} {props.lastName}</li>
            <li>Email: {props.email}</li>
            <li>Birthday: {props.birthday}</li>
            <li>Phone: {props.phone}</li>
            </ul>
            </Col>
        )
}

export default Profile;