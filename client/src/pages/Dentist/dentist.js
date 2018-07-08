import React from "react";
import "./dentist.css";
import FindInfo from "../../components/FindInfo";
import DentistInfo from "../../components/DentistInfo";
import Photo from "../../components/Photo";
import { Col, Row, Button, Form, Label, Input } from "reactstrap";
import { FormBtn } from "../../components/Form";

import API from "../../utils/API";

class Dentist extends React.Component {

    state = {
        name: "",
        phone: "",
        email: "",
        signUpEmail: "",
        signUpPassword: "",
        image: "",
        record: "",
        firstName: "",
        lastName: "",
        DimageUrl: "",
        notice: "",
        note: "",
        DfirstName: "",
        DlastName: "",
        Demail: "",
        Dbirthday: "",
        Dphone: "",
        editing: false
    }

    componentWillMount() {
        let cookieId = this.props.readCookie("loggedinId")
        let type = this.props.readCookie("loggedinType")

        this.setState({
            loggedInId: cookieId,
            loggedinType: type
        })
        this.getDentistInfo(cookieId)
    }

    getDentistInfo = (id) => {
        API.searchById(id)
        .then(result=>{
            console.log("load dentist info", result)
            this.setState({
                DfirstName: result.data.firstName,
                DlastName: result.data.lastName,
                Demail: result.data.email,
                Dphone: result.data.phone,
                Dbirthday: result.data.birth_date,
                DimageUrl: result.data.imageUrl
            })
        })
        .catch(err=>{
            console.log(err);
            // alert("something went wrong, please refresh page")
        })
        // use id to find dentist's information including image
    }

    handleEmailInput = (event) => {
        const { name, value } = event.target;
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
            .then((result) => {
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
            .catch(err => console.log(err));
    }

    //*********************Admin Signup!
    handleSignUpSubmit = (event) => {
        event.preventDefault();

        if (this.state.signUpEmail && this.state.signUpPassword && this.state.firstName && this.state.lastName) {
         
            let newPatient = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.signUpEmail.toLowerCase(),
                password: this.state.signUpPassword,
                userType: "admin"
            }

            API.createAccount(newPatient)
                .then((result) => {
                    console.log(result);
                    //sign up err handling
                    if (result.data._id) {
                        // alert("new user created")
                        this.setState({ notice: `New Administator: ${result.data.email} Added` })
                        this.setState({
                            firstName: "",
                            lastName: "",
                            signUpEmail: "",
                            signUpPassword: "",
                        })
                        // console.log(this.state.logInEmail, this.state.logInPassword)
                    } else if (result.data.name === "ValidationError") {
                        //if email is not in email format
                        // alert(result.data.message)
                        this.setState({ notice: result.data.message })
                    } else if (result.data.message === "Email Already Existed!") {
                        // alert(result.data.message)
                        this.setState({ notice: result.data.message })
                    } else {
                        // alert("something went wrong, please refresh and try again")
                        this.setState({ notice: "something went wrong, please refresh and try again" })
                    }
                }).catch(err => console.log(err))
        } else {
            // alert("Entry Can't Be Empty");
            this.setState({ notice: "Entry Can't Be Empty" })
        }
    }

    //##################end New Admin sign up

    render() {

        return (
            <div>
                <div className="dentistInfo container">
                    <Row className="dentistR1">
                        <Col md="3" xs="3">
                            <Photo DimageUrl={this.state.DimageUrl}/>
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
                    <Row className="dentistR1-1">
                        <Col className="patientCard" md="12" xs="12">
                            <h2>Add New Administator Here</h2>
                            <Input
                                value={this.state.firstName}
                                onChange={this.handleEmailInput}
                                name="firstName"
                                placeholder="First Name (required)"
                            />
                            <Input
                                value={this.state.lastName}
                                onChange={this.handleEmailInput}
                                name="lastName"
                                placeholder="Last Name (required)"
                            />
                            <Input
                                value={this.state.signUpEmail}
                                onChange={this.handleEmailInput}
                                name="signUpEmail"
                                placeholder="Email (required)"
                            />
                            <Input
                                type="password"
                                value={this.state.signUpPassword}
                                onChange={this.handleEmailInput}
                                name="signUpPassword"
                                placeholder="Password (required)"
                            />
                            <div className="text-danger">{this.state.notice}</div>
                            <FormBtn
                                disabled={!(this.state.signUpEmail && this.state.signUpPassword && this.state.firstName && this.state.lastName)}
                                onClick={this.handleSignUpSubmit}
                            >
                                Sign Up
                            </FormBtn>
                            </Col>
                    </Row>
                    <Row className="dentistR2">

                        <Col className="patientCard" md="12" xs="12">
                            <a href="https://ahmadsahil2000.youcanbook.me/" target="_blank" rel="noopener noreferrer"><img src="https://youcanbook.me/resources/pics/ycbm-button.png" alt="https://youcanbook.me/resources/pics/ycbm-button.png" style={{ 'borderStyle': "none" }} /></a>
                            <a href="https://app.youcanbook.me/#/bookings" target="_blank" rel="noopener noreferrer" style={{ "paddingLeft": "40px" }}>View Bookings</a>
                            <a href="https://app.youcanbook.me/#/editProfile?id=155f5567-7bcb-47cb-be8a-c27793655fae&section=availability" target="_blank" rel="noopener noreferrer" style={{ "paddingLeft": "20px" }}>Admin</a>
                            <Form inline>
                                <Label for="searchPatients">Patient's Email:</Label>
                                <Input
                                    value={this.state.email}
                                    onChange={this.handleEmailInput}
                                    name="email"
                                    placeholder="chicken@chicken.com"
                                />
                                <Button onClick={this.handleEmailSearch} color="primary" size="sm">Search</Button>

                            </Form>
                            <div>
                                <FindInfo
                                    userName={this.state.name}
                                    userPhone={this.state.phone}
                                    userEmail={this.state.email}
                                    userRecord={this.state.record}
                                    userNote={this.state.note}
                                    userImage={this.state.image}
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


