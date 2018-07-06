import React from "react";
import "./dentist.css";
import FindInfo from "../../components/FindInfo";
import DentistInfo from "../../components/DentistInfo";
import Photo from "../../components/Photo";
import { Col, Row, Button, Form, Label, Input } from "reactstrap";

import API from "../../utils/API";

class Dentist extends React.Component{

    state = {
        name: "",
        phone: "",
        email: "",
        image:"",
        record: "",
        note: "",
        DfirstName: "Gao",
        DlastName: "Chunjing",
        Demail: "williamNo1@gmail.com",
        Dbirthday: "1995-04-17",
        Dphone: "510-888-8888",
        editing: false
    }

    componentDidMount() {
        let cookieId = this.props.readCookie("loggedinId")
        console.log("user logged in", cookieId);
        this.getDentistInfo(cookieId)
    }

    getDentistInfo = (id) => {

        // use id to find dentist's information including image
    }
    
    handleEmailInput = (event) => {
        const {name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    editProfile = () => {
        (this.state.editing) ? this.setState({ editing: false }) : this.setState({ editing: true });
    }


    handleEmailSearch = (event) => {
        event.preventDefault();
        
        let email = this.state.email
        API.searchByEmail(email)
        .then((result)=>{
            console.log(result.data)
            this.setState({
                name: result.data.lastName + result.data.firstName,
                phone: result.data.phone,
                email: result.data.email,
                record: result.data.record,
                note: result.data.note,
                image: result.data.imageUrl
            })
        })
        .catch(err=> console.log(err));
    }
    render(){
        return(
            <div>
            <div className="dentistInfo container">
                <Row className = "dentistR1">
                    <Col md="3" xs="3">
                    <Photo />

                    </Col>
                   
                        <DentistInfo 
                            DfirstName={this.state.DfirstName}
                            DlastName={this.state.DlastName}
                            Demail={this.state.Demail}
                            Dbirthday={this.state.Dbirthday}
                            Dphone={this.state.Dphone}
                            Dchange={this.handleInputChange}
                            editing={this.state.editing}
                            edit={this.editProfile}
                        />
                   
                </Row>
                <Row className="dentistR2">
                    
                    <Col className="patientCard" md="12" xs="12">
                    <a href="https://ahmadsahil2000.youcanbook.me/" target="_blank" rel="noopener noreferrer"><img src="https://youcanbook.me/resources/pics/ycbm-button.png" alt="https://youcanbook.me/resources/pics/ycbm-button.png" style={{'borderStyle':"none"}}/></a>
                    <a href="https://app.youcanbook.me/#/bookings" target="_blank" rel="noopener noreferrer" style={{"paddingLeft":"40px"}}>View Bookings</a>
                    <a href="https://app.youcanbook.me/#/editProfile?id=155f5567-7bcb-47cb-be8a-c27793655fae&section=availability" target="_blank" rel="noopener noreferrer" style={{"paddingLeft": "20px"}}>Admin</a>
                        <Form inline>
                            <Label for="searchPatients">Patient's Email:</Label>
                            <Input 
                                value= {this.state.email}
                                onChange={this.handleEmailInput}
                                name="email" 
                                placeholder="chicken@chicken.com" 
                            />
                            <Button onClick={this.handleEmailSearch} color="primary" size="sm">Search</Button>
                           
                        </Form>
                        <div>
                            <FindInfo 
                                userName={ this.state.name }
                                userPhone={ this.state.phone }
                                userEmail={ this.state.email }
                                userRecord={ this.state.record }
                                userNote={ this.state.note }
                                userImage={ this.state.image}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
                
            </div>
        )
    }
}

export default Dentist;