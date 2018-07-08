import React from "react";
import "./dentist.css";
import DentistInfo from "../../components/DentistInfo";
import Photo from "../../components/Photo";
import { Col, Row, Form, Label, Input } from "reactstrap";
import { FormBtn } from "../../components/Form";
import FindInfo from "../../components/FindInfo";

import API from "../../utils/API";

class Dentist extends React.Component {

    state = {
        patientId: "",
        name: "",
        phone: "",
        email: "",
        Pemail: "",
        signUpEmail: "",
        signUpPassword: "",
        image: "",
        record: [],
        firstName: "",
        lastName: "",
        DimageUrl: "",
        notice: "",
        note: [],
        newNote: "",
        newRecord: "",
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
            loggedinType: type,
        })
        this.getDentistInfo(cookieId)
    }

    getDentistInfo = (id) => {
        API.searchById(id)
            .then(result => {
                this.setState({
                    DfirstName: result.data.firstName,
                    DlastName: result.data.lastName,
                    Demail: result.data.email,
                    Dphone: result.data.phone,
                    Dbirthday: result.data.birth_date,
                    DimageUrl: result.data.imageUrl
                })
            })
            .catch(err => {
                console.log(err);
                // alert("something went wrong, please refresh page")
            })
        // use id to find dentist's information including image
    }

    handleInputChange = (event) => {
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

        this.emailSearch();
    }

    emailSearch = () => {
        let email = this.state.email
        API.searchByEmail(email)
            .then((result) => {
                console.log("this is patients: ", result.data.record)
                console.log("this is patients: ", result.data.note)
                this.setState({
                    name: result.data.lastName + result.data.firstName,
                    phone: result.data.phone,
                    Pemail: result.data.email,
                    record: result.data.record,
                    note: result.data.note,
                    image: result.data.imageUrl,
                    patientId: result.data._id
                })

            })
            .catch(err => {
                console.log(err)
                this.setState({
                    name: "Email does not match, please search another email or add patient"
                })
            });
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
                        this.setState({
                            firstName: "",
                            lastName: "",
                            signUpEmail: "",
                            signUpPassword: "",
                            notice: `New Administator: ${result.data.email} Added`
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
    //****************add record */
    handleAddRecord = () => {
        if (this.state.patientId && this.state.newRecord) {
            //API post note
           
            //to write new note into db
            let recordInfo = {
                id: this.state.patientId,
                record: this.state.newRecord
            }

      
            API.addRecord(recordInfo)
            .then((result) => {
                //if note empty then alert note cannot be empty
                console.log("this is record result: ", result.data.record)
                //to show new note after added 
                this.emailSearch();

                if (result.data) {
                    alert(`Record Added for ${result.data.firstName} ${result.data.lastName}`)
                }
                })
                .catch(err => console.log(err));
        } else {
            alert("please search for a patient berfore posting a record")
        }
    }
    //*************** add note */
    handleAddNote = () => {
        if (this.state.patientId && this.state.newNote) {
            //API post note
            // console.log(this.state.newNote)
            //to write new note into db
            let noteInfo = {
                id: this.state.patientId,
                note: this.state.newNote
            }
            API.addNote(noteInfo)
            .then((result) => {
                //if note empty then alert note cannot be empty
                
                //to show new note after added 
                this.emailSearch();

                if (result.data) {
                    alert(`Note Added for ${result.data.firstName} ${result.data.lastName}`)
                }
                })
                .catch(err => console.log(err));
        } else {
            alert("please search for a patient berfore posting a note")
        }
    }
    //############### end add note

    render() {
        return (
            <div>
                <div className="dentistInfo container">
                    <Row className="dentistR1">
                        <Col md="3" xs="3">
                            <Photo DimageUrl={this.state.DimageUrl} />
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
                                onChange={this.handleInputChange}
                                name="firstName"
                                placeholder="First Name (required)"
                            />
                            <Input
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                name="lastName"
                                placeholder="Last Name (required)"
                            />
                            <Input
                                value={this.state.signUpEmail}
                                onChange={this.handleInputChange}
                                name="signUpEmail"
                                placeholder="Email (required)"
                            />
                            <Input
                                type="password"
                                value={this.state.signUpPassword}
                                onChange={this.handleInputChange}
                                name="signUpPassword"
                                placeholder="Password (required)"
                            />
                            <div className="text-danger">{this.state.notice}</div>
                            <FormBtn
                                disabled={!(this.state.signUpEmail && this.state.signUpPassword && this.state.firstName && this.state.lastName)}
                                onClick={this.handleSignUpSubmit}
                            >
                                Add New Admin
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
                                    onChange={this.handleInputChange}
                                    name="email"
                                    placeholder="chicken@chicken.com"
                                />
                                <FormBtn 
                                    disabled={!this.state.email}
                                    onClick={this.handleEmailSearch} 
                                    color="primary" 
                                    size="sm"
                                > Search
                                </FormBtn>
                            </Form>
                            <div>
                                <FindInfo
                                    userName={this.state.name}
                                    userPhone={this.state.phone}
                                    userEmail={this.state.Pemail}
                                    userRecord={this.state.record}
                                    userNote={this.state.note}
                                    userImage={this.state.image}
                                />
                            </div>
                            <hr></hr>
                            <div className="recordInfo mb-3">
                                <div>
                                    <h3>Record:</h3>
                                    <br></br>
                                    <div className="record shadow text-left">
                                        {this.state.record.map((item, i)=>{
                                            return <h6 key={i} id={item._id}>{i+1}. {item.record}</h6>
                                        })}
                                    </div>
                                </div>
                            </div>
           
                            <hr></hr>
                            
                            <div className="noteInfo mb-3">
                                <div>
                                    <h3>Note:</h3>
                                    <br></br>
                                    <div className="note shadow text-left">
                                        {this.state.note.map((item, i)=>{
                                            return <h6 key={i} id={item._id}>{i+1}. {item.note}</h6>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                <Input
                                    value={this.state.newRecord}
                                    onChange={this.handleInputChange}
                                    name="newRecord"
                                    placeholder="Patients' Record"
                                />
                                <FormBtn
                                    disabled={!this.state.newRecord}
                                    onClick={this.handleAddRecord}
                                >
                                    Add Record
                                </FormBtn>
                            </div>
                            <div>
                                <Input
                                    value={this.state.newNote}
                                    onChange={this.handleInputChange}
                                    name="newNote"
                                    placeholder="Doctors' Note"
                                />
                                <FormBtn
                                    disabled={!this.state.newNote}
                                    onClick={this.handleAddNote}
                                >
                                    Add Note
                                </FormBtn>
                            </div>
                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
}
export default Dentist;