import React from "react";
import "./dentist.css";
import DentistInfo from "../../components/DentistInfo";
import Photo from "../../components/Photo";
import { Col, Row, Form, Label, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { FormBtn } from "../../components/Form";
import FindInfo from "../../components/FindInfo";
import DelBtn from "../../components/DelBtn";
import Dropdown from 'react-dropdown';
import Upload from "../../components/Upload";
import 'react-dropdown/style.css';
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
        addNote: "",
        newNote: "",
        newRecord: "",
        DfirstName: "",
        DlastName: "",
        Demail: "",
        Dbirthday: "",
        Dphone: "",
        editing: false,
        reservationDate: "",
        reservationTime: "",
        reservationDetail: "",
        reservationNotice: ""
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
                    Dbirthday: (result.data.birth_date ? result.data.birth_date.split("T")[0] : this.state.birthday),
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
        (this.state.editing) ? 
            API.updateById(this.state.loggedInId, {
                firstName: this.state.DfirstName,
                    lastName: this.state.DlastName,
                    email: this.state.Demail,
                    phone: this.state.Dphone,
                    birth_date: this.state.Dbirthday,
                    imageUrl: this.state.DimageUrl      
            }).then(results => {
                this.setState({ editing: false })
            }).catch(err=>{alert("phone number must be integers")})
         : this.setState({ editing: true });
    }


    handleEmailSearch = (event) => {
        event.preventDefault();

        this.emailSearch();
    }

    emailSearch = () => {
        let email = this.state.email
        API.searchByEmail(email)
            .then((result) => {
                console.log("this is patients: ", result.data)
                this.setState({
                    name: result.data.firstName+ " " +result.data.lastName,
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
                    name: "Email does not match, please search another email or add patient",
                    phone: "",
                    Pemail: ""
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
                    console.log(result)
                    //to show new note after added 
                    this.emailSearch();

                    if (result.data) {
                        this.setState({
                            newNote: "",
                            addNote: `Note Added for ${result.data.firstName} ${result.data.lastName}`
                        })
                    }
                })
                .catch(err => console.log(err));
        } else {
            alert("please search for a patient berfore posting a note")
        }
    }
    //############### end add note

    //***************delete note
    deleteNote = (noteId) => {
        //delete note in db
        // console.log(noteId) 
        API.deleteNote(noteId)
            .then((result) => {
                console.log(result);
                // refresh note
                this.emailSearch();
            }).catch(err => console.log(err));
    }
    //###############delete note

    //***************edit Note */
    editNote = (id, note) => {
        console.log(id)
        //open another page to edit note API

    }
    changeNoteContent = () => {
        //API update note
        console.log('clicked')
    }

    //###############end edit note

    //*********dropdown  */
    _onSelect = (option) => {
        this.setState({reservationTime: option.value})
    }
    //##########end

    //***********send reservation */
    makeReservation = ()=> {
        console.log('Your reservationTime ', this.state.reservationTime)
        let reservation = {
            date: this.state.reservationDate,
            start_time: this.state.reservationTime,
            reservationDetail: this.state.reservationDetail,
            user_id: this.state.patientId
        }
        API.createReservation(reservation)
        .then((result)=> {
            console.log(result)
            if (result.status === 200 && result.data) {
                this.setState({
                    reservationNotice: "Reservation Added!",
                    reservationDetail: "",
                    reservationTime: "",
                    reservationDate: ""
                })
                //need to push reservation to user
            }
        }) 
        .catch(err=>{console.log(err); alert("database err, please contact William at 6143773853")})
    }
    //###########end reservation

    //**********Record file Upload */
    fileUpload = ()=> {
        //must change to window
        //use .env if possible
        window.cloudinary.openUploadWidget({ cloud_name: 'putincake', upload_preset: 'j0thsnot'},
        
        (error, result) => {
            // write into database if file upload successful
            if (error) {
                console.log(error)
                alert("file upload failed, please try again")
            } else {
                console.log(result)  //[{},{}...]
                this.setState({record: result})
                result.forEach((file)=>{
                    let newRecord={
                        id: this.state.patientId,
                        recordName: file.original_filename,
                        recordUrl: file.secure_url
                    }   
                    API.addRecord(newRecord)
                    .then(data=>{
                        console.log("record written into db", data);
                        this.emailSearch();

                        if (result.data) {
                            alert(`Record Added`)
                        }
                    }).catch(err=>{
                        console.log("failed to write records into database", err)
                        alert("err occurred when writing file into database, please check connection or contact website admin. 6143773853")
                    })
                }) 
            }
        })
      }

      deleteRecord = (recordId) => {
        API.deleteRecord(recordId)
        .then((result) => {
            console.log(result);
            // refresh note
            this.emailSearch();
        }).catch(err => console.log(err));
      }
    //##########end fileupload

    render() {
        // console.log("Date:", this.state.reservationDate) 
        // console.log("Time:", this.state.reservationTime) 
        // {value: "10", label: "10:00 - 11:00"}
        const options = [
            { value: '08:00 - 09:00', label: '08:00 - 09:00' },
            { value: '09:00 - 10:00', label: '09:00 - 10:00' },
            { value: '10:00 - 11:00', label: '10:00 - 11:00' },
            { value: '11:00 - 12:00', label: '11:00 - 12:00' },
            { value: '12:00 - 13:00', label: '12:00 - 13:00' },
            { value: '13:00 - 14:00', label: '13:00 - 14:00' },
            { value: '14:00 - 15:00', label: '14:00 - 15:00' },
            { value: '15:00 - 16:00', label: '15:00 - 16:00' },
            { value: '16:00 - 17:00', label: '16:00 - 17:00' },
        ]

        return (
            <div>
                <div className="dentistInfo container">
                    <Row className="dentistR1">
                        <Col md="3" xs="3" className="pt-5 pl-4">
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
                                className="mb-1"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                                name="firstName"
                                placeholder="First Name (required)"
                            />
                            <Input
                                className="mb-1"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                name="lastName"
                                placeholder="Last Name (required)"
                            />
                            <Input
                                className="mb-1"
                                value={this.state.signUpEmail}
                                onChange={this.handleInputChange}
                                name="signUpEmail"
                                placeholder="Email (required)"
                            />
                            <Input
                                className="mb-1"
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

                            <a href='https://calendar.google.com/calendar/b/2/r?pli=1'> <strong>Google Calendar</strong></a>
                            <hr></hr>
                            <a href="https://ahmadsahil2000.youcanbook.me/" target="_blank" rel="noopener noreferrer"><img src="https://youcanbook.me/resources/pics/ycbm-button.png" alt="https://youcanbook.me/resources/pics/ycbm-button.png" style={{ 'borderStyle': "none" }} /></a>
                            <a href="https://app.youcanbook.me/#/bookings" target="_blank" rel="noopener noreferrer" style={{ "paddingLeft": "40px" }}>View Bookings</a>
                            <a href="https://app.youcanbook.me/#/editProfile?id=155f5567-7bcb-47cb-be8a-c27793655fae&section=availability" target="_blank" rel="noopener noreferrer" style={{ "paddingLeft": "20px" }}>Admin</a>
                            
                            <hr></hr>
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
                            <p style={{float: "left"}}>Note: Must search for a patient before making reservation</p>
                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>Reservation Date</InputGroupAddon>
                                <Input
                                    disabled={!this.state.patientId}
                                    className="dropDown"
                                    name='reservationDate' 
                                    type='date'
                                    value={this.state.reservationDate}
                                    onChange={this.handleInputChange}
                                >
                                </Input>
                                <Dropdown
                                    disabled={!this.state.reservationDate}
                                    options={options}
                                    onChange={this._onSelect}
                                    value={this.state.reservationTime}
                                    placeholder="Select Apointment Time"
                                />       
                                <Input
                                    name='reservationDetail' 
                                    type='string'
                                    value={this.state.reservationDetail}
                                    onChange={this.handleInputChange}
                                    placeholder="Reservation detail"
                                >
                                </Input>
                            </InputGroup>
                            <FormBtn
                                disabled={!(this.state.reservationDate && this.state.reservationTime && this.state.reservationDetail)}
                                onClick={this.makeReservation}
                                color="primary"
                                size="sm"
                            > Reserve
                            </FormBtn>   
                            <div id="reservationNotice">{this.state.reservationNotice}</div>
                            <br></br><br></br>            
                            <hr></hr>
                            <div className="recordInfo mb-3">                        
                                <div>
                                    <h3>Record:</h3>
                                    <br></br><br></br>
                                    <div className="note shadow text-left">
                                        {this.state.record.map((item, i)=>{
                                            return(
                                                <h6 key={i}>
                                                    <DelBtn
                                                        onClick={() => { this.deleteRecord(item._id) }}
                                                    />
                                                    <a href={item.recordUrl} target="_blank" id={item._id}>
                                                        {i+1}. {item.recordName}
                                                    </a>
                                                </h6>
                                            ) 
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
                                        {this.state.note.map((item, i) => {
                                            return (

                                                <h5
                                                    key={i}
                                                    id={item._id}
                                                // onDoubleClick={()=>{this.editNote(item._id, item.note)}}
                                                >
                                                    <DelBtn
                                                        onClick={() => { this.deleteNote(item._id) }}
                                                    />
                                                    {i + 1}.
                                                    {item.note}
                                                </h5>

                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                <Upload 
                                    patientId={this.state.patientId}
                                    fileUpload={this.fileUpload} 
                                />
                            </div>
                            <div>
                                <Input
                                    value={this.state.newNote}
                                    onChange={this.handleInputChange}
                                    name="newNote"
                                    placeholder="add a note here.."
                                />
                                <FormBtn
                                    disabled={!this.state.newNote}
                                    onClick={this.handleAddNote}
                                >
                                    Add Note
                                </FormBtn>
                                <div style={{ color: "green", float: "left", marginTop: 5 }}>{this.state.addNote}</div>
                            </div>
                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
}
export default Dentist;