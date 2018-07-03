import React from "react";
import "./dentist.css";
import Nav from "../../components/Nav";
import FindInfo from "../../components/FindInfo";
import Photo from "../../components/Photo";
// import Footer from "../../components/Footer";
import {BrowserRouter as Router } from "react-router-dom";
import { Col, Row, Table, Button, Form, Label, Input} from "reactstrap";

class Dentist extends React.Component{

    constructor(props) {
        super(props),
            this.state = {
                phoneNumber: "5103592953",
                record: "mojib",
                note: "mojib",
            }
    }

    handlePhoneInput = (event) => {
        const {name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handlePhoneSearch = (event) => {
        event.preventDefault();
        // Router.get(.findById)
    }
    render(){
        return(
            <div>
            <div className="dentistInfo container">
                <Row className = "dentistR1">
                    <Col md="4" xs="4">
                    <Photo />

                    </Col>
                    <Col md="8" xs="8">
                        <div>Great Dr.William is me! Wa hahahahahahahah!!!</div>
                    </Col>
                </Row>
                <Row className="dentistR2">
                    
                    <Col className="patientCard" md="12" xs="12">
                    <a href="https://ahmadsahil2000.youcanbook.me/" target="_blank"><img src="https://youcanbook.me/resources/pics/ycbm-button.png" style={{'border-style':"none"}}/></a>
                    <a href="https://app.youcanbook.me/#/bookings" target="_blank" style={{"padding-left":"40px"}}>View Bookings</a>
                    <a href="https://app.youcanbook.me/#/editProfile?id=155f5567-7bcb-47cb-be8a-c27793655fae&section=availability" target="_blank">Admin</a>
                        <Form inline>
                            <Label for="searchPatients">Patient's Phone:</Label>
                            <Input 
                                value= {this.state.phoneNumber}
                                onChange={this.handlePhoneInput}
                                name="phoneNumber" 
                                placeholder="Phone Number" 
                            />
                            <Button onClick={this.handlePhoneSearch} color="primary" size="sm">Search</Button>
                           
                        </Form>
                        <div>
                            <FindInfo />
                        </div>
                    </Col>
                </Row>
            </div>
                
            </div>
        )
    }
}

export default Dentist;